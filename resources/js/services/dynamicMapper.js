export function dynamicMapper(source = {}, config = {}) {
    const result = {};

    Object.entries(config).forEach(([key, rule]) => {
        if (typeof rule === "string") {
            result[key] = getValue(source, rule);
        } else if (typeof rule === "function") {
            result[key] = rule(source);
        } else if (rule && typeof rule === "object" && !Array.isArray(rule)) {
            result[key] = dynamicMapper(source, rule);
        }
    });

    return result;
}

function getValue(obj, path) {
    return path.split(".").reduce((acc, key) => acc?.[key], obj);
}
