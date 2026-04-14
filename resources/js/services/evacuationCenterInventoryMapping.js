export const evacuationCenterInventoryMapping = {
    evacuation_center_inventory: (src) =>
        Array.isArray(src.evacuation_center_inventory)
            ? src.evacuation_center_inventory.map((row) => ({
                  totalFamilies: row.totalFamilies ?? "",
                  totalIndividuals: row.totalIndividuals ?? "",

                  populationAtRiskFamilies: row.populationAtRiskFamilies ?? "",
                  populationAtRiskIndividuals:
                      row.populationAtRiskIndividuals ?? "",

                  evacuationCenterPlanA: row.evacuationCenterPlanA ?? "",

                  personsCanBeAccommodatedPlanAFamilies:
                      row.personsCanBeAccommodatedPlanAFamilies ?? "",
                  personsCanBeAccommodatedPlanAIndividuals:
                      row.personsCanBeAccommodatedPlanAIndividuals ?? "",

                  personsCannotBeAccommodatedPlanAFamilies:
                      row.personsCannotBeAccommodatedPlanAFamilies ?? "",
                  personsCannotBeAccommodatedPlanAIndividuals:
                      row.personsCannotBeAccommodatedPlanAIndividuals ?? "",

                  evacuationCenterPlanB: row.evacuationCenterPlanB ?? "",

                  personsCannotBeAccommodatedPlanABFamilies:
                      row.personsCannotBeAccommodatedPlanABFamilies ?? "",
                  personsCannotBeAccommodatedPlanABIndividuals:
                      row.personsCannotBeAccommodatedPlanABIndividuals ?? "",

                  remarks: row.remarks ?? "",
              }))
            : [],
};
