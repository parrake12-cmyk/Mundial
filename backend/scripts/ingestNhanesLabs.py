"""Ingesta reproducible de analitos NHANES 2021-2023.

Descarga tres archivos XPT oficiales, conserva la copia cruda local ignorada por
Git y publica solo perfiles estadisticos agregados. Los percentiles describen la
distribucion observada; no son rangos de referencia ni umbrales diagnosticos.
"""

from __future__ import annotations

import hashlib
import json
from datetime import datetime, timezone
from pathlib import Path
from urllib.request import Request, urlopen

import pandas as pd


ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "data"
RAW_DIR = DATA_DIR / "external" / "nhanes_2021_2023" / "raw"
CATALOG_PATH = DATA_DIR / "analyte_catalog.json"
PROFILES_PATH = DATA_DIR / "analyte_population_profiles.json"
MANIFEST_PATH = DATA_DIR / "external" / "nhanes_2021_2023" / "manifest.json"

BASE_URL = "https://wwwn.cdc.gov/Nchs/Data/Nhanes/Public/2021/DataFiles"

DATASETS = {
    "BIOPRO_L": {
        "title": "Standard Biochemistry Profile",
        "documentation_url": f"{BASE_URL}/BIOPRO_L.htm",
    },
    "ALB_CR_L": {
        "title": "Albumin & Creatinine - Urine",
        "documentation_url": f"{BASE_URL}/ALB_CR_L.htm",
    },
    "CBC_L": {
        "title": "Complete Blood Count with 5-Part Differential",
        "documentation_url": f"{BASE_URL}/CBC_L.htm",
    },
}

ANALYTES = [
    {"analyte_id": "serum_creatinine", "preferred_name": "Creatinina serica", "dataset": "BIOPRO_L", "variable": "LBXSCR", "specimen_type": "Suero refrigerado", "canonical_unit": "mg/dL", "systems": ["Renal", "Cardiovascular", "Hepatobiliar"], "disease_codes": ["REN-001"], "loinc_code": None},
    {"analyte_id": "urine_creatinine", "preferred_name": "Creatinina urinaria", "dataset": "ALB_CR_L", "variable": "URXUCR", "specimen_type": "Orina", "canonical_unit": "mg/dL", "systems": ["Renal", "Endocrino"], "disease_codes": ["REN-001"], "loinc_code": None},
    {"analyte_id": "urine_albumin", "preferred_name": "Albumina urinaria", "dataset": "ALB_CR_L", "variable": "URXUMS", "specimen_type": "Orina", "canonical_unit": "mg/L", "systems": ["Renal", "Endocrino", "Cardiovascular"], "disease_codes": ["REN-001"], "loinc_code": None},
    {"analyte_id": "urine_acr", "preferred_name": "Relacion albumina/creatinina urinaria", "dataset": "ALB_CR_L", "variable": "URDACT", "specimen_type": "Orina", "canonical_unit": "mg/g", "systems": ["Renal", "Endocrino", "Cardiovascular"], "disease_codes": ["REN-001"], "loinc_code": None},
    {"analyte_id": "bun", "preferred_name": "Nitrogeno ureico en sangre", "dataset": "BIOPRO_L", "variable": "LBXSBU", "specimen_type": "Suero refrigerado", "canonical_unit": "mg/dL", "systems": ["Renal", "Metabolico"], "disease_codes": ["REN-001"], "loinc_code": None},
    {"analyte_id": "potassium", "preferred_name": "Potasio", "dataset": "BIOPRO_L", "variable": "LBXSKSI", "specimen_type": "Suero refrigerado", "canonical_unit": "mmol/L", "systems": ["Renal", "Cardiovascular", "Endocrino"], "disease_codes": ["REN-001"], "loinc_code": None},
    {"analyte_id": "sodium", "preferred_name": "Sodio", "dataset": "BIOPRO_L", "variable": "LBXSNASI", "specimen_type": "Suero refrigerado", "canonical_unit": "mmol/L", "systems": ["Renal", "Cardiovascular", "Endocrino"], "disease_codes": ["REN-001"], "loinc_code": None},
    {"analyte_id": "bicarbonate", "preferred_name": "Bicarbonato", "dataset": "BIOPRO_L", "variable": "LBXSC3SI", "specimen_type": "Suero refrigerado", "canonical_unit": "mmol/L", "systems": ["Renal", "Respiratorio", "Metabolico"], "disease_codes": ["REN-001"], "loinc_code": None},
    {"analyte_id": "hemoglobin", "preferred_name": "Hemoglobina", "dataset": "CBC_L", "variable": "LBXHGB", "specimen_type": "Sangre total", "canonical_unit": "g/dL", "systems": ["Hematologico", "Renal", "Cardiovascular"], "disease_codes": ["REN-001"], "loinc_code": None},
    {"analyte_id": "calcium", "preferred_name": "Calcio total", "dataset": "BIOPRO_L", "variable": "LBXSCA", "specimen_type": "Suero refrigerado", "canonical_unit": "mg/dL", "systems": ["Renal", "Endocrino", "Metabolico"], "disease_codes": ["REN-001"], "loinc_code": None},
    {"analyte_id": "phosphorus", "preferred_name": "Fosforo", "dataset": "BIOPRO_L", "variable": "LBXSPH", "specimen_type": "Suero refrigerado", "canonical_unit": "mg/dL", "systems": ["Renal", "Endocrino", "Metabolico"], "disease_codes": ["REN-001"], "loinc_code": None},
    {"analyte_id": "serum_albumin", "preferred_name": "Albumina serica", "dataset": "BIOPRO_L", "variable": "LBXSAL", "specimen_type": "Suero refrigerado", "canonical_unit": "g/dL", "systems": ["Hepatobiliar", "Renal", "Nutricional"], "disease_codes": ["REN-001"], "loinc_code": None},
    {"analyte_id": "egfr", "preferred_name": "Filtracion glomerular estimada", "dataset": None, "variable": None, "specimen_type": "Calculo derivado", "canonical_unit": "mL/min/1.73 m2", "systems": ["Renal"], "disease_codes": ["REN-001"], "loinc_code": None},
    {"analyte_id": "pth", "preferred_name": "Hormona paratiroidea", "dataset": None, "variable": None, "specimen_type": "Suero o plasma segun metodo", "canonical_unit": None, "systems": ["Renal", "Endocrino"], "disease_codes": ["REN-001"], "loinc_code": None},
]


