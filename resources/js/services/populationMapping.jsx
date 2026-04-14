export const populationMapping = {
    barangayPopulation: "barangay.population",
    householdsPopulation: "barangay.households_population",
    familiesPopulation: "barangay.families_population",

    populationGender: (src) =>
        ["female", "male", "lgbtq"].map((gender) => {
            const found = src.population_genders?.find(
                (g) => g.gender === gender,
            );
            return {
                gender,
                value: found?.value ?? "",
            };
        }),

    population: (src) =>
        src.population_age_groups?.map((item) => ({
            ageGroup: item.ageGroup,
            male_no_dis: item.male_no_dis ?? "",
            male_dis: item.male_dis ?? "",
            female_no_dis: item.female_no_dis ?? "",
            female_dis: item.female_dis ?? "",
            lgbtq_no_dis: item.lgbtq_no_dis ?? "",
            lgbtq_dis: item.lgbtq_dis ?? "",
        })) ?? [],

    houses: (src) =>
        src.house_builds?.map((item) => ({
            houseType: item.houseType,
            oneFloor: item.oneFloor ?? "",
            multiFloor: item.multiFloor ?? "",
        })) ?? [],

    ownership: (src) =>
        src.house_ownerships?.reduce((acc, item) => {
            acc[item.type] = item.quantity ?? "";
            return acc;
        }, {}) ?? {},
};
