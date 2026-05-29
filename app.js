import { PATHOGENS, SYNDROMES, ANTIBIOTICS, SPECTRUM, GUIDELINES } from './data.js';

// --- STATE MANAGEMENT ---
const state = {
  patient: {
    age: 40,
    sex: "male",
    weight: 70, // kg
    height: 175, // cm
    creatinine: 80, // umol/L
    useAdjustedWeight: true
  },
  config: {
    demographicsExpanded: false,
    treatmentMode: "empiric", // "empiric" or "directed"
    selectedSyndrome: "cap",
    isolatedPathogen: "",
    antibiogram: {}, // drugId -> "S" | "I" | "R"
    currentRegimen: new Set(),
    proposedRegimen: new Set(),
    dosingDrug: "amoxicillin",
    prescribedDose: "500mg",
    prescribedFreq: "Q8h",
    prescribedRoute: "PO",
    spectrumViewMode: "case" // "case" | "alternatives" | "full"
  },
  lookup: {
    path: "drug", // "drug" or "bug"
    selectedId: ""
  }
};

// --- INITIALIZATION ---
window.addEventListener('DOMContentLoaded', () => {
  initDOM();
  calculateRenalClearance();
  renderAll();
});

// --- DOM REGISTRATION & EVENT LISTENERS ---
function initDOM() {
  // Tab Switching
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      
      tab.classList.add('active');
      const contentId = tab.getAttribute('data-tab');
      document.getElementById(contentId).classList.add('active');
    });
  });

  // Generic Accordion Handler
  document.querySelectorAll('.card-accordion').forEach(card => {
    const trigger = card.querySelector('.accordion-trigger');
    const content = card.querySelector('.accordion-content');
    const arrow = card.querySelector('.arrow-down');
    
    if (trigger && content) {
      trigger.addEventListener('click', () => {
        const isCollapsed = content.classList.toggle('hidden');
        if (arrow) {
          if (isCollapsed) {
            arrow.classList.remove('active');
          } else {
            arrow.classList.add('active');
          }
        }
      });
    }
  });

  // Mobile Bottom Navigation Tabs Switching & Sync
  const mobileNavBtns = document.querySelectorAll('.mobile-nav-btn');
  mobileNavBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      mobileNavBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const targetTab = btn.getAttribute('data-tab');
      if (targetTab === 'col-inputs') {
        document.body.classList.remove('show-outputs');
        document.body.classList.add('show-inputs');
      } else {
        document.body.classList.remove('show-inputs');
        document.body.classList.add('show-outputs');
        
        // Simulate click on the corresponding desktop tab button to switch content
        const desktopTabBtn = document.querySelector(`.tab-btn[data-tab="${targetTab}"]`);
        if (desktopTabBtn) {
          desktopTabBtn.click();
        }
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
  
  // Sync desktop tabs back to mobile navigation active state
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabId = tab.getAttribute('data-tab');
      const correspondingMobileBtn = document.querySelector(`.mobile-nav-btn[data-tab="${tabId}"]`);
      if (correspondingMobileBtn) {
        mobileNavBtns.forEach(b => b.classList.remove('active'));
        correspondingMobileBtn.classList.add('active');
      }
    });
  });

  // Spectrum View Mode Toggles
  const btnSpecCase = document.getElementById('spec-toggle-case');
  const btnSpecAlts = document.getElementById('spec-toggle-alternatives');
  const btnSpecFull = document.getElementById('spec-toggle-full');
  
  if (btnSpecCase && btnSpecAlts && btnSpecFull) {
    const specToggles = [btnSpecCase, btnSpecAlts, btnSpecFull];
    
    btnSpecCase.addEventListener('click', () => {
      specToggles.forEach(t => t.classList.remove('active'));
      btnSpecCase.classList.add('active');
      state.config.spectrumViewMode = 'case';
      renderSpectrumMatrix();
    });
    
    btnSpecAlts.addEventListener('click', () => {
      specToggles.forEach(t => t.classList.remove('active'));
      btnSpecAlts.classList.add('active');
      state.config.spectrumViewMode = 'alternatives';
      renderSpectrumMatrix();
    });
    
    btnSpecFull.addEventListener('click', () => {
      specToggles.forEach(t => t.classList.remove('active'));
      btnSpecFull.classList.add('active');
      state.config.spectrumViewMode = 'full';
      renderSpectrumMatrix();
    });
  }

  // Demographics Inputs
  document.getElementById('patient-age').addEventListener('input', (e) => {
    state.patient.age = parseInt(e.target.value) || 40;
    calculateRenalClearance();
    renderAll();
  });
  document.getElementById('patient-sex').addEventListener('change', (e) => {
    state.patient.sex = e.target.value;
    calculateRenalClearance();
    renderAll();
  });
  document.getElementById('patient-weight').addEventListener('input', (e) => {
    state.patient.weight = parseFloat(e.target.value) || 70;
    calculateRenalClearance();
    renderAll();
  });
  document.getElementById('patient-height').addEventListener('input', (e) => {
    state.patient.height = parseFloat(e.target.value) || 175;
    calculateRenalClearance();
    renderAll();
  });
  document.getElementById('patient-creatinine').addEventListener('input', (e) => {
    state.patient.creatinine = parseFloat(e.target.value) || 80;
    calculateRenalClearance();
    renderAll();
  });
  document.getElementById('use-adjusted-weight').addEventListener('change', (e) => {
    state.patient.useAdjustedWeight = e.target.checked;
    calculateRenalClearance();
    renderAll();
  });

  // Infection Syndrome Selector
  const syndromeSelect = document.getElementById('infection-syndrome');
  syndromeSelect.addEventListener('change', (e) => {
    state.config.selectedSyndrome = e.target.value;
    // Auto-update isolated pathogen list if directed mode is active
    populateIsolatedPathogens();
    renderAll();
  });

  // Treatment Mode Toggles (Empiric vs Directed)
  const btnEmpiric = document.getElementById('mode-empiric');
  const btnDirected = document.getElementById('mode-directed');
  const directedFields = document.getElementById('directed-fields');
  const empiricInfoBox = document.getElementById('empiric-info-box');

  btnEmpiric.addEventListener('click', () => {
    state.config.treatmentMode = "empiric";
    btnEmpiric.classList.add('active');
    btnDirected.classList.remove('active');
    directedFields.classList.add('hidden');
    empiricInfoBox.classList.remove('hidden');
    renderAll();
  });

  btnDirected.addEventListener('click', () => {
    state.config.treatmentMode = "directed";
    btnDirected.classList.add('active');
    btnEmpiric.classList.remove('active');
    directedFields.classList.remove('hidden');
    empiricInfoBox.classList.add('hidden');
    populateIsolatedPathogens();
    renderAll();
  });

  // Isolated Pathogen Selector
  document.getElementById('isolated-pathogen').addEventListener('change', (e) => {
    state.config.isolatedPathogen = e.target.value;
    resetAntibiogramToWildtype();
    renderAll();
  });

  // Preset Buttons
  document.getElementById('preset-wild').addEventListener('click', () => {
    resetAntibiogramToWildtype();
    renderAll();
  });
  document.getElementById('preset-mrsa').addEventListener('click', () => {
    applyPreset('mrsa');
    renderAll();
  });
  document.getElementById('preset-esbl').addEventListener('click', () => {
    applyPreset('esbl');
    renderAll();
  });
  document.getElementById('preset-vre').addEventListener('click', () => {
    applyPreset('vre');
    renderAll();
  });
  document.getElementById('preset-cpe').addEventListener('click', () => {
    applyPreset('cpe');
    renderAll();
  });

  // Clear Regimen Buttons
  document.getElementById('clear-current-regimen').addEventListener('click', () => {
    state.config.currentRegimen.clear();
    renderAntibioticSelectors();
    renderAll();
  });
  document.getElementById('clear-proposed-regimen').addEventListener('click', () => {
    state.config.proposedRegimen.clear();
    renderAntibioticSelectors();
    renderAll();
  });

  // Dosing Verification Inputs
  document.getElementById('proposed-drug-dose').addEventListener('change', (e) => {
    state.config.dosingDrug = e.target.value;
    renderAll();
  });
  document.getElementById('prescribed-dose').addEventListener('input', (e) => {
    state.config.prescribedDose = e.target.value;
    renderAll();
  });
  document.getElementById('prescribed-freq').addEventListener('change', (e) => {
    state.config.prescribedFreq = e.target.value;
    renderAll();
  });
  document.getElementById('prescribed-route').addEventListener('change', (e) => {
    state.config.prescribedRoute = e.target.value;
    renderAll();
  });

  // Lookup Utility Toggles
  const btnLookDrug = document.getElementById('lookup-by-drug-btn');
  const btnLookBug = document.getElementById('lookup-by-bug-btn');
  const selectLabel = document.getElementById('lookup-select-label');

  btnLookDrug.addEventListener('click', () => {
    state.lookup.path = "drug";
    btnLookDrug.classList.add('active');
    btnLookBug.classList.remove('active');
    selectLabel.innerText = "Select Antibiotic:";
    populateLookupDropdown();
    queryLookup();
  });

  btnLookBug.addEventListener('click', () => {
    state.lookup.path = "bug";
    btnLookBug.classList.add('active');
    btnLookDrug.classList.remove('active');
    selectLabel.innerText = "Select Pathogen:";
    populateLookupDropdown();
    queryLookup();
  });

  document.getElementById('lookup-select').addEventListener('change', (e) => {
    state.lookup.selectedId = e.target.value;
    queryLookup();
  });

  // Click handler delegation for clickable bug names
  document.body.addEventListener('click', (e) => {
    const clickable = e.target.closest('.clickable-bug');
    if (clickable) {
      const bugId = clickable.getAttribute('data-bug-id');
      showBugRecommendations(bugId);
    }
  });

  // Modal Close event handlers
  const modal = document.getElementById('recommendation-modal');
  document.getElementById('close-modal-btn').addEventListener('click', () => {
    modal.classList.add('hidden');
  });
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
    }
  });

  // Initialize dynamic data selectors
  populateSyndromes();
  populateIsolatedPathogens();
  renderAntibioticSelectors();
  populateLookupDropdown();
  queryLookup();
}

