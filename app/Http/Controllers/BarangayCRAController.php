<?php

namespace App\Http\Controllers;

use App\Models\Barangay;
use App\Models\CommunityRiskAssessment;
use App\Models\CRAProgress;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BarangayCRAController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $selectedYear = $request->query('year') ?? session('cra_year');

        if ($request->has('year')) {
            session(['cra_year' => $request->year]);
        }

        $barangays = Barangay::with([
            'craProgress.communityRiskAssessment'
        ])->get()
        ->map(function ($barangay) use ($selectedYear) {

            $progress = $barangay->craProgress;

            // 🔥 FILTER BY YEAR IF EXISTS
            if ($selectedYear) {
                $progress = $progress->filter(function ($p) use ($selectedYear) {
                    return optional($p->communityRiskAssessment)->year == $selectedYear;
                });
            }

            // 🔥 GET LATEST AFTER FILTER
            $latest = $progress
                ->sortByDesc('submitted_at')
                ->first();

            return [
                'id' => $barangay->id,
                'barangay_name' => $barangay->barangay_name,

                'progress_list' => $progress->values()->map(function ($p) {
                    return [
                        'id' => $p->id,
                        'percentage' => $p->percentage,
                        'submitted_at' => $p->submitted_at,
                        'year' => optional($p->communityRiskAssessment)->year,
                    ];
                }),

                'latest_progress' => $latest,
            ];
        });

        return Inertia::render('CDRRMO/BarangayCra/Index', [
            'barangays' => $barangays,
            'selectedYear' => $selectedYear,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $progress = CRAProgress::findOrFail($id);

        $cra = CommunityRiskAssessment::findOrFail($progress->cra_id);
        $barangay_id = $progress->barangay_id;

        $barangay = Barangay::with([
            'generalPopulation' => fn($q) => $q->where('cra_id', $cra->id),
            'populationGenders' => fn($q) => $q->where('cra_id', $cra->id),
            'populationAgeGroups' => fn($q) => $q->where('cra_id', $cra->id),
            'populationExposures' => fn($q) => $q->where('cra_id', $cra->id)->with('hazard'),
            'bdrrmcDirectories' => fn($q) => $q->where('cra_id', $cra->id),
            'bdrrmcTrainings' => fn($q) => $q->where('cra_id', $cra->id),

            'disasterOccurances' => fn($q) => $q->where('cra_id', $cra->id)->with([
                'agriDamages',
                'damages',
                'effectImpacts',
                'lifelines',
                'populationImpacts',
            ]),

            'disasterInventories' => fn($q) => $q->where('cra_id', $cra->id)->with('hazard'),
            'disasterRiskPopulations' => fn($q) => $q->where('cra_id', $cra->id)->with('hazard'),
            'primaryFacilities' => fn($q) => $q->where('cra_id', $cra->id),
            'infraFacilities' => fn($q) => $q->where('cra_id', $cra->id),
            'institutions' => fn($q) => $q->where('cra_id', $cra->id),
            'roadNetworks' => fn($q) => $q->where('cra_id', $cra->id),
            'publicTransportations' => fn($q) => $q->where('cra_id', $cra->id),
            'houseBuilds' => fn($q) => $q->where('cra_id', $cra->id),
            'houseOwnerships' => fn($q) => $q->where('cra_id', $cra->id),
            'householdServices' => fn($q) => $q->where('cra_id', $cra->id),
            'livelihoodStatistics' => fn($q) => $q->where('cra_id', $cra->id),
            'livelihoodEvacuationSites' => fn($q) => $q->where('cra_id', $cra->id),
            'reliefDistributions' => fn($q) => $q->where('cra_id', $cra->id),
            'reliefDistributionProcesses' => fn($q) => $q->where('cra_id', $cra->id),
            'equipmentInventories' => fn($q) => $q->where('cra_id', $cra->id),
            'evacuationCenters' => fn($q) => $q->where('cra_id', $cra->id),
            'evacuationInventories' => fn($q) => $q->where('cra_id', $cra->id),
            'evacuationPlans' => fn($q) => $q->where('cra_id', $cra->id),
            'familiesAtRisk' => fn($q) => $q->where('cra_id', $cra->id),
            'hazardRisks' => fn($q) => $q->where('cra_id', $cra->id)->with('hazard'),
            'assessmentMatrices' => fn($q) => $q->where('cra_id', $cra->id)->with('hazard'),
            'illnessesStats' => fn($q) => $q->where('cra_id', $cra->id),
            'disabilityStatistics' => fn($q) => $q->where('cra_id', $cra->id),
            'humanResources' => fn($q) => $q->where('cra_id', $cra->id),
            'affectedPlaces' => fn($q) => $q->where('cra_id', $cra->id)->with('hazard'),
            'prepositionedInventories' => fn($q) => $q->where('cra_id', $cra->id),
        ])->findOrFail($barangay_id);

        $data = $barangay->dataCollection();

        $result = [
            'progress' => [
                'id' => $progress->id,
                'barangay_id' => $progress->barangay_id,
                'cra_id' => $progress->cra_id,
                'percentage' => (float) $progress->percentage,
                'submitted_at' => $progress->submitted_at,
                'last_updated' => $progress->updated_at,
            ],
            'cra' => [
                'id' => $cra->id,
                'year' => $cra->year,
            ],
            'barangay' => $data['barangay'] ?? null,
            'population_genders' => $data['population_genders'] ?? [],
            'population_age_groups' => $data['population_age_groups'] ?? [],
            'population_exposures' => $data['population_exposures'] ?? [],
            'pwdDistribution' => $data['pwdDistribution'] ?? [],
            'bdrrmc_directory' => $data['bdrrmc_directory'] ?? [],
            'bdrrmc_trainings' => $data['bdrrmc_trainings'] ?? [],
            'disasters' => $data['disasters'] ?? [],
            'disaster_inventories' => $data['disaster_inventories'] ?? [],
            'disaster_per_purok' => $data['disaster_per_purok'] ?? [],
            'primary_facilities' => $data['primary_facilities'] ?? [],
            'infra_facilities' => $data['infra_facilities'] ?? [],
            'institutions' => $data['institutions'] ?? [],
            'road_networks' => $data['road_networks'] ?? [],
            'public_transportations' => $data['public_transportations'] ?? [],
            'house_builds' => $data['house_builds'] ?? [],
            'house_ownerships' => $data['house_ownerships'] ?? [],
            'household_services' => $data['household_services'] ?? [],
            'livelihood_statistics' => $data['livelihood_statistics'] ?? [],
            'livelihood_evacuation' => $data['livelihood_evacuation'] ?? [],
            'relief_distributions' => $data['relief_distributions'] ?? [],
            'relief_distribution_processes' => $data['relief_distribution_processes'] ?? [],
            'equipment_inventories' => $data['equipment_inventories'] ?? [],
            'evacuation_list' => $data['evacuation_list'] ?? [],
            'evacuation_center_inventory' => $data['evacuation_center_inventory'] ?? [],
            'evacuation_plans' => $data['evacuation_plans'] ?? [],
            'families_at_risk' => $data['families_at_risk'] ?? [],
            'hazard_risks' => $data['hazard_risks'] ?? [],
            'vulnerabilities' => $data['vulnerabilities'] ?? [],
            'risks' => $data['risks'] ?? [],
            'illnesses_stats' => $data['illnesses_stats'] ?? [],
            'disability_statistics' => $data['disability_statistics'] ?? [],
            'human_resources' => $data['human_resources'] ?? [],
            'affected_areas' => $data['affected_areas'] ?? [],
            'prepositioned_inventories' => $data['prepositioned_inventories'] ?? [],
        ];
        dd($result);
        return Inertia::render('BarangayOfficer/CRA/Show', [
            'data' => $result,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
