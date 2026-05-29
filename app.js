import { PATHOGENS, SYNDROMES, ANTIBIOTICS, SPECTRUM, GUIDELINES } from './data.js';

// --- RECOMMENDED THERAPY GUIDELINE DATABASE ---
const RECOMMENDATIONS = {
  "cap": { drugs: ["amoxicillin"], dose: "500mg", route: "PO", freq: "Q8h", duration: "5 days", rationale: "First-line empirical coverage of Streptococcus pneumoniae and Haemophilus influenzae for non-severe CAP." },
  "hap": { drugs: ["piperacillin_tazobactam"], dose: "4.5g", route: "IV", freq: "Q8h", duration: "5-7 days", rationale: "Empirical antipseudomonal pen/BLI combination covering hospital Gram-negatives and anaerobes." },
  "uti_cystitis": { drugs: ["nitrofurantoin"], dose: "100mg", route: "PO", freq: "Q12h", duration: "3 days", rationale: "Concentrates highly in urine with minimal systemic effect, preserving gut flora." },
  "uti_pyelonephritis": { drugs: ["ceftriaxone"], dose: "2g", route: "IV", freq: "Q24h", duration: "7 days", rationale: "Achieves high systemic and renal tissue levels, covering typical coliforms." },
  "cellulitis": { drugs: ["flucloxacillin"], dose: "1g", route: "PO", freq: "Q6h", duration: "5-7 days", rationale: "First-line antistaphylococcal penicillin covering S. pyogenes and MSSA." },
  "osteomyelitis": { drugs: ["flucloxacillin"], dose: "2g", route: "IV", freq: "Q6h", duration: "6 weeks", rationale: "High-dose bactericidal therapy targeting MSSA and Streptococci." },
  "meningitis": { drugs: ["ceftriaxone"], dose: "2g", route: "IV", freq: "Q12h", duration: "10-14 days", rationale: "Excellent blood-brain barrier penetration at high doses to target meningeal pathogens." },
  "intra_abdominal": { drugs: ["piperacillin_tazobactam"], dose: "4.5g", route: "IV", freq: "Q8h", duration: "5-7 days", rationale: "Broad-spectrum coverage of coliforms, enterococci, and anaerobes." },
  "cholecystitis_cholangitis": { drugs: ["co_amoxiclav"], dose: "1.2g", route: "IV", freq: "Q8h", duration: "3-5 days", rationale: "Good biliary excretion covering enteric Gram-negatives and anaerobes." },
  "neutropenic_sepsis": { drugs: ["piperacillin_tazobactam"], dose: "4.5g", route: "IV", freq: "Q8h", duration: "7 days", rationale: "Emergency monotherapy covering Pseudomonas aeruginosa and typical bloodstream pathogens." },
  "copd_exacerbation": { drugs: ["amoxicillin"], dose: "500mg", route: "PO", freq: "Q8h", duration: "5 days", rationale: "NICE NG114 recommended agent for respiratory tract pathogens in COPD." },
  "tonsillitis": { drugs: ["amoxicillin"], dose: "500mg", route: "PO", freq: "Q8h", duration: "10 days", rationale: "Amoxicillin or Phenoxymethylpenicillin PO targets Group A Streptococcus." },
  "sinusitis": { drugs: ["amoxicillin"], dose: "500mg", route: "PO", freq: "Q8h", duration: "5 days", rationale: "NICE NG133 first-line for acute bacterial sinus infections." },
  "bite_infection": { drugs: ["co_amoxiclav"], dose: "625mg", route: "PO", freq: "Q8h", duration: "5 days", rationale: "Co-amoxiclav is required to cover Pasteurella and oral anaerobes in bite wounds." },
  "sepsis_unknown": { drugs: ["piperacillin_tazobactam"], dose: "4.5g", route: "IV", freq: "Q8h", duration: "5-7 days", rationale: "Broad empirical Gram-negative and Pseudomonas cover for sepsis without a clear source." },
  "infective_endocarditis": { drugs: ["amoxicillin", "gentamicin"], dose: "2g / 80mg", route: "IV", freq: "Q4h / Q12h", duration: "4-6 weeks", rationale: "Bactericidal synergistic combination targeting enterococci and streptococci." },
  "c_difficile": { drugs: ["vancomycin"], dose: "125mg", route: "PO", freq: "Q6h", duration: "10 days", rationale: "Oral Vancomycin is not absorbed, concentrating in the colon lumen to kill C. difficile." },
  
  // New Expanded Syndromes
  "bronchitis": { drugs: ["amoxicillin"], dose: "500mg", route: "PO", freq: "Q8h", duration: "5 days", rationale: "First-line PO if antibiotic is clinically indicated for acute bronchitis." },
  "cauti": { drugs: ["co_amoxiclav"], dose: "625mg", route: "PO", freq: "Q8h", duration: "7 days", rationale: "NICE NG113 coverage for catheter biofilm-related coliforms." },
  "prostatitis": { drugs: ["ciprofloxacin"], dose: "500mg", route: "PO", freq: "Q12h", duration: "14 days", rationale: "Fluoroquinolones achieve therapeutic levels in prostatic fluid to clear bacterial prostatitis." },
  "diverticulitis": { drugs: ["co_amoxiclav"], dose: "1.2g", route: "IV", freq: "Q8h", duration: "5 days", rationale: "Covers enteric Gram-negatives and anaerobes involved in diverticular inflammation." },
  "sbp": { drugs: ["ceftriaxone"], dose: "2g", route: "IV", freq: "Q24h", duration: "5 days", rationale: "BSG first-line agent, avoiding nephrotoxicity in cirrhotic patients." },
  "diabetic_foot": { drugs: ["co_amoxiclav"], dose: "1.2g", route: "IV", freq: "Q8h", duration: "7-14 days", rationale: "NICE NG19 recommended agent for moderate-to-severe foot infections." },
  "necrotising_fasciitis": { drugs: ["meropenem", "vancomycin"], dose: "1g / 1.5g", route: "IV / IV", freq: "Q8h / Q12h", duration: "Surgical recovery", rationale: "Immediate surgical debridement is key. Broad carbapenem coverage + toxin-suppression. Clindamycin also recommended." },
  "pid": { drugs: ["ceftriaxone", "metronidazole"], dose: "1g IM / 400mg PO", route: "IV / PO", freq: "Stat / Q12h", duration: "14 days", rationale: "BASHH recommended coverage of Gonococcus, Chlamydia, and vaginal anaerobes. Doxycycline PO also required." },
  "crbsi": { drugs: ["vancomycin", "ceftazidime"], dose: "15mg/kg / 2g", route: "IV", freq: "Q12h / Q8h", duration: "10-14 days", rationale: "Empirical vascular access line coverage covering MRSA, coag-negative staph, and Pseudomonas." }
};

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
    currentStep: 1,
    syndromeSearchQuery: "",
    treatmentMode: "empiric", // "empiric" or "directed"
    selectedSyndrome: "cap",
    microIsolates: [], // array of { id, name, antibiogram: { drugId -> "S"|"I"|"R" } }
    currentRegimen: {}, // drugId -> { dose, route, freq }
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
  // Stepper Transitions Click Handler
  const indicators = document.querySelectorAll('.step-indicator');
  indicators.forEach(ind => {
    ind.addEventListener('click', () => {
      const targetStep = parseInt(ind.getAttribute('data-step'));
      // Don't let users skip forward past validation checks
      if (targetStep < state.config.currentStep || canAdvanceStep(state.config.currentStep, targetStep)) {
        goToStep(targetStep);
      }
    });
  });

  // Footer Navigation Buttons
  document.getElementById('btn-prev').addEventListener('click', () => {
    if (state.config.currentStep > 1) {
      goToStep(state.config.currentStep - 1);
    }
  });

  document.getElementById('btn-next').addEventListener('click', () => {
    if (state.config.currentStep < 4) {
      if (canAdvanceStep(state.config.currentStep, state.config.currentStep + 1)) {
        goToStep(state.config.currentStep + 1);
      }
    } else {
      // Step 4 "Next" acts as restart
      restartWizard();
    }
  });

  // Syndrome Search
  const searchInput = document.getElementById('syndrome-search');
  const clearSearchBtn = document.getElementById('clear-syndrome-search');
  searchInput.addEventListener('input', (e) => {
    state.config.syndromeSearchQuery = e.target.value;
    clearSearchBtn.style.display = e.target.value ? 'block' : 'none';
    renderSyndromesList();
  });

  clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    state.config.syndromeSearchQuery = '';
    clearSearchBtn.style.display = 'none';
    renderSyndromesList();
  });

  // Microbiology Mode Switching
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
    populateIsolatesDropdown();
    renderAll();
  });

  // Pathogen Adder
  document.getElementById('btn-add-pathogen').addEventListener('click', () => {
    const select = document.getElementById('isolated-pathogen-select');
    const bugId = select.value;
    if (!bugId) return;

    // Check if already added
    const exists = state.config.microIsolates.find(item => item.id === bugId);
    if (exists) return;

    // Get bug readable name
    let bugName = bugId;
    Object.keys(PATHOGENS).forEach(group => {
      if (PATHOGENS[group].bugs[bugId]) bugName = PATHOGENS[group].bugs[bugId];
    });

    // Create antibiogram sensitivities (default wildtype)
    const antibiogram = {};
    Object.keys(ANTIBIOTICS).forEach(drugId => {
      const baseline = SPECTRUM[drugId]?.[bugId] || 0;
      antibiogram[drugId] = baseline >= 2 ? "S" : (baseline === 1 ? "I" : "R");
    });

    state.config.microIsolates.push({
      id: bugId,
      name: bugName,
      antibiogram
    });

    renderAddedIsolates();
    renderAll();
  });

  // Physiology Inputs
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

  // Clear current regimen
  document.getElementById('clear-current-regimen').addEventListener('click', () => {
    state.config.currentRegimen = {};
    renderCurrentRegimenSelectors();
    renderAll();
  });

  // Tab Switching (Step 4 Dashboard)
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      
      btn.classList.add('active');
      const contentId = btn.getAttribute('data-tab');
      document.getElementById(contentId).classList.add('active');
    });
  });

  // Mobile Bottom Navigation sync
  const mobileNavBtns = document.querySelectorAll('.mobile-nav-btn');
  mobileNavBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      mobileNavBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const targetTab = btn.getAttribute('data-tab');
      if (targetTab === 'col-wizard') {
        document.body.classList.remove('show-outputs');
        document.body.classList.add('show-inputs'); // showing wizard
      } else {
        document.body.classList.remove('show-inputs');
        document.body.classList.add('show-outputs'); // showing tabs
        
        const desktopTabBtn = document.querySelector(`.tab-btn[data-tab="${targetTab}"]`);
        if (desktopTabBtn) desktopTabBtn.click();
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // Sync desktop tabs back to mobile
  tabButtons.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabId = tab.getAttribute('data-tab');
      const correspondingMobileBtn = document.querySelector(`.mobile-nav-btn[data-tab="${tabId}"]`);
      if (correspondingMobileBtn) {
        mobileNavBtns.forEach(b => b.classList.remove('active'));
        correspondingMobileBtn.classList.add('active');
      }
    });
  });

  // Spectrum matrix toggles
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

  // Clicking a pathogen name triggers recommendation modal
  document.body.addEventListener('click', (e) => {
    const clickable = e.target.closest('.clickable-bug');
    if (clickable) {
      const bugId = clickable.getAttribute('data-bug-id');
      showBugRecommendations(bugId);
    }
  });

  // Modal Close triggers
  const modal = document.getElementById('recommendation-modal');
  document.getElementById('close-modal-btn').addEventListener('click', () => {
    modal.classList.add('hidden');
  });
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
    }
  });

  // Initial runs
  renderSyndromesList();
  populateIsolatesDropdown();
  renderCurrentRegimenSelectors();
  populateLookupDropdown();
  queryLookup();
}