function populateSyndromes() {
  const select = document.getElementById('infection-syndrome');
  if (!select) return;
  select.innerHTML = '';
  
  // Group syndromes by site / system
  const grouped = {};
  Object.keys(SYNDROMES).forEach(key => {
    const s = SYNDROMES[key];
    const site = s.site || "General / Other";
    if (!grouped[site]) {
      grouped[site] = [];
    }
    grouped[site].push({ key, ...s });
  });
  
  // Group and sort anatomical sites alphabetically
  Object.keys(grouped).sort().forEach(site => {
    const optgroup = document.createElement('optgroup');
    optgroup.label = site;
    
    grouped[site].forEach(s => {
      const opt = document.createElement('option');
      opt.value = s.key;
      opt.text = s.name;
      if (s.key === state.config.selectedSyndrome) {
        opt.selected = true;
      }
      optgroup.appendChild(opt);
    });
    select.appendChild(optgroup);
  });
}

function showBugRecommendations(bugId) {
  // Find readable bug name
  let bugName = bugId;
  Object.keys(PATHOGENS).forEach(group => {
    if (PATHOGENS[group].bugs[bugId]) bugName = PATHOGENS[group].bugs[bugId];
  });

  const modal = document.getElementById('recommendation-modal');
  const title = document.getElementById('modal-bug-name');
  const listContainer = document.getElementById('modal-recommendations-list');

  title.innerText = `Empirical Cover: ${bugName}`;
  listContainer.innerHTML = '';

  // Find all antibiotics that cover this bug (score = 2)
  const recommendations = [];
  Object.keys(ANTIBIOTICS).forEach(drugId => {
    const score = SPECTRUM[drugId]?.[bugId] || 0;
    if (score === 2) {
      recommendations.push(ANTIBIOTICS[drugId]);
    }
  });

  if (recommendations.length === 0) {
    listContainer.innerHTML = `<p style="font-size: 0.85rem; color: var(--text-muted); text-align: center; margin-top: 1rem;">No antibiotic in the database provides full empirical cover (2) for this bug. Check synergistic options.</p>`;
  } else {
    recommendations.forEach(drug => {
      const div = document.createElement('div');
      div.className = "rec-item";
      
      const nameSpan = document.createElement('span');
      nameSpan.className = "rec-item-name";
      nameSpan.innerText = drug.name;

      const classSpan = document.createElement('span');
      classSpan.className = "rec-item-class";
      classSpan.innerText = drug.class;

      div.appendChild(nameSpan);
      div.appendChild(classSpan);
      listContainer.appendChild(div);
    });
  }

  modal.classList.remove('hidden');
}

// --- MICROBIOLOGY & ANTIBIOGRAM UTILITIES ---

