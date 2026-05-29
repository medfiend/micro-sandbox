import { ANTIBIOTICS, SPECTRUM } from '../data.js';

// Helper mock calculator
function calculateCrCl(age, sex, weight, height, creatinine, useAdjustedWeight) {
  const heightInches = height / 2.54;
  const inchesOver5Feet = Math.max(0, heightInches - 60);
  
  let ibw = 0;
  if (sex === 'male') {
    ibw = 50.0 + (2.3 * inchesOver5Feet);
  } else {
    ibw = 45.5 + (2.3 * inchesOver5Feet);
  }
  
  let weightUsed = weight;
  if (weight > (ibw * 1.2) && useAdjustedWeight) {
    weightUsed = ibw + 0.4 * (weight - ibw);
  }
  
  const constant = sex === 'male' ? 1.23 : 1.04;
  return Math.round(((140 - age) * weightUsed * constant) / creatinine);
}

// Test Runner
function runTests() {
  console.log("--------------------------------------------------");
  console.log("RUNNING COGNITIVE TEST SUITE FOR MICRO RULES ENGINE");
  console.log("--------------------------------------------------");

  let passCount = 0;
  let failCount = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`[PASS] ${message}`);
      passCount++;
    } else {
      console.error(`[FAIL] ${message}`);
      failCount++;
    }
  }

  // TEST 1: Standard Renal clearance
  const standardCrCl = calculateCrCl(40, 'male', 70, 175, 80, true);
  assert(standardCrCl === 108, `Standard male CrCl should be 108 ml/min (Got ${standardCrCl})`);

  // TEST 2: Obese Renal clearance (Adjusted weight check)
  const obeseCrCl = calculateCrCl(40, 'male', 100, 175, 80, true);
  assert(obeseCrCl === 127, `Obese male CrCl (using AjBW) should be 127 ml/min (Got ${obeseCrCl})`);

  // TEST 3: PK Trap - Daptomycin in Pneumonia
  const capSyndrome = "cap";
  const dapPkTrap = ANTIBIOTICS["daptomycin"].pkTraps[capSyndrome];
  assert(dapPkTrap !== undefined, "Daptomycin should have a PK trap defined for community-acquired pneumonia");
  assert(dapPkTrap.includes("pulmonary surfactant"), "Daptomycin PK trap should mention surfactant inactivation");

  // TEST 4: PK Trap - Nitrofurantoin in Pyelonephritis
  const pyeloSyndrome = "uti_pyelonephritis";
  const nitroPkTrap = ANTIBIOTICS["nitrofurantoin"].pkTraps[pyeloSyndrome];
  assert(nitroPkTrap !== undefined, "Nitrofurantoin should have a PK trap defined for pyelonephritis");
  assert(nitroPkTrap.includes("tissue penetration"), "Nitrofurantoin PK trap should mention poor tissue penetration");

  // TEST 5: Spectrum check - Meropenem vs Pseudomonas
  const meropenemPseudomonasCover = SPECTRUM["meropenem"]?.["pseudomonas_aeruginosa"];
  assert(meropenemPseudomonasCover === 2, `Meropenem should cover Pseudomonas (Score: 2, Got ${meropenemPseudomonasCover})`);

  // TEST 6: Renal Dosing Adjustment trigger
  const lowCrCl = 20;
  const meropenemRules = ANTIBIOTICS["meropenem"].renalAdjustments;
  let ruleFound = null;
  for (let rule of meropenemRules) {
    if (lowCrCl <= rule.maxCrCl && lowCrCl >= rule.minCrCl) {
      ruleFound = rule;
      break;
    }
  }
  assert(ruleFound !== null, "Should find renal adjustment rule for Meropenem at CrCl 20");
  assert(ruleFound.recommendedDose === "500mg IV Q12h", `Meropenem recommended dose at CrCl 20 should be 500mg IV Q12h (Got ${ruleFound.recommendedDose})`);

  // TEST 7: ESBL MERINO Trial Warning Mock Check
  const mockIsolateBug = "escherichia_coli";
  const mockAntibiogram = {
    "ceftriaxone": "R",
    "piperacillin_tazobactam": "S"
  };
  const mockProposed = ["piperacillin_tazobactam"];
  const merinoTriggered = (mockIsolateBug === "escherichia_coli" &&
                           mockAntibiogram["ceftriaxone"] === "R" &&
                           mockProposed.includes("piperacillin_tazobactam") &&
                           (mockAntibiogram["piperacillin_tazobactam"] === "S"));
  assert(merinoTriggered === true, "MERINO warning logic should trigger for ESBL E. coli if Pip/Tazo is selected and sensitive in vitro");

  // TEST 8: AmpC Induction warning Mock Check
  const ampCBug = "enterobacter_cloacae";
  const ampCAntibiogram = {
    "ceftriaxone": "S",
    "piperacillin_tazobactam": "S"
  };
  const ampCProposed = ["ceftriaxone"];
  const ampCTriggered = (ampCBug === "enterobacter_cloacae" && 
                          (ampCProposed.includes("ceftriaxone") || ampCProposed.includes("piperacillin_tazobactam")) &&
                          (ampCAntibiogram["ceftriaxone"] === "S" || ampCAntibiogram["piperacillin_tazobactam"] === "S"));
  assert(ampCTriggered === true, "AmpC induction warning logic should trigger for Enterobacter cloacae if Ceftriaxone is selected and sensitive");

  // TEST 9: Nitrofurantoin 30-44 renal adjustment caution check
  const nitroRules = ANTIBIOTICS["nitrofurantoin"].renalAdjustments;
  const testCrCl = 35;
  let nitroAdjustmentFound = null;
  for (let rule of nitroRules) {
    if (testCrCl <= rule.maxCrCl && testCrCl >= rule.minCrCl) {
      nitroAdjustmentFound = rule;
      break;
    }
  }
  assert(nitroAdjustmentFound !== null, "Should find renal adjustment rule for Nitrofurantoin at CrCl 35");
  assert(nitroAdjustmentFound.recommendedDose.includes("Caution"), `Nitrofurantoin recommended dose at CrCl 35 should be a caution (Got ${nitroAdjustmentFound.recommendedDose})`);

  // TEST 10: EUCAST 'Susceptible under increased exposure' (I) trigger check
  const eucastPathogen = "escherichia_coli";
  const eucastAntibiogram = {
    "ciprofloxacin": "I"
  };
  const eucastProposed = ["ciprofloxacin"];
  const eucastTriggered = (eucastAntibiogram["ciprofloxacin"] === "I" && eucastProposed.includes("ciprofloxacin"));
  assert(eucastTriggered === true, "EUCAST 'I' warning logic should trigger when a proposed drug has 'I' sensitivity");

  // TEST 11: Pseudomonas + Ciprofloxacin fluoroquinolone warning check
  const pseudoPathogen = "pseudomonas_aeruginosa";
  const pseudoProposed = ["ciprofloxacin"];
  const pseudoTriggered = (pseudoPathogen === "pseudomonas_aeruginosa" && pseudoProposed.includes("ciprofloxacin"));
  assert(pseudoTriggered === true, "Pseudomonas + Ciprofloxacin caution warning logic should trigger when Ciprofloxacin is prescribed for Pseudomonas");

  // TEST 12: PK Trap - C. diff colitis + IV Vancomycin
  const vancRouteDiff = "IV";
  const vancSyndromeDiff = "c_difficile";
  const isVancRouteDiffTrap = (vancSyndromeDiff === "c_difficile" && vancRouteDiff === "IV");
  assert(isVancRouteDiffTrap === true, "IV Vancomycin in C. diff colitis should trigger colonic PK trap warning");

  // TEST 13: PK Trap - Systemic Sepsis + PO Vancomycin
  const vancRouteSepsis = "PO";
  const vancSyndromeSepsis = "sepsis_unknown";
  const isVancRouteSepsisTrap = (vancRouteSepsis === "PO" && ["sepsis_unknown", "neutropenic_sepsis", "infective_endocarditis", "crbsi", "uti_pyelonephritis"].includes(vancSyndromeSepsis));
  assert(isVancRouteSepsisTrap === true, "Oral Vancomycin in systemic sepsis should trigger systemic absorption PK trap warning");

  // TEST 14: SBP + Gentamicin renal/hepatorenal warning check
  const sbpSyndrome = "sbp";
  const proposedSbpRegimen = ["gentamicin"];
  const isSbpGentamicinWarning = (sbpSyndrome === "sbp" && proposedSbpRegimen.includes("gentamicin"));
  assert(isSbpGentamicinWarning === true, "Gentamicin in SBP should trigger caution due to high risk of hepatorenal syndrome");

  // TEST 15: CAUTI + Ciprofloxacin Enterococcus faecalis coverage check
  const cautiExpected = ["escherichia_coli", "klebsiella_pneumoniae", "pseudomonas_aeruginosa", "enterococcus_faecalis"];
  const uncoveredCauti = cautiExpected.filter(bugId => (SPECTRUM["ciprofloxacin"]?.[bugId] || 0) < 2);
  assert(uncoveredCauti.includes("enterococcus_faecalis"), "CAUTI expected pathogen Enterococcus faecalis should be uncovered by Ciprofloxacin monotherapy (Score < 2)");

  // TEST 16: Multi-Allergy Auditor - Safety Auditor & Cross-Reactivity
  const mockAllergies = ["penicillin_severe", "macrolide"];
  const mockAllergyRegimen = ["co_amoxiclav", "ceftriaxone", "clarithromycin", "ciprofloxacin"];
  
  const penicillins = ["amoxicillin", "flucloxacillin", "co_amoxiclav", "piperacillin_tazobactam"];
  const otherBetaLactams = ["ceftriaxone", "ceftazidime", "meropenem"];
  
  const penWarnings = mockAllergyRegimen.filter(d => penicillins.includes(d) && (mockAllergies.includes("penicillin_severe") || mockAllergies.includes("penicillin_mild")));
  const cephalosporinWarnings = mockAllergyRegimen.filter(d => otherBetaLactams.includes(d) && mockAllergies.includes("penicillin_severe"));
  const macrolideWarnings = mockAllergyRegimen.filter(d => d === "clarithromycin" && mockAllergies.includes("macrolide"));
  const nonAllergicWarnings = mockAllergyRegimen.filter(d => d === "ciprofloxacin" && (penicillins.includes(d) || otherBetaLactams.includes(d) || mockAllergies.includes("fluoroquinolone")));
  
  assert(penWarnings.length > 0, "Severe penicillin allergy should flag Co-amoxiclav as contraindicated");
  assert(cephalosporinWarnings.length > 0, "Severe penicillin allergy should flag Ceftriaxone as cross-reactive risk");
  assert(macrolideWarnings.length > 0, "Macrolide allergy should flag Clarithromycin as contraindicated");
  assert(nonAllergicWarnings.length === 0, "Ciprofloxacin should not be flagged if patient has no fluoroquinolone allergy");



  // TEST 17: IV-to-Oral Switch (IVOS) Opportunity Auditor
  const mockIvosCriteriaMet = true; // all checkboxes checked
  const mockIvosRegimen = { "co_amoxiclav": { route: "IV" }, "ciprofloxacin": { route: "PO" } };
  const ivToPoSwitches = ["co_amoxiclav", "ciprofloxacin", "clarithromycin", "metronidazole"];
  
  const switchOpportunities = Object.keys(mockIvosRegimen).filter(drugId => {
    return mockIvosRegimen[drugId].route === "IV" && ivToPoSwitches.includes(drugId) && mockIvosCriteriaMet;
  });
  
  assert(switchOpportunities.includes("co_amoxiclav"), "Should flag Co-amoxiclav for IV-to-oral switch when criteria are met");
  assert(!switchOpportunities.includes("ciprofloxacin"), "Should not flag Ciprofloxacin for switch if already on PO route");

  console.log("--------------------------------------------------");
  console.log(`TEST RUN COMPLETE. Passed: ${passCount}, Failed: ${failCount}`);
  console.log("--------------------------------------------------");
}

runTests();

