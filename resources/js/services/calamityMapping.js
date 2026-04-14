const populationCategories = [
    "With Disability",
    "Pregnant Women",
    "Number of Families",
    "Number of Individuals",
    "0-6 months",
    "7 mos - 2 yrs",
    "3-5 yrs",
    "6-12 yrs",
    "13-17 yrs",
    "18-59 yrs",
    "60+ yrs",
    "Physical Health",
    "Mental Health",
];

const disasterEffectImpact = [
    "Number of Casualties",
    "Deaths",
    "Injured",
    "Missing",
];

const structureCategories = [
    "Houses",
    "Schools",
    "Hospitals",
    "Health Center",
    "Government Offices",
    "Public Markets",
    "Flood Control",
    "Commercial Facilities",
];

const defaultAgriculture = [
    "Livestock (quantity or value)",
    "Farm animals (quantity)",
    "Poultry and Fowl (quantity)",
    "Agriculture/Farm Inputs",
];

const defaultDamageDescriptions = [
    "Totally Damaged (quantity or worth of damage)",
    "Partially Damaged (quantity or worth of damage)",
];

const defaultStructure = [
    "Houses",
    "Schools",
    "Hospitals",
    "Health Center",
    "Government Offices",
    "Public Markets",
    "Flood Control",
    "Commercial Facilities",
].map((category) => ({
    category,
    defaultDescriptions: [...defaultDamageDescriptions],
}));

const defaultLifelines = [
    {
        category: "Transportation Facilities",
        defaultDescriptions: [
            "Transportation Facilities (extent of damage or worth of damage)",
        ],
    },
    {
        category: "Roads",
        defaultDescriptions: [
            "National (Number of impassable road or worth of damage)",
            "Provincial (Number of impassable road or worth of damage)",
            "City (Number of impassable road or worth of damage)",
            "Barangay (Number of impassable road or worth of damage)",
        ],
    },
    {
        category: "Electric and Water Supply",
        defaultDescriptions: [
            "Electric Supply (Number of households affected)",
            "Water Supply (Number of households affected)",
        ],
    },
    {
        category: "Bridges",
        defaultDescriptions: [
            "Bailey (Number of impassable bridges or worth of damages)",
            "Concrete (Number of impassable bridges or worth of damages)",
            "Wooden (Number of impassable bridges or worth of damages)",
            "Railway (Number of impassable bridges or worth of damages)",
        ],
    },
    {
        category: "Communication Facilities",
        defaultDescriptions: [
            "PLDT (Number of damaged lines or worth of damages)",
            "BAYANTEL (Number of damaged lines or worth of damages)",
            "Cell Sites (Number of damaged lines or worth of damages)",
            "Radio (Number of damaged lines or worth of damages)",
            "Repeaters (Number of damaged lines or worth of damages)",
        ],
    },
];

function toText(value) {
    if (value === null || value === undefined) return "";
    return String(value);
}

function splitPropertyAndStructure(property = []) {
    const safe = Array.isArray(property) ? property : [];

    const realProperty = [];
    const realStructure = [];

    safe.forEach((item) => {
        if (structureCategories.includes(item.category)) {
            realStructure.push(item);
        } else {
            realProperty.push(item);
        }
    });

    return { realProperty, realStructure };
}

function mapByLabel(
    defaults,
    incoming = [],
    labelKeyCandidates = [],
    type = "flat",
) {
    if (!Array.isArray(incoming)) {
        if (type === "nested") {
            return defaults.map((group) => ({
                category: group.category,
                descriptions: group.defaultDescriptions.map((desc) => ({
                    description: desc,
                    value: "",
                    source: "",
                })),
            }));
        }

        return defaults.map((label) => ({
            [labelKeyCandidates[0] || "description"]: label,
            value: "",
            source: "",
        }));
    }

    if (type === "nested") {
        return defaults.map((group) => {
            const matchedGroup = incoming.find(
                (item) => item.category === group.category,
            );

            return {
                category: group.category,
                descriptions: group.defaultDescriptions.map((desc) => {
                    const matchedDesc = matchedGroup?.descriptions?.find(
                        (d) => d.description === desc,
                    );

                    return {
                        description: desc,
                        value: toText(matchedDesc?.value),
                        source: toText(matchedDesc?.source),
                    };
                }),
            };
        });
    }

    return defaults.map((label) => {
        const matched = incoming.find((item) =>
            labelKeyCandidates.some((key) => item?.[key] === label),
        );

        return {
            [labelKeyCandidates[0] || "description"]: label,
            value: toText(matched?.value),
            source: toText(matched?.source),
        };
    });
}

function normalizeStructure(structure = []) {
    if (!Array.isArray(structure) || structure.length === 0) {
        return defaultStructure.map((group) => ({
            category: group.category,
            descriptions: group.defaultDescriptions.map((desc) => ({
                description: desc,
                value: "",
                source: "",
            })),
        }));
    }

    return structure.map((group) => ({
        category: group.category ?? "",
        descriptions: Array.isArray(group.descriptions)
            ? group.descriptions.map((desc) => ({
                  description: desc.description ?? "",
                  value: toText(desc.value),
                  source: toText(desc.source),
              }))
            : [],
    }));
}

export const calamityMapping = {
    calamities: (src) =>
        (src.disasters ?? src.calamities ?? []).map((item) => {
            const { realProperty, realStructure } = splitPropertyAndStructure(
                item.property,
            );

            return {
                disaster_name: toText(item.disaster_name ?? item.name),
                year: toText(item.year),

                population: mapByLabel(populationCategories, item.population, [
                    "category",
                ]),

                impacts: mapByLabel(disasterEffectImpact, item.impacts, [
                    "effect_type",
                ]),

                property: realProperty.map((group) => ({
                    category: toText(group.category),
                    descriptions: Array.isArray(group.descriptions)
                        ? group.descriptions.map((d) => ({
                              description: toText(d.description),
                              value: toText(d.value),
                              source: toText(d.source),
                          }))
                        : [],
                })),

                structure:
                    realStructure.length > 0
                        ? realStructure.map((group) => ({
                              category: toText(group.category),
                              descriptions: Array.isArray(group.descriptions)
                                  ? group.descriptions.map((d) => ({
                                        description: toText(d.description),
                                        value: toText(d.value),
                                        source: toText(d.source),
                                    }))
                                  : [],
                          }))
                        : normalizeStructure(item.structure),

                agriculture: mapByLabel(defaultAgriculture, item.agriculture, [
                    "description",
                ]),

                lifelines: Array.isArray(item.lifelines)
                    ? item.lifelines.map((group) => ({
                          category: toText(group.category),
                          descriptions: Array.isArray(group.descriptions)
                              ? group.descriptions.map((d) => ({
                                    description: toText(d.description),
                                    value: toText(d.value),
                                    source: toText(d.source),
                                }))
                              : [],
                      }))
                    : mapByLabel(
                          defaultLifelines,
                          item.lifelines,
                          ["category"],
                          "nested",
                      ),
            };
        }),
};
