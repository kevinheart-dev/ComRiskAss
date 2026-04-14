export const disasterPerPurokMapping = {
    disaster_per_purok: (src) =>
        Array.isArray(src.disaster_per_purok)
            ? src.disaster_per_purok.map((item) => ({
                  type: item.type ?? "",
                  rows: Array.isArray(item.rows)
                      ? item.rows.map((row) => ({
                            purok: row.purok ?? "",
                            lowFamilies: row.lowFamilies ?? "",
                            lowIndividuals: row.lowIndividuals ?? "",
                            mediumFamilies: row.mediumFamilies ?? "",
                            mediumIndividuals: row.mediumIndividuals ?? "",
                            highFamilies: row.highFamilies ?? "",
                            highIndividuals: row.highIndividuals ?? "",
                        }))
                      : [],
              }))
            : [],
};
