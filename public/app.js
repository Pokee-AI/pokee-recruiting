const API_BASE = 'https://pokee-recruiting-api.pokee-ai-internal.workers.dev';
let candidates = [];
let currentView = 'pipeline';
let feedbackRating = 0;

// Auth
function getToken() { return sessionStorage.getItem('recruit_token'); }
function setToken(t) { sessionStorage.setItem('recruit_token', t); }
function clearToken() { sessionStorage.removeItem('recruit_token'); }
function authHeaders() {
  return { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getToken() };
}

async function attemptLogin() {
  const pw = document.getElementById('login-password').value;
  const errEl = document.getElementById('login-error');
  errEl.classList.add('hidden');
  try {
    const res = await fetch(API_BASE + '/api/auth', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pw })
    });
    if (res.ok) { setToken(pw); showApp(); }
    else { errEl.textContent = 'Invalid password'; errEl.classList.remove('hidden'); }
  } catch (e) { errEl.textContent = 'Connection error'; errEl.classList.remove('hidden'); }
}

function showApp() {
  document.getElementById('login-screen').classList.add('hidden');
  document.getElementById('app-content').classList.remove('hidden');
  loadData();
}

function logout() { clearToken(); location.reload(); }

async function loadData() {
  try {
    const res = await fetch(API_BASE + '/api/candidates', { headers: authHeaders() });
    if (res.status === 401) { clearToken(); location.reload(); return; }
    candidates = await res.json();
    render();
  } catch (e) { console.error('Load error:', e); }
}

function render() {
  if (currentView === 'pipeline') renderPipeline();
  else renderTable();
}

function switchView(view) {
  currentView = view;
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.toggle('active', b.dataset.view === view));
  render();
}

// Pipeline View
const STAGES = ['Lead', 'Proceed to Interview', 'Interview 1 Complete', 'Interview 2 Complete', 'Decision'];
const STAGE_CLASSES = ['stage-lead', 'stage-proceed', 'stage-int1', 'stage-int2', 'stage-decision'];

function renderPipeline() {
  const main = document.getElementById('main-content');
  main.innerHTML = '<div class="pipeline">' + STAGES.map((stage, i) => {
    const stageCandidates = candidates.filter(c => c.stage === stage);
    return `<div class="pipeline-col ${STAGE_CLASSES[i]}">
      <div class="pipeline-header">
        <h3>${stage}</h3>
        <span class="pipeline-count">${stageCandidates.length}</span>
      </div>
      <div class="pipeline-cards">
        ${stageCandidates.length === 0 ? '<div class="empty-state"><p>No candidates</p></div>' :
          stageCandidates.map(c => renderCard(c)).join('')}
      </div>
    </div>`;
  }).join('') + '</div>';
}

function renderCard(c) {
  let decisionHtml = '';
  if (c.stage === 'Decision' && c.decision) {
    const cls = c.decision === 'Hire' ? 'decision-hire' : c.decision === 'Reject' ? 'decision-reject' : 'decision-onhold';
    decisionHtml = `<span class="card-decision ${cls}">${c.decision}</span>`;
  }
  return `<div class="candidate-card" onclick="showDetail(${c.id})">
    <div class="card-name">${esc(c.name)}</div>
    <div class="card-position">${esc(c.position || 'No position specified')}</div>
    <div class="card-meta">
      ${c.source ? `<span class="card-source">${esc(c.source)}</span>` : '<span></span>'}
      ${decisionHtml || `<span class="card-date">${c.applied_date || ''}</span>`}
    </div>
  </div>`;
}

// Table View
function renderTable() {
  const main = document.getElementById('main-content');
  main.innerHTML = `<div class="table-container"><table>
    <thead><tr>
      <th>Name</th><th>Email</th><th>Position</th><th>Department</th><th>Stage</th><th>Decision</th><th>Source</th><th>Applied</th>
    </tr></thead>
    <tbody>
      ${candidates.map(c => `<tr onclick="showDetail(${c.id})">
        <td><strong>${esc(c.name)}</strong></td>
        <td>${esc(c.email)}</td>
        <td>${esc(c.position)}</td>
        <td>${esc(c.department)}</td>
        <td><span class="stage-badge ${stageBadgeClass(c.stage)}">${c.stage}</span></td>
        <td>${c.decision ? `<span class="card-decision ${c.decision === 'Hire' ? 'decision-hire' : c.decision === 'Reject' ? 'decision-reject' : 'decision-onhold'}">${c.decision}</span>` : '-'}</td>
        <td>${esc(c.source)}</td>
        <td>${c.applied_date || ''}</td>
      </tr>`).join('')}
    </tbody></table></div>`;
}