function populateIsolatedPathogens() {
  const select = document.getElementById('isolated-pathogen');
  select.innerHTML = '';
  
  // Group pathogens logically in dropdown
  Object.keys(PATHOGENS).forEach(groupKey => {
    const group = PATHOGENS[groupKey];
    const optgroup = document.createElement('optgroup');
    optgroup.label = group.name;
    
    Object.keys(group.bugs).forEach(bugKey => {
      const option = document.createElement('option');
      option.value = bugKey;
      option.text = group.bugs[bugKey];
      optgroup.appendChild(option);
    });
    select.appendChild(optgroup);
  });

  if (!state.config.isolatedPathogen) {
    state.config.isolatedPathogen = select.value;
  } else {
    select.value = state.config.isolatedPathogen;
  }
  resetAntibiogramToWildtype();
}

function resetAntibiogramToWildtype() {
  const bug = state.config.isolatedPathogen;
  state.config.antibiogram = {};
  
  // Set default sensitivity map according to baseline spectrum matrix
  Object.keys(ANTIBIOTICS).forEach(drugKey => {
    const baseline = SPECTRUM[drugKey]?.[bug] || 0;
    // Map spectrum coverage score (2=S, 1=I, 0=R)
    state.config.antibiogram[drugKey] = baseline >= 2 ? "S" : (baseline === 1 ? "I" : "R");
  });
  renderAntibiogramTable();
}

function applyPreset(preset) {
  const bug = state.config.isolatedPathogen;
  resetAntibiogramToWildtype(); // start fresh

  if (preset === 'mrsa') {
    document.getElementById('isolated-pathogen').value = "staphylococcus_aureus_mrsa";
    state.config.isolatedPathogen = "staphylococcus_aureus_mrsa";
    resetAntibiogramToWildtype();
    // MRSA is resistant to all beta-lactams (except Ceftaroline, not in database)
    Object.keys(ANTIBIOTICS).forEach(drugKey => {
      const drug = ANTIBIOTICS[drugKey];
      if (drug.class.includes("Penicillin") || drug.class.includes("Cephalosporin") || drug.class.includes("Carbapenem")) {
        state.config.antibiogram[drugKey] = "R";
      }
    });
    // Remains sensitive to Glycopeptides (Vancomycin) and Lipopeptides (Daptomycin)
    state.config.antibiogram["vancomycin"] = "S";
    state.config.antibiogram["daptomycin"] = "S";
  } 
  
  else if (preset === 'esbl') {
    // ESBL covers Gram Negatives like E. Coli or Klebsiella
    if (bug !== 'escherichia_coli' && bug !== 'klebsiella_pneumoniae') {
      document.getElementById('isolated-pathogen').value = "escherichia_coli";
      state.config.isolatedPathogen = "escherichia_coli";
      resetAntibiogramToWildtype();
    }
    // ESBL renders Penicillins and Cephalosporins (Ceftriaxone, Ceftazidime) inactive
    Object.keys(ANTIBIOTICS).forEach(drugKey => {
      const drug = ANTIBIOTICS[drugKey];
      if (drug.class.includes("Penicillin") || drug.class.includes("Cephalosporin")) {
        state.config.antibiogram[drugKey] = "R";
      }
    });
    // Meropenem remains active
    state.config.antibiogram["meropenem"] = "S";
  } 
  
  else if (preset === 'vre') {
    document.getElementById('isolated-pathogen').value = "enterococcus_faecium";
    state.config.isolatedPathogen = "enterococcus_faecium";
    resetAntibiogramToWildtype();
    // Resistant to Vancomycin
    state.config.antibiogram["vancomycin"] = "R";
    state.config.antibiogram["daptomycin"] = "S"; // remains sensitive
  } 
  
  else if (preset === 'cpe') {
    // Carbapenemase producers are resistant to almost all beta-lactams including Carbapenems
    if (bug !== 'klebsiella_pneumoniae' && bug !== 'pseudomonas_aeruginosa') {
      document.getElementById('isolated-pathogen').value = "klebsiella_pneumoniae";
      state.config.isolatedPathogen = "klebsiella_pneumoniae";
      resetAntibiogramToWildtype();
    }
    Object.keys(ANTIBIOTICS).forEach(drugKey => {
      const drug = ANTIBIOTICS[drugKey];
      if (drug.class.includes("Penicillin") || drug.class.includes("Cephalosporin") || drug.class.includes("Carbapenem")) {
        state.config.antibiogram[drugKey] = "R";
      }
    });
    // Gentamicin may be sensitive occasionally depending on genotype
    state.config.antibiogram["gentamicin"] = "S";
  }
  
  renderAntibiogramTable();
}

function renderAntibiogramTable() {
  const tbody = document.getElementById('antibiogram-tbody');
  tbody.innerHTML = '';
  
  Object.keys(ANTIBIOTICS).forEach(drugKey => {
    const drug = ANTIBIOTICS[drugKey];
    const currentVal = state.config.antibiogram[drugKey] || "R";
    
    const tr = document.createElement('tr');
    
    const tdName = document.createElement('td');
    tdName.innerText = drug.name;
    tr.appendChild(tdName);
    
    const tdSIR = document.createElement('td');
    tdSIR.colSpan = 3;
    
    const divRadioGroup = document.createElement('div');
    divRadioGroup.className = "sir-radio-group";
    
    ['S', 'I', 'R'].forEach(sir => {
      const radioId = `sir-${drugKey}-${sir}`;
      const radioInput = document.createElement('input');
      radioInput.type = "radio";
      radioInput.name = `sir-${drugKey}`;
      radioInput.id = radioId;
      radioInput.value = sir;
      if (currentVal === sir) radioInput.checked = true;
      
      radioInput.addEventListener('change', () => {
        state.config.antibiogram[drugKey] = sir;
        renderAll();
      });
      
      const radioLabel = document.createElement('label');
      radioLabel.htmlFor = radioId;
      radioLabel.className = `lbl-${sir.toLowerCase()}`;
      radioLabel.innerText = sir;
      
      divRadioGroup.appendChild(radioInput);
      divRadioGroup.appendChild(radioLabel);
    });
    
    tdSIR.appendChild(divRadioGroup);
    tr.appendChild(tdSIR);
    tbody.appendChild(tr);
  });
}

// --- RENAL CALCULATOR ENGINE ---

