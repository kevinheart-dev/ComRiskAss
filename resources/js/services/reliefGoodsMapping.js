export const reliefGoodsMapping = {
    relief_goods: (src) =>
        Array.isArray(src.relief_distributions)
            ? src.relief_distributions.map((item) => ({
                  evacuationCenter: item.evacuation_center ?? "",
                  typeOfGoods: item.relief_good ?? "",
                  quantity: item.quantity ?? "",
                  unit: item.unit ?? "",
                  beneficiaries: item.beneficiaries ?? "",
                  address: item.address ?? "",
              }))
            : [],
};
