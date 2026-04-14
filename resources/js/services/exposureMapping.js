export const exposureMapping = {
    exposure: (src) =>
        Array.isArray(src.population_exposures)
            ? src.population_exposures.map((table) => ({
                  riskType: table.riskType ?? "",
                  purokData: Array.isArray(table.purokData)
                      ? table.purokData.map((row) => ({
                            purok: row.purok ?? "",
                            families: row.families ?? "",
                            individualsM: row.individualsM ?? "",
                            individualsF: row.individualsF ?? "",
                            lgbtq: row.lgbtq ?? "",
                            age0_6M: row.age0_6M ?? "",
                            age0_6F: row.age0_6F ?? "",
                            age7m_2yM: row.age7m_2yM ?? "",
                            age7m_2yF: row.age7m_2yF ?? "",
                            age3_5M: row.age3_5M ?? "",
                            age3_5F: row.age3_5F ?? "",
                            age6_12M: row.age6_12M ?? "",
                            age6_12F: row.age6_12F ?? "",
                            age13_17M: row.age13_17M ?? "",
                            age13_17F: row.age13_17F ?? "",
                            age18_59M: row.age18_59M ?? "",
                            age18_59F: row.age18_59F ?? "",
                            age60upM: row.age60upM ?? "",
                            age60upF: row.age60upF ?? "",
                            pwdM: row.pwdM ?? "",
                            pwdF: row.pwdF ?? "",
                            diseasesM: row.diseasesM ?? "",
                            diseasesF: row.diseasesF ?? "",
                            pregnantWomen: row.pregnantWomen ?? "",
                        }))
                      : [],
              }))
            : [],
};