function calculateRenalClearance() {
  const { age, sex, weight, height, creatinine, useAdjustedWeight } = state.patient;
  
  // 1. Calculate Ideal Body Weight (IBW)
  // Height in inches
  const heightInches = height / 2.54;
  const inchesOver5Feet = Math.max(0, heightInches - 60);
  
  let ibw = 0;
  if (sex === 'male') {
    ibw = 50.0 + (2.3 * inchesOver5Feet);
  } else {
    ibw = 45.5 + (2.3 * inchesOver5Feet);
  }
  
  // 2. Determine Weight to use
  let weightUsed = weight;
  let isObese = false;
  let ajbw = 0;
  
  if (weight > (ibw * 1.2)) {
    isObese = true;
    ajbw = ibw + 0.4 * (weight - ibw);
    if (useAdjustedWeight) {
      weightUsed = ajbw;
    }
  }
  
  // 3. Compute Cockcroft-Gault clearance (standard UK formula using umol/L)
  // Constant is 1.23 for males, 1.04 for females
  const constant = sex === 'male' ? 1.23 : 1.04;
  let crcl = ((140 - age) * weightUsed * constant) / creatinine;
  
  // Save calculation results
  state.calculatedCrCl = Math.round(crcl);
  state.isObese = isObese;
  state.ibw = Math.round(ibw * 10) / 10;
  state.ajbw = Math.round(ajbw * 10) / 10;
  state.weightUsed = weightUsed;
  
  updateRenalUI();
}

function updateRenalUI() {
  const headerBadge = document.getElementById('header-crcl-badge');
  const valueLabel = document.getElementById('crcl-value');
  const expLabel = document.getElementById('crcl-explanation');
  
  const crcl = state.calculatedCrCl;
  valueLabel.innerText = `${crcl} ml/min`;
  
  // Set severity coloring
  headerBadge.className = 'stat-value';
  if (crcl >= 90) {
    headerBadge.classList.add('text-success');
    headerBadge.innerText = `Normal (>90 ml/min)`;
  } else if (crcl >= 50) {
    headerBadge.classList.add('text-success');
    headerBadge.innerText = `Mild Impairment (${crcl} ml/min)`;
  } else if (crcl >= 30) {
    headerBadge.classList.add('text-warning');
    headerBadge.innerText = `Moderate Renal Impairment (${crcl} ml/min)`;
  } else if (crcl >= 15) {
    headerBadge.classList.add('text-danger');
    headerBadge.innerText = `Severe Renal Impairment (${crcl} ml/min)`;
  } else {
    headerBadge.classList.add('text-danger');
    headerBadge.innerText = `End Stage / ESRF (<15 ml/min)`;
  }
  
  // Explanation text
  let exp = `IBW: ${state.ibw}kg. `;
  if (state.isObese) {
    exp += `Patient is Obese (>20% over IBW). `;
    if (state.patient.useAdjustedWeight) {
      exp += `Using **Adjusted Body Weight** (${state.ajbw}kg) for calculation to prevent overestimating clearance.`;
    } else {
      exp += `Using **Total Body Weight** (${state.patient.weight}kg) which may overestimate clearance.`;
    }
  } else {
    exp += `Using Actual Body Weight (${state.patient.weight}kg) for renal calculation.`;
  }
  expLabel.innerHTML = exp;
}

// --- COCKTAIL / STEWARDSHIP SELECTORS ---

function renderAntibioticSelectors() {
  const currentList = document.getElementById('current-antibiotic-list');
  const proposedList = document.getElementById('proposed-antibiotic-list');
  
  currentList.innerHTML = '';
  proposedList.innerHTML = '';
  
  Object.keys(ANTIBIOTICS).forEach(drugKey => {
    const drug = ANTIBIOTICS[drugKey];
    
    // Current Checklist Checkbox
    const labelCur = document.createElement('label');
    labelCur.className = `checkbox-pill ${state.config.currentRegimen.has(drugKey) ? 'checked' : ''}`;
    
    const inputCur = document.createElement('input');
    inputCur.type = 'checkbox';
    inputCur.value = drugKey;
    inputCur.checked = state.config.currentRegimen.has(drugKey);
    inputCur.addEventListener('change', (e) => {
      if (e.target.checked) {
        state.config.currentRegimen.add(drugKey);
      } else {
        state.config.currentRegimen.delete(drugKey);
      }
      renderAntibioticSelectors();
      renderAll();
    });
    
    labelCur.appendChild(inputCur);
    labelCur.appendChild(document.createTextNode(` ${drug.name}`));
    currentList.appendChild(labelCur);
    
    // Proposed Checklist Checkbox
    const labelProp = document.createElement('label');
    labelProp.className = `checkbox-pill ${state.config.proposedRegimen.has(drugKey) ? 'checked' : ''}`;
    
    const inputProp = document.createElement('input');
    inputProp.type = 'checkbox';
    inputProp.value = drugKey;
    inputProp.checked = state.config.proposedRegimen.has(drugKey);
    inputProp.addEventListener('change', (e) => {
      if (e.target.checked) {
        state.config.proposedRegimen.add(drugKey);
      } else {
        state.config.proposedRegimen.delete(drugKey);
      }
      renderAntibioticSelectors();
      updateDosingVerifyDropdown();
      renderAll();
    });
    
    labelProp.appendChild(inputProp);
    labelProp.appendChild(document.createTextNode(` ${drug.name}`));
    proposedList.appendChild(labelProp);
  });
}

function updateDosingVerifyDropdown() {
  const select = document.getElementById('proposed-drug-dose');
  select.innerHTML = '';
  
  const proposedArray = Array.from(state.config.proposedRegimen);
  if (proposedArray.length === 0) {
    const opt = document.createElement('option');
    opt.value = "";
    opt.text = "-- No proposed drugs --";
    select.appendChild(opt);
    state.config.dosingDrug = "";
    return;
  }
  
  proposedArray.forEach(drugKey => {
    const opt = document.createElement('option');
    opt.value = drugKey;
    opt.text = ANTIBIOTICS[drugKey].name;
    select.appendChild(opt);
  });

  if (!proposedArray.includes(state.config.dosingDrug)) {
    state.config.dosingDrug = proposedArray[0];
  }
  select.value = state.config.dosingDrug;
}

// --- DUAL LOOKUP DROPDOWNS ---

function populateLookupDropdown() {
  const select = document.getElementById('lookup-select');
  select.innerHTML = '';
  
  if (state.lookup.path === 'drug') {
    Object.keys(ANTIBIOTICS).forEach(key => {
      const option = document.createElement('option');
      option.value = key;
      option.text = ANTIBIOTICS[key].name;
      select.appendChild(option);
    });
  } else {
    Object.keys(PATHOGENS).forEach(groupKey => {
      const group = PATHOGENS[groupKey];
      const optgroup = document.createElement('optgroup');
      optgroup.label = group.name;
      
      Object.keys(group.bugs).forEach(bugKey => {
        const option = document.createElement('option');
        option.value = bugKey;
        option.text = group.bugs[bugKey];
        optgroup.appendChild(option);
      });
      select.appendChild(optgroup);
    });
  }
  state.lookup.selectedId = select.value;
}