def download(url: str, target: Path) -> None:
    if target.exists() and target.stat().st_size > 0:
        return
    target.parent.mkdir(parents=True, exist_ok=True)
    request = Request(url, headers={"User-Agent": "MedLearn-Clinico educational ingestion"})
    with urlopen(request, timeout=60) as response, target.open("wb") as output:
        output.write(response.read())


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def finite_number(value):
    if pd.isna(value):
        return None
    return round(float(value), 6)


def main() -> None:
    frames = {}
    manifest_files = []
    generated_at = datetime.now(timezone.utc).isoformat()

    for dataset_id, metadata in DATASETS.items():
        url = f"{BASE_URL}/{dataset_id}.xpt"
        target = RAW_DIR / f"{dataset_id}.xpt"
        download(url, target)
        frame = pd.read_sas(target, format="xport", encoding="utf-8")
        frames[dataset_id] = frame
        manifest_files.append({
            "dataset_id": dataset_id,
            "title": metadata["title"],
            "cycle": "August 2021-August 2023",
            "download_url": url,
            "documentation_url": metadata["documentation_url"],
            "sha256": sha256(target),
            "bytes": target.stat().st_size,
            "rows": len(frame),
            "columns": len(frame.columns),
        })

    catalog = []
    profiles = []
    for analyte in ANALYTES:
        imported = bool(analyte["dataset"] and analyte["variable"])
        catalog.append({
            **analyte,
            "source_id": "nhanes_2021_2023" if imported else None,
            "source_status": "imported" if imported else "pending_compatible_source",
            "loinc_status": "pending_official_mapping",
            "review_status": "normalized_not_clinically_reviewed" if imported else "pending",
            "interpretation_policy": "Requires disease-specific sourced interpretation; population percentiles are not reference ranges.",
        })
        if not imported:
            continue
        frame = frames[analyte["dataset"]]
        if analyte["variable"] not in frame.columns:
            raise KeyError(f"Missing {analyte['variable']} in {analyte['dataset']}")
        series = pd.to_numeric(frame[analyte["variable"]], errors="coerce")
        clean = series.dropna()
        quantiles = clean.quantile([0.05, 0.25, 0.5, 0.75, 0.95])
        profiles.append({
            "analyte_id": analyte["analyte_id"],
            "source_id": "nhanes_2021_2023",
            "dataset_id": analyte["dataset"],
            "source_variable": analyte["variable"],
            "unit": analyte["canonical_unit"],
            "total_rows": int(len(series)),
            "observed_count": int(clean.count()),
            "missing_count": int(series.isna().sum()),
            "distribution": {
                "minimum": finite_number(clean.min()),
                "p05": finite_number(quantiles.loc[0.05]),
                "p25": finite_number(quantiles.loc[0.25]),
                "median": finite_number(quantiles.loc[0.5]),
                "p75": finite_number(quantiles.loc[0.75]),
                "p95": finite_number(quantiles.loc[0.95]),
                "maximum": finite_number(clean.max()),
            },
            "warning": "Unweighted descriptive distribution. Not a clinical reference range and not suitable for diagnosis.",
        })

    CATALOG_PATH.write_text(json.dumps(catalog, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    PROFILES_PATH.write_text(json.dumps(profiles, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    MANIFEST_PATH.parent.mkdir(parents=True, exist_ok=True)
    MANIFEST_PATH.write_text(json.dumps({
        "source_id": "nhanes_2021_2023",
        "provider": "CDC/NCHS",
        "generated_at": generated_at,
        "files": manifest_files,
        "outputs": [CATALOG_PATH.name, PROFILES_PATH.name],
        "usage_note": "Educational aggregated data. Follow NHANES analytic guidance for population inference.",
    }, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    print(f"Analitos catalogados: {len(catalog)}")
    print(f"Perfiles NHANES generados: {len(profiles)}")
    print(f"Pendientes de fuente compatible: {sum(1 for item in catalog if item['source_status'].startswith('pending'))}")


if __name__ == "__main__":
    main()
