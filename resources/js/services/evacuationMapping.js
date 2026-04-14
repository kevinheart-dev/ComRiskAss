export const evacuationListMapping = {
    evacuation_list: (src) =>
        Array.isArray(src.evacuation_list)
            ? src.evacuation_list.map((item) => ({
                  name: item.name ?? "",
                  families: item.families ?? "",
                  individuals: item.individuals ?? "",
                  ownerGovt: !!item.ownerGovt,
                  ownerPrivate: !!item.ownerPrivate,
                  mouYes: !!item.mouYes,
                  mouNo: !!item.mouNo,
                  inspectedYes: !!item.inspectedYes,
                  inspectedNo: !!item.inspectedNo,
              }))
            : [],
};