function queryLookup() {
  const resultsBox = document.getElementById('lookup-results-box');
  resultsBox.innerHTML = '';
  
  const selectedId = state.lookup.selectedId;
  if (!selectedId) return;

  if (state.lookup.path === 'drug') {
    // Show what bugs the selected drug covers
    const drug = ANTIBIOTICS[selectedId];
    const mappings = SPECTRUM[selectedId] || {};
    
    const title = document.createElement('h4');
    title.style.margin = '0 0 0.5rem 0.5rem';
    title.style.fontSize = '0.9rem';
    title.innerText = `Pathogen Spectrum for ${drug.name}:`;
    resultsBox.appendChild(title);
    
    // Sort bugs by susceptibility
    Object.keys(mappings)
      .sort((a, b) => mappings[b] - mappings[a])
      .forEach(bugId => {
        // Find bug name
        let bugName = bugId;
        Object.keys(PATHOGENS).forEach(g => {
          if (PATHOGENS[g].bugs[bugId]) bugName = PATHOGENS[g].bugs[bugId];
        });
        
        const score = mappings[bugId];
        const div = document.createElement('div');
        div.className = "lookup-result-item";
        
        const nameSpan = document.createElement('span');
        nameSpan.className = "lookup-item-name";
        nameSpan.innerText = bugName;
        
        const badge = document.createElement('span');
        badge.className = `critique-badge`;
        if (score === 2) {
          badge.style.background = 'var(--bg-success-fade)';
          badge.style.color = 'var(--color-success)';
          badge.innerText = 'Covered (2)';
        } else if (score === 1) {
          badge.style.background = 'var(--bg-warning-fade)';
          badge.style.color = 'var(--color-warning)';
          badge.innerText = 'Partial (1)';
        } else {
          badge.style.background = 'var(--bg-danger-fade)';
          badge.style.color = 'var(--color-danger)';
          badge.innerText = 'No Cover (0)';
        }
        
        div.appendChild(nameSpan);
        div.appendChild(badge);
        resultsBox.appendChild(div);
      });
  } else {
    // Show which drugs cover the selected pathogen
    let bugName = selectedId;
    Object.keys(PATHOGENS).forEach(g => {
      if (PATHOGENS[g].bugs[selectedId]) bugName = PATHOGENS[g].bugs[selectedId];
    });
    
    const title = document.createElement('h4');
    title.style.margin = '0 0 0.5rem 0.5rem';
    title.style.fontSize = '0.9rem';
    title.innerText = `Antimicrobials active against ${bugName}:`;
    resultsBox.appendChild(title);
    
    // Scan all antibiotics
    const activeDrugs = [];
    Object.keys(ANTIBIOTICS).forEach(drugId => {
      const score = SPECTRUM[drugId]?.[selectedId] || 0;
      activeDrugs.push({ drugId, name: ANTIBIOTICS[drugId].name, score });
    });
    
    activeDrugs.sort((a, b) => b.score - a.score).forEach(item => {
      const div = document.createElement('div');
      div.className = "lookup-result-item";
      
      const nameSpan = document.createElement('span');
      nameSpan.className = "lookup-item-name";
      nameSpan.innerText = item.name;
      
      const badge = document.createElement('span');
      badge.className = `critique-badge`;
      if (item.score === 2) {
        badge.style.background = 'var(--bg-success-fade)';
        badge.style.color = 'var(--color-success)';
        badge.innerText = 'Covered';
      } else if (item.score === 1) {
        badge.style.background = 'var(--bg-warning-fade)';
        badge.style.color = 'var(--color-warning)';
        badge.innerText = 'Partial';
      } else {
        badge.style.background = 'var(--bg-danger-fade)';
        badge.style.color = 'var(--color-danger)';
        badge.innerText = 'Resistant';
      }
      
      div.appendChild(nameSpan);
      div.appendChild(badge);
      resultsBox.appendChild(div);
    });
  }
}

// --- RULES ENGINE & CRITIQUE COMPILATION ---

