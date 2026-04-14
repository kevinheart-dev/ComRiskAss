const DEFAULT_ILLNESSES = [
    "Hypertension",
    "Acute Respiratory Infection (AURI)",
    "Diabetes Mellitus",
    "Scabies",
    "Infected Wound",
    "Influenza",
    "Urinary Tract Infection (UTI)",
    "Skin Allergy",
    "Boil",
    "Chicken Pox",
    "Diarrhea",
    "Dengue",
    "Stroke",
];

function normalizeIllnessName(name = "") {
    if (name === "Diabetes") return "Diabetes Mellitus";
    return name;
}

export const illnessesMapping = {
    illnesses: (src) => {
        const raw = Array.isArray(src.illnesses_stats)
            ? src.illnesses_stats
            : [];

        const normalized = raw.map((item) => ({
            illness: normalizeIllnessName(item.illness ?? ""),
            children: item.children ?? "",
            adults: item.adults ?? "",
        }));

        const mergedDefaults = DEFAULT_ILLNESSES.map((label) => {
            const match = normalized.find((item) => item.illness === label);

            return (
                match ?? {
                    illness: label,
                    children: "",
                    adults: "",
                }
            );
        });

        const extras = normalized.filter(
            (item) => !DEFAULT_ILLNESSES.includes(item.illness),
        );

        return [...mergedDefaults, ...extras];
    },
};