function stageBadgeClass(stage) {
  const map = { 'Lead': 'stage-lead-badge', 'Proceed to Interview': 'stage-proceed-badge',
    'Interview 1 Complete': 'stage-int1-badge', 'Interview 2 Complete': 'stage-int2-badge', 'Decision': 'stage-decision-badge' };
  return map[stage] || '';
}

// Add/Edit Modal
function showAddModal() {
  document.getElementById('modal-title').textContent = 'Add Candidate';
  document.getElementById('edit-id').value = '';
  document.getElementById('candidate-form').reset();
  document.getElementById('decision-group').style.display = 'none';
  openModal('candidate-modal');
}

function showEditModal(c) {
  document.getElementById('modal-title').textContent = 'Edit Candidate';
  document.getElementById('edit-id').value = c.id;
  document.getElementById('f-name').value = c.name;
  document.getElementById('f-email').value = c.email || '';
  document.getElementById('f-phone').value = c.phone || '';
  document.getElementById('f-position').value = c.position || '';
  document.getElementById('f-department').value = c.department || '';
  document.getElementById('f-source').value = c.source || '';
  document.getElementById('f-stage').value = c.stage;
  document.getElementById('f-decision').value = c.decision || '';
  document.getElementById('f-int1-name').value = c.interviewer_1_name || '';
  document.getElementById('f-int1-email').value = c.interviewer_1_email || '';
  document.getElementById('f-int2-name').value = c.interviewer_2_name || '';
  document.getElementById('f-int2-email').value = c.interviewer_2_email || '';
  document.getElementById('f-resume-url').value = c.resume_url || '';
  document.getElementById('f-notes').value = c.notes || '';
  document.getElementById('decision-group').style.display = c.stage === 'Decision' ? 'block' : 'none';
  openModal('candidate-modal');
}

document.getElementById('f-stage').addEventListener('change', function() {
  document.getElementById('decision-group').style.display = this.value === 'Decision' ? 'block' : 'none';
});

async function saveCandidate(e) {
  e.preventDefault();
  const id = document.getElementById('edit-id').value;
  const body = {
    name: document.getElementById('f-name').value,
    email: document.getElementById('f-email').value,
    phone: document.getElementById('f-phone').value,
    position: document.getElementById('f-position').value,
    department: document.getElementById('f-department').value,
    source: document.getElementById('f-source').value,
    stage: document.getElementById('f-stage').value,
    decision: document.getElementById('f-decision').value,
    interviewer_1_name: document.getElementById('f-int1-name').value,
    interviewer_1_email: document.getElementById('f-int1-email').value,
    interviewer_2_name: document.getElementById('f-int2-name').value,
    interviewer_2_email: document.getElementById('f-int2-email').value,
    resume_url: document.getElementById('f-resume-url').value,
    notes: document.getElementById('f-notes').value,
  };
  const url = id ? `${API_BASE}/api/candidates/${id}` : `${API_BASE}/api/candidates`;
  const method = id ? 'PUT' : 'POST';
  await fetch(url, { method, headers: authHeaders(), body: JSON.stringify(body) });
  closeModal('candidate-modal');
  await loadData();
  if (id) showDetail(parseInt(id));
}

