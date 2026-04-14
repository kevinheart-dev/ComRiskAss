export const evacuationPlanMapping = {
    evacuation_plan: (src) =>
        Array.isArray(src.evacuation_plans)
            ? src.evacuation_plans.map((item) => ({
                  task: item.task ?? "",
                  responsible: item.responsible ?? "",
                  remarks: item.remarks ?? "",
              }))
            : [],
};
