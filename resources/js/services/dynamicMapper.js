export function dynamicMapper(source = {}, config = {}) {
    const result = {};

    Object.entries(config).forEach(([key, rule]) => {
        if (typeof rule === "string") {
            const value = getValue(source, rule);

            if (value !== undefined) {
                result[key] = value;
            }
        } else if (typeof rule === "function") {
            const value = rule(source);

            // Don't overwrite defaults with undefined
            if (value !== undefined) {
                result[key] = value;
            }
        } else if (rule && typeof rule === "object" && !Array.isArray(rule)) {
            const value = dynamicMapper(source, rule);

            if (Object.keys(value).length > 0) {
                result[key] = value;
            }
        }
    });

    return result;
}

function getValue(obj, path) {
    return path.split(".").reduce((acc, key) => acc?.[key], obj);
}
