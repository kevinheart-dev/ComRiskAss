// defaults.js

export const defaultLivelihoods = [
    "Farming", "Fishing", "Poultry and Livestock", "Carpentry",
    "Professional", "Government Employee", "Private Employee",
    "Brgy. Official or Staff", "Businessman/woman",
    "Formal/Licensed Driver", "Non-Licensed Driver", "Porter",
    "Masseuse", "House Helper", "Electrician", "Laborer",
    "Miner", "Lender", "Call Center Agent", "Medical Transcriptionist",
    "Virtual Assistant",
];

export const defaultInfra = [
    {
        category: "Electricity Source",
        rows: [
            { type: "Distribution Company (ISELCO-II)", households: "" },
            { type: "Generator", households: "" },
            { type: "Solar (renewable energy source)", households: "" },
            { type: "Battery", households: "" },
            { type: "None", households: "" },
        ],
    },
    {
        category: "Bath and Wash Area",
        rows: [
            { type: "With own Sink and Bath", households: "" },
            { type: "Shared or Communal", households: "" },
            { type: "Separate Bathroom", households: "" },
        ],
    },
    {
        category: "Water Source",
        rows: [
            { type: "Level II Water System", households: "" },
            { type: "Level III Water System", households: "" },
            { type: "Deep Well (Level I)", households: "" },
            { type: "Artesian Well (Level I)", households: "" },
            { type: "Shallow Well (Level I)", households: "" },
            { type: "Commercial Water Refill Source", households: "" },
        ],
    },
    {
        category: "Waste Management",
        rows: [
            { type: "Open Dump Site", households: "" },
            { type: "Sanitary Landfill", households: "" },
            { type: "Compost Pits", households: "" },
            { type: "Material Recovery Facility (MRF)", households: "" },
            { type: "Garbage is collected", households: "" },
        ],
    },
    {
        category: "Toilet",
        rows: [
            { type: "Water Sealed", households: "" },
            { type: "Compost Pit Toilet", households: "" },
            { type: "Shared or Communal Toilet/Public Toilet", households: "" },
            { type: "No Latrine", households: "" },
            { type: "Flash Toilet", households: "" },
        ],
    },
];

export const defaultFacilities = [
    {
        category: "Facilities and Services",
        rows: [
            { type: "Multi-Purposes Hall", quantity: "" },
            { type: "Barangay Women and Chidren Protection Desk", quantity: "" },
            { type: "Barangay Tanonds and Barangay Peacekeeping Action Teams Post", quantity: "" },
            { type: "Bureau of Jail Management and Penology", quantity: "" },
            { type: "Philippine National Police Outpost", quantity: "" },
            { type: "Bank", quantity: "" },
            { type: "Post Office", quantity: "" },
            { type: "Market", quantity: "" },
        ],
    },
    {
        category: "Public Transportation",
        rows: [
            { type: "Bus", quantity: "" },
            { type: "Taxi", quantity: "" },
            { type: "Van/FX", quantity: "" },
            { type: "Jeepney", quantity: "" },
            { type: "Tricyle", quantity: "" },
            { type: "Pedicab", quantity: "" },
            { type: "Boat", quantity: "" },
        ],
    },
    {
        category: "Road Types",
        rows: [
            { type: "Concrete", length: "", maintained_by: "" },
            { type: "Asphalt", length: "", maintained_by: "" },
            { type: "Gravel", length: "", maintained_by: "" },
            { type: "Natural Earth Surface", length: "", maintained_by: "" },

        ],
    },

];


export const defaultBuildings = [
    {
        category: "Health and Medical Facilities",
        rows: [
            { type: "Evacuation Center", households: "" },
            { type: "Flood Control", households: "" },
            { type: "Rain Water Harvester (Communal)", households: "" },
            { type: "Barangay Disaster Operation Center", households: "" },
            { type: "Public Comfort Room/Toilet", households: "" },
            { type: "Community Garden", households: "" },
            { type: "Barangay Health Center", households: "" },
            { type: "Hospital", households: "" },
            { type: "Maternity Clinic", households: "" },
            { type: "Barangay Drug Store", households: "" },
            { type: "City/Municipal Public Drug Store", households: "" },
            { type: "Private Drug Store", households: "" },
            { type: "Quarantine/Isolation Facility", households: "" },
        ],
    },
    {
        category: "Education Facilities",
        rows: [
            { type: "Child Development Center", households: "" },
            { type: "Preschool", households: "" },
            { type: "Elementary", households: "" },
            { type: "Secondary", households: "" },
            { type: "Vocational", households: "" },
            { type: "College/University", households: "" },
            { type: "Islamic School", households: "" },
        ],
    },
    {
        category: "Agricultural Facilities",
        rows: [
            { type: "Rice Mill", households: "" },
            { type: "Corn Mill", households: "" },
            { type: "Feed Mill", households: "" },
            { type: "Agriculture Produce Market", households: "" },
        ],
    },
];

// default of TrainigsInventory.jsx
export const defaultTrainingTitles = [
    "Training on RA 10121 (Philippine Disaster Risk Reduction and Management Act)",
    "Training on RA 10821 (Children’s Emergency Relief and Protection Act)",
    "Training on Child Protection in Emergencies",
    "Training on Pre- Disaster Risk Assessment",
    "Training on the Protocol for Management of the Dead and Missing",
    "Training on Camp Management",
    "Training on Incident Command System",
    "Training on Psychological First Aid",
    "First Aid at Basic Life Support Training",
    "Basic Search and Rescue Training",
    "Training on Psychological First Aid",
    "Training on Mental Health and Psychosocial Support",
    "Community-Based Reduction and Management (CBDRRM) Training",
    "Mental Health and Psychosocial Support (MHPSS) Training",
    "Training on the Conduct of Simulation/Drills for Priority Hazards",
    "Training on Rapid Damage Assessment and Needs Analysis (RDANA)",
    "Training on Minimum Health Protocols",
    "Training on Contact Tracing and Reporting",
    "Training on Public Service Continuity",
    "Training on Basic Disease Surveillance and Reporting",
    "QAS for BDRRM and Committee training workshop",
];
