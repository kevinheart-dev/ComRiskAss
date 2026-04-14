export const distributionProcessMapping = {
    distribution_process: (src) =>
        Array.isArray(src.relief_distribution_processes)
            ? src.relief_distribution_processes.map((item) => ({
                  process: item.process ?? "",
                  origin: item.origin ?? "",
                  remarks: item.remarks ?? "",
              }))
            : [],
};