// --- STATE SWITCHING WIZARD LOGIC ---

function goToStep(step) {
  state.config.currentStep = step;
  
  // Set body class for visibility styling
  document.body.className = '';
  document.body.classList.add('step-' + step);

  // Update Stepper indicators
  document.querySelectorAll('.step-indicator').forEach(ind => {
    const indStep = parseInt(ind.getAttribute('data-step'));
    ind.classList.remove('active', 'completed');
    if (indStep === step) {
      ind.classList.add('active');
    } else if (indStep < step) {
      ind.classList.add('completed');
    }
  });

  // Configure navigation buttons
  const prevBtn = document.getElementById('btn-prev');
  const nextBtn = document.getElementById('btn-next');
  
  prevBtn.disabled = (step === 1);
  
  if (step === 3) {
    nextBtn.innerText = "Evaluate Regimen ⚖️";
  } else if (step === 4) {
    nextBtn.innerText = "Restart Audit 🔄";
  } else {
    nextBtn.innerText = "Next Step →";
  }

  // Focus layout
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Evaluate if landing on step 4
  if (step === 4) {
    renderAll();
  }
}

function canAdvanceStep(current, target) {
  if (target <= current) return true; // always allow going backwards

  if (current === 1) {
    if (!state.config.selectedSyndrome) {
      alert("Please select a Clinical Syndrome to proceed.");
      return false;
    }
  }

  if (current === 2) {
    if (state.config.treatmentMode === 'directed' && state.config.microIsolates.length === 0) {
      alert("Please add at least one Isolated Pathogen, or select 'Empiric' mode.");
      return false;
    }
  }

  return true;
}

function restartWizard() {
  state.config.currentStep = 1;
  state.config.selectedSyndrome = "cap";
  state.config.treatmentMode = "empiric";
  state.config.microIsolates = [];
  state.config.currentRegimen = {};
  state.config.syndromeSearchQuery = "";
  
  document.getElementById('syndrome-search').value = "";
  document.getElementById('mode-empiric').click();

  renderSyndromesList();
  renderCurrentRegimenSelectors();
  goToStep(1);
}

// --- STEP 1: RENDERING & FILTERING SYNDROMES ---

