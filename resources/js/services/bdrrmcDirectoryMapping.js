const DEFAULT_DESIGNATIONS = [
    "BDRRMC Chairman",
    "BDRRM Focal Person",
    "Operation/Admin/ Infra/Shelter",
    "Prevention & Mitigation Sub-Committee",
    "Preparedness Sub-Committee",
    "Response Sub-Committee",
    "Recovery & Rehabilitation Sub-Committee",
    "SRR",
    "Security And Safety",
    "Education",
    "Damage Control/POANA Team/RDANA",
    "Health Or First Aid & Psycho-Social Support",
    "Livelihood",
    "Evacuation/Camp Mngt.",
    "Relief Distribution",
    "Protection",
    "Research And Planning",
    "Communication & Warning",
    "Transportation",
    "Fire Management",
    "Infrastructure and Shelter",
];

export const bdrrmcDirectoryMapping = {
    bdrrmc_directory: (src) => {
        const raw = Array.isArray(src.bdrrmc_directory)
            ? src.bdrrmc_directory.map((item) => ({
                  designation: item.designation ?? "",
                  name: item.name ?? "",
                  contact: item.contact ?? "",
              }))
            : [];

        const matchedDefaults = DEFAULT_DESIGNATIONS.map((designation) => {
            const found = raw.find((row) => row.designation === designation);

            return (
                found ?? {
                    designation,
                    name: "",
                    contact: "",
                }
            );
        });

        const extras = raw.filter(
            (row) =>
                row.designation &&
                !DEFAULT_DESIGNATIONS.includes(row.designation),
        );

        return [...matchedDefaults, ...extras];
    },
};
