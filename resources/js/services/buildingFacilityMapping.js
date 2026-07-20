export const buildingFacilityMapping = {
    buildings: (src) => {
        if (!src.infra_facilities?.length) return undefined;

        return src.infra_facilities.map((category) => ({
            category: category.category,
            rows:
                category.buildings?.map((row) => ({
                    type: row.type,
                    households: row.quantity ?? "",
                })) ?? [],
        }));
    },

    facilities: (src) => {
        if (
            !src.primary_facilities?.length &&
            !src.public_transportations?.length &&
            !src.road_networks?.length
        ) {
            return undefined;
        }

        return [
            {
                category: "Facilities and Services",
                rows:
                    src.primary_facilities?.map((item) => ({
                        type: item.type,
                        quantity: item.quantity ?? "",
                    })) ?? [],
            },
            {
                category: "Public Transportation",
                rows:
                    src.public_transportations?.map((item) => ({
                        type: item.type,
                        quantity: item.quantity ?? "",
                    })) ?? [],
            },
            {
                category: "Road Types",
                rows:
                    src.road_networks?.map((item) => ({
                        type: item.type,
                        length: item.length ?? "",
                        maintained_by: item.maintained_by ?? "",
                    })) ?? [],
            },
        ];
    },
};