function renderSyndromesList() {
  const container = document.getElementById('syndromes-list-container');
  if (!container) return;
  container.innerHTML = '';

  const query = state.config.syndromeSearchQuery.toLowerCase().trim();

  // Group syndromes by Site / System
  const grouped = {};
  Object.keys(SYNDROMES).forEach(key => {
    const s = SYNDROMES[key];
    
    // Perform search matching
    const matchesName = s.name.toLowerCase().includes(query);
    const matchesDesc = s.description.toLowerCase().includes(query);
    const matchesSite = s.site.toLowerCase().includes(query);
    if (query && !matchesName && !matchesDesc && !matchesSite) return;

    const site = s.site || "General / Other";
    if (!grouped[site]) grouped[site] = [];
    grouped[site].push({ key, ...s });
  });

  const sites = Object.keys(grouped).sort();
  if (sites.length === 0) {
    container.innerHTML = `<div class="info-alert" style="text-align:center; padding: 2rem;">No matching syndromes found for "${state.config.syndromeSearchQuery}".</div>`;
    return;
  }

  sites.forEach(site => {
    const section = document.createElement('div');
    section.className = "syndrome-list-system";
    
    const title = document.createElement('h3');
    title.innerText = site;
    section.appendChild(title);

    const grid = document.createElement('div');
    grid.className = "syndrome-items-grid";

    grouped[site].forEach(s => {
      const item = document.createElement('div');
      item.className = `syndrome-item ${s.key === state.config.selectedSyndrome ? 'active' : ''}`;
      
      const details = document.createElement('div');
      details.className = "syndrome-item-details";

      const name = document.createElement('span');
      name.className = "syndrome-item-name";
      name.innerText = s.name;

      const desc = document.createElement('span');
      desc.className = "syndrome-item-desc";
      desc.innerText = s.description;

      details.appendChild(name);
      details.appendChild(desc);
      item.appendChild(details);

      const indicator = document.createElement('span');
      indicator.className = "syndrome-select-indicator";
      indicator.innerText = s.key === state.config.selectedSyndrome ? "✓" : "→";
      item.appendChild(indicator);

      item.addEventListener('click', () => {
        state.config.selectedSyndrome = s.key;
        renderSyndromesList();
        updateSummaryCard();
      });

      grid.appendChild(item);
    });

    section.appendChild(grid);
    container.appendChild(section);
  });
}

// --- STEP 2: PATHOGEN ADDER & CUSTOM ANTIBIOGRAM RENDERING ---

