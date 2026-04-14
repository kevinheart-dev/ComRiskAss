export const livelihoodEvacuationMapping = {
    livelihood_evacuation: (src) =>
        Array.isArray(src.livelihood_evacuation)
            ? src.livelihood_evacuation.map((item) => ({
                  type: item.type ?? "",
                  evacuation: item.evacuation ?? "",
                  origin: item.origin ?? "",
                  items: item.items ?? "",
              }))
            : [],
};
