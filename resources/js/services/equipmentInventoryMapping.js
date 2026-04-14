function mapEquipmentStatus(status = "") {
    if (status === "checked") return "yes";
    if (status === "cross") return "no";
    return "";
}

export const equipmentInventoryMapping = {
    equipment_inventory: (src) =>
        Array.isArray(src.equipment_inventories)
            ? src.equipment_inventories.map((item) => ({
                  item: item.item ?? "",
                  status: mapEquipmentStatus(item.status),
                  quantity: item.quantity ?? "",
                  location: item.location ?? "",
                  remarks: item.remarks ?? "",
              }))
            : [],
};