// Detail View
async function showDetail(id) {
  const res = await fetch(`${API_BASE}/api/candidates/${id}`, { headers: authHeaders() });
  const c = await res.json();
  document.getElementById('detail-title').textContent = c.name;
  document.getElementById('detail-body').innerHTML = `
    <div class="detail-section">
      <div class="detail-actions">
        <label>Stage: </label>
        <select class="stage-select" onchange="updateStage(${c.id}, this.value)">
          ${STAGES.map(s => `<option value="${s}" ${s === c.stage ? 'selected' : ''}>${s}</option>`).join('')}
        </select>
        ${c.stage === 'Decision' ? `<select class="stage-select" onchange="updateDecision(${c.id}, this.value)">
          <option value="" ${!c.decision ? 'selected' : ''}>Pending...</option>
          <option value="Hire" ${c.decision === 'Hire' ? 'selected' : ''}>Hire</option>
          <option value="Reject" ${c.decision === 'Reject' ? 'selected' : ''}>Reject</option>
          <option value="On Hold" ${c.decision === 'On Hold' ? 'selected' : ''}>On Hold</option>
        </select>` : ''}
        <button class="btn-accent" onclick="showFeedbackModal(${c.id}, '${esc(c.interviewer_1_name)}', '${esc(c.interviewer_2_name)}')">Add Feedback</button>
        <button onclick='showEditModal(${JSON.stringify(c).replace(/'/g, "\\'")})'>Edit</button>
        <button class="btn-danger" onclick="deleteCandidate(${c.id})">Delete</button>
      </div>
    </div>
    <div class="detail-section">
      <h3>Candidate Info</h3>
      <div class="detail-grid">
        <div class="detail-field"><label>Email</label><span>${esc(c.email) || '-'}</span></div>
        <div class="detail-field"><label>Phone</label><span>${esc(c.phone) || '-'}</span></div>
        <div class="detail-field"><label>Position</label><span>${esc(c.position) || '-'}</span></div>
        <div class="detail-field"><label>Department</label><span>${esc(c.department) || '-'}</span></div>
        <div class="detail-field"><label>Source</label><span>${esc(c.source) || '-'}</span></div>
        <div class="detail-field"><label>Applied</label><span>${c.applied_date || '-'}</span></div>
        <div class="detail-field"><label>Resume</label><span>${c.resume_url ? `<button onclick="previewResume('${esc(c.resume_url)}', '${esc(c.resume_filename)}')" style="background:var(--accent);color:white;border:none;padding:6px 14px;border-radius:6px;cursor:pointer;font-size:13px;font-weight:500">Preview Resume</button>` : '-'}</span></div>
        <div class="detail-field"><label>Resume File</label><span>${esc(c.resume_filename) || '-'}</span></div>
      </div>
    </div>
    <div class="detail-section">
      <h3>Interviewers</h3>
      <div class="detail-grid">
        <div class="detail-field"><label>Interviewer 1</label><span>${esc(c.interviewer_1_name) || '-'} ${c.interviewer_1_email ? `(${esc(c.interviewer_1_email)})` : ''}</span></div>
        <div class="detail-field"><label>Interviewer 2</label><span>${esc(c.interviewer_2_name) || '-'} ${c.interviewer_2_email ? `(${esc(c.interviewer_2_email)})` : ''}</span></div>
      </div>
    </div>
    ${c.notes ? `<div class="detail-section"><h3>Notes</h3><p style="font-size:14px;line-height:1.6;color:var(--text-dim)">${esc(c.notes)}</p></div>` : ''}
    <div class="detail-section">
      <h3>Interview Feedback (${(c.feedback || []).length})</h3>
      ${(c.feedback || []).length === 0 ? '<p style="color:var(--text-dim);font-size:14px">No feedback yet</p>' :
        (c.feedback || []).map(fb => renderFeedbackCard(fb)).join('')}
    </div>`;
  openModal('detail-modal');
}

function renderFeedbackCard(fb) {
  const recClass = fb.recommendation ? 'rec-' + fb.recommendation.toLowerCase().replace(/ /g, '-') : '';
  return `<div class="feedback-card">
    <div class="feedback-header">
      <strong>${esc(fb.interviewer_name)}</strong>
      <span class="fb-role">${fb.interviewer_role}</span>
    </div>
    <div class="feedback-scores">
      <div class="feedback-score"><span class="score-label">Overall</span><span class="score-value">${fb.rating}/5</span></div>
      <div class="feedback-score"><span class="score-label">Technical</span><span class="score-value">${fb.technical_score}/5</span></div>
      <div class="feedback-score"><span class="score-label">Cultural</span><span class="score-value">${fb.cultural_score}/5</span></div>
      <div class="feedback-score"><span class="score-label">Comms</span><span class="score-value">${fb.communication_score}/5</span></div>
    </div>
    ${fb.strengths ? `<div class="feedback-text"><strong>Strengths:</strong> ${esc(fb.strengths)}</div>` : ''}
    ${fb.weaknesses ? `<div class="feedback-text"><strong>Weaknesses:</strong> ${esc(fb.weaknesses)}</div>` : ''}
    ${fb.comments ? `<div class="feedback-text" style="margin-top:8px"><strong>Comments:</strong> ${esc(fb.comments)}</div>` : ''}
    ${fb.recommendation ? `<span class="feedback-rec ${recClass}">${fb.recommendation}</span>` : ''}
  </div>`;
}

async function updateStage(id, stage) {
  await fetch(`${API_BASE}/api/candidates/${id}/stage`, {
    method: 'PUT', headers: authHeaders(),
    body: JSON.stringify({ stage, decision: '' })
  });
  await loadData();
  showDetail(id);
}

async function updateDecision(id, decision) {
  const c = candidates.find(x => x.id === id);
  await fetch(`${API_BASE}/api/candidates/${id}/stage`, {
    method: 'PUT', headers: authHeaders(),
    body: JSON.stringify({ stage: 'Decision', decision })
  });
  await loadData();
  showDetail(id);
}

