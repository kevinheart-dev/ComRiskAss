export const institutionHumanMapping = {
    // 🔹 Institutions
    institutions: (src) =>
        src.institutions?.map((item) => ({
            name: item.name ?? "",
            male: item.male ?? "",
            female: item.female ?? "",
            lgbtq: item.lgbtq ?? "",
            head: item.head ?? "",
            contact: item.contact ?? "",
            registered: item.registered ?? "YES",
            programs: item.programs ?? "",
        })) ?? [],

    // 🔹 Human Resources
    human_resources: (src) =>
        src.human_resources?.map((category) => ({
            category: category.category ?? "",
            rows:
                category.rows?.map((row) => ({
                    type: row.type ?? "",
                    male_no_dis: row.male_no_dis ?? "",
                    male_dis: row.male_dis ?? "",
                    female_no_dis: row.female_no_dis ?? "",
                    female_dis: row.female_dis ?? "",
                    lgbtq_no_dis: row.lgbtq_no_dis ?? "",
                    lgbtq_dis: row.lgbtq_dis ?? "",
                })) ?? [],
        })) ?? [],
};
