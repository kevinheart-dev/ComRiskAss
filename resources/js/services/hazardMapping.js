export const hazardMapping = {
    hazards: (src) =>
        (src.hazard_risks ?? src.hazards ?? []).map((item) => ({
            hazard: item.hazard ?? item.hazard_name ?? "",
            probability: item.probability ?? "",
            effect: item.effect ?? "",
            management: item.management ?? "",
            basis: item.basis ?? "",
        })),
};
