// static clinical database for the Educational Microbiology Sandbox

export const PATHOGENS = {
  "gram_negative_bacilli": {
    name: "Gram-Negative Bacilli",
    bugs: {
      "escherichia_coli": "Escherichia coli",
      "klebsiella_pneumoniae": "Klebsiella pneumoniae",
      "pseudomonas_aeruginosa": "Pseudomonas aeruginosa",
      "haemophilus_influenzae": "Haemophilus influenzae",
      "enterobacter_cloacae": "Enterobacter cloacae",
      "proteus_mirabilis": "Proteus mirabilis"
    }
  },
  "gram_positive_cocci": {
    name: "Gram-Positive Cocci",
    bugs: {
      "streptococcus_pneumoniae": "Streptococcus pneumoniae",
      "staphylococcus_aureus_mssa": "Staphylococcus aureus (MSSA)",
      "staphylococcus_aureus_mrsa": "Staphylococcus aureus (MRSA)",
      "streptococcus_pyogenes": "Streptococcus pyogenes (Group A)",
      "enterococcus_faecalis": "Enterococcus faecalis",
      "enterococcus_faecium": "Enterococcus faecium (incl. VRE)"
    }
  },
  "anaerobes": {
    name: "Anaerobes",
    bugs: {
      "bacteroides_fragilis": "Bacteroides fragilis",
      "clostridium_perfringens": "Clostridium perfringens",
      "peptostreptococcus_spp": "Peptostreptococcus spp."
    }
  },
  "atypicals": {
    name: "Atypical Pathogens",
    bugs: {
      "mycoplasma_pneumoniae": "Mycoplasma pneumoniae",
      "chlamydophila_pneumoniae": "Chlamydophila pneumoniae",
      "legionella_pneumophila": "Legionella pneumophila"
    }
  }
};

export const SYNDROMES = {
  "cap": {
    name: "Community-Acquired Pneumonia (CAP)",
    site: "Respiratory",
    description: "Acute infection of the lung parenchyma acquired outside the hospital setting.",
    expectedPathogens: [
      "streptococcus_pneumoniae",
      "haemophilus_influenzae",
      "mycoplasma_pneumoniae",
      "chlamydophila_pneumoniae",
      "legionella_pneumophila",
      "staphylococcus_aureus_mssa"
    ]
  },
  "hap": {
    name: "Hospital-Acquired Pneumonia (HAP)",
    site: "Respiratory",
    description: "Pneumonia developing >= 48 hours after hospital admission, frequently involving multidrug-resistant pathogens.",
    expectedPathogens: [
      "pseudomonas_aeruginosa",
      "escherichia_coli",
      "klebsiella_pneumoniae",
      "staphylococcus_aureus_mssa",
      "staphylococcus_aureus_mrsa",
      "streptococcus_pneumoniae",
      "enterobacter_cloacae"
    ]
  },
  "uti_cystitis": {
    name: "Acute Uncomplicated Cystitis",
    site: "Urinary",
    description: "Lower urinary tract infection limited to the bladder, typically in healthy adult females.",
    expectedPathogens: [
      "escherichia_coli",
      "klebsiella_pneumoniae",
      "proteus_mirabilis",
      "enterococcus_faecalis"
    ]
  },
  "uti_pyelonephritis": {
    name: "Acute Pyelonephritis / Complicated UTI",
    site: "Urinary",
    description: "Upper urinary tract infection involving the renal parenchyma, pelvis, or complicated by urinary tract obstructions.",
    expectedPathogens: [
      "escherichia_coli",
      "klebsiella_pneumoniae",
      "proteus_mirabilis",
      "pseudomonas_aeruginosa",
      "enterococcus_faecalis",
      "enterobacter_cloacae"
    ]
  },
  "cellulitis": {
    name: "Cellulitis / Skin & Soft Tissue Infection",
    site: "Skin/Soft Tissue",
    description: "Acute bacterial infection of the deep dermis and subcutaneous tissue.",
    expectedPathogens: [
      "streptococcus_pyogenes",
      "staphylococcus_aureus_mssa",
      "staphylococcus_aureus_mrsa"
    ]
  },
  "meningitis": {
    name: "Acute Bacterial Meningitis",
    site: "CNS",
    description: "Medical emergency involving inflammation of the meninges surrounding the brain and spinal cord.",
    expectedPathogens: [
      "streptococcus_pneumoniae",
      "haemophilus_influenzae"
    ]
  },
  "intra_abdominal": {
    name: "Intra-abdominal Infection (Peritonitis / Abscess)",
    site: "Abdominal",
    description: "Infections involving visceral organs or the peritoneal cavity, usually polymicrobial.",
    expectedPathogens: [
      "escherichia_coli",
      "klebsiella_pneumoniae",
      "bacteroides_fragilis",
      "enterococcus_faecalis",
      "peptostreptococcus_spp"
    ]
  }
};

