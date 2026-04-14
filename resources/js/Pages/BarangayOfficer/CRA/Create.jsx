import BreadCrumbsHeader from "@/Components/BreadcrumbsHeader";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, router, usePage } from "@inertiajs/react";
import { useState, useEffect, useMemo, useCallback } from "react";
import Stepper from "@/Components/Stepper";
import StepperController from "@/Components/StepperControler";
import { StepperContext } from "@/context/StepperContext";
import Population from "@/Components/CRAsteps/Population";
import { Toaster, toast } from "sonner";
import Hazard from "@/Components/CRAsteps/Step3/Hazard";
import Calamities from "@/Components/CRAsteps/Step2/Calamities";
import InventoryEvacuation from "@/Components/CRAsteps/Step4/InventoryEvacuation";
import DisasterReadiness from "@/Components/CRAsteps/Step5/DisasterReadiness";
import {
    defaultLivelihoods,
    defaultInfra,
    defaultBuildings,
    defaultFacilities,
} from "@/Components/CRAsteps/defaults";

// ADD THESE
import { dynamicMapper } from "@/services/dynamicMapper";
import { populationMapping } from "@/services/populationMapping";
import { livelihoodMapping } from "@/services/livelihoodMapping";
import { buildingFacilityMapping } from "@/services/buildingFacilityMapping";
import { institutionHumanMapping } from "@/services/institutionHumanMapping";
import { calamityMapping } from "@/services/calamityMapping";
import { hazardMapping } from "@/services/hazardMapping";
import { riskMapping } from "@/services/riskMapping";
import { exposureMapping } from "@/services/exposureMapping";
import { pwdMapping } from "@/services/pwdMapping";
import { familyRiskMapping } from "@/services/familyRiskMapping";
import { illnessesMapping } from "@/services/illnessesMapping";
import { disasterPerPurokMapping } from "@/services/disasterPerPurokMapping ";
import { disasterInventoryMapping } from "@/services/disasterInventoryMapping ";
import { evacuationListMapping } from "@/services/evacuationMapping";
import { evacuationCenterInventoryMapping } from "@/services/evacuationCenterInventoryMapping";
import { affectedAreasMapping } from "@/services/affectedAreasMapping";
import { livelihoodEvacuationMapping } from "@/services/livelihoodEvacuationMapping";
import { foodInventoryMapping } from "@/services/foodInventoryMapping";
import { reliefGoodsMapping } from "@/services/reliefGoodsMapping";
import { distributionProcessMapping } from "@/services/distributionProcessMapping";
import { trainingsInventoryMapping } from "@/services/trainingsInventoryMapping";
import { equipmentInventoryMapping } from "@/services/equipmentInventoryMapping";
import { bdrrmcDirectoryMapping } from "@/services/bdrrmcDirectoryMapping";
import { evacuationPlanMapping } from "@/services/evacuationPlanMapping";

function mapBackendCraToFrontend(serverData, selectedYear, defaults) {
    if (
        !serverData ||
        typeof serverData !== "object" ||
        Array.isArray(serverData)
    ) {
        return defaults;
    }

    return {
        ...defaults,

        // Step 1: A
        ...dynamicMapper(serverData, populationMapping),

        // Step B & C
        ...dynamicMapper(serverData, livelihoodMapping),

        // Step D & E
        ...dynamicMapper(serverData, buildingFacilityMapping),

        // Step F & G 🔥
        ...dynamicMapper(serverData, institutionHumanMapping),

        ...dynamicMapper(serverData, calamityMapping),
        ...dynamicMapper(serverData, hazardMapping),
        ...dynamicMapper(serverData, riskMapping),
        ...dynamicMapper(serverData, exposureMapping),
        ...dynamicMapper(serverData, pwdMapping),
        ...dynamicMapper(serverData, familyRiskMapping),
        ...dynamicMapper(serverData, illnessesMapping),
        ...dynamicMapper(serverData, disasterPerPurokMapping),
        ...dynamicMapper(serverData, disasterInventoryMapping),
        ...dynamicMapper(serverData, evacuationListMapping),
        ...dynamicMapper(serverData, evacuationCenterInventoryMapping),
        ...dynamicMapper(serverData, affectedAreasMapping),
        ...dynamicMapper(serverData, livelihoodEvacuationMapping),
        ...dynamicMapper(serverData, foodInventoryMapping),
        ...dynamicMapper(serverData, reliefGoodsMapping),
        ...dynamicMapper(serverData, distributionProcessMapping),
        ...dynamicMapper(serverData, trainingsInventoryMapping),
        ...dynamicMapper(serverData, equipmentInventoryMapping),
        ...dynamicMapper(serverData, bdrrmcDirectoryMapping),
        ...dynamicMapper(serverData, evacuationPlanMapping),

        year: serverData?.cra?.year ?? selectedYear,
    };
}

