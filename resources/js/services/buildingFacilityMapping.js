export const buildingFacilityMapping = {
    // 🔹 Buildings (infra_facilities)
    buildings: (src) =>
        src.infra_facilities?.map((category) => ({
            category: category.category,
            rows:
                category.buildings?.map((row) => ({
                    type: row.type,
                    households: row.quantity ?? "",
                })) ?? [],
        })) ?? [],

    // 🔹 Facilities (merge 3 backend sources into 1 structure)
    facilities: (src) => {
        const facilities = [];

        // 1. Primary Facilities
        facilities.push({
            category: "Facilities and Services",
            rows:
                src.primary_facilities?.map((item) => ({
                    type: item.type,
                    quantity: item.quantity ?? "",
                })) ?? [],
        });

        // 2. Public Transportation
        facilities.push({
            category: "Public Transportation",
            rows:
                src.public_transportations?.map((item) => ({
                    type: item.type,
                    quantity: item.quantity ?? "",
                })) ?? [],
        });

        // 3. Road Networks
        facilities.push({
            category: "Road Types",
            rows:
                src.road_networks?.map((item) => ({
                    type: item.type,
                    length: item.length ?? "",
                    maintained_by: item.maintained_by ?? "",
                })) ?? [],
        });

        return facilities;
    },
};
