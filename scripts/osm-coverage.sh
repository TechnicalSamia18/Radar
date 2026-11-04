#!/usr/bin/env bash
# One-off measurement (PRD §9, A-08): how many IT/software offices does
# OpenStreetMap list per Pakistani city, and how many have a website?
# Uses the public Overpass API with an honest user agent and a pause between cities.
set -u
CITIES=("Islamabad" "Rawalpindi" "Lahore" "Karachi" "Peshawar" "Faisalabad" "Multan")
UA="Radar-student-project/0.1 (coverage check; github.com/TechnicalSamia18/Radar)"
printf "%-12s %6s %8s %8s %8s\n" city total it_soft company website
for city in "${CITIES[@]}"; do
  q="[out:json][timeout:90];area[\"name:en\"=\"$city\"][\"boundary\"=\"administrative\"][\"admin_level\"~\"^[4-8]$\"]->.a;(nwr(area.a)[\"office\"~\"^(it|software|company|telecommunication)$\"];nwr(area.a)[\"craft\"=\"software\"];);out tags;"
  curl -sS -m 120 -A "$UA" --data-urlencode "data=$q" https://overpass-api.de/api/interpreter -o "/tmp/$city.json" || { echo "$city: request failed"; continue; }
  jq -r --arg c "$city" '[.elements[]?] as $e |
    [$c, ($e|length),
     ([$e[]|select(.tags.office=="it" or .tags.office=="software" or .tags.craft=="software")]|length),
     ([$e[]|select(.tags.office=="company")]|length),
     ([$e[]|select(.tags.website or .tags["contact:website"])]|length)] | @tsv' "/tmp/$city.json" \
    | awk -F'\t' '{printf "%-12s %6s %8s %8s %8s\n",$1,$2,$3,$4,$5}'
  sleep 5
done
echo; echo "Sample (Islamabad, IT/software with website):"
jq -r '.elements[]? | select((.tags.office=="it" or .tags.office=="software" or .tags.craft=="software") and (.tags.website or .tags["contact:website"])) | "\(.tags.name // "-") | \(.tags.website // .tags["contact:website"])"' /tmp/Islamabad.json | head -25