function compileRegimenCritiques() {
  const critiques = [];
  const proposed = Array.from(state.config.proposedRegimen);
  const current = Array.from(state.config.currentRegimen);
  const syndrome = state.config.selectedSyndrome;
  const isDirected = state.config.treatmentMode === "directed";
  const crcl = state.calculatedCrCl;

  // Render static Guidelines first
  renderGuidelines(syndrome);

  if (proposed.length === 0) {
    critiques.push({
      type: "warning",
      title: "No Regimen Proposed",
      message: "Please select one or more antibiotics in the **Proposed Regimen** list to receive a diagnostic critique.",
      evidence: "Antimicrobial stewardship pathways recommend outlining concrete therapy combinations before prescribing."
    });
    return critiques;
  }

  // 1. Dosing Verification for selected Dosing Drug
  const doseDrugKey = state.config.dosingDrug;
  if (doseDrugKey && proposed.includes(doseDrugKey)) {
    const drug = ANTIBIOTICS[doseDrugKey];
    
    // Renal Check
    let adjustmentFound = null;
    for (let rule of drug.renalAdjustments) {
      if (crcl <= rule.maxCrCl && crcl >= rule.minCrCl) {
        adjustmentFound = rule;
        break;
      }
    }
    
    if (adjustmentFound) {
      critiques.push({
        type: adjustmentFound.recommendedDose.includes("CONTRAINDICATED") ? "danger" : "warning",
        title: `Renal Adjustment Required: ${drug.name}`,
        message: `Your patient has an estimated CrCl of **${crcl} ml/min**. Standard dosing is *${drug.standardDose}*. Recommended adjustment: **${adjustmentFound.recommendedDose}**.`,
        evidence: `Dose adjustments based on renal parameters prevent system toxicity (nephrotoxicity/ototoxicity) and ensure drug efficacy. Reference: Renal Drug Handbook.`
      });
    } else {
      critiques.push({
        type: "success",
        title: `Renal Dosing Adequate: ${drug.name}`,
        message: `No active renal adjustments required for ${drug.name} at calculated CrCl of ${crcl} ml/min (Standard: ${drug.standardDose}).`,
        evidence: `Estimated clearance exceeds critical clearance boundaries for this compound.`
      });
    }
  }

  // 2. PK Traps Validation
  proposed.forEach(drugKey => {
    const drug = ANTIBIOTICS[drugKey];
    if (drug.pkTraps && drug.pkTraps[syndrome]) {
      critiques.push({
        type: "danger",
        title: `PK Conflict (Tissue Penetration): ${drug.name}`,
        message: drug.pkTraps[syndrome],
        evidence: "In vitro susceptibility profiles do not guarantee in vivo success if the drug cannot physically reach the source of infection at therapeutic levels."
      });
    }
  });

  // 3. Empirical Spectrum Gaps Check
  if (!isDirected) {
    const expected = SYNDROMES[syndrome].expectedPathogens;
    const uncovered = [];
    
    expected.forEach(bugId => {
      let covered = false;
      proposed.forEach(drugId => {
        if ((SPECTRUM[drugId]?.[bugId] || 0) >= 2) {
          covered = true;
        }
      });
      if (!covered) {
        // Get bug readable name
        let name = bugId;
        Object.keys(PATHOGENS).forEach(g => {
          if (PATHOGENS[g].bugs[bugId]) name = PATHOGENS[g].bugs[bugId];
        });
        uncovered.push(`<span class="clickable-bug" data-bug-id="${bugId}">${name}</span><span class="bug-gap-badge">uncovered</span>`);
      }
    });

    if (uncovered.length > 0) {
      critiques.push({
        type: "warning",
        title: "Empirical Spectrum Gaps",
        message: `Your proposed regimen leaves the following expected pathogens untreated for ${SYNDROMES[syndrome].name}: ${uncovered.join(', ')}. <br><br><strong>Tip:</strong> Click any red-badged pathogen name above to view a list of recommended covering agents.`,
        evidence: "Empirical regimens should cover typical clinical flora associated with the site of infection until cultures are available. Check the Spectrum Grid tab for detailed matrices."
      });
    } else {
      critiques.push({
        type: "success",
        title: "Adequate Empirical Spectrum",
        message: `Your proposed regimen cocktail covers 100% of typical organisms expected for **${SYNDROMES[syndrome].name}**.`,
        evidence: "Meets baseline empirical recommendations for local guidelines comparison."
      });
    }

    // 3b. Actionable Guideline Congruence Checks
    if (syndrome === "cellulitis" && !proposed.includes("flucloxacillin")) {
      critiques.push({
        type: "warning",
        title: "Guideline Discordance: Cellulitis",
        message: "Your proposed regimen does not contain **Flucloxacillin**. NICE Guideline NG141 recommends Flucloxacillin (500mg-1g Q6h PO/IV) as first-line empirical therapy to target Streptococcus pyogenes and Staphylococcus aureus.",
        evidence: "Flucloxacillin is the standard UK agent for skin/soft tissue infections due to its narrow spectrum and stability against staphylococcal penicillinases."
      });
    }

    if (syndrome === "cap" && !proposed.includes("amoxicillin") && !proposed.includes("co_amoxiclav")) {
      critiques.push({
        type: "warning",
        title: "Guideline Discordance: CAP",
        message: "Your proposed regimen lacks a standard first-line agent. NICE Guideline NG138 recommends **Amoxicillin** PO (non-severe CAP) or **Co-amoxiclav** 1.2g TDS IV + **Clarithromycin** (severe HAP/CAP).",
        evidence: "Amoxicillin is preferred to maintain narrow-spectrum coverage of Streptococcus pneumoniae and prevent carbapenem resistance."
      });
    }

    if (syndrome === "uti_cystitis" && !proposed.includes("nitrofurantoin")) {
      critiques.push({
        type: "warning",
        title: "Guideline Discordance: Cystitis",
        message: "Your proposed regimen lacks first-line cover. NICE Guideline NG109 recommends **Nitrofurantoin** 100mg MR BD PO (or Trimethoprim) as first-line empirical therapy.",
        evidence: "Nitrofurantoin concentrates exclusively in the lower urinary tract and has low resistance rates for coliforms in the UK."
      });
    }
  }

  // Actionable Current Regimen Stewardship switches
  if (current.length > 0) {
    if (syndrome === "cellulitis" && current.includes("amoxicillin") && !proposed.includes("flucloxacillin")) {
      critiques.push({
        type: "warning",
        title: "Stewardship Intervention: Cellulitis Switch",
        message: "The patient is currently on **Amoxicillin** for cellulitis. Amoxicillin has poor stability against staphylococcal beta-lactamases and is suboptimal. NICE Guideline NG141 recommends **Flucloxacillin**. Consider switching the regimen to Flucloxacillin.",
        evidence: "Over 90% of S. aureus strains isolated in the UK produce penicillinases, rendering amoxicillin inactive."
      });
    }
  }

  // 4. Directed Mode Check & Resistance Alerts
  if (isDirected) {
    const isolatedBugId = state.config.isolatedPathogen;
    let bugName = isolatedBugId;
    Object.keys(PATHOGENS).forEach(g => {
      if (PATHOGENS[g].bugs[isolatedBugId]) bugName = PATHOGENS[g].bugs[isolatedBugId];
    });

    // Check if the proposed regimen covers the bug
    let coverageScoreMax = 0;
    let activeSens = "R";
    
    proposed.forEach(drugId => {
      const score = SPECTRUM[drugId]?.[isolatedBugId] || 0;
      if (score > coverageScoreMax) coverageScoreMax = score;
      
      const sens = state.config.antibiogram[drugId] || "R";
      if (sens === "S" && activeSens !== "S") activeSens = "S";
      else if (sens === "I" && activeSens === "R") activeSens = "I";
    });

    if (activeSens === "R") {
      critiques.push({
        type: "danger",
        title: `Inadequate Treatment: Resistant Isolate`,
        message: `The isolated **${bugName}** is resistant (**R**) in vitro to your selected proposed agents. Your current choices will fail.`,
        evidence: "Pathogen-directed therapy must target agents with confirmed susceptibility (S) in the antibiogram."
      });
    } else if (coverageScoreMax === 0) {
      critiques.push({
        type: "danger",
        title: `Inadequate Treatment: No Inherent Activity`,
        message: `Your proposed regimen contains no drugs with inherent biological activity against isolated **${bugName}**.`,
        evidence: "Verify pathogen taxonomy and active drug targets on the Spectrum tab."
      });
    } else {
      critiques.push({
        type: "success",
        title: `Adequate Targeted Therapy`,
        message: `Your proposed regimen is active in vitro against **${bugName}** (Susceptibility: ${activeSens}).`,
        evidence: "Susceptible isolates indicate high clinical efficacy when adequate dosing is maintained."
      });
    }

    // A. MERINO Trial Warning for ESBL Enterobacterales
    if ((isolatedBugId === "escherichia_coli" || isolatedBugId === "klebsiella_pneumoniae") && 
        state.config.antibiogram["ceftriaxone"] === "R" &&
        proposed.includes("piperacillin_tazobactam") &&
        (state.config.antibiogram["piperacillin_tazobactam"] === "S" || state.config.antibiogram["piperacillin_tazobactam"] === "I")) {
      critiques.push({
        type: "warning",
        title: "Clinical Conflict (ESBL): MERINO Trial",
        message: `Your proposed regimen uses Piperacillin/Tazobactam for an ESBL-producing isolate. The landmark **MERINO Trial (2018)** demonstrated that Piperacillin/Tazobactam was associated with significantly higher 30-day mortality compared to Meropenem for definitive treatment of ESBL bacteremia, even when susceptible in vitro. Carbapenems (Meropenem) remain the gold standard.`,
        evidence: "JAMA 2018; 320(10):985-994. Avoid Piperacillin/Tazobactam for invasive/bacteremic ESBL infections."
      });
    }

    // B. AmpC Beta-Lactamase Induction warning
    if (isolatedBugId === "enterobacter_cloacae" && 
        (proposed.includes("ceftriaxone") || proposed.includes("piperacillin_tazobactam")) &&
        (state.config.antibiogram["ceftriaxone"] === "S" || state.config.antibiogram["piperacillin_tazobactam"] === "S")) {
      critiques.push({
        type: "danger",
        title: "Clinical Conflict: AmpC Induction Risk",
        message: `Treating **Enterobacter cloacae** with Ceftriaxone or Piperacillin/Tazobactam carries a high risk of selecting for derepressed chromosomal **AmpC beta-lactamase** mutants, leading to clinical treatment failure during therapy, even if initially susceptible in vitro.`,
        evidence: "Enterobacter species carry chromosomal inducible AmpC beta-lactamases. Meropenem or Ciprofloxacin are preferred options to prevent breakthrough resistance."
      });
    }

    // C. EUCAST 'Susceptible, Increased Exposure' (I) Dosing Alert
    proposed.forEach(drugId => {
      if (state.config.antibiogram[drugId] === "I") {
        const drug = ANTIBIOTICS[drugId];
        critiques.push({
          type: "warning",
          title: `Increased Exposure Required (I): ${drug.name}`,
          message: `The isolated **${bugName}** is susceptible to **${drug.name}** under **increased exposure (I)**. Ensure that you prescribe the maximum dose/frequency (e.g., Meropenem 2g Q8h instead of 1g, or standard high-dose oral Ciprofloxacin) or that the drug naturally concentrates at the site of infection (e.g. urine levels in cystitis).`,
          evidence: "EUCAST guidelines redefined the 'I' category to 'Susceptible, increased exposure' in 2019 to indicate that the agent is active if drug exposure is optimized."
        });
      }
    });

    // D. Pseudomonas & Ciprofloxacin Specific Breakpoint Alert
    if (isolatedBugId === "pseudomonas_aeruginosa" && proposed.includes("ciprofloxacin")) {
      critiques.push({
        type: "warning",
        title: "Clinical Caution: Pseudomonas & Ciprofloxacin",
        message: "EUCAST guidelines classify *Pseudomonas aeruginosa* as intrinsically 'Susceptible, increased exposure (I)' to Ciprofloxacin. High-dose oral therapy (750mg BD PO) or high-dose intravenous therapy (400mg TDS IV) is required for clinical efficacy.",
        evidence: "EUCAST breakpoint tables indicate that standard low doses are insufficient for treating Pseudomonas infections with fluoroquinolones."
      });
    }
  }

  // 5. Antimicrobial Stewardship (AMS) Cocktail Analytics
  // A. Redundancy (Overlapping anaerobe coverage is a classic)
  let anaerobicAgents = [];
  proposed.forEach(drugId => {
    if (SPECTRUM[drugId]?.["bacteroides_fragilis"] === 2) {
      anaerobicAgents.push(ANTIBIOTICS[drugId].name);
    }
  });
  if (anaerobicAgents.length > 1) {
    critiques.push({
      type: "warning",
      title: "Therapeutic Redundancy: Anaerobic Cover",
      message: `Your proposed cocktail contains multiple agents providing anaerobic coverage: **${anaerobicAgents.join(' + ')}**. E.g., adding Metronidazole to Tazocin or Meropenem is redundant.`,
      evidence: "Avoiding duplicate therapeutic cover reduces risk of C. difficile infection, limits side effects, and protects standard spectrum lines."
    });
  }

  // B. Escalation vs De-escalation comparing Current vs Proposed
  if (current.length > 0) {
    const curScores = current.map(id => ANTIBIOTICS[id].spectrumScore);
    const propScores = proposed.map(id => ANTIBIOTICS[id].spectrumScore);
    const sumCur = curScores.reduce((a, b) => a + b, 0);
    const sumProp = propScores.reduce((a, b) => a + b, 0);

    if (isDirected) {
      const isolatedBugId = state.config.isolatedPathogen;
      
      // Determine if current regimen was active
      let currentActive = false;
      current.forEach(drugId => {
        if (state.config.antibiogram[drugId] === "S") currentActive = true;
      });

      // Determine if proposed is active
      let proposedActive = false;
      proposed.forEach(drugId => {
        if (state.config.antibiogram[drugId] === "S") proposedActive = true;
      });

      if (!currentActive && proposedActive) {
        critiques.push({
          type: "success",
          title: "Successful Escalation",
          message: "Patient's previous regimen was inactive against the isolated bug. Your proposed regimen successfully escalates therapy to an active agent.",
          evidence: "Antimicrobial stewardship dictates escalating immediately when cultures reveal empirical coverage is inadequate."
        });
      } else if (currentActive && proposedActive && sumProp < sumCur) {
        critiques.push({
          type: "success",
          title: "Stewardship De-escalation Achieved",
          message: `You narrowed the treatment spectrum from a total breadth of **${sumCur}** down to **${sumProp}** while maintaining susceptibilities. Excellent stewardship!`,
          evidence: "De-escalating broad-spectrum carbapenems/BLIs to targeted narrow agents lowers selective pressure, slowing resistance spread."
        });
      } else if (currentActive && proposedActive && sumProp > sumCur) {
        critiques.push({
          type: "warning",
          title: "Broadening Spectrum unnecessarily?",
          message: `Your proposed regimen increases spectrum score from **${sumCur}** to **${sumProp}** even though the patient's current regimen is already active against the isolate. Check if this is justified.`,
          evidence: "Do not escalate or broaden therapy if a narrower current regimen is already clinically active and effective."
        });
      }
    }
  }

  return critiques;
}

