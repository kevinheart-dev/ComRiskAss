function normalizeAffectedAreaName(name = "") {
    if (name === "Pandemic") {
        return "Pandemic / Emerging and Re-emerging Diseases";
    }

    return name;
}

export const affectedAreasMapping = {
    affected_areas: (src) =>
        Array.isArray(src.affected_areas)
            ? src.affected_areas.map((item, index) => ({
                  id: `${item.id ?? "affected"}-${index}`,

                  name: normalizeAffectedAreaName(item.name ?? ""),

                  rows: Array.isArray(item.rows)
                      ? item.rows.map((row) => ({
                            riskLevel: row.riskLevel ?? "",
                            purok: String(row.purok ?? ""),
                            totalFamilies: row.totalFamilies ?? "",
                            totalIndividuals: row.totalIndividuals ?? "",
                            atRiskFamilies: row.atRiskFamilies ?? "",
                            atRiskIndividuals: row.atRiskIndividuals ?? "",
                            safeEvacuationArea: row.safeEvacuationArea ?? "",
                        }))
                      : [],
              }))
            : [],
};