function populateIsolatesDropdown() {
  const select = document.getElementById('isolated-pathogen-select');
  if (!select) return;
  select.innerHTML = '';

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

function renderAddedIsolates() {
  const container = document.getElementById('added-isolates-list');
  if (!container) return;
  container.innerHTML = '';

  state.config.microIsolates.forEach((isolate, idx) => {
    const card = document.createElement('div');
    card.className = "isolate-card";

    const header = document.createElement('div');
    header.className = "isolate-card-header";

    const name = document.createElement('span');
    name.className = "isolate-name";
    name.innerHTML = `🦠 ${isolate.name}`;

    const delBtn = document.createElement('button');
    delBtn.type = "button";
    delBtn.className = "btn btn-secondary btn-xs";
    delBtn.innerText = "Remove";
    delBtn.addEventListener('click', () => {
      state.config.microIsolates.splice(idx, 1);
      renderAddedIsolates();
      renderAll();
    });

    header.appendChild(name);
    header.appendChild(delBtn);
    card.appendChild(header);

    // Custom Antibiogram Selector Grid Table
    const tableWrapper = document.createElement('div');
    tableWrapper.className = "antibiogram-wrapper";
    tableWrapper.innerHTML = `<label style="font-size:0.75rem;">Antibiogram Sensitivities for ${isolate.name}:</label>`;

    const tableContainer = document.createElement('div');
    tableContainer.className = "antibiogram-table-container";

    const table = document.createElement('table');
    table.className = "antibiogram-table";
    table.innerHTML = `
      <thead>
        <tr>
          <th>Antibiotic</th>
          <th style="text-align:center;">S</th>
          <th style="text-align:center;">I</th>
          <th style="text-align:center;">R</th>
        </tr>
      </thead>
    `;

    const tbody = document.createElement('tbody');
    Object.keys(ANTIBIOTICS).forEach(drugKey => {
      const drug = ANTIBIOTICS[drugKey];
      const sir = isolate.antibiogram[drugKey] || "R";

      const tr = document.createElement('tr');
      const tdName = document.createElement('td');
      tdName.innerText = drug.name;
      tr.appendChild(tdName);

      const tdSIR = document.createElement('td');
      tdSIR.colSpan = 3;

      const group = document.createElement('div');
      group.className = "sir-radio-group";

      ['S', 'I', 'R'].forEach(val => {
        const id = `sir-${isolate.id}-${drugKey}-${val}`;
        const input = document.createElement('input');
        input.type = "radio";
        input.name = `sir-${isolate.id}-${drugKey}`;
        input.id = id;
        input.value = val;
        if (sir === val) input.checked = true;

        input.addEventListener('change', () => {
          isolate.antibiogram[drugKey] = val;
          renderAll();
        });

        const label = document.createElement('label');
        label.htmlFor = id;
        label.className = `lbl-${val.toLowerCase()}`;
        label.innerText = val;

        group.appendChild(input);
        group.appendChild(label);
      });

      tdSIR.appendChild(group);
      tr.appendChild(tdSIR);
      tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    tableContainer.appendChild(table);
    tableWrapper.appendChild(tableContainer);
    card.appendChild(tableWrapper);

    container.appendChild(card);
  });
}

// --- STEP 3: RENDERING REGIMEN CHECKBOX CARDS WITH EXPANDABLE DOSING ---

function renderCurrentRegimenSelectors() {
  const container = document.getElementById('current-antibiotic-list');
  if (!container) return;
  container.innerHTML = '';

  Object.keys(ANTIBIOTICS).forEach(drugId => {
    const drug = ANTIBIOTICS[drugId];
    const isChecked = !!state.config.currentRegimen[drugId];
    const data = state.config.currentRegimen[drugId] || {
      dose: drug.standardDose.split(' ')[0] || "500mg",
      route: drug.name === "Nitrofurantoin" ? "PO" : (["Piperacillin/Tazobactam", "Gentamicin", "Meropenem", "Ceftriaxone", "Ceftazidime", "Daptomycin"].includes(drug.name) ? "IV" : "PO"),
      freq: "Q8h"
    };

    const card = document.createElement('div');
    card.className = `drug-checkbox-card ${isChecked ? 'checked' : ''}`;
    
    if (drug.subtext) {
      card.setAttribute('data-tooltip', drug.subtext);
    }

    const header = document.createElement('div');
    header.className = "drug-checkbox-header-row";
    
    const checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.id = `check-curr-${drugId}`;
    checkbox.checked = isChecked;

    const labelName = document.createElement('span');
    labelName.className = "drug-name-text";
    labelName.innerText = drug.name;

    header.appendChild(checkbox);
    header.appendChild(labelName);
    card.appendChild(header);

    // Dosing form visible if checked
    if (isChecked) {
      const dosingForm = document.createElement('div');
      dosingForm.className = "drug-sub-dosing-form";
      
      const grid = document.createElement('div');
      grid.className = "form-grid-three";

      // Dose Input
      const gpDose = document.createElement('div');
      gpDose.className = "form-group";
      gpDose.innerHTML = `<label style="font-size:0.65rem;">Dose</label>`;
      const inputDose = document.createElement('input');
      inputDose.type = "text";
      inputDose.value = data.dose;
      inputDose.className = "form-control";
      inputDose.addEventListener('input', (e) => {
        state.config.currentRegimen[drugId].dose = e.target.value;
        updateSummaryCard();
      });
      gpDose.appendChild(inputDose);

      // Route Selection
      const gpRoute = document.createElement('div');
      gpRoute.className = "form-group";
      gpRoute.innerHTML = `<label style="font-size:0.65rem;">Route</label>`;
      const selectRoute = document.createElement('select');
      selectRoute.className = "form-control";
      
      // Filter routes based on drug class/limitations
      let routes = ["IV", "PO"];
      if (["Piperacillin/Tazobactam", "Gentamicin", "Meropenem", "Ceftriaxone", "Ceftazidime", "Daptomycin"].includes(drug.name)) {
        routes = ["IV"]; // IV-only database agents
      } else if (drug.name === "Nitrofurantoin") {
        routes = ["PO"];
      }

      routes.forEach(r => {
        const opt = document.createElement('option');
        opt.value = r;
        opt.text = r;
        if (data.route === r) opt.selected = true;
        selectRoute.appendChild(opt);
      });

      selectRoute.addEventListener('change', (e) => {
        state.config.currentRegimen[drugId].route = e.target.value;
        updateSummaryCard();
        renderAll(); // PK traps depend on route
      });
      gpRoute.appendChild(selectRoute);

      // Frequency Selection
      const gpFreq = document.createElement('div');
      gpFreq.className = "form-group";
      gpFreq.innerHTML = `<label style="font-size:0.65rem;">Freq</label>`;
      const selectFreq = document.createElement('select');
      selectFreq.className = "form-control";
      ["Q4h", "Q6h", "Q8h", "Q12h", "Q24h", "Q36h", "Q48h"].forEach(f => {
        const opt = document.createElement('option');
        opt.value = f;
        opt.text = f;
        if (data.freq === f) opt.selected = true;
        selectFreq.appendChild(opt);
      });
      selectFreq.addEventListener('change', (e) => {
        state.config.currentRegimen[drugId].freq = e.target.value;
        updateSummaryCard();
      });
      gpFreq.appendChild(selectFreq);

      grid.appendChild(gpDose);
      grid.appendChild(gpRoute);
      grid.appendChild(gpFreq);
      dosingForm.appendChild(grid);
      card.appendChild(dosingForm);
    }

    // Toggle Checkbox event
    header.addEventListener('click', (e) => {
      if (e.target !== checkbox) {
        checkbox.checked = !checkbox.checked;
      }
      
      if (checkbox.checked) {
        state.config.currentRegimen[drugId] = {
          dose: drug.standardDose.split(' ')[0] || "500mg",
          route: drug.name === "Nitrofurantoin" ? "PO" : (["Piperacillin/Tazobactam", "Gentamicin", "Meropenem", "Ceftriaxone", "Ceftazidime", "Daptomycin"].includes(drug.name) ? "IV" : "PO"),
          freq: "Q8h"
        };
      } else {
        delete state.config.currentRegimen[drugId];
      }
      renderCurrentRegimenSelectors();
      updateSummaryCard();
    });

    container.appendChild(card);
  });
}

// --- STICKY SUMMARY ENGINE ---

function updateSummaryCard() {
  const syndrome = SYNDROMES[state.config.selectedSyndrome];
  document.getElementById('summary-syndrome-name').innerText = syndrome ? syndrome.name : "None Selected";
  document.getElementById('summary-syndrome-site').innerText = syndrome ? syndrome.site : "-";

  // Micro Status
  const microVal = document.getElementById('summary-micro-status');
  const microList = document.getElementById('summary-micro-isolates');
  if (state.config.treatmentMode === 'empiric') {
    microVal.innerText = "Empirical";
    microVal.className = "summary-value text-warning";
    microList.innerHTML = "Typical syndrome flora covered.";
  } else {
    microVal.innerText = "Culture Directed";
    microVal.className = "summary-value text-success";
    if (state.config.microIsolates.length === 0) {
      microList.innerHTML = "No isolates added";
    } else {
      microList.innerHTML = state.config.microIsolates.map(item => `<li>🦠 ${item.name}</li>`).join('');
    }
  }

  // Physiology
  const { age, sex, weight, height, creatinine } = state.patient;
  document.getElementById('summary-patient-clearance').innerText = `CrCl ${state.calculatedCrCl} ml/min`;
  document.getElementById('summary-patient-demographics').innerText = `${age}${sex.charAt(0).toUpperCase()}, ${weight}kg, ${height}cm`;

  // Current Regimen
  const curReg = state.config.currentRegimen;
  const curKeys = Object.keys(curReg);
  const curVal = document.getElementById('summary-current-regimen-value');
  const curList = document.getElementById('summary-current-regimen-list');
  if (curKeys.length === 0) {
    curVal.innerText = "No therapy selected";
    curVal.className = "summary-value text-danger";
    curList.innerHTML = "No drugs audited";
  } else {
    curVal.innerText = `${curKeys.length} drug${curKeys.length > 1 ? 's' : ''} audited`;
    curVal.className = "summary-value text-success";
    curList.innerHTML = curKeys.map(key => `<li>💊 ${ANTIBIOTICS[key].name} (${curReg[key].dose} ${curReg[key].route} ${curReg[key].freq})</li>`).join('');
  }
}

// --- COCKCROFT-GAULT RENAL CLEARANCE ENGINE ---

function calculateRenalClearance() {
  const { age, sex, weight, height, creatinine, useAdjustedWeight } = state.patient;
  
  // Ideal Body Weight (IBW)
  const heightInches = height / 2.54;
  const inchesOver5Feet = Math.max(0, heightInches - 60);
  
  let ibw = 0;
  if (sex === 'male') {
    ibw = 50.0 + (2.3 * inchesOver5Feet);
  } else {
    ibw = 45.5 + (2.3 * inchesOver5Feet);
  }
  
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
  
  const constant = sex === 'male' ? 1.23 : 1.04;
  const crcl = ((140 - age) * weightUsed * constant) / creatinine;
  
  state.calculatedCrCl = Math.round(crcl);
  state.isObese = isObese;
  state.ibw = Math.round(ibw * 10) / 10;
  state.ajbw = Math.round(ajbw * 10) / 10;
  state.weightUsed = weightUsed;
  
  updateRenalUI();
}

function updateRenalUI() {
  const headerBadge = document.getElementById('header-crcl-badge');
  const summaryBadge = document.getElementById('summary-renal-clearance');
  const valueLabel = document.getElementById('crcl-value');
  const expLabel = document.getElementById('crcl-explanation');
  
  const crcl = state.calculatedCrCl;
  valueLabel.innerText = `${crcl} ml/min`;
  
  headerBadge.className = 'stat-value';
  summaryBadge.className = 'badge';
  
  if (crcl >= 90) {
    headerBadge.classList.add('text-success');
    headerBadge.innerText = `Normal (>90 ml/min)`;
    summaryBadge.classList.add('badge-success');
    summaryBadge.innerText = 'Normal Renal function';
  } else if (crcl >= 50) {
    headerBadge.classList.add('text-success');
    headerBadge.innerText = `Mild Impairment (${crcl} ml/min)`;
    summaryBadge.classList.add('badge-success');
    summaryBadge.innerText = 'Mild Renal Impairment';
  } else if (crcl >= 30) {
    headerBadge.classList.add('text-warning');
    headerBadge.innerText = `Moderate Renal Impairment (${crcl} ml/min)`;
    summaryBadge.classList.add('badge-warning');
    summaryBadge.innerText = 'Mod Renal Impairment';
  } else if (crcl >= 15) {
    headerBadge.classList.add('text-danger');
    headerBadge.innerText = `Severe Renal Impairment (${crcl} ml/min)`;
    summaryBadge.classList.add('badge-danger');
    summaryBadge.innerText = 'Severe Renal Impairment';
  } else {
    headerBadge.classList.add('text-danger');
    headerBadge.innerText = `End Stage / ESRF (<15 ml/min)`;
    summaryBadge.classList.add('badge-danger');
    summaryBadge.innerText = 'End Stage Renal Failure';
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

// --- PATHOGEN RECOMMENDATION DIALOG MODAL ---

function showBugRecommendations(bugId) {
  let bugName = bugId;
  Object.keys(PATHOGENS).forEach(group => {
    if (PATHOGENS[group].bugs[bugId]) bugName = PATHOGENS[group].bugs[bugId];
  });

  const modal = document.getElementById('recommendation-modal');
  const title = document.getElementById('modal-bug-name');
  const listContainer = document.getElementById('modal-recommendations-list');

  title.innerText = `Empirical Cover: ${bugName}`;
  listContainer.innerHTML = '';

  const recommendations = [];
  Object.keys(ANTIBIOTICS).forEach(drugId => {
    const score = SPECTRUM[drugId]?.[bugId] || 0;
    if (score === 2) {
      recommendations.push(ANTIBIOTICS[drugId]);
    }
  });

  if (recommendations.length === 0) {
    listContainer.innerHTML = `<p style="font-size: 0.85rem; color: var(--text-muted); text-align: center; margin-top: 1rem;">No antibiotic in the database provides full empirical cover (2) for this bug.</p>`;
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

// --- RULES ENGINE: AUDITING & CRITIQUES ---

function compileRegimenCritiques() {
  const critiques = [];
  const current = Object.keys(state.config.currentRegimen);
  const syndrome = state.config.selectedSyndrome;
  const isDirected = state.config.treatmentMode === "directed";
  const crcl = state.calculatedCrCl;

  renderGuidelines(syndrome);

  if (current.length === 0) {
    critiques.push({
      type: "warning",
      title: "No Current Regimen Selected",
      message: "Please audit at least one antibiotic in **Step 3** to receive a diagnostic critique of the patient's therapy.",
      evidence: "Clinical pathways require checking patient charts before evaluating therapy."
    });
    return critiques;
  }

  // 1. Specific Dosing & Renal Clearance warnings
  current.forEach(drugId => {
    const drug = ANTIBIOTICS[drugId];
    const patientDose = state.config.currentRegimen[drugId];
    
    // Check renal rules
    let adjustmentFound = null;
    for (let rule of drug.renalAdjustments) {
      if (crcl <= rule.maxCrCl && crcl >= rule.minCrCl) {
        adjustmentFound = rule;
        break;
      }
    }

    if (adjustmentFound) {
      const maxCrClVal = adjustmentFound.maxCrCl;
      if (maxCrClVal <= 30 && drugId === 'nitrofurantoin') {
        critiques.push({
          type: "danger",
          title: `CONTRAINDICATED: Nitrofurantoin`,
          message: `Your patient has an estimated CrCl of **${crcl} ml/min**. Nitrofurantoin is ineffective and carries risk of peripheral neuropathy due to reduced urine concentration.`,
          evidence: "NICE guidelines state that Nitrofurantoin is contraindicated if eGFR/CrCl is less than 30 ml/min."
        });
      } else {
        critiques.push({
          type: "warning",
          title: `Renal Adjustment Alert: ${drug.name}`,
          message: `Your patient has an estimated CrCl of **${crcl} ml/min**. Audit recommends: **${adjustmentFound.recommendedDose}** (Patient is on ${patientDose.dose} ${patientDose.route} ${patientDose.freq}).`,
          evidence: "Renal clearance changes drug serum half-life. Reduced clearance without dose reduction causes systemic toxicity."
        });
      }
    } else {
      critiques.push({
        type: "success",
        title: `Dosing Clear: ${drug.name}`,
        message: `Dose parameters align with standard renal clearance values (>50 ml/min).`,
        evidence: "Estimated clearance exceeds critical clearance boundaries for this compound."
      });
    }
  });

  // 2. PK Traps (surfactant binding, tissue penetration, routes)
  current.forEach(drugId => {
    const drug = ANTIBIOTICS[drugId];
    const patientDose = state.config.currentRegimen[drugId];

    // Surfactant / tissue traps
    if (drug.pkTraps && drug.pkTraps[syndrome]) {
      critiques.push({
        type: "danger",
        title: `PK Trap (Tissue Barrier): ${drug.name}`,
        message: drug.pkTraps[syndrome],
        evidence: "In vitro susceptibility profiles do not guarantee in vivo success if the drug cannot physically reach the source of infection at therapeutic levels."
      });
    }

    // Vancomycin route PK traps (colonic vs systemic)
    if (drugId === "vancomycin") {
      if (syndrome === "c_difficile" && patientDose.route === "IV") {
        critiques.push({
          type: "danger",
          title: "PK Trap: IV Vancomycin for C. difficile Colitis",
          message: "Intravenous (IV) Vancomycin is excreted into the urine and bile but does not cross the bowel lumen. It fails to reach therapeutic levels in the colon to treat Clostridioides difficile colitis. **Recommend Oral (PO) Vancomycin.**",
          evidence: "NICE NG199 recommends oral Vancomycin as first-line treatment for C. difficile, as it concentrates exclusively in the gut lumen."
        });
      } else if (patientDose.route === "PO" && ["sepsis_unknown", "neutropenic_sepsis", "infective_endocarditis", "crbsi", "uti_pyelonephritis"].includes(syndrome)) {
        critiques.push({
          type: "danger",
          title: "PK Trap: PO Vancomycin for Systemic Infection",
          message: "Oral (PO) Vancomycin is not absorbed systemically from the gastrointestinal tract and will fail to treat bloodstream infections or tissue sepsis. **Recommend Intravenous (IV) Vancomycin.**",
          evidence: "Glycopeptides have extremely poor oral bioavailability due to high molecular size. Serum levels are negligible after PO dosing."
        });
      }
    }
  });

  // 3. Empirical Spectrum Gaps
  if (!isDirected) {
    const expected = SYNDROMES[syndrome].expectedPathogens;
    const uncovered = [];

    expected.forEach(bugId => {
      let covered = false;
      current.forEach(drugId => {
        if ((SPECTRUM[drugId]?.[bugId] || 0) >= 2) {
          covered = true;
        }
      });
      if (!covered) {
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
        message: `Your current regimen leaves the following expected pathogens untreated for ${SYNDROMES[syndrome].name}: ${uncovered.join(', ')}. <br><br><strong>Tip:</strong> Click any red-badged pathogen name above to view a list of recommended covering agents.`,
        evidence: "Empirical regimens should cover typical clinical flora associated with the site of infection until cultures are available. Check the Spectrum Grid tab for detailed matrices."
      });
    } else {
      critiques.push({
        type: "success",
        title: "Adequate Empirical Spectrum",
        message: `Your current regimen covers 100% of typical organisms expected for **${SYNDROMES[syndrome].name}**.`,
        evidence: "Meets baseline empirical recommendations for local guidelines comparison."
      });
    }

    // Actionable Guideline Congruence Checks
    if (syndrome === "cellulitis" && !current.includes("flucloxacillin")) {
      critiques.push({
        type: "warning",
        title: "Guideline Discordance: Cellulitis",
        message: "Your current regimen does not contain **Flucloxacillin**. NICE Guideline NG141 recommends Flucloxacillin PO/IV as first-line empirical therapy to target Streptococcus pyogenes and Staphylococcus aureus.",
        evidence: "Flucloxacillin is the standard UK agent for skin/soft tissue infections due to its narrow spectrum and stability against staphylococcal penicillinases."
      });
    }

    if (syndrome === "cap" && !current.includes("amoxicillin") && !current.includes("co_amoxiclav")) {
      critiques.push({
        type: "warning",
        title: "Guideline Discordance: CAP",
        message: "Your current regimen lacks a standard first-line agent. NICE Guideline NG138 recommends **Amoxicillin** PO (non-severe CAP) or **Co-amoxiclav** + **Clarithromycin** (severe HAP/CAP).",
        evidence: "Amoxicillin is preferred to maintain narrow-spectrum coverage of Streptococcus pneumoniae and prevent carbapenem resistance."
      });
    }

    if (syndrome === "uti_cystitis" && !current.includes("nitrofurantoin")) {
      critiques.push({
        type: "warning",
        title: "Guideline Discordance: Cystitis",
        message: "Your current regimen lacks first-line cover. NICE Guideline NG109 recommends **Nitrofurantoin** as first-line empirical therapy.",
        evidence: "Nitrofurantoin concentrates exclusively in the lower urinary tract and has low resistance rates for coliforms in the UK."
      });
    }
  }

  // 4. Directed Mode Resistance Checks
  if (isDirected) {
    state.config.microIsolates.forEach(isolate => {
      let activeSens = "R";
      let coverageScoreMax = 0;

      current.forEach(drugId => {
        const score = SPECTRUM[drugId]?.[isolate.id] || 0;
        if (score > coverageScoreMax) coverageScoreMax = score;

        const sens = isolate.antibiogram[drugId] || "R";
        if (sens === "S" && activeSens !== "S") activeSens = "S";
        else if (sens === "I" && activeSens === "R") activeSens = "I";
      });

      if (activeSens === "R") {
        critiques.push({
          type: "danger",
          title: `Inadequate Treatment: Resistant ${isolate.name}`,
          message: `The isolated **${isolate.name}** is resistant (**R**) in vitro to your selected current agents. This therapy will fail.`,
          evidence: "Pathogen-directed therapy must target agents with confirmed susceptibility (S or I) in the antibiogram."
        });
      } else if (coverageScoreMax === 0) {
        critiques.push({
          type: "danger",
          title: `Inadequate Treatment: No Activity`,
          message: `Your current regimen contains no drugs with inherent biological activity against isolated **${isolate.name}**.`,
          evidence: "Verify pathogen taxonomy and active drug targets on the Spectrum tab."
        });
      } else {
        critiques.push({
          type: "success",
          title: `Adequate Targeted Therapy: ${isolate.name}`,
          message: `Your current regimen is active in vitro against **${isolate.name}** (Susceptibility: ${activeSens}).`,
          evidence: "Susceptible isolates indicate high clinical efficacy when adequate dosing is maintained."
        });
      }

      // MERINO Trial Warning for ESBL
      if ((isolate.id === "escherichia_coli" || isolate.id === "klebsiella_pneumoniae") && 
          isolate.antibiogram["ceftriaxone"] === "R" &&
          current.includes("piperacillin_tazobactam") &&
          (isolate.antibiogram["piperacillin_tazobactam"] === "S" || isolate.antibiogram["piperacillin_tazobactam"] === "I")) {
        critiques.push({
          type: "warning",
          title: "Clinical Conflict (ESBL): MERINO Trial",
          message: `Your current regimen uses Piperacillin/Tazobactam for an ESBL-producing isolate. The landmark **MERINO Trial (2018)** demonstrated that Piperacillin/Tazobactam was associated with significantly higher 30-day mortality compared to Meropenem for definitive treatment of ESBL bacteremia, even when susceptible in vitro. Carbapenems (Meropenem) remain the gold standard.`,
          evidence: "JAMA 2018; 320(10):985-994. Avoid Piperacillin/Tazobactam for invasive/bacteremic ESBL infections."
        });
      }

      // AmpC Induction Risk
      if (isolate.id === "enterobacter_cloacae" && 
          (current.includes("ceftriaxone") || current.includes("piperacillin_tazobactam")) &&
          (isolate.antibiogram["ceftriaxone"] === "S" || isolate.antibiogram["piperacillin_tazobactam"] === "S")) {
        critiques.push({
          type: "danger",
          title: "Clinical Conflict: AmpC Induction Risk",
          message: `Treating **Enterobacter cloacae** with Ceftriaxone or Piperacillin/Tazobactam carries a high risk of selecting for derepressed chromosomal **AmpC beta-lactamase** mutants, leading to clinical treatment failure during therapy, even if initially susceptible in vitro.`,
          evidence: "Enterobacter species carry chromosomal inducible AmpC beta-lactamases. Meropenem or Ciprofloxacin are preferred options to prevent breakthrough resistance."
        });
      }

      // EUCAST 'Susceptible, Increased Exposure' (I) Dosing Alert
      current.forEach(drugId => {
        if (isolate.antibiogram[drugId] === "I") {
          const drug = ANTIBIOTICS[drugId];
          critiques.push({
            type: "warning",
            title: `Increased Exposure Required (I): ${drug.name}`,
            message: `The isolated **${isolate.name}** is susceptible to **${drug.name}** under **increased exposure (I)**. Ensure that you prescribe the maximum dose/frequency (e.g., Meropenem 2g Q8h instead of 1g).`,
            evidence: "EUCAST guidelines redefined the 'I' category to 'Susceptible, increased exposure' in 2019 to indicate that the agent is active if drug exposure is optimized."
          });
        }
      });

      // Pseudomonas & Ciprofloxacin Specific Breakpoint Alert
      if (isolate.id === "pseudomonas_aeruginosa" && current.includes("ciprofloxacin")) {
        critiques.push({
          type: "warning",
          title: "Clinical Caution: Pseudomonas & Ciprofloxacin",
          message: "EUCAST guidelines classify *Pseudomonas aeruginosa* as intrinsically 'Susceptible, increased exposure (I)' to Ciprofloxacin. High-dose oral therapy (750mg BD PO) or high-dose intravenous therapy (400mg TDS IV) is required for clinical efficacy.",
          evidence: "EUCAST breakpoint tables indicate that standard low doses are insufficient for treating Pseudomonas infections with fluoroquinolones."
        });
      }
    });
  }

  // 5. Therapeutic Redundancy (Overlapping anaerobic cover)
  let anaerobicAgents = [];
  current.forEach(drugId => {
    if (SPECTRUM[drugId]?.[ "bacteroides_fragilis"] === 2) {
      anaerobicAgents.push(ANTIBIOTICS[drugId].name);
    }
  });
  if (anaerobicAgents.length > 1) {
    critiques.push({
      type: "warning",
      title: "Therapeutic Redundancy: Anaerobic Cover",
      message: `Your current cocktail contains multiple agents providing anaerobic coverage: **${anaerobicAgents.join(' + ')}**. E.g., adding Metronidazole to Tazocin or Meropenem is redundant.`,
      evidence: "Avoiding duplicate therapeutic cover reduces risk of C. difficile infection, limits side effects, and protects standard spectrum lines."
    });
  }

  return critiques;
}

// --- STEP 4: COMPILING RECOMMENDATIONS & GENERATING RATIONALE ---

function getRecommendedRegimen() {
  const isDirected = state.config.treatmentMode === "directed";
  const syndrome = state.config.selectedSyndrome;
  
  if (!isDirected) {
    // Return standard empirical guidelines
    return RECOMMENDATIONS[syndrome] || {
      drugs: ["amoxicillin"],
      dose: "500mg",
      route: "PO",
      freq: "Q8h",
      duration: "5 days",
      rationale: "Default narrow-spectrum guideline recommendation."
    };
  }

  // Culture directed logic: narrowest coverage (lowest spectrum score) covering all isolates
  const isolates = state.config.microIsolates;
  if (isolates.length === 0) return null;

  const candidateDrugs = [];
  Object.keys(ANTIBIOTICS).forEach(drugId => {
    // Check if susceptible to all isolates
    let isSusceptibleAll = true;
    isolates.forEach(isolate => {
      const sens = isolate.antibiogram[drugId] || "R";
      if (sens !== "S" && sens !== "I") {
        isSusceptibleAll = false;
      }
    });

    if (isSusceptibleAll) {
      candidateDrugs.push({
        id: drugId,
        score: ANTIBIOTICS[drugId].spectrumScore,
        ...ANTIBIOTICS[drugId]
      });
    }
  });

  if (candidateDrugs.length > 0) {
    // Sort by spectrum score (ascending) to get narrowest agent
    candidateDrugs.sort((a, b) => a.score - b.score);
    const chosen = candidateDrugs[0];

    // Check if the chosen drug has a PK trap for this syndrome
    if (chosen.pkTraps && chosen.pkTraps[syndrome]) {
      // Find the next narrowest drug without a PK trap
      const secondary = candidateDrugs.find(d => !d.pkTraps || !d.pkTraps[syndrome]);
      if (secondary) {
        return {
          drugs: [secondary.id],
          dose: secondary.standardDose.split(' ')[0],
          route: secondary.name === "Nitrofurantoin" ? "PO" : (["Piperacillin/Tazobactam", "Gentamicin", "Meropenem", "Ceftriaxone", "Ceftazidime", "Daptomycin"].includes(secondary.name) ? "IV" : "PO"),
          freq: "Q8h",
          duration: "5-7 days",
          rationale: `Targeted therapy selected for isolated pathogens: ${isolates.map(i => i.name).join(', ')}. Drug ${chosen.name} was bypassed due to local PK penetration barriers at the site of infection.`
        };
      }
    }

    return {
      drugs: [chosen.id],
      dose: chosen.standardDose.split(' ')[0],
      route: chosen.name === "Nitrofurantoin" ? "PO" : (["Piperacillin/Tazobactam", "Gentamicin", "Meropenem", "Ceftriaxone", "Ceftazidime", "Daptomycin"].includes(chosen.name) ? "IV" : "PO"),
      freq: chosen.standardDose.split(' ').slice(1).join(' ') || "Q8h",
      duration: "5-7 days",
      rationale: `Targeted therapy selected for isolated pathogens: ${isolates.map(i => i.name).join(', ')}. Chosen narrow-spectrum agent (Spectrum Score: ${chosen.score}) based on antibiogram.`
    };
  }

  // Fallback if no single drug covers all
  return {
    drugs: ["meropenem"],
    dose: "1g",
    route: "IV",
    freq: "Q8h",
    duration: "7 days",
    rationale: "Broad-spectrum carbapenem fallback requested as no single narrow agent in our database covers all isolated pathogens. Consult clinical microbiologist."
  };
}

function renderComparisonGrid() {
  const curCol = document.getElementById('compare-current-column');
  const recCol = document.getElementById('compare-recommended-column');
  if (!curCol || !recCol) return;

  curCol.innerHTML = '';
  recCol.innerHTML = '';

  const current = Object.keys(state.config.currentRegimen);
  const recData = getRecommendedRegimen();

  // --- RENDER CURRENT ---
  const curHeader = document.createElement('div');
  curHeader.className = "comparison-header";
  curHeader.innerHTML = `<h3>❌ Current Regimen</h3><p class="summary-subtext">Active choices in patient chart</p>`;
  curCol.appendChild(curHeader);

  if (current.length === 0) {
    const emptyItem = document.createElement('div');
    emptyItem.style.padding = "2rem 1rem";
    emptyItem.style.color = "var(--text-muted)";
    emptyItem.innerText = "No therapy selected for this audit.";
    curCol.appendChild(emptyItem);
  } else {
    const list = document.createElement('div');
    list.className = "comparison-prescription-list";
    current.forEach(drugId => {
      const drug = ANTIBIOTICS[drugId];
      const details = state.config.currentRegimen[drugId];
      
      const item = document.createElement('div');
      item.className = "comparison-prescription-item";
      item.innerHTML = `
        <span class="comparison-drug-name">${drug.name}</span>
        <div class="comparison-drug-details">${details.dose} ${details.route} ${details.freq}</div>
      `;
      list.appendChild(item);
    });
    curCol.appendChild(list);

    // Current Regimen Issues
    const issuesTitle = document.createElement('div');
    issuesTitle.className = "comparison-rationale-title";
    issuesTitle.innerText = "Stewardship Gaps / Warnings:";
    curCol.appendChild(issuesTitle);

    const issuesList = document.createElement('ul');
    issuesList.className = "comparison-rationale-list";

    // Gather warning critiques
    const critiques = compileRegimenCritiques();
    const warnings = critiques.filter(c => c.type === 'warning' || c.type === 'danger');
    
    if (warnings.length === 0) {
      const successLi = document.createElement('li');
      successLi.style.listStyle = "none";
      successLi.innerHTML = `🟢 No active red flags detected in current therapy. Check spectrum de-escalation opportunities.`;
      issuesList.appendChild(successLi);
    } else {
      warnings.forEach(w => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${w.title}:</strong> ${w.message}`;
        issuesList.appendChild(li);
      });
    }
    curCol.appendChild(issuesList);
  }

  // --- RENDER RECOMMENDED ---
  const recHeader = document.createElement('div');
  recHeader.className = "comparison-header";
  recHeader.innerHTML = `<h3>🟢 Recommended Therapy</h3><p class="summary-subtext">Local guidelines / directed audit choice</p>`;
  recCol.appendChild(recHeader);

  if (recData) {
    const list = document.createElement('div');
    list.className = "comparison-prescription-list";
    recData.drugs.forEach(drugId => {
      const drug = ANTIBIOTICS[drugId];
      const item = document.createElement('div');
      item.className = "comparison-prescription-item";
      item.innerHTML = `
        <span class="comparison-drug-name">${drug.name}</span>
        <div class="comparison-drug-details">${recData.dose} ${recData.route} ${recData.freq} (Duration: ${recData.duration})</div>
      `;
      list.appendChild(item);
    });
    recCol.appendChild(list);

    // Recommended Regimen Rationale
    const ratTitle = document.createElement('div');
    ratTitle.className = "comparison-rationale-title";
    ratTitle.innerText = "Clinical Advantages:";
    recCol.appendChild(ratTitle);

    const ratList = document.createElement('ul');
    ratList.className = "comparison-rationale-list";

    // Standard clinical advantages
    const liRat = document.createElement('li');
    liRat.innerHTML = `<strong>Guideline Aligned:</strong> ${recData.rationale}`;
    ratList.appendChild(liRat);

    // Spectrum narrowing advantage
    const sumRec = recData.drugs.reduce((acc, id) => acc + ANTIBIOTICS[id].spectrumScore, 0);
    const sumCur = current.reduce((acc, id) => acc + ANTIBIOTICS[id].spectrumScore, 0);
    if (current.length > 0 && sumRec < sumCur) {
      const liNarrow = document.createElement('li');
      liNarrow.innerHTML = `<strong>Spectrum De-escalation:</strong> Recommended regimen spectrum breadth score is **${sumRec}** vs. audited therapy score of **${sumCur}**. Restricting broad agent exposure reduces selective resistance pressure.`;
      ratList.appendChild(liNarrow);
    }

    // PK barriers avoided
    recData.drugs.forEach(drugId => {
      const drug = ANTIBIOTICS[drugId];
      if (drug.name === "Vancomycin" && recData.route === "PO" && syndrome === "c_difficile") {
        const liVanc = document.createElement('li');
        liVanc.innerHTML = `<strong>Resolves PK Barrier:</strong> Oral route guarantees therapeutic levels inside the colon bowel lumen to directly eradicate C. difficile spores.`;
        ratList.appendChild(liVanc);
      }
    });

    recCol.appendChild(ratList);
  }
}

// --- RENDER SPECTRUM COVERAGE MATRIX ---

function renderSpectrumMatrix() {
  const table = document.getElementById('spectrum-matrix-table');
  if (!table) return;
  table.innerHTML = '';
  
  const selectedSyndrome = state.config.selectedSyndrome;
  const isDirected = state.config.treatmentMode === "directed";
  const syndromeBugs = SYNDROMES[selectedSyndrome].expectedPathogens;
  const current = Object.keys(state.config.currentRegimen);
  
  // Rows (Bugs)
  let caseBugs = [...syndromeBugs];
  if (isDirected) {
    state.config.microIsolates.forEach(isolate => {
      if (!caseBugs.includes(isolate.id)) caseBugs.push(isolate.id);
    });
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
  
  // Columns (Drugs)
  let displayDrugs = [];
  if (state.config.spectrumViewMode === 'case') {
    displayDrugs = current;
  } else {
    // Proposed/Current drugs first, then all others
    displayDrugs = [...current];
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
    tdEmpty.innerHTML = `No audited antibiotics selected. <br><br>Toggle checkboxes in **Step 3** to check coverage, or click **Compare Alternatives** above.`;
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
    if (current.includes(drugId)) {
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
      
      // Determine score. If directed mode and isolate custom antibiogram contains drug, use it!
      let score = SPECTRUM[drugId]?.[bugId] || 0;
      if (isDirected) {
        const matchIsolate = state.config.microIsolates.find(i => i.id === bugId);
        if (matchIsolate && matchIsolate.antibiogram[drugId]) {
          const val = matchIsolate.antibiogram[drugId];
          score = val === "S" ? 2 : (val === "I" ? 1 : 0);
        }
      }

      td.className = `cell-${score}`;
      td.innerText = score === 2 ? 'S' : (score === 1 ? 'I' : 'R');
      tr.appendChild(td);
    });
    
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
}

// --- RENDER DUAL LOOKUP TOOL ---

function populateLookupDropdown() {
  const select = document.getElementById('lookup-select');
  if (!select) return;
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
  if (!resultsBox) return;
  resultsBox.innerHTML = '';
  
  const selectedId = state.lookup.selectedId;
  if (!selectedId) return;

  if (state.lookup.path === 'drug') {
    const drug = ANTIBIOTICS[selectedId];
    const mappings = SPECTRUM[selectedId] || {};
    
    const title = document.createElement('h4');
    title.style.margin = '0 0 0.5rem 0.5rem';
    title.style.fontSize = '0.9rem';
    title.innerText = `Pathogen Spectrum for ${drug.name}:`;
    resultsBox.appendChild(title);
    
    Object.keys(mappings)
      .sort((a, b) => mappings[b] - mappings[a])
      .forEach(bugId => {
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
    let bugName = selectedId;
    Object.keys(PATHOGENS).forEach(g => {
      if (PATHOGENS[g].bugs[selectedId]) bugName = PATHOGENS[g].bugs[selectedId];
    });
    
    const title = document.createElement('h4');
    title.style.margin = '0 0 0.5rem 0.5rem';
    title.style.fontSize = '0.9rem';
    title.innerText = `Antimicrobials active against ${bugName}:`;
    resultsBox.appendChild(title);
    
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

// --- RENDER REFERENCES TAB ---

function renderGuidelines(syndrome) {
  const niceBox = document.getElementById('nice-guideline-text');
  const smiBox = document.getElementById('smi-guideline-text');
  
  if (niceBox && smiBox) {
    const g = GUIDELINES[syndrome] || { nice: "No guideline available.", smi: "No standard diagnostic guidance." };
    niceBox.innerText = g.nice;
    smiBox.innerText = g.smi;
  }
}

// --- RENDER CRITIQUES TAB & WARN COUNT ---

function renderCritiques() {
  const container = document.getElementById('critique-cards-container');
  if (!container) return;
  container.innerHTML = '';
  
  const critiques = compileRegimenCritiques();
  
  // Count active warnings/dangers
  const current = Object.keys(state.config.currentRegimen);
  const alertCount = current.length > 0
    ? critiques.filter(c => c.type === 'warning' || c.type === 'danger').length
    : 0;
  updateAlertBadges(alertCount);
  
  critiques.forEach((item) => {
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
      ev.innerHTML = `<strong>Stewardship Rationale:</strong> ${item.evidence}`;
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
  
  // Set alert text on summary panel
  const summaryBox = document.getElementById('summary-alert-status-box');
  
  if (alertCount > 0) {
    if (desktopBadge) {
      desktopBadge.innerText = alertCount;
      desktopBadge.classList.remove('hidden');
    }
    if (mobileBadge) {
      mobileBadge.innerText = alertCount;
      mobileBadge.classList.remove('hidden');
    }
    if (summaryBox) {
      summaryBox.className = "summary-critique-alert danger";
      summaryBox.querySelector('.alert-icon').innerText = "⚠️";
      summaryBox.querySelector('.alert-message').innerHTML = `<strong>Critique: ${alertCount} alerts detected.</strong> Review the Audit pane in Step 4 for clinical warnings.`;
    }
  } else {
    if (desktopBadge) desktopBadge.classList.add('hidden');
    if (mobileBadge) mobileBadge.classList.add('hidden');
    
    if (summaryBox) {
      const current = Object.keys(state.config.currentRegimen);
      if (current.length === 0) {
        summaryBox.className = "summary-critique-alert";
        summaryBox.querySelector('.alert-icon').innerText = "💡";
        summaryBox.querySelector('.alert-message').innerText = "Ready to audit. Proceed through Step 3 to review current therapy.";
      } else {
        summaryBox.className = "summary-critique-alert success";
        summaryBox.querySelector('.alert-icon').innerText = "✅";
        summaryBox.querySelector('.alert-message').innerHTML = "<strong>Therapy optimal!</strong> Spectrum and doses align with clinical guidelines.";
      }
    }
  }
}

// --- RENDER ALL METHOD ---

function renderAll() {
  updateSummaryCard();
  renderCritiques();
  renderComparisonGrid();
  renderSpectrumMatrix();
}
