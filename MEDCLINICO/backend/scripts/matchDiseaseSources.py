import json
import re
import unicodedata
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parents[1]
DISEASES_PATH = BASE_DIR / "data" / "diseases.json"
MEDLINE_PATH = BASE_DIR / "data" / "external" / "medlineplus_topics.json"
OUTPUT_PATH = BASE_DIR / "data" / "external" / "disease_medlineplus_matches.json"


MANUAL_TERMS = {
    "REN-001": ["chronic kidney disease", "enfermedad renal cronica"],
    "REN-002": ["glomerulonephritis", "glomerulonefritis"],
    "REN-003": ["nephrotic syndrome", "sindrome nefrotico"],
    "ENDO-001": ["type 2 diabetes", "diabetes tipo 2"],
    "ENDO-002": ["hypothyroidism", "hipotiroidismo"],
    "CARD-001": ["heart attack", "myocardial infarction", "infarto"],
    "CARD-002": ["high blood pressure", "hypertension", "hipertension"],
    "CARD-003": ["atrial fibrillation", "fibrilacion auricular"],
    "CARD-004": ["heart failure", "insuficiencia cardiaca"],
    "RESP-001": ["pneumonia", "neumonia"],
    "RESP-002": ["asthma", "asma"],
    "RESP-004": ["copd", "epoc", "chronic obstructive pulmonary disease"],
    "DIG-001": ["appendicitis", "apendicitis"],
    "DIG-003": ["gerd", "gastroesophageal reflux", "reflujo"],
    "INF-002": ["covid-19", "covid"],
    "INF-003": ["urinary tract infection", "infeccion urinaria"],
    "HEMA-001": ["iron deficiency anemia", "anemia ferropenica"],
    "PSY-001": ["depression", "major depression", "depresion"],
    "MUS-001": ["rheumatoid arthritis", "artritis reumatoide"],
    "NEU-001": ["epilepsy", "epilepsia"],
}


def normalize(value):
    value = unicodedata.normalize("NFKD", value or "")
    value = "".join(char for char in value if not unicodedata.combining(char))
    value = value.lower()
    value = re.sub(r"[^a-z0-9]+", " ", value)
    return re.sub(r"\s+", " ", value).strip()


def score_topic(terms, topic):
    fields = [
        topic.get("title", ""),
        " ".join(topic.get("also_called", [])),
        " ".join(topic.get("see_reference", [])),
        " ".join(topic.get("mesh", [])),
    ]
    haystack = normalize(" ".join(fields))
    score = 0
    for term in terms:
        term_norm = normalize(term)
        if not term_norm:
            continue
        if normalize(topic.get("title", "")) == term_norm:
            score += 100
        elif term_norm in haystack:
            score += 40
    if score > 0 and topic.get("language") == "Spanish":
        score += 3
    return score


def main():
    diseases = json.loads(DISEASES_PATH.read_text(encoding="utf-8"))
    topics = json.loads(MEDLINE_PATH.read_text(encoding="utf-8"))
    matches = []

    for disease in diseases:
        code = disease["disease_code"]
        terms = MANUAL_TERMS.get(code, [disease["name"]])
        ranked = sorted(
            (
                {
                    "medline_id": topic.get("id", ""),
                    "title": topic.get("title", ""),
                    "language": topic.get("language", ""),
                    "url": topic.get("url", ""),
                    "score": score_topic(terms, topic),
                }
                for topic in topics
            ),
            key=lambda item: item["score"],
            reverse=True,
        )
        best = [item for item in ranked[:5] if item["score"] >= 30]
        matches.append(
            {
                "disease_code": code,
                "name": disease["name"],
                "terms": terms,
                "matches": best,
            }
        )

    OUTPUT_PATH.write_text(json.dumps(matches, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    matched = sum(1 for item in matches if item["matches"])
    print(f"Generadas coincidencias para {matched}/{len(matches)} enfermedades en {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