export const ANTIBIOTICS = {
  "amoxicillin": {
    name: "Amoxicillin",
    class: "Penicillin (Narrow)",
    spectrumScore: 3,
    standardDose: "500mg PO/IV Q8h",
    renalAdjustments: [],
    pkTraps: {},
    comments: "Primarily used for Streptococcus and sensitive Enterococcus. Susceptible to beta-lactamases."
  },
  "flucloxacillin": {
    name: "Flucloxacillin",
    class: "Penicillin (Narrow - Antistaphylococcal)",
    spectrumScore: 2,
    standardDose: "500mg-1g PO Q6h or 1-2g IV Q6h",
    renalAdjustments: [],
    pkTraps: {},
    comments: "First-line UK choice for skin/soft tissue infections. Resistant to staphylococcal beta-lactamases."
  },
  "co_amoxiclav": {
    name: "Co-amoxiclav (Amoxicillin/Clavulanate)",
    class: "Penicillin + Beta-Lactamase Inhibitor",
    spectrumScore: 5,
    standardDose: "1.2g IV Q8h or 625mg PO Q8h",
    renalAdjustments: [
      { maxCrCl: 30, minCrCl: 10, recommendedDose: "1.2g IV Q12h or 625mg PO Q12h" },
      { maxCrCl: 9, minCrCl: 0, recommendedDose: "1.2g IV Q24h or 375mg PO Q12h" }
    ],
    pkTraps: {},
    comments: "Clavulanate addition restores activity against MSSA and beta-lactamase-producing Gram-negatives. No Pseudomonas coverage."
  },
  "piperacillin_tazobactam": {
    name: "Piperacillin/Tazobactam (Tazocin)",
    class: "Antipseudomonal Penicillin + BLI",
    spectrumScore: 8,
    standardDose: "4.5g IV Q8h",
    renalAdjustments: [
      { maxCrCl: 40, minCrCl: 20, recommendedDose: "4.5g IV Q12h" },
      { maxCrCl: 19, minCrCl: 0, recommendedDose: "2.25g IV Q8h" }
    ],
    pkTraps: {},
    comments: "Broad empirical agent covering Pseudomonas, Gram-negatives, and anaerobes. Essential for neutropenic sepsis and severe hospital infections."
  },
  "ceftriaxone": {
    name: "Ceftriaxone",
    class: "3rd Gen Cephalosporin",
    spectrumScore: 6,
    standardDose: "2g IV Q24h",
    renalAdjustments: [], // None required! Dual clearance
    pkTraps: {},
    comments: "Excellent CNS and lung penetration. Cleared via biliary and renal routes, requiring **no renal dosing adjustment** (a notable clinical benefit). Zero Pseudomonas coverage."
  },
  "ceftazidime": {
    name: "Ceftazidime",
    class: "3rd Gen Cephalosporin (Antipseudomonal)",
    spectrumScore: 7,
    standardDose: "2g IV Q8h",
    renalAdjustments: [
      { maxCrCl: 50, minCrCl: 31, recommendedDose: "1g IV Q8h" },
      { maxCrCl: 30, minCrCl: 16, recommendedDose: "1g IV Q12h" },
      { maxCrCl: 15, minCrCl: 6, recommendedDose: "500mg IV Q12h" },
      { maxCrCl: 5, minCrCl: 0, recommendedDose: "500mg IV Q24h" }
    ],
    pkTraps: {},
    comments: "Cephalosporin specifically chosen for Pseudomonas coverage. Lacks anaerobic and Gram-positive coverage compared to Ceftriaxone."
  },
  "meropenem": {
    name: "Meropenem",
    class: "Carbapenem",
    spectrumScore: 9,
    standardDose: "1g IV Q8h",
    renalAdjustments: [
      { maxCrCl: 50, minCrCl: 26, recommendedDose: "1g IV Q12h" },
      { maxCrCl: 25, minCrCl: 10, recommendedDose: "500mg IV Q12h" },
      { maxCrCl: 9, minCrCl: 0, recommendedDose: "500mg IV Q24h" }
    ],
    pkTraps: {},
    comments: "Ultra-broad carbapenem covering Pseudomonas, anaerobes, and ESBL-producing Gram-negatives. Reserved to prevent carbapenem resistance."
  },
  "gentamicin": {
    name: "Gentamicin",
    class: "Aminoglycoside",
    spectrumScore: 6,
    standardDose: "5mg/kg IV Q24h",
    renalAdjustments: [
      { maxCrCl: 60, minCrCl: 40, recommendedDose: "5mg/kg IV Q36h" },
      { maxCrCl: 39, minCrCl: 20, recommendedDose: "5mg/kg IV Q48h" },
      { maxCrCl: 19, minCrCl: 0, recommendedDose: "Requires individualized therapeutic drug monitoring (TDM)" }
    ],
    pkTraps: {
      "meningitis": "Gentamicin has extremely poor cerebrospinal fluid (CSF) penetration and should not be used as monotherapy for bacterial meningitis."
    },
    comments: "Highly effective for Gram-negative sepsis, but associated with high risks of **nephrotoxicity** and **ototoxicity**. Demands therapeutic drug monitoring (TDM)."
  },
  "ciprofloxacin": {
    name: "Ciprofloxacin",
    class: "Fluoroquinolone",
    spectrumScore: 6,
    standardDose: "400mg IV Q12h or 500mg PO Q12h",
    renalAdjustments: [
      { maxCrCl: 30, minCrCl: 0, recommendedDose: "400mg IV Q24h or 250-500mg PO Q24h" }
    ],
    pkTraps: {},
    comments: "Excellent oral bioavailability. High tissue penetration, but use is restricted due to risk of tendonitis, aortic aneurysm, QTc prolongation, and C. difficile induction."
  },
  "clarithromycin": {
    name: "Clarithromycin",
    class: "Macrolide",
    spectrumScore: 4,
    standardDose: "500mg PO/IV Q12h",
    renalAdjustments: [
      { maxCrCl: 30, minCrCl: 0, recommendedDose: "250mg PO/IV Q12h or 500mg Q24h" }
    ],
    pkTraps: {},
    comments: "Frequently used to target 'atypical' respiratory pathogens (Mycoplasma, Chlamydia, Legionella) that lack a cell wall and are resistant to beta-lactams."
  },
  "daptomycin": {
    name: "Daptomycin",
    class: "Lipopeptide",
    spectrumScore: 5,
    standardDose: "6mg/kg IV Q24h",
    renalAdjustments: [
      { maxCrCl: 29, minCrCl: 0, recommendedDose: "6mg/kg IV Q48h" }
    ],
    pkTraps: {
      "cap": "Daptomycin is inactivated by pulmonary surfactant and must not be used to treat pneumonia (CAP/HAP).",
      "hap": "Daptomycin is inactivated by pulmonary surfactant and must not be used to treat pneumonia (CAP/HAP)."
    },
    comments: "Active against Gram-positives (including MRSA and VRE). Cannot be used in lung infections due to surfactant binding."
  },
  "vancomycin": {
    name: "Vancomycin",
    class: "Glycopeptide",
    spectrumScore: 4,
    standardDose: "15mg/kg IV Q12h",
    renalAdjustments: [
      { maxCrCl: 49, minCrCl: 30, recommendedDose: "15mg/kg IV Q24h" },
      { maxCrCl: 29, minCrCl: 15, recommendedDose: "15mg/kg IV Q48h" },
      { maxCrCl: 14, minCrCl: 0, recommendedDose: "Dose-by-level based on therapeutic drug monitoring (TDM)" }
    ],
    pkTraps: {},
    comments: "Standard treatment for severe Gram-positive infections including MRSA. Glycopeptides do not cover Gram-negatives. Requires serum trough monitoring to prevent renal toxicity."
  },
  "metronidazole": {
    name: "Metronidazole",
    class: "Nitroimidazole",
    spectrumScore: 3,
    standardDose: "400mg PO Q8h or 500mg IV Q8h",
    renalAdjustments: [],
    pkTraps: {},
    comments: "Highly effective anaerobe coverage. Commonly paired with beta-lactams (e.g., Ceftriaxone) for mixed intra-abdominal or pelvic infections."
  },
  "nitrofurantoin": {
    name: "Nitrofurantoin",
    class: "Nitrofuran",
    spectrumScore: 2,
    standardDose: "100mg PO Q12h",
    renalAdjustments: [
      { maxCrCl: 44, minCrCl: 30, recommendedDose: "Caution: eGFR/CrCl 30-44 ml/min. Use only if other options are unsuitable, as urinary concentration (and therefore efficacy) is reduced." },
      { maxCrCl: 29, minCrCl: 0, recommendedDose: "CONTRAINDICATED: Nitrofurantoin is ineffective when CrCl < 30 ml/min due to inadequate drug accumulation in the urine." }
    ],
    pkTraps: {
      "uti_pyelonephritis": "Nitrofurantoin concentrates strictly in the urine and achieves very poor tissue penetration in the kidneys; it is **ineffective** for upper UTIs (pyelonephritis) or systemic sepsis."
    },
    comments: "Indicated solely for lower urinary tract infections (cystitis). Low resistance rates because it attacks multiple bacterial systems simultaneously."
  }
};

