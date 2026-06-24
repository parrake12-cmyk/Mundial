import json
import re
from html import unescape
from pathlib import Path
from xml.etree import ElementTree as ET


BASE_DIR = Path(__file__).resolve().parents[1]
EXTERNAL_DIR = BASE_DIR / "data" / "external"
XML_PATH = EXTERNAL_DIR / "medlineplus_topics_2026-05-20" / "mplus_topics_2026-05-20.xml"
OUTPUT_PATH = EXTERNAL_DIR / "medlineplus_topics.json"


def clean_html(value):
    if not value:
        return ""
    value = re.sub(r"<[^>]+>", " ", value)
    value = unescape(value)
    value = re.sub(r"\s+", " ", value)
    return value.strip()


def child_texts(node, tag):
    return [
        clean_html(child.text or "")
        for child in node.findall(tag)
        if clean_html(child.text or "")
    ]


def collect_sites(topic):
    sites = []
    for site in topic.findall("site"):
        title = clean_html(site.get("title") or site.text or "")
        url = site.get("url") or ""
        organization = clean_html(site.get("organization") or "")
        category = clean_html(site.get("category") or "")
        if title or url:
            sites.append(
                {
                    "title": title,
                    "url": url,
                    "organization": organization,
                    "category": category,
                }
            )
    return sites


def parse_topics():
    if not XML_PATH.exists():
        raise FileNotFoundError(f"No existe {XML_PATH}")

    root = ET.parse(XML_PATH).getroot()
    topics = []
    for topic in root.findall("health-topic"):
        summary = topic.findtext("full-summary") or ""
        groups = [
            clean_html(group.get("url") or group.text or "")
            for group in topic.findall("group")
            if clean_html(group.get("url") or group.text or "")
        ]

        topics.append(
            {
                "id": topic.get("id") or "",
                "title": topic.get("title") or clean_html(topic.text or ""),
                "url": topic.get("url") or "",
                "language": topic.get("language") or "",
                "date_created": topic.get("date-created") or "",
                "also_called": child_texts(topic, "also-called"),
                "mesh": child_texts(topic, "mesh-heading"),
                "see_reference": child_texts(topic, "see-reference"),
                "groups": groups,
                "summary": clean_html(summary),
                "sites": collect_sites(topic),
            }
        )

    OUTPUT_PATH.write_text(json.dumps(topics, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Procesados {len(topics)} temas MedlinePlus en {OUTPUT_PATH}")


if __name__ == "__main__":
    parse_topics()
