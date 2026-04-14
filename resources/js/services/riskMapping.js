export const riskMapping = {
    risks: (src) =>
        (src.risks ?? []).map((item) => ({
            hazard: item.hazard ?? "",
            people: item.people ?? "",
            properties: item.properties ?? "",
            services: item.services ?? "",
            environment: item.environment ?? "",
            livelihood: item.livelihood ?? "",
        })),

    vulnerabilities: (src) =>
        (src.vulnerabilities ?? []).map((item) => ({
            hazard: item.hazard ?? "",
            people: item.people ?? "",
            properties: item.properties ?? "",
            services: item.services ?? "",
            environment: item.environment ?? "",
            livelihood: item.livelihood ?? "",
        })),
};