// --- RENDER ENGINES ---

function renderAll() {
  renderCritiques();
  renderSpectrumMatrix();
  renderAntibiogramTable();
}

function renderCritiques() {
  const container = document.getElementById('critique-cards-container');
  container.innerHTML = '';
  
  const critiques = compileRegimenCritiques();
  
  // Update warning badges
  const proposed = Array.from(state.config.proposedRegimen);
  const alertCount = proposed.length > 0
    ? critiques.filter(c => c.type === 'warning' || c.type === 'danger').length
    : 0;
  updateAlertBadges(alertCount);
  
  critiques.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = `critique-card ${item.type}`;
    
    const header = document.createElement('div');
    header.className = 'critique-card-header';
    
    const titleGroup = document.createElement('div');
    titleGroup.className = 'critique-title-group';
    
    const icon = document.createElement('span');
    icon.className = 'critique-icon';
    icon.innerText = item.type === 'success' ? '🟢' : (item.type === 'warning' ? '🟡' : '🔴');
    
    const title = document.createElement('span');
    title.className = 'critique-title';
    title.innerText = item.title;
    
    titleGroup.appendChild(icon);
    titleGroup.appendChild(title);
    header.appendChild(titleGroup);
    
    const badge = document.createElement('span');
    badge.className = 'critique-badge';
    badge.innerText = item.type === 'success' ? 'Optimal' : (item.type === 'warning' ? 'Alert' : 'Critical');
    header.appendChild(badge);
    
    const body = document.createElement('div');
    body.className = 'critique-card-body';
    
    const msg = document.createElement('p');
    msg.innerHTML = item.message;
    body.appendChild(msg);
    
    if (item.evidence) {
      const ev = document.createElement('div');
      ev.className = 'critique-evidence-link';
      ev.innerHTML = `<strong>Microbiology Rationale:</strong> ${item.evidence}`;
      body.appendChild(ev);
    }
    
    card.appendChild(header);
    card.appendChild(body);
    container.appendChild(card);
  });
}

