function mapTrainingStatus(status = "") {
    if (status === "checked") return "yes";
    if (status === "cross") return "no";
    return "";
}

export const trainingsInventoryMapping = {
    trainings_inventory: (src) =>
        Array.isArray(src.bdrrmc_trainings)
            ? src.bdrrmc_trainings.map((item) => ({
                  title: item.title ?? "",
                  applies: mapTrainingStatus(item.status),
                  duration: item.duration ?? "",
                  agency: item.agency ?? "",
                  dates: item.inclusive_dates ?? "",
                  participants: item.number_of_participants ?? "",
                  names: item.participants ?? "",
              }))
            : [],
};
