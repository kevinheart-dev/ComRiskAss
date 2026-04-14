export const foodInventoryMapping = {
    food_inventory: (src) =>
        Array.isArray(src.prepositioned_inventories)
            ? src.prepositioned_inventories.map((item) => ({
                  item: item.item ?? "",
                  quantity: item.quantity ?? "",
                  remarks: item.remarks ?? "",
              }))
            : [],
};