function updateAlertBadges(alertCount) {
  const desktopBadge = document.getElementById('desktop-critique-badge');
  const mobileBadge = document.getElementById('mobile-critique-badge');
  
  if (alertCount > 0) {
    if (desktopBadge) {
      desktopBadge.innerText = alertCount;
      desktopBadge.classList.remove('hidden');
    }
    if (mobileBadge) {
      mobileBadge.innerText = alertCount;
      mobileBadge.classList.remove('hidden');
    }
  } else {
    if (desktopBadge) {
      desktopBadge.classList.add('hidden');
    }
    if (mobileBadge) {
      mobileBadge.classList.add('hidden');
    }
  }
}

function renderSpectrumMatrix() {
  const table = document.getElementById('spectrum-matrix-table');
  table.innerHTML = '';
  
  const selectedSyndrome = state.config.selectedSyndrome;
  const isDirected = state.config.treatmentMode === "directed";
  const syndromeBugs = SYNDROMES[selectedSyndrome].expectedPathogens;
  const activeDrugs = Array.from(state.config.proposedRegimen);
  
  // Determine which bugs (rows) to display
  let caseBugs = [...syndromeBugs];
  if (isDirected && state.config.isolatedPathogen && !caseBugs.includes(state.config.isolatedPathogen)) {
    caseBugs.push(state.config.isolatedPathogen);
  }
  
  let displayBugs = [];
  if (state.config.spectrumViewMode === 'case' || state.config.spectrumViewMode === 'alternatives') {
    displayBugs = caseBugs;
  } else {
    // Full matrix: expected/isolated bugs first, then all others
    displayBugs = [...caseBugs];
    Object.keys(PATHOGENS).forEach(group => {
      Object.keys(PATHOGENS[group].bugs).forEach(bugId => {
        if (!displayBugs.includes(bugId)) displayBugs.push(bugId);
      });
    });
  }
  
  // Determine which drugs (columns) to display
  let displayDrugs = [];
  if (state.config.spectrumViewMode === 'case') {
    displayDrugs = activeDrugs;
  } else {
    // Proposed drugs first, then alternative drugs
    displayDrugs = [...activeDrugs];
    Object.keys(ANTIBIOTICS).forEach(id => {
      if (!displayDrugs.includes(id)) displayDrugs.push(id);
    });
  }
  
  // Handle empty columns in Case view if no drugs proposed
  if (displayDrugs.length === 0) {
    const trEmpty = document.createElement('tr');
    const tdEmpty = document.createElement('td');
    tdEmpty.colSpan = 2;
    tdEmpty.style.textAlign = 'center';
    tdEmpty.style.padding = '2.5rem 1.5rem';
    tdEmpty.style.color = 'var(--text-muted)';
    tdEmpty.innerHTML = `No proposed antibiotics selected. <br><br>Add drugs in **Case Builder** to check coverage, or toggle **Compare Alternatives** above.`;
    trEmpty.appendChild(tdEmpty);
    table.appendChild(trEmpty);
    return;
  }

  // Table Header
  const thead = document.createElement('thead');
  const trHeader = document.createElement('tr');
  
  const thPathogen = document.createElement('th');
  thPathogen.innerText = "Pathogen / Bacteria";
  trHeader.appendChild(thPathogen);
  
  displayDrugs.forEach(drugId => {
    const th = document.createElement('th');
    th.innerText = ANTIBIOTICS[drugId].name;
    if (activeDrugs.includes(drugId)) {
      th.style.color = 'var(--color-primary)';
      th.style.borderBottom = '2px solid var(--color-primary)';
    }
    trHeader.appendChild(th);
  });
  thead.appendChild(trHeader);
  table.appendChild(thead);

  // Table Body
  const tbody = document.createElement('tbody');
  
  displayBugs.forEach(bugId => {
    let bugName = bugId;
    let isExpected = syndromeBugs.includes(bugId);
    
    Object.keys(PATHOGENS).forEach(group => {
      if (PATHOGENS[group].bugs[bugId]) bugName = PATHOGENS[group].bugs[bugId];
    });

    const tr = document.createElement('tr');
    if (isExpected) {
      tr.style.background = 'hsla(192, 95%, 45%, 0.03)';
    }

    const tdName = document.createElement('td');
    tdName.innerHTML = `<span class="clickable-bug" data-bug-id="${bugId}">${bugName}</span> ${isExpected ? '<span style="font-size: 0.65rem; color: var(--color-primary); margin-left: 0.25rem;">(expected)</span>' : ''}`;
    tr.appendChild(tdName);

    displayDrugs.forEach(drugId => {
      const td = document.createElement('td');
      const score = SPECTRUM[drugId]?.[bugId] || 0;
      td.className = `cell-${score}`;
      td.innerText = score === 2 ? 'S' : (score === 1 ? 'I' : 'R');
      tr.appendChild(td);
    });
    
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
}

function renderGuidelines(syndrome) {
  const niceBox = document.getElementById('nice-guideline-text');
  const smiBox = document.getElementById('smi-guideline-text');
  
  const g = GUIDELINES[syndrome] || { nice: "No guideline available.", smi: "No standard diagnostic guidance." };
  niceBox.innerText = g.nice;
  smiBox.innerText = g.smi;
}
