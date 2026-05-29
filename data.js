// static clinical database for the Educational Microbiology Sandbox

export const PATHOGENS = {
  "gram_negative_bacilli": {
    name: "Gram-Negative Rods & Cocci",
    bugs: {
      "escherichia_coli": "Escherichia coli",
      "klebsiella_pneumoniae": "Klebsiella pneumoniae",
      "pseudomonas_aeruginosa": "Pseudomonas aeruginosa",
      "haemophilus_influenzae": "Haemophilus influenzae",
      "enterobacter_cloacae": "Enterobacter cloacae",
      "proteus_mirabilis": "Proteus mirabilis",
      "neisseria_gonorrhoeae": "Neisseria gonorrhoeae"
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
      "clostridium_difficile": "Clostridium difficile",
      "peptostreptococcus_spp": "Peptostreptococcus spp."
    }
  },
  "atypicals": {
    name: "Atypical Pathogens",
    bugs: {
      "mycoplasma_pneumoniae": "Mycoplasma pneumoniae",
      "chlamydophila_pneumoniae": "Chlamydophila pneumoniae",
      "legionella_pneumophila": "Legionella pneumophila",
      "chlamydia_trachomatis": "Chlamydia trachomatis"
    }
  }
};

export const SYNDROMES = {
  "cap": {
    name: "Community-Acquired Pneumonia (CAP)",
    site: "Respiratory System",
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
    site: "Respiratory System",
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
    site: "Urinary Tract",
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
    site: "Urinary Tract",
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
    site: "Skin, Bone & Joint (MSK)",
    description: "Acute bacterial infection of the deep dermis and subcutaneous tissue.",
    expectedPathogens: [
      "streptococcus_pyogenes",
      "staphylococcus_aureus_mssa",
      "staphylococcus_aureus_mrsa"
    ]
  },
  "osteomyelitis": {
    name: "Osteomyelitis / Septic Arthritis",
    site: "Skin, Bone & Joint (MSK)",
    description: "Deep infection of the bone or joint space, requiring long-term antibiotic exposure.",
    expectedPathogens: [
      "staphylococcus_aureus_mssa",
      "staphylococcus_aureus_mrsa",
      "streptococcus_pyogenes"
    ]
  },
  "meningitis": {
    name: "Acute Bacterial Meningitis",
    site: "CNS / Meninges",
    description: "Medical emergency involving inflammation of the meninges surrounding the brain and spinal cord.",
    expectedPathogens: [
      "streptococcus_pneumoniae",
      "haemophilus_influenzae"
    ]
  },
  "intra_abdominal": {
    name: "Intra-abdominal Infection (Peritonitis / Abscess)",
    site: "Gastrointestinal & Abdominal",
    description: "Infections involving visceral organs or the peritoneal cavity, usually polymicrobial.",
    expectedPathogens: [
      "escherichia_coli",
      "klebsiella_pneumoniae",
      "bacteroides_fragilis",
      "enterococcus_faecalis",
      "peptostreptococcus_spp"
    ]
  },
  "cholecystitis_cholangitis": {
    name: "Acute Cholecystitis / Cholangitis",
    site: "Gastrointestinal & Abdominal",
    description: "Biliary tract infection typically secondary to gallstone obstruction.",
    expectedPathogens: [
      "escherichia_coli",
      "klebsiella_pneumoniae",
      "enterococcus_faecalis",
      "bacteroides_fragilis"
    ]
  },
  "neutropenic_sepsis": {
    name: "Neutropenic Sepsis",
    site: "Systemic / Sepsis",
    description: "Life-threatening complication of cancer chemotherapy requiring immediate empirical broad-spectrum IV therapy.",
    expectedPathogens: [
      "escherichia_coli",
      "klebsiella_pneumoniae",
      "pseudomonas_aeruginosa",
      "staphylococcus_aureus_mssa",
      "streptococcus_pneumoniae"
    ]
  },
  "copd_exacerbation": {
    name: "Acute Exacerbation of COPD",
    site: "Respiratory System",
    description: "Acute worsening of respiratory symptoms in a patient with COPD, typically requiring empirical oral antibiotics.",
    expectedPathogens: [
      "haemophilus_influenzae",
      "streptococcus_pneumoniae",
      "pseudomonas_aeruginosa"
    ]
  },
  "tonsillitis": {
    name: "Acute Sore Throat / Tonsillitis",
    site: "Respiratory System",
    description: "Bacterial pharyngitis/tonsillitis typically caused by Group A Streptococcus, requiring antibiotics if Centor criteria are met.",
    expectedPathogens: [
      "streptococcus_pyogenes"
    ]
  },
  "sinusitis": {
    name: "Acute Sinusitis",
    site: "Respiratory System",
    description: "Bacterial sinus infection, considered when symptoms last >10 days or worsen after initial improvement.",
    expectedPathogens: [
      "streptococcus_pneumoniae",
      "haemophilus_influenzae"
    ]
  },
  "bite_infection": {
    name: "Human / Animal Bite Infection",
    site: "Skin, Bone & Joint (MSK)",
    description: "Bite wounds introducing oral flora, frequently polymicrobial, requiring early empirical coverage.",
    expectedPathogens: [
      "staphylococcus_aureus_mssa",
      "streptococcus_pyogenes",
      "bacteroides_fragilis",
      "escherichia_coli"
    ]
  },
  "sepsis_unknown": {
    name: "Sepsis of Unknown Origin",
    site: "Systemic / Sepsis",
    description: "Severe systemic inflammatory response to infection of unidentified source, requiring immediate broad-spectrum IV therapy.",
    expectedPathogens: [
      "escherichia_coli",
      "klebsiella_pneumoniae",
      "pseudomonas_aeruginosa",
      "staphylococcus_aureus_mssa",
      "staphylococcus_aureus_mrsa",
      "streptococcus_pneumoniae"
    ]
  },
  "infective_endocarditis": {
    name: "Infective Endocarditis (Empirical)",
    site: "Systemic / Sepsis",
    description: "Serious bacterial infection of the heart valves, requiring high-dose bactericidal combinations.",
    expectedPathogens: [
      "staphylococcus_aureus_mssa",
      "staphylococcus_aureus_mrsa",
      "enterococcus_faecalis",
      "streptococcus_pneumoniae"
    ]
  },
  "c_difficile": {
    name: "Clostridioides difficile Colitis",
    site: "Gastrointestinal & Abdominal",
    description: "Toxin-producing bacterial infection of the colon, secondary to broad-spectrum antibiotic exposure.",
    expectedPathogens: [
      "clostridium_difficile"
    ]
  },
  "bronchitis": {
    name: "Acute Bronchitis (Infective Exacerbation)",
    site: "Respiratory System",
    description: "Acute inflammation of the bronchi, usually viral, but antibiotics considered if systemically unwell or high risk.",
    expectedPathogens: [
      "streptococcus_pneumoniae",
      "haemophilus_influenzae"
    ]
  },
  "cauti": {
    name: "Catheter-Associated Urinary Tract Infection (CAUTI)",
    site: "Urinary Tract",
    description: "Symptomatic infection of the urinary tract in a patient with a catheter, often involving biofilms and resistant pathogens.",
    expectedPathogens: [
      "escherichia_coli",
      "klebsiella_pneumoniae",
      "pseudomonas_aeruginosa",
      "enterococcus_faecalis"
    ]
  },
  "prostatitis": {
    name: "Acute Prostatitis",
    site: "Urinary Tract",
    description: "Acute bacterial infection of the prostate gland, requiring long-term agents with high prostatic fluid penetration.",
    expectedPathogens: [
      "escherichia_coli",
      "klebsiella_pneumoniae",
      "proteus_mirabilis",
      "pseudomonas_aeruginosa"
    ]
  },
  "diverticulitis": {
    name: "Acute Diverticulitis",
    site: "Gastrointestinal & Abdominal",
    description: "Inflammation of diverticula in the colon wall, requiring anaerobic and enteric Gram-negative coverage.",
    expectedPathogens: [
      "escherichia_coli",
      "klebsiella_pneumoniae",
      "bacteroides_fragilis",
      "enterococcus_faecalis"
    ]
  },
  "sbp": {
    name: "Spontaneous Bacterial Peritonitis (SBP)",
    site: "Gastrointestinal & Abdominal",
    description: "Infection of ascitic fluid in patients with cirrhosis, occurring in the absence of an obvious intra-abdominal source.",
    expectedPathogens: [
      "escherichia_coli",
      "klebsiella_pneumoniae",
      "streptococcus_pneumoniae"
    ]
  },
  "diabetic_foot": {
    name: "Diabetic Foot Infection (Moderate/Severe)",
    site: "Skin, Bone & Joint (MSK)",
    description: "Infection in the foot of a patient with diabetes, frequently polymicrobial and involving tissue necrosis.",
    expectedPathogens: [
      "staphylococcus_aureus_mssa",
      "staphylococcus_aureus_mrsa",
      "streptococcus_pyogenes",
      "escherichia_coli",
      "pseudomonas_aeruginosa",
      "bacteroides_fragilis"
    ]
  },
  "necrotising_fasciitis": {
    name: "Necrotising Fasciitis (Emergency)",
    site: "Skin, Bone & Joint (MSK)",
    description: "Rapidly progressive, life-threatening destructive infection of the fascia and subcutaneous tissue. A surgical emergency.",
    expectedPathogens: [
      "streptococcus_pyogenes",
      "clostridium_perfringens",
      "bacteroides_fragilis",
      "escherichia_coli"
    ]
  },
  "pid": {
    name: "Pelvic Inflammatory Disease (PID)",
    site: "Genital & Pelvic",
    description: "Infection of the upper female genital tract, typically sexually transmitted but frequently polymicrobial.",
    expectedPathogens: [
      "chlamydia_trachomatis",
      "neisseria_gonorrhoeae",
      "bacteroides_fragilis",
      "escherichia_coli",
      "streptococcus_pyogenes"
    ]
  },
  "crbsi": {
    name: "Catheter-Related Bloodstream Infection (CRBSI)",
    site: "Systemic / Sepsis",
    description: "Bacteremia arising from an indwelling vascular catheter, requiring coverage of skin flora and Gram-negatives.",
    expectedPathogens: [
      "staphylococcus_aureus_mssa",
      "staphylococcus_aureus_mrsa",
      "pseudomonas_aeruginosa",
      "enterococcus_faecalis"
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
    name: "Co-amoxiclav",
    subtext: "Combination of Amoxicillin & Clavulanic acid",
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
    name: "Piperacillin/Tazobactam",
    subtext: "Brand name: Tazocin (Piperacillin + Tazobactam)",
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
    "escherichia_coli": 1,
    "klebsiella_pneumoniae": 0,
    "pseudomonas_aeruginosa": 0,
    "haemophilus_influenzae": 2,
    "enterobacter_cloacae": 0,
    "proteus_mirabilis": 2,
    "neisseria_gonorrhoeae": 0,
    "streptococcus_pneumoniae": 2,
    "staphylococcus_aureus_mssa": 0,
    "staphylococcus_aureus_mrsa": 0,
    "streptococcus_pyogenes": 2,
    "enterococcus_faecalis": 2,
    "enterococcus_faecium": 0,
    "bacteroides_fragilis": 0,
    "clostridium_perfringens": 2,
    "clostridium_difficile": 0,
    "peptostreptococcus_spp": 2,
    "mycoplasma_pneumoniae": 0,
    "chlamydophila_pneumoniae": 0,
    "legionella_pneumophila": 0,
    "chlamydia_trachomatis": 0
  },
  "flucloxacillin": {
    "escherichia_coli": 0,
    "klebsiella_pneumoniae": 0,
    "pseudomonas_aeruginosa": 0,
    "haemophilus_influenzae": 0,
    "enterobacter_cloacae": 0,
    "proteus_mirabilis": 0,
    "neisseria_gonorrhoeae": 0,
    "streptococcus_pneumoniae": 2,
    "staphylococcus_aureus_mssa": 2,
    "staphylococcus_aureus_mrsa": 0,
    "streptococcus_pyogenes": 2,
    "enterococcus_faecalis": 0,
    "enterococcus_faecium": 0,
    "bacteroides_fragilis": 0,
    "clostridium_perfringens": 1,
    "clostridium_difficile": 0,
    "peptostreptococcus_spp": 2,
    "mycoplasma_pneumoniae": 0,
    "chlamydophila_pneumoniae": 0,
    "legionella_pneumophila": 0,
    "chlamydia_trachomatis": 0
  },
  "co_amoxiclav": {
    "escherichia_coli": 2,
    "klebsiella_pneumoniae": 2,
    "pseudomonas_aeruginosa": 0,
    "haemophilus_influenzae": 2,
    "enterobacter_cloacae": 0,
    "proteus_mirabilis": 2,
    "neisseria_gonorrhoeae": 2,
    "streptococcus_pneumoniae": 2,
    "staphylococcus_aureus_mssa": 2,
    "staphylococcus_aureus_mrsa": 0,
    "streptococcus_pyogenes": 2,
    "enterococcus_faecalis": 2,
    "enterococcus_faecium": 0,
    "bacteroides_fragilis": 2,
    "clostridium_perfringens": 2,
    "clostridium_difficile": 0,
    "peptostreptococcus_spp": 2,
    "mycoplasma_pneumoniae": 0,
    "chlamydophila_pneumoniae": 0,
    "legionella_pneumophila": 0,
    "chlamydia_trachomatis": 0
  },
  "piperacillin_tazobactam": {
    "escherichia_coli": 2,
    "klebsiella_pneumoniae": 2,
    "pseudomonas_aeruginosa": 2,
    "haemophilus_influenzae": 2,
    "enterobacter_cloacae": 1,
    "proteus_mirabilis": 2,
    "neisseria_gonorrhoeae": 2,
    "streptococcus_pneumoniae": 2,
    "staphylococcus_aureus_mssa": 2,
    "staphylococcus_aureus_mrsa": 0,
    "streptococcus_pyogenes": 2,
    "enterococcus_faecalis": 2,
    "enterococcus_faecium": 0,
    "bacteroides_fragilis": 2,
    "clostridium_perfringens": 2,
    "clostridium_difficile": 0,
    "peptostreptococcus_spp": 2,
    "mycoplasma_pneumoniae": 0,
    "chlamydophila_pneumoniae": 0,
    "legionella_pneumophila": 0,
    "chlamydia_trachomatis": 0
  },
  "ceftriaxone": {
    "escherichia_coli": 2,
    "klebsiella_pneumoniae": 2,
    "pseudomonas_aeruginosa": 0,
    "haemophilus_influenzae": 2,
    "enterobacter_cloacae": 1,
    "proteus_mirabilis": 2,
    "neisseria_gonorrhoeae": 2,
    "streptococcus_pneumoniae": 2,
    "staphylococcus_aureus_mssa": 2,
    "staphylococcus_aureus_mrsa": 0,
    "streptococcus_pyogenes": 2,
    "enterococcus_faecalis": 0,
    "enterococcus_faecium": 0,
    "bacteroides_fragilis": 0,
    "clostridium_perfringens": 2,
    "clostridium_difficile": 0,
    "peptostreptococcus_spp": 2,
    "mycoplasma_pneumoniae": 0,
    "chlamydophila_pneumoniae": 0,
    "legionella_pneumophila": 0,
    "chlamydia_trachomatis": 0
  },
  "ceftazidime": {
    "escherichia_coli": 2,
    "klebsiella_pneumoniae": 2,
    "pseudomonas_aeruginosa": 2,
    "haemophilus_influenzae": 2,
    "enterobacter_cloacae": 1,
    "proteus_mirabilis": 2,
    "neisseria_gonorrhoeae": 2,
    "streptococcus_pneumoniae": 1,
    "staphylococcus_aureus_mssa": 1,
    "staphylococcus_aureus_mrsa": 0,
    "streptococcus_pyogenes": 1,
    "enterococcus_faecalis": 0,
    "enterococcus_faecium": 0,
    "bacteroides_fragilis": 0,
    "clostridium_perfringens": 0,
    "clostridium_difficile": 0,
    "peptostreptococcus_spp": 0,
    "mycoplasma_pneumoniae": 0,
    "chlamydophila_pneumoniae": 0,
    "legionella_pneumophila": 0,
    "chlamydia_trachomatis": 0
  },
  "meropenem": {
    "escherichia_coli": 2,
    "klebsiella_pneumoniae": 2,
    "pseudomonas_aeruginosa": 2,
    "haemophilus_influenzae": 2,
    "enterobacter_cloacae": 2,
    "proteus_mirabilis": 2,
    "neisseria_gonorrhoeae": 2,
    "streptococcus_pneumoniae": 2,
    "staphylococcus_aureus_mssa": 2,
    "staphylococcus_aureus_mrsa": 0,
    "streptococcus_pyogenes": 2,
    "enterococcus_faecalis": 1,
    "enterococcus_faecium": 0,
    "bacteroides_fragilis": 2,
    "clostridium_perfringens": 2,
    "clostridium_difficile": 0,
    "peptostreptococcus_spp": 2,
    "mycoplasma_pneumoniae": 0,
    "chlamydophila_pneumoniae": 0,
    "legionella_pneumophila": 0,
    "chlamydia_trachomatis": 0
  },
  "gentamicin": {
    "escherichia_coli": 2,
    "klebsiella_pneumoniae": 2,
    "pseudomonas_aeruginosa": 2,
    "haemophilus_influenzae": 2,
    "enterobacter_cloacae": 2,
    "proteus_mirabilis": 2,
    "neisseria_gonorrhoeae": 0,
    "streptococcus_pneumoniae": 0,
    "staphylococcus_aureus_mssa": 1,
    "staphylococcus_aureus_mrsa": 0,
    "streptococcus_pyogenes": 0,
    "enterococcus_faecalis": 1,
    "enterococcus_faecium": 0,
    "bacteroides_fragilis": 0,
    "clostridium_perfringens": 0,
    "clostridium_difficile": 0,
    "peptostreptococcus_spp": 0,
    "mycoplasma_pneumoniae": 0,
    "chlamydophila_pneumoniae": 0,
    "legionella_pneumophila": 0,
    "chlamydia_trachomatis": 0
  },
  "ciprofloxacin": {
    "escherichia_coli": 2,
    "klebsiella_pneumoniae": 2,
    "pseudomonas_aeruginosa": 2,
    "haemophilus_influenzae": 2,
    "enterobacter_cloacae": 2,
    "proteus_mirabilis": 2,
    "neisseria_gonorrhoeae": 2,
    "streptococcus_pneumoniae": 1,
    "staphylococcus_aureus_mssa": 1,
    "staphylococcus_aureus_mrsa": 0,
    "streptococcus_pyogenes": 0,
    "enterococcus_faecalis": 0,
    "enterococcus_faecium": 0,
    "bacteroides_fragilis": 0,
    "clostridium_perfringens": 0,
    "clostridium_difficile": 0,
    "peptostreptococcus_spp": 0,
    "mycoplasma_pneumoniae": 2,
    "chlamydophila_pneumoniae": 2,
    "legionella_pneumophila": 2,
    "chlamydia_trachomatis": 2
  },
  "clarithromycin": {
    "escherichia_coli": 0,
    "klebsiella_pneumoniae": 0,
    "pseudomonas_aeruginosa": 0,
    "haemophilus_influenzae": 1,
    "enterobacter_cloacae": 0,
    "proteus_mirabilis": 0,
    "neisseria_gonorrhoeae": 1,
    "streptococcus_pneumoniae": 2,
    "staphylococcus_aureus_mssa": 2,
    "staphylococcus_aureus_mrsa": 0,
    "streptococcus_pyogenes": 2,
    "enterococcus_faecalis": 0,
    "enterococcus_faecium": 0,
    "bacteroides_fragilis": 0,
    "clostridium_perfringens": 1,
    "clostridium_difficile": 0,
    "peptostreptococcus_spp": 1,
    "mycoplasma_pneumoniae": 2,
    "chlamydophila_pneumoniae": 2,
    "legionella_pneumophila": 2,
    "chlamydia_trachomatis": 2
  },
  "daptomycin": {
    "escherichia_coli": 0,
    "klebsiella_pneumoniae": 0,
    "pseudomonas_aeruginosa": 0,
    "haemophilus_influenzae": 0,
    "enterobacter_cloacae": 0,
    "proteus_mirabilis": 0,
    "neisseria_gonorrhoeae": 0,
    "streptococcus_pneumoniae": 2,
    "staphylococcus_aureus_mssa": 2,
    "staphylococcus_aureus_mrsa": 2,
    "streptococcus_pyogenes": 2,
    "enterococcus_faecalis": 2,
    "enterococcus_faecium": 2,
    "clostridium_difficile": 0,
    "chlamydia_trachomatis": 0
  },
  "vancomycin": {
    "escherichia_coli": 0,
    "klebsiella_pneumoniae": 0,
    "pseudomonas_aeruginosa": 0,
    "haemophilus_influenzae": 0,
    "enterobacter_cloacae": 0,
    "proteus_mirabilis": 0,
    "neisseria_gonorrhoeae": 0,
    "streptococcus_pneumoniae": 2,
    "staphylococcus_aureus_mssa": 2,
    "staphylococcus_aureus_mrsa": 2,
    "streptococcus_pyogenes": 2,
    "enterococcus_faecalis": 2,
    "enterococcus_faecium": 1,
    "clostridium_difficile": 2,
    "chlamydia_trachomatis": 0
  },
  "metronidazole": {
    "escherichia_coli": 0,
    "klebsiella_pneumoniae": 0,
    "pseudomonas_aeruginosa": 0,
    "haemophilus_influenzae": 0,
    "enterobacter_cloacae": 0,
    "proteus_mirabilis": 0,
    "neisseria_gonorrhoeae": 0,
    "streptococcus_pneumoniae": 0,
    "staphylococcus_aureus_mssa": 0,
    "staphylococcus_aureus_mrsa": 0,
    "streptococcus_pyogenes": 0,
    "enterococcus_faecalis": 0,
    "enterococcus_faecium": 0,
    "bacteroides_fragilis": 2,
    "clostridium_perfringens": 2,
    "clostridium_difficile": 2,
    "peptostreptococcus_spp": 2,
    "mycoplasma_pneumoniae": 0,
    "chlamydophila_pneumoniae": 0,
    "legionella_pneumophila": 0,
    "chlamydia_trachomatis": 0
  },
  "nitrofurantoin": {
    "escherichia_coli": 2,
    "klebsiella_pneumoniae": 2,
    "pseudomonas_aeruginosa": 0,
    "haemophilus_influenzae": 0,
    "enterobacter_cloacae": 1,
    "proteus_mirabilis": 0,
    "neisseria_gonorrhoeae": 0,
    "streptococcus_pneumoniae": 0,
    "staphylococcus_aureus_mssa": 2,
    "staphylococcus_aureus_mrsa": 0,
    "streptococcus_pyogenes": 0,
    "enterococcus_faecalis": 2,
    "enterococcus_faecium": 1,
    "clostridium_difficile": 0,
    "chlamydia_trachomatis": 0
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
  "osteomyelitis": {
    nice: "NICE Guideline NG191 (Osteomyelitis / Septic Arthritis):\n- **Empirical therapy:** **Flucloxacillin** 1g-2g Q6h IV or 500mg-1g Q6h PO (typically 4-6 weeks total). Alternative if penicillin-allergic: **Clindamycin** 300-600mg Q6h PO/IV.\n- **MRSA Suspected:** Add **Vancomycin** (or Teicoplanin). Adjust based on bone biopsy culture.",
    smi: "UK SMI B 42 (Investigation of Bone and Joint Infections):\n- Bone biopsies are preferred over superficial wound swabs for definitive microbial isolation."
  },
  "meningitis": {
    nice: "NICE Guideline CG102 (Meningitis - Bacterial):\n- **Empirical treatment in pre-hospital setting (if petechial rash):** Benzylpenicillin 1.2g IM/IV.\n- **Hospital Empirical (Age 3 months to 50 years):** **Ceftriaxone** 2g Q12h IV.\n- **Hospital Empirical (Age > 50 or immunocompromised):** **Ceftriaxone** 2g Q12h IV + **Amoxicillin** 2g Q4h IV (to cover Listeria monocytogenes).",
    smi: "UK SMI B 27 (Investigation of Cerebrospinal Fluid):\n- CSF cell count, Gram stain, and PCR for Neisseria meningitidis and Strep pneumoniae are critical diagnostic markers."
  },
  "intra_abdominal": {
    nice: "NICE Guidelines (Surgical Site & Intra-abdominal Infections):\n- Empirical regimens must cover coliforms, enterococci, and anaerobes.\n- **Severe / High-risk Peritonitis:** First-line is **Piperacillin/Tazobactam** 4.5g TDS IV, or **Meropenem** 1g TDS IV.",
    smi: "UK SMI B 14 (Investigation of Intra-abdominal and Pelvic Infections):\n- Peritoneal fluid culture and anaerobic cultivation are mandatory for organ perforations."
  },
  "cholecystitis_cholangitis": {
    nice: "NICE Guideline NG188 (Intra-abdominal Infections):\n- **First-line Empirical PO/IV:** **Co-amoxiclav** 1.2g TDS IV or 625mg TDS PO (duration 3-5 days after source control).\n- **Alternative (Penicillin allergy):** Ciprofloxacin 400mg TDS IV / 500mg BD PO + Metronidazole 500mg IV / 400mg TDS PO.",
    smi: "UK SMI B 14 (Investigation of Intra-abdominal Infections):\n- Blood cultures and bile aspirates are highly valuable for guiding targeted therapy in severe cholangitis."
  },
  "neutropenic_sepsis": {
    nice: "NICE Guideline CG151 (Neutropenic Sepsis):\n- **Empirical first-line:** Immediately administer empirical monotherapy with **Piperacillin/Tazobactam** (Tazocin) 4.5g TDS IV. Do not delay for diagnostics.\n- **Alternative:** **Meropenem** (reserved for patients with history of beta-lactam anaphylaxis or known ESBL colonization). Add Vancomycin only if catheter infection suspected.",
    smi: "UK Standard Sepsis Protocols:\n- Pre-dose blood cultures are mandatory, but administering the first antibiotic dose must occur within 1 hour of presentation ('Sepsis Six' pathway)."
  },
  "copd_exacerbation": {
    nice: "NICE Guideline NG114 (COPD Exacerbation):\n- **Empirical first-line PO:** **Amoxicillin** 500mg TDS PO (5 days) OR **Doxycycline** 200mg day 1, then 100mg QD PO (5 days), OR **Clarithromycin** 500mg BD PO.\n- Reassess if symptoms do not improve within 2-3 days.",
    smi: "UK Standard Clinical Guidance:\n- Sputum culture is recommended if patient has frequent exacerbations, purulent sputum, or fails empirical therapy."
  },
  "tonsillitis": {
    nice: "NICE Guideline NG120 (Sore Throat / Tonsillitis):\n- **First-line PO:** **Phenoxymethylpenicillin** 500mg QDS PO (or 1g BD) for 10 days to prevent rheumatic fever complications.\n- **Penicillin Allergy:** **Clarithromycin** 250mg-500mg BD PO for 5 days.",
    smi: "UK Standards for Microbiology Investigations:\n- Throat swabs are indicated only if Centor score >= 3 or severe symptoms. Swabs check for beta-hemolytic Streptococcus."
  },
  "sinusitis": {
    nice: "NICE Guideline NG133 (Sinusitis - Acute):\n- **First-line PO:** **Phenoxymethylpenicillin** 500mg QDS PO (5 days). Alternative: **Doxycycline** 200mg stat then 100mg QD PO.\n- **Second-line / Complicated:** **Co-amoxiclav** 625mg TDS PO.",
    smi: "UK Standard Clinical Guidance:\n- Empirical treatment should only be started if symptoms are severe, purulent nasal discharge is present, or patient fails to improve after 10 days."
  },
  "bite_infection": {
    nice: "NICE Guideline NG184 (Human / Animal Bites):\n- **Empirical Prophylaxis / Treatment:** **Co-amoxiclav** 375mg-625mg TDS PO or 1.2g TDS IV (5 days).\n- **Penicillin Allergy:** **Doxycycline** 100mg BD PO + **Metronidazole** 400mg TDS PO (covers anaerobes and Gram-negatives in oral flora).",
    smi: "UK SMI B 11 (Skin & Soft Tissue Infections):\n- Wound swab of bite site is mandatory to isolate *Pasteurella* spp. (animal bites) or *Eikenella corrodens* (human bites)."
  },
  "sepsis_unknown": {
    nice: "NICE Guidelines / UK Sepsis Trust:\n- **Empirical Sepsis (source unknown):** **Piperacillin/Tazobactam** (Tazocin) 4.5g TDS IV, OR **Co-amoxiclav** 1.2g TDS IV + **Gentamicin** 5-7mg/kg IV QD (TDM required).\n- Add **Vancomycin** if high risk of MRSA (prior colonization or line-related infection).",
    smi: "UK Standard Sepsis Protocols:\n- Take blood cultures immediately and check lactate. Start 'Sepsis Six' pathway and review antibiotics within 48-72 hours."
  },
  "infective_endocarditis": {
    nice: "BSAC / NICE Guidelines (Infective Endocarditis):\n- **Empirical native valve:** **Amoxicillin** 2g Q4h IV + **Gentamicin** 80mg BD IV + **Vancomycin** 1g-1.5g BD IV (if MRSA risk/prosthetic valve).\n- Long-term therapy (4-6 weeks) required under specialist consultation.",
    smi: "UK SMI B 37 (Blood Cultures):\n- Draw 3 sets of blood cultures within 24 hours prior to starting therapy (if clinically stable) to identify low-level bacteremia."
  },
  "c_difficile": {
    nice: "NICE Guideline NG199 (C. difficile Colitis):\n- **First-line Empirical PO:** **Vancomycin** 125mg QDS PO (10 days).\n- **Alternative / Severe:** Fidaxomicin 200mg BD PO. Metronidazole PO is reserved for mild non-severe cases if other options are unavailable.",
    smi: "UK Standards for Microbiology Investigations:\n- Diagnose C. diff using GDH screen followed by toxin EIA assay on diarrheal stool specimens (Bristol Stool Chart 5-7)."
  },
  "bronchitis": {
    nice: "NICE Guideline NG114 (Acute Bronchitis):\n- **Empirical PO (if indicated/unwell):** Doxycycline 200mg day 1, then 100mg QD PO (5 days), OR **Amoxicillin** 500mg TDS PO (5 days).\n- Note: Most acute bronchitis is viral and does not benefit from antibiotics.",
    smi: "UK Standards for Microbiology Investigations:\n- Sputum culture is not routinely recommended for uncomplicated acute bronchitis."
  },
  "cauti": {
    nice: "NICE Guideline NG113 (Catheter-Associated UTI):\n- **First-line PO/IV:** **Co-amoxiclav** 625mg TDS PO or 1.2g TDS IV (7-10 days).\n- **Alternative (Suspected Pseudomonas/MDR):** **Ciprofloxacin** 500mg BD PO / 400mg BD IV, or **Piperacillin/Tazobactam** (Tazocin) 4.5g TDS IV.\n- Remove or change the catheter as soon as possible if it has been in place for >7 days.",
    smi: "UK SMI B 41 (Investigation of Urine):\n- Urine should be sampled from the sampling port of the catheter tubing, not the drainage bag. Biofilms skew results."
  },
  "prostatitis": {
    nice: "NICE Guideline NG110 (Prostatitis - Acute):\n- **First-line PO:** **Ciprofloxacin** 500mg BD PO for 14 days (extend to 28 days if needed).\n- **Severe/Hospitalized IV:** **Piperacillin/Tazobactam** 4.5g TDS IV, or **Ceftriaxone** 2g QD IV + **Gentamicin** if sepsis suspected.\n- Fluoroquinolones have excellent lipid solubility and prostatic fluid penetration.",
    smi: "UK SMI B 41 (Investigation of Urine):\n- Mid-stream urine or post-prostatic massage urine culture is recommended to identify pathogen and sensitivity."
  },
  "diverticulitis": {
    nice: "NICE Guideline NG147 (Diverticular Disease - Acute Diverticulitis):\n- **Empirical IV (Severe/Sepsis):** **Co-amoxiclav** 1.2g TDS IV, OR **Ceftriaxone** 2g QD IV + **Metronidazole** 500mg TDS IV.\n- **Empirical PO (Mild/Outpatient):** **Co-amoxiclav** 625mg TDS PO (5 days), or **Ciprofloxacin** 500mg BD PO + **Metronidazole** 400mg TDS PO.",
    smi: "UK Standard Surgical Sepsis Guidelines:\n- Check CT abdomen to exclude abscess. Target coliforms and anaerobes."
  },
  "sbp": {
    nice: "British Society of Gastroenterology (BSG) Guidelines:\n- **Empirical First-line IV:** **Ceftriaxone** 2g QD IV (typically 5-7 days).\n- **Alternative (MDR risk):** **Piperacillin/Tazobactam** 4.5g TDS IV.\n- Avoid aminoglycosides (Gentamicin) due to extremely high risk of inducing renal failure (hepatorenal syndrome) in cirrhotic patients.",
    smi: "UK SMI B 14 (Investigation of Ascitic Fluid):\n- Ascitic fluid PMN count > 250 cells/mm3 is diagnostic. Inoculate fluid directly into blood culture bottles at the bedside."
  },
  "diabetic_foot": {
    nice: "NICE Guideline NG19 (Diabetic Foot Infection):\n- **Moderate-to-Severe Infection:** **Co-amoxiclav** 1.2g TDS IV / 625mg TDS PO.\n- **Severe / Pseudomonas risk:** **Piperacillin/Tazobactam** 4.5g TDS IV. If MRSA suspected, add **Vancomycin**.\n- Check for underlying osteomyelitis (requires imaging and long-term therapy).",
    smi: "UK SMI B 11 (Skin & Soft Tissue Infections):\n- Swabs of ulcers are often contaminated with colonizers. Deep tissue biopsy or curettage after wound debridement is preferred."
  },
  "necrotising_fasciitis": {
    nice: "NHS England / Royal College of Surgeons Guidelines:\n- **Surgical Emergency:** Immediate surgical debridement is the primary treatment. Do not delay surgery for antibiotics.\n- **Empirical Triple Cocktail IV:** **Meropenem** 1g TDS IV + **Clindamycin** 1.2g QDS IV + **Vancomycin** 1.5g BD IV (or Linezolid).\n- *Clindamycin* is critical to suppress bacterial toxin production (superantigens/streptolysin).",
    smi: "UK SMI B 11 (Investigation of Skin and Superficial Soft Tissue):\n- Deep tissue biopsies and blood cultures are critical. Send tissue for urgent Gram stain and aerobic/anaerobic culture."
  },
  "pid": {
    nice: "BASHH Guidelines (Pelvic Inflammatory Disease):\n- **Empirical Outpatient Regimen:** **Ceftriaxone** 1g IM single dose + **Doxycycline** 100mg BD PO (14 days) + **Metronidazole** 400mg BD PO (14 days).\n- Targets Chlamydia, Gonococci, and genital tract anaerobes/Gram-negatives.",
    smi: "UK SMI B 28 (Investigation of Genital Tract Swabs):\n- Obtain endocervical/vaginal swabs for Chlamydia and Gonorrhea PCR prior to starting therapy."
  },
  "crbsi": {
    nice: "Local Vascular Access Infection Guidelines:\n- **Empirical Line-Sepsis IV:** **Vancomycin** 15mg/kg Q12h IV (covers MRSA / Coag-negative Staph) + **Ceftazidime** 2g TDS IV (covers Pseudomonas).\n- Review need to pull the catheter line. Check peripheral and line blood culture pairs for differential time to positivity (DTP).",
    smi: "UK SMI B 37 (Blood Cultures):\n- Draw concurrent blood cultures from the catheter hub and a peripheral vein before starting therapy."
  }
};
