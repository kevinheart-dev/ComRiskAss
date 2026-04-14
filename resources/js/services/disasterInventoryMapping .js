export const disasterInventoryMapping = {
    disaster_inventory: (src) =>
        Array.isArray(src.disaster_inventories)
            ? src.disaster_inventories.map((hazard) => ({
                  hazard: hazard.hazard ?? "",
                  categories: Array.isArray(hazard.categories)
                      ? hazard.categories.map((category) => ({
                            type: category.type ?? "",
                            rows: Array.isArray(category.rows)
                                ? category.rows.map((row) => ({
                                      item: row.item ?? "",
                                      total: row.total ?? "",
                                      percent: row.percent ?? "",
                                      location: row.location ?? "",
                                  }))
                                : [],
                        }))
                      : [],
              }))
            : [],
};