export const SPECTRUM = {
  // Key: Antibiotic ID, Value: Map of Pathogen ID -> Coverage Code (2 = Covered, 1 = Partial, 0 = Not Covered)
  "amoxicillin": {
    "escherichia_coli": 1, // Susceptible wild-type, but high rates of acquired resistance (BLI needed)
    "klebsiella_pneumoniae": 0, // Intrinisically resistant
    "pseudomonas_aeruginosa": 0,
    "haemophilus_influenzae": 2,
    "enterobacter_cloacae": 0,
    "proteus_mirabilis": 2,
    "streptococcus_pneumoniae": 2,
    "staphylococcus_aureus_mssa": 0,
    "staphylococcus_aureus_mrsa": 0,
    "streptococcus_pyogenes": 2,
    "enterococcus_faecalis": 2,
    "enterococcus_faecium": 0,
    "bacteroides_fragilis": 0,
    "clostridium_perfringens": 2,
    "peptostreptococcus_spp": 2,
    "mycoplasma_pneumoniae": 0,
    "chlamydophila_pneumoniae": 0,
    "legionella_pneumophila": 0
  },
  "flucloxacillin": {
    "escherichia_coli": 0,
    "klebsiella_pneumoniae": 0,
    "pseudomonas_aeruginosa": 0,
    "haemophilus_influenzae": 0,
    "enterobacter_cloacae": 0,
    "proteus_mirabilis": 0,
    "streptococcus_pneumoniae": 2,
    "staphylococcus_aureus_mssa": 2,
    "staphylococcus_aureus_mrsa": 0,
    "streptococcus_pyogenes": 2,
    "enterococcus_faecalis": 0,
    "enterococcus_faecium": 0,
    "bacteroides_fragilis": 0,
    "clostridium_perfringens": 1,
    "peptostreptococcus_spp": 2,
    "mycoplasma_pneumoniae": 0,
    "chlamydophila_pneumoniae": 0,
    "legionella_pneumophila": 0
  },
  "co_amoxiclav": {
    "escherichia_coli": 2,
    "klebsiella_pneumoniae": 2,
    "pseudomonas_aeruginosa": 0,
    "haemophilus_influenzae": 2,
    "enterobacter_cloacae": 0, // AmpC inducible risk
    "proteus_mirabilis": 2,
    "streptococcus_pneumoniae": 2,
    "staphylococcus_aureus_mssa": 2,
    "staphylococcus_aureus_mrsa": 0,
    "streptococcus_pyogenes": 2,
    "enterococcus_faecalis": 2,
    "enterococcus_faecium": 0,
    "bacteroides_fragilis": 2,
    "clostridium_perfringens": 2,
    "peptostreptococcus_spp": 2,
    "mycoplasma_pneumoniae": 0,
    "chlamydophila_pneumoniae": 0,
    "legionella_pneumophila": 0
  },
  "piperacillin_tazobactam": {
    "escherichia_coli": 2,
    "klebsiella_pneumoniae": 2,
    "pseudomonas_aeruginosa": 2,
    "haemophilus_influenzae": 2,
    "enterobacter_cloacae": 1, // Can induce AmpC resistance during therapy
    "proteus_mirabilis": 2,
    "streptococcus_pneumoniae": 2,
    "staphylococcus_aureus_mssa": 2,
    "staphylococcus_aureus_mrsa": 0,
    "streptococcus_pyogenes": 2,
    "enterococcus_faecalis": 2,
    "enterococcus_faecium": 0,
    "bacteroides_fragilis": 2,
    "clostridium_perfringens": 2,
    "peptostreptococcus_spp": 2,
    "mycoplasma_pneumoniae": 0,
    "chlamydophila_pneumoniae": 0,
    "legionella_pneumophila": 0
  },
  "ceftriaxone": {
    "escherichia_coli": 2,
    "klebsiella_pneumoniae": 2,
    "pseudomonas_aeruginosa": 0,
    "haemophilus_influenzae": 2,
    "enterobacter_cloacae": 1, // High risk of selecting for derepressed AmpC mutants
    "proteus_mirabilis": 2,
    "streptococcus_pneumoniae": 2,
    "staphylococcus_aureus_mssa": 2,
    "staphylococcus_aureus_mrsa": 0,
    "streptococcus_pyogenes": 2,
    "enterococcus_faecalis": 0,
    "enterococcus_faecium": 0,
    "bacteroides_fragilis": 0,
    "clostridium_perfringens": 2,
    "peptostreptococcus_spp": 2,
    "mycoplasma_pneumoniae": 0,
    "chlamydophila_pneumoniae": 0,
    "legionella_pneumophila": 0
  },
  "ceftazidime": {
    "escherichia_coli": 2,
    "klebsiella_pneumoniae": 2,
    "pseudomonas_aeruginosa": 2,
    "haemophilus_influenzae": 2,
    "enterobacter_cloacae": 1,
    "proteus_mirabilis": 2,
    "streptococcus_pneumoniae": 1, // Poor gram-positive coverage compared to ceftriaxone
    "staphylococcus_aureus_mssa": 1, // Very weak MSSA activity
    "staphylococcus_aureus_mrsa": 0,
    "streptococcus_pyogenes": 1,
    "enterococcus_faecalis": 0,
    "enterococcus_faecium": 0,
    "bacteroides_fragilis": 0,
    "clostridium_perfringens": 0,
    "peptostreptococcus_spp": 0,
    "mycoplasma_pneumoniae": 0,
    "chlamydophila_pneumoniae": 0,
    "legionella_pneumophila": 0
  },
  "meropenem": {
    "escherichia_coli": 2,
    "klebsiella_pneumoniae": 2,
    "pseudomonas_aeruginosa": 2,
    "haemophilus_influenzae": 2,
    "enterobacter_cloacae": 2,
    "proteus_mirabilis": 2,
    "streptococcus_pneumoniae": 2,
    "staphylococcus_aureus_mssa": 2,
    "staphylococcus_aureus_mrsa": 0,
    "streptococcus_pyogenes": 2,
    "enterococcus_faecalis": 1, // Active against E. faecalis but usually requires synergy
    "enterococcus_faecium": 0,
    "bacteroides_fragilis": 2,
    "clostridium_perfringens": 2,
    "peptostreptococcus_spp": 2,
    "mycoplasma_pneumoniae": 0,
    "chlamydophila_pneumoniae": 0,
    "legionella_pneumophila": 0
  },
  "gentamicin": {
    "escherichia_coli": 2,
    "klebsiella_pneumoniae": 2,
    "pseudomonas_aeruginosa": 2,
    "haemophilus_influenzae": 2,
    "enterobacter_cloacae": 2,
    "proteus_mirabilis": 2,
    "streptococcus_pneumoniae": 0,
    "staphylococcus_aureus_mssa": 1, // Synergistic only, not used as monotherapy
    "staphylococcus_aureus_mrsa": 0,
    "streptococcus_pyogenes": 0,
    "enterococcus_faecalis": 1, // Synergistic only
    "enterococcus_faecium": 0,
    "bacteroides_fragilis": 0,
    "clostridium_perfringens": 0,
    "peptostreptococcus_spp": 0,
    "mycoplasma_pneumoniae": 0,
    "chlamydophila_pneumoniae": 0,
    "legionella_pneumophila": 0
  },
  "ciprofloxacin": {
    "escherichia_coli": 2,
    "klebsiella_pneumoniae": 2,
    "pseudomonas_aeruginosa": 2,
    "haemophilus_influenzae": 2,
    "enterobacter_cloacae": 2,
    "proteus_mirabilis": 2,
    "streptococcus_pneumoniae": 1, // Low activity
    "staphylococcus_aureus_mssa": 1,
    "staphylococcus_aureus_mrsa": 0,
    "streptococcus_pyogenes": 0,
    "enterococcus_faecalis": 0,
    "enterococcus_faecium": 0,
    "bacteroides_fragilis": 0,
    "clostridium_perfringens": 0,
    "peptostreptococcus_spp": 0,
    "mycoplasma_pneumoniae": 2,
    "chlamydophila_pneumoniae": 2,
    "legionella_pneumophila": 2
  },
  "clarithromycin": {
    "escherichia_coli": 0,
    "klebsiella_pneumoniae": 0,
    "pseudomonas_aeruginosa": 0,
    "haemophilus_influenzae": 1,
    "enterobacter_cloacae": 0,
    "proteus_mirabilis": 0,
    "streptococcus_pneumoniae": 2, // High resistance rates now
    "staphylococcus_aureus_mssa": 2,
    "staphylococcus_aureus_mrsa": 0,
    "streptococcus_pyogenes": 2,
    "enterococcus_faecalis": 0,
    "enterococcus_faecium": 0,
    "bacteroides_fragilis": 0,
    "clostridium_perfringens": 1,
    "peptostreptococcus_spp": 1,
    "mycoplasma_pneumoniae": 2,
    "chlamydophila_pneumoniae": 2,
    "legionella_pneumophila": 2
  },
  "daptomycin": {
    "escherichia_coli": 0,
    "klebsiella_pneumoniae": 0,
    "pseudomonas_aeruginosa": 0,
    "haemophilus_influenzae": 0,
    "enterobacter_cloacae": 0,
    "proteus_mirabilis": 0,
    "streptococcus_pneumoniae": 2,
    "staphylococcus_aureus_mssa": 2,
    "staphylococcus_aureus_mrsa": 2,
    "streptococcus_pyogenes": 2,
    "enterococcus_faecalis": 2,
    "enterococcus_faecium": 2
  },
  "vancomycin": {
    "escherichia_coli": 0,
    "klebsiella_pneumoniae": 0,
    "pseudomonas_aeruginosa": 0,
    "haemophilus_influenzae": 0,
    "enterobacter_cloacae": 0,
    "proteus_mirabilis": 0,
    "streptococcus_pneumoniae": 2,
    "staphylococcus_aureus_mssa": 2,
    "staphylococcus_aureus_mrsa": 2,
    "streptococcus_pyogenes": 2,
    "enterococcus_faecalis": 2,
    "enterococcus_faecium": 1 // Susceptible unless VanA/VanB phenotype (VRE)
  },
  "metronidazole": {
    "escherichia_coli": 0,
    "klebsiella_pneumoniae": 0,
    "pseudomonas_aeruginosa": 0,
    "haemophilus_influenzae": 0,
    "enterobacter_cloacae": 0,
    "proteus_mirabilis": 0,
    "streptococcus_pneumoniae": 0,
    "staphylococcus_aureus_mssa": 0,
    "staphylococcus_aureus_mrsa": 0,
    "streptococcus_pyogenes": 0,
    "enterococcus_faecalis": 0,
    "enterococcus_faecium": 0,
    "bacteroides_fragilis": 2,
    "clostridium_perfringens": 2,
    "peptostreptococcus_spp": 2,
    "mycoplasma_pneumoniae": 0,
    "chlamydophila_pneumoniae": 0,
    "legionella_pneumophila": 0
  },
  "nitrofurantoin": {
    "escherichia_coli": 2,
    "klebsiella_pneumoniae": 2, // High susceptibilities still
    "pseudomonas_aeruginosa": 0,
    "haemophilus_influenzae": 0,
    "enterobacter_cloacae": 1,
    "proteus_mirabilis": 0, // Intrinsically resistant
    "streptococcus_pneumoniae": 0,
    "staphylococcus_aureus_mssa": 2,
    "staphylococcus_aureus_mrsa": 0,
    "streptococcus_pyogenes": 0,
    "enterococcus_faecalis": 2,
    "enterococcus_faecium": 1
  }
};