export default function Index({ progress, barangay_id }) {
    const breadcrumbs = [
        { label: "Community Risk Assessment (CRA)", showOnMobile: false },
    ];

    const { props } = usePage();
    const { success, error, craData: craDataFromServer } = props;
    console.log(craDataFromServer);
    const steps = useMemo(
        () => [
            "Barangay Resource Profile",
            "Community Disaster History",
            "Barangay Risk Assessment",
            "Inventory & Evacuations",
            "Disaster Readiness",
        ],
        [],
    );

    const yearFromUrl = useMemo(() => {
        if (typeof window === "undefined") return "default";
        return (
            new URLSearchParams(window.location.search).get("year") || "default"
        );
    }, []);

    const [currentStep, setCurrentStep] = useState(1);
    const [year, setYear] = useState(yearFromUrl);
    const [finalData, setFinalData] = useState([]);
    const [errors, setErrors] = useState({});

    const getDefaultCraData = useCallback(
        (selectedYear) => ({
            population: [],
            calamities: [],

            livelihood: (defaultLivelihoods ?? []).map((type) => ({
                type,
                male_no_dis: "",
                male_dis: "",
                female_no_dis: "",
                female_dis: "",
                lgbtq_no_dis: "",
                lgbtq_dis: "",
            })),

            infrastructure: defaultInfra ?? [],
            institutions: [],
            human_resources: [],
            hazards: [],
            evacuation: [],

            buildings: structuredClone(defaultBuildings),
            facilities: structuredClone(defaultFacilities),

            risks: [],
            vulnerabilities: [],
            exposure: [],
            pwd: [],
            illnesses: [],
            family_at_risk: [],
            disaster_per_purok: [],
            disaster_inventory: [],
            evacuation_list: [],
            evacuation_center_inventory: [],
            livelihood_evacuation: [],
            food_inventory: [],
            relief_goods: [],
            distribution_process: [],
            trainings_inventory: [],
            equipment_inventory: [],
            bdrrmc_directory: [],
            evacuation_plan: [],
            affected_areas: [],

            year: selectedYear,
        }),
        [],
    );

    const buildCraData = useCallback(
        (selectedYear, serverData) => {
            const defaults = getDefaultCraData(selectedYear);

            return mapBackendCraToFrontend(serverData, selectedYear, defaults);
        },
        [getDefaultCraData],
    );

    const [craData, setCraData] = useState(() =>
        buildCraData(yearFromUrl, craDataFromServer),
    );

    // useEffect(() => {
    //     if (!year) return;
    //     setCraData(buildCraData(year, craDataFromServer));
    // }, [year, craDataFromServer, buildCraData]);
    useEffect(() => {
        if (!year) return;

        if (craDataFromServer) {
            setCraData((prev) => {
                // only initialize from server if local data is still basically empty
                if (prev && Object.keys(prev).length > 0) return prev;
                return buildCraData(year, craDataFromServer);
            });
        }
    }, [year, craDataFromServer, buildCraData]);

    const displayStep = useCallback((step) => {
        switch (step) {
            case 1:
                return <Population />;
            case 2:
                return <Calamities />;
            case 3:
                return <Hazard />;
            case 4:
                return <InventoryEvacuation />;
            case 5:
                return <DisasterReadiness />;
            default:
                return null;
        }
    }, []);

    const handleClick = useCallback(
        (direction) => {
            if (direction === "next") {
                if (currentStep === steps.length) {
                    router.post(
                        route("cra.store"),
                        { ...craData, barangay_id },
                        {
                            preserveState: true,
                            preserveScroll: true,

                            onSuccess: () => {
                                toast.success("CRA submitted successfully!");
                            },

                            onError: (formErrors) => {
                                setErrors(formErrors);
                                console.error("Validation Errors:", formErrors);

                                Object.values(formErrors).forEach((msg) => {
                                    toast.error(msg);
                                });
                            },
                        },
                    );
                    return;
                }

                setCurrentStep((prev) => Math.min(prev + 1, steps.length));
                return;
            }

            setCurrentStep((prev) => Math.max(prev - 1, 1));
        },
        [currentStep, steps.length, craData, barangay_id],
    );

    const handlePrint = useCallback(() => {
        if (!year) {
            toast.error("Year not set for CRA.");
            return;
        }

        const url = route("cra.pdf", { id: year });
        window.open(url, "_blank");
    }, [year]);

    useEffect(() => {
        if (success) {
            toast.success(success, {
                description: "Your CRA has been successfully submitted!",
                duration: 3000,
                closeButton: true,
            });
        }
    }, [success]);

    useEffect(() => {
        if (error) {
            toast.error(error, {
                description: "Operation failed!",
                duration: 3000,
                closeButton: true,
            });
        }
    }, [error]);

    const stepperContextValue = useMemo(
        () => ({
            craData,
            setCraData,
            finalData,
            setFinalData,
            errors,
            setErrors,
            year,
            setYear,
        }),
        [craData, finalData, errors, year],
    );

    return (
        <AdminLayout>
            <Toaster richColors />
            <Head title="CRA" />
            <BreadCrumbsHeader breadcrumbs={breadcrumbs} />

            <div className="mx-auto mt-6 max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="mb-6 text-left">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">
                                Community Risk Assessment {year} (CRA)
                            </h1>
                            <p className="mt-1 text-gray-600">
                                Step-by-step process for evaluating barangay
                                resources, hazards, and disaster readiness
                            </p>
                        </div>

                        <div className="w-full rounded-lg border border-gray-200 bg-gray-50 p-3 shadow-sm sm:w-64">
                            <div className="mb-1 flex items-center justify-between">
                                <h2 className="text-xs font-medium text-gray-700">
                                    Overall Progress
                                </h2>
                                <span className="text-xs font-semibold text-gray-900">
                                    {progress?.percentage ?? 0}%
                                </span>
                            </div>

                            <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-200">
                                <div
                                    className="absolute top-0 left-0 h-full rounded-full transition-all duration-500 ease-in-out"
                                    style={{
                                        width: `${progress?.percentage ?? 0}%`,
                                        background:
                                            progress?.percentage >= 100
                                                ? "linear-gradient(to right, #16a34a, #22c55e)"
                                                : "linear-gradient(to right, #3b82f6, #60a5fa)",
                                    }}
                                />
                            </div>

                            <div className="mt-2 flex items-center justify-between gap-2">
                                <div className="mt-1 text-[10px] text-gray-600">
                                    <p>
                                        <span className="font-medium">
                                            Status:
                                        </span>{" "}
                                        {progress?.status ?? "Not started"}
                                    </p>
                                    {progress?.submitted_at && (
                                        <p className="text-gray-500">
                                            Submitted: {progress.submitted_at}
                                        </p>
                                    )}
                                    {progress?.last_updated && (
                                        <p className="text-gray-500">
                                            Updated: {progress.last_updated}
                                        </p>
                                    )}
                                </div>

                                <button
                                    onClick={handlePrint}
                                    className="whitespace-nowrap rounded bg-green-600 px-2 py-1 text-xs font-medium text-white hover:bg-green-700"
                                >
                                    Print CRA
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between rounded-t-xl bg-blue-100 px-2 py-2 shadow-lg sm:px-6 lg:px-8">
                    <Stepper
                        steps={steps}
                        currentStep={currentStep}
                        craData={craData}
                    />
                </div>

                <div className="overflow-hidden rounded-b-xl border border-gray-200 bg-white p-2 drop-shadow-[0_4px_6px_rgba(0,0,0,0.1)]">
                    <div className="my-2 pb-5 pr-5 pl-5 pt-0">
                        <StepperContext.Provider value={stepperContextValue}>
                            {displayStep(currentStep)}
                        </StepperContext.Provider>
                    </div>
                </div>

                <div className="mt-5">
                    <StepperController
                        handleClick={handleClick}
                        currentStep={currentStep}
                        steps={steps}
                        craData={craData}
                    />
                </div>
            </div>
        </AdminLayout>
    );
}
