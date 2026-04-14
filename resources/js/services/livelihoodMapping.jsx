export const livelihoodMapping = {
    livelihood: (src) =>
        src.livelihood_statistics?.map((item) => ({
            type: item.type,
            male_no_dis: item.male_no_dis ?? "",
            male_dis: item.male_dis ?? "",
            female_no_dis: item.female_no_dis ?? "",
            female_dis: item.female_dis ?? "",
            lgbtq_no_dis: item.lgbtq_no_dis ?? "",
            lgbtq_dis: item.lgbtq_dis ?? "",
        })) ?? [],

    infrastructure: (src) =>
        src.household_services?.map((category) => ({
            category: category.category,
            rows:
                category.rows?.map((row) => ({
                    type: row.type,
                    households: row.households ?? "",
                })) ?? [],
        })) ?? [],
};