export const GUIDELINES = {
  "cap": {
    nice: "NICE Guideline NG138 (Pneumonia - Community-Acquired):\n- **Non-severe CAP:** First-line is **Amoxicillin** 500mg TDS PO (typically 5 days). Alternative if penicillin-allergic is Doxycycline or Clarithromycin.\n- **Moderate-to-Severe CAP:** First-line is **Amoxicillin** 500mg TDS PO + **Clarithromycin** 500mg BD PO, OR **Co-amoxiclav** 1.2g TDS IV + **Clarithromycin** 500mg BD IV (for severe).",
    smi: "UK SMI ID 9 (Infections of the Thoracic Cavity):\n- Sputum culture and blood cultures recommended for all severe or hospitalized pneumonias.\n- Target pathogens: Strep pneumoniae, Haemophilus, atypicals, and Legionella (urine antigen assay)."
  },
  "hap": {
    nice: "NICE Guideline NG139 (Pneumonia - Hospital-Acquired):\n- **Non-severe HAP (no risk of MDR):** First-line is **Co-amoxiclav** 500/125mg TDS PO or 1.2g TDS IV (typically 5 days).\n- **Severe HAP or high risk of Pseudomonas/MDR:** First-line is **Piperacillin/Tazobactam** (Tazocin) 4.5g TDS IV, or **Ceftazidime** 2g TDS IV. If MRSA suspected, add **Vancomycin**.",
    smi: "UK SMI ID 9 (Infections of the Thoracic Cavity):\n- Empirical treatment should always cover *Pseudomonas aeruginosa* and *Staphylococcus aureus* in late-onset or ventilator-associated cases."
  },
  "uti_cystitis": {
    nice: "NICE Guideline NG109 (Urinary Tract Infection - Lower):\n- **Uncomplicated Cystitis (Females):** First-line is **Nitrofurantoin** 100mg MR BD PO (3 days) OR Trimethoprim 200mg BD PO (3 days).\n- **Second-line:** Pivmecillinam 400mg initial dose then 200mg TDS PO, or Fosfomycin 3g single dose sachet.",
    smi: "UK SMI B 41 (Investigation of Urine):\n- Confirm cystitis with dipstick/culture in elderly or pregnant patients. Do not treat asymptomatic bacteriuria in non-pregnant adults."
  },
  "uti_pyelonephritis": {
    nice: "NICE Guideline NG111 (Pyelonephritis - Acute):\n- **First-line Empirical (Non-hospitalized):** Ciprofloxacin 500mg BD PO or Co-amoxiclav 500/125mg TDS PO (7-10 days).\n- **First-line Empirical (Hospitalized/Severe):** **Ceftriaxone** 1-2g QD IV or **Piperacillin/Tazobactam** 4.5g TDS IV. Add Gentamicin if sepsis suspected.",
    smi: "UK SMI B 41 (Investigation of Urine):\n- Urine culture is mandatory before commencing therapy. Watch for ESBL Gram-negatives."
  },
  "cellulitis": {
    nice: "NICE Guideline NG141 (Skin & Soft Tissue Infections):\n- **Mild-to-Moderate Cellulitis:** First-line is **Flucloxacillin** 500mg-1g QDS PO (5-7 days). Alternative is Clarithromycin or Erythromycin.\n- **Severe Cellulitis:** **Flucloxacillin** 1g-2g QDS IV or **Ceftriaxone** 2g QD IV. If MRSA suspected, use **Vancomycin** or **Teicoplanin**.",
    smi: "UK SMI B 11 (Investigation of Skin and Superficial Soft Tissue):\n- Swabs of intact skin are of no clinical value. Aspirates or biopsies required for deep/necrotizing fasciitis."
  },
  "meningitis": {
    nice: "NICE Guideline CG102 (Meningitis - Bacterial):\n- **Empirical treatment in pre-hospital setting (if petechial rash):** Benzylpenicillin 1.2g IM/IV.\n- **Hospital Empirical (Age 3 months to 50 years):** **Ceftriaxone** 2g Q12h IV.\n- **Hospital Empirical (Age > 50 or immunocompromised):** **Ceftriaxone** 2g Q12h IV + **Amoxicillin** 2g Q4h IV (to cover Listeria monocytogenes).",
    smi: "UK SMI B 27 (Investigation of Cerebrospinal Fluid):\n- CSF cell count, Gram stain, and PCR for Neisseria meningitidis and Strep pneumoniae are critical diagnostic markers."
  },
  "intra_abdominal": {
    nice: "NICE Guidelines (Surgical Site & Intra-abdominal Infections):\n- Empirical regimens must cover coliforms, enterococci, and anaerobes.\n- **Severe / High-risk Peritonitis:** First-line is **Piperacillin/Tazobactam** 4.5g TDS IV, or **Meropenem** 1g TDS IV.",
    smi: "UK SMI B 14 (Investigation of Intra-abdominal and Pelvic Infections):\n- Peritoneal fluid culture and anaerobic cultivation are mandatory for organ perforations."
  }
};
