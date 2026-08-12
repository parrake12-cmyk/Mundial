"""Audita estructura, procedencia y coherencia del banco de analitos."""

import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
catalog = json.loads((ROOT / "data" / "analyte_catalog.json").read_text(encoding="utf-8"))
profiles = json.loads((ROOT / "data" / "analyte_population_profiles.json").read_text(encoding="utf-8"))
manifest = json.loads((ROOT / "data" / "external" / "nhanes_2021_2023" / "manifest.json").read_text(encoding="utf-8"))

errors = []
ids = [item.get("analyte_id") for item in catalog]
if len(ids) != len(set(ids)):
    errors.append("Hay analyte_id duplicados.")

required_catalog = {"analyte_id", "preferred_name", "specimen_type", "systems", "disease_codes", "source_status", "review_status"}
for index, item in enumerate(catalog):
    missing = sorted(required_catalog - set(item))
    if missing:
        errors.append(f"Catalogo[{index}] sin campos: {', '.join(missing)}")
    if item.get("source_status") == "imported" and not item.get("source_id"):
        errors.append(f"{item.get('analyte_id')}: importado sin source_id")

catalog_ids = set(ids)
for profile in profiles:
    if profile.get("analyte_id") not in catalog_ids:
        errors.append(f"Perfil huerfano: {profile.get('analyte_id')}")
    counts = profile.get("observed_count", 0) + profile.get("missing_count", 0)
    if counts != profile.get("total_rows"):
        errors.append(f"Conteos inconsistentes: {profile.get('analyte_id')}")
    if "Not a clinical reference range" not in profile.get("warning", ""):
        errors.append(f"Perfil sin advertencia: {profile.get('analyte_id')}")

if not manifest.get("files"):
    errors.append("Manifest sin archivos fuente.")

print(f"Analitos: {len(catalog)}")
print(f"Perfiles poblacionales: {len(profiles)}")
print(f"Archivos fuente: {len(manifest.get('files', []))}")
if errors:
    print("ERRORES:")
    for error in errors:
        print(f"- {error}")
    raise SystemExit(1)
print("Auditoria OK: sin errores.")