async function deleteCandidate(id) {
  if (!confirm('Delete this candidate?')) return;
  await fetch(`${API_BASE}/api/candidates/${id}`, { method: 'DELETE', headers: authHeaders() });
  closeModal('detail-modal');
  await loadData();
}

// Feedback Modal
function showFeedbackModal(candidateId, int1Name, int2Name) {
  document.getElementById('fb-candidate-id').value = candidateId;
  document.getElementById('feedback-form').reset();
  feedbackRating = 0;
  renderStars();
  // Pre-fill interviewer name based on role
  document.getElementById('fb-role').addEventListener('change', function() {
    const nameField = document.getElementById('fb-name');
    if (this.value === 'Interviewer 1' && int1Name) nameField.value = int1Name;
    else if (this.value === 'Interviewer 2' && int2Name) nameField.value = int2Name;
  });
  if (int1Name) document.getElementById('fb-name').value = int1Name;
  // Init range displays
  ['technical', 'cultural', 'communication'].forEach(key => {
    const input = document.getElementById(`fb-${key}`);
    const display = document.getElementById(`fb-${key}-val`);
    input.value = 0; display.textContent = '0';
    input.oninput = () => display.textContent = input.value;
  });
  openModal('feedback-modal');
}

function renderStars() {
  const container = document.getElementById('fb-rating-stars');
  container.innerHTML = '';
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement('span');
    star.textContent = '★';
    star.className = i <= feedbackRating ? 'active' : '';
    star.onclick = () => { feedbackRating = i; renderStars(); };
    container.appendChild(star);
  }
}

async function saveFeedback(e) {
  e.preventDefault();
  const body = {
    candidate_id: parseInt(document.getElementById('fb-candidate-id').value),
    interviewer_name: document.getElementById('fb-name').value,
    interviewer_role: document.getElementById('fb-role').value,
    rating: feedbackRating,
    technical_score: parseInt(document.getElementById('fb-technical').value),
    cultural_score: parseInt(document.getElementById('fb-cultural').value),
    communication_score: parseInt(document.getElementById('fb-communication').value),
    strengths: document.getElementById('fb-strengths').value,
    weaknesses: document.getElementById('fb-weaknesses').value,
    recommendation: document.getElementById('fb-recommendation').value,
    comments: document.getElementById('fb-comments').value,
  };
  await fetch(`${API_BASE}/api/feedback`, { method: 'POST', headers: authHeaders(), body: JSON.stringify(body) });
  closeModal('feedback-modal');
  await loadData();
  showDetail(body.candidate_id);
}

// Resume Preview
function previewResume(resumeKey, filename) {
  const url = API_BASE + '/api/resume?key=' + encodeURIComponent(resumeKey) + '&token=' + encodeURIComponent(getToken());
  const isDocx = (filename || resumeKey).toLowerCase().endsWith('.docx');
  const iframe = document.getElementById('resume-preview-frame');
  const docxDiv = document.getElementById('resume-preview-docx');
  document.getElementById('resume-preview-title').textContent = filename || 'Resume Preview';

  if (isDocx) {
    iframe.style.display = 'none';
    iframe.src = '';
    docxDiv.style.display = 'block';
    docxDiv.innerHTML = '<p style="color:#888;text-align:center;padding:40px">Loading document...</p>';
    fetch(url).then(r => r.arrayBuffer()).then(buf => {
      mammoth.convertToHtml({ arrayBuffer: buf }).then(result => {
        docxDiv.innerHTML = result.value;
      }).catch(() => {
        docxDiv.innerHTML = '<p style="color:red;text-align:center;padding:40px">Failed to render DOCX</p>';
      });
    }).catch(() => {
      docxDiv.innerHTML = '<p style="color:red;text-align:center;padding:40px">Failed to load document</p>';
    });
  } else {
    docxDiv.style.display = 'none';
    docxDiv.innerHTML = '';
    iframe.style.display = 'block';
    iframe.src = url;
  }
  openModal('resume-preview-modal');
}

function closeResumePreview() {
  document.getElementById('resume-preview-frame').src = '';
  document.getElementById('resume-preview-frame').style.display = 'block';
  document.getElementById('resume-preview-docx').style.display = 'none';
  document.getElementById('resume-preview-docx').innerHTML = '';
  closeModal('resume-preview-modal');
}

// Helpers
function openModal(id) { document.getElementById(id).classList.remove('hidden'); }
function closeModal(id) { document.getElementById(id).classList.add('hidden'); }
function esc(s) { if (!s) return ''; const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }

// Init
if (getToken()) showApp();
else document.getElementById('login-screen').classList.remove('hidden');
