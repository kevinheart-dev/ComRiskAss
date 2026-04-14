const DEFAULT_ROWS = [
    "Number of Informal Settler Families",
    "Number of Employed Individuals",
    "Number of Families Aware of the Effects of Risks and Hazards",
    "Number of Families with Access to Information (radio/TV/newspaper/social media, etc.)",
    "Number of Families who received Financial Assistance",
    "Number of Families with Access to Early Warning System",
];

function normalizeFamilyRows(rows = []) {
    return DEFAULT_ROWS.map((label) => {
        const match = rows.find((r) => r.value === label);

        return {
            value: label,
            count: match?.count ?? "",
        };
    });
}

export const familyRiskMapping = {
    family_at_risk: (src) => {
        const flatRows = Array.isArray(src.families_at_risk)
            ? src.families_at_risk
            : [];

        const grouped = flatRows.reduce((acc, row) => {
            const purokKey = String(row.purok ?? row.purok_number ?? "");

            if (!purokKey) return acc;

            let existing = acc.find((item) => item.purok === purokKey);

            if (!existing) {
                existing = {
                    purok: purokKey,
                    rowsValue: [],
                };
                acc.push(existing);
            }

            existing.rowsValue.push({
                value: row.value ?? "",
                count: Number.parseInt(row.count) || 0,
            });

            return acc;
        }, []);

        return grouped.map((group) => ({
            purok: group.purok,
            rowsValue: normalizeFamilyRows(group.rowsValue),
        }));
    },
};
