const INLINE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pokee Recruiting</title>
  <style>
* { margin: 0; padding: 0; box-sizing: border-box; }

:root {
  --bg: #0f1117;
  --surface: #1a1d27;
  --surface2: #242836;
  --border: #2e3348;
  --text: #e4e6f0;
  --text-dim: #8b8fa3;
  --accent: #6c5ce7;
  --accent-hover: #7c6df7;
  --green: #00b894;
  --yellow: #fdcb6e;
  --orange: #e17055;
  --red: #d63031;
  --blue: #0984e3;
  --pink: #e84393;
}

body { background: var(--bg); color: var(--text); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }

/* Login */
#login-screen { display: flex; align-items: center; justify-content: center; height: 100vh; background: var(--bg); }
.login-box { background: var(--surface); padding: 40px; border-radius: 12px; text-align: center; border: 1px solid var(--border); width: 360px; }
.login-box h1 { color: var(--accent); margin-bottom: 8px; font-size: 24px; }
.login-box p { color: var(--text-dim); margin-bottom: 24px; }
.login-box input { width: 100%; padding: 12px; background: var(--surface2); border: 1px solid var(--border); border-radius: 8px; color: var(--text); font-size: 14px; margin-bottom: 16px; }
.login-box button { width: 100%; padding: 12px; background: var(--accent); color: white; border: none; border-radius: 8px; font-size: 14px; cursor: pointer; font-weight: 600; }
.login-box button:hover { background: var(--accent-hover); }
#login-error { color: var(--red); margin-top: 12px; font-size: 13px; }
.hidden { display: none !important; }

/* Header */
header { display: flex; justify-content: space-between; align-items: center; padding: 16px 24px; background: var(--surface); border-bottom: 1px solid var(--border); position: sticky; top: 0; z-index: 10; }
.header-left { display: flex; align-items: center; gap: 24px; }
header h1 { font-size: 20px; color: var(--accent); }
nav { display: flex; gap: 4px; }
.nav-btn { padding: 8px 16px; background: transparent; border: none; color: var(--text-dim); cursor: pointer; border-radius: 6px; font-size: 13px; font-weight: 500; }
.nav-btn.active { background: var(--accent); color: white; }
.nav-btn:hover:not(.active) { background: var(--surface2); color: var(--text); }
.header-right { display: flex; gap: 12px; align-items: center; }
.btn-add { padding: 8px 16px; background: var(--accent); color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 13px; font-weight: 600; }
.btn-add:hover { background: var(--accent-hover); }
.btn-logout { padding: 8px 12px; background: transparent; color: var(--text-dim); border: 1px solid var(--border); border-radius: 8px; cursor: pointer; font-size: 13px; }
.btn-logout:hover { border-color: var(--red); color: var(--red); }

/* Main */
main { padding: 24px; max-width: 1400px; margin: 0 auto; }

/* Pipeline View */
.pipeline { display: flex; gap: 16px; overflow-x: auto; padding-bottom: 16px; min-height: calc(100vh - 120px); }
.pipeline-col { flex: 1; min-width: 260px; max-width: 320px; background: var(--surface); border-radius: 12px; padding: 0; display: flex; flex-direction: column; }
.pipeline-header { padding: 16px; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; }
.pipeline-header h3 { font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600; }
.pipeline-count { background: var(--surface2); color: var(--text-dim); padding: 2px 8px; border-radius: 10px; font-size: 12px; font-weight: 600; }
.pipeline-cards { padding: 12px; flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 8px; }

.stage-lead .pipeline-header { border-top: 3px solid var(--blue); border-radius: 12px 12px 0 0; }
.stage-proceed .pipeline-header { border-top: 3px solid var(--yellow); border-radius: 12px 12px 0 0; }
.stage-int1 .pipeline-header { border-top: 3px solid var(--orange); border-radius: 12px 12px 0 0; }
.stage-int2 .pipeline-header { border-top: 3px solid var(--pink); border-radius: 12px 12px 0 0; }
.stage-decision .pipeline-header { border-top: 3px solid var(--green); border-radius: 12px 12px 0 0; }

/* Candidate Card */
.candidate-card { background: var(--surface2); border: 1px solid var(--border); border-radius: 8px; padding: 14px; cursor: pointer; transition: border-color 0.2s, transform 0.1s; }
.candidate-card:hover { border-color: var(--accent); transform: translateY(-1px); }
.card-name { font-weight: 600; font-size: 14px; margin-bottom: 4px; }
.card-position { color: var(--text-dim); font-size: 12px; margin-bottom: 8px; }
.card-meta { display: flex; justify-content: space-between; align-items: center; }
.card-source { font-size: 11px; color: var(--text-dim); background: var(--surface); padding: 2px 8px; border-radius: 4px; }
.card-date { font-size: 11px; color: var(--text-dim); }
.card-decision { font-size: 11px; padding: 2px 8px; border-radius: 4px; font-weight: 600; }
.decision-hire { background: rgba(0,184,148,0.15); color: var(--green); }
.decision-reject { background: rgba(214,48,49,0.15); color: var(--red); }
.decision-onhold { background: rgba(253,203,110,0.15); color: var(--yellow); }
.card-feedback-indicator { display: flex; gap: 4px; margin-top: 8px; }
.fb-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--border); }
.fb-dot.filled { background: var(--green); }

/* Table View */
.table-container { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; background: var(--surface); border-radius: 12px; overflow: hidden; }
th { padding: 12px 16px; text-align: left; background: var(--surface2); color: var(--text-dim); font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600; border-bottom: 1px solid var(--border); }
td { padding: 12px 16px; font-size: 13px; border-bottom: 1px solid var(--border); }
tr:hover td { background: var(--surface2); }
tr { cursor: pointer; }
.stage-badge { padding: 4px 10px; border-radius: 12px; font-size: 11px; font-weight: 600; white-space: nowrap; }
.stage-lead-badge { background: rgba(9,132,227,0.15); color: var(--blue); }
.stage-proceed-badge { background: rgba(253,203,110,0.15); color: var(--yellow); }
.stage-int1-badge { background: rgba(225,112,85,0.15); color: var(--orange); }
.stage-int2-badge { background: rgba(232,67,147,0.15); color: var(--pink); }
.stage-decision-badge { background: rgba(0,184,148,0.15); color: var(--green); }

/* Modal */
.modal { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; z-index: 100; }
.modal-content { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; width: 600px; max-width: 95vw; max-height: 90vh; overflow-y: auto; }
.modal-large { width: 800px; }
.modal-header { display: flex; justify-content: space-between; align-items: center; padding: 20px 24px; border-bottom: 1px solid var(--border); }
.modal-header h2 { font-size: 18px; }
.modal-close { background: none; border: none; color: var(--text-dim); font-size: 24px; cursor: pointer; }
.modal-close:hover { color: var(--text); }

/* Forms */
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; padding: 24px; }
.form-group { display: flex; flex-direction: column; gap: 6px; }
.form-group.full-width { grid-column: span 2; }
.form-group label { font-size: 12px; color: var(--text-dim); font-weight: 600; text-transform: uppercase; letter-spacing: 0.3px; }
.form-group input, .form-group select, .form-group textarea {
  padding: 10px 12px; background: var(--surface2); border: 1px solid var(--border);
  border-radius: 8px; color: var(--text); font-size: 14px; font-family: inherit;
}
.form-group input:focus, .form-group select:focus, .form-group textarea:focus { border-color: var(--accent); outline: none; }
.form-actions { display: flex; justify-content: flex-end; gap: 12px; padding: 16px 24px; border-top: 1px solid var(--border); }
.form-actions button { padding: 10px 20px; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 500; }
.form-actions button:first-child { background: var(--surface2); border: 1px solid var(--border); color: var(--text); }
.btn-primary { background: var(--accent) !important; color: white !important; border: none !important; }
.btn-primary:hover { background: var(--accent-hover) !important; }

/* Score input */
.score-input { display: flex; align-items: center; gap: 12px; }
.score-input input[type=range] { flex: 1; accent-color: var(--accent); }
.score-input span { font-weight: 600; min-width: 20px; text-align: center; }

/* Star input */
.star-input { display: flex; gap: 4px; }
.star-input span { font-size: 24px; cursor: pointer; color: var(--border); transition: color 0.15s; }
.star-input span.active { color: var(--yellow); }
.star-input span:hover { color: var(--yellow); }

/* Detail view */
.detail-section { padding: 20px 24px; }
.detail-section + .detail-section { border-top: 1px solid var(--border); }
.detail-section h3 { font-size: 14px; color: var(--text-dim); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 16px; }
.detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.detail-field { display: flex; flex-direction: column; gap: 4px; }
.detail-field label { font-size: 11px; color: var(--text-dim); text-transform: uppercase; }
.detail-field span { font-size: 14px; }
.detail-actions { display: flex; gap: 8px; flex-wrap: wrap; }
.detail-actions button { padding: 8px 16px; border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 500; border: 1px solid var(--border); background: var(--surface2); color: var(--text); }
.detail-actions button:hover { border-color: var(--accent); }
.detail-actions button.btn-accent { background: var(--accent); color: white; border: none; }
.detail-actions button.btn-danger { background: transparent; border-color: var(--red); color: var(--red); }
.detail-actions button.btn-danger:hover { background: var(--red); color: white; }

/* Stage selector in detail */
.stage-select { padding: 8px 12px; background: var(--surface2); border: 1px solid var(--border); border-radius: 8px; color: var(--text); font-size: 13px; }

/* Feedback card */
.feedback-card { background: var(--surface2); border: 1px solid var(--border); border-radius: 8px; padding: 16px; margin-bottom: 12px; }
.feedback-header { display: flex; justify-content: space-between; margin-bottom: 12px; }
.feedback-header strong { font-size: 14px; }
.feedback-header .fb-role { font-size: 12px; color: var(--accent); }
.feedback-scores { display: flex; gap: 16px; margin-bottom: 12px; flex-wrap: wrap; }
.feedback-score { text-align: center; }
.feedback-score .score-label { font-size: 11px; color: var(--text-dim); display: block; }
.feedback-score .score-value { font-size: 18px; font-weight: 700; }
.feedback-text { font-size: 13px; color: var(--text-dim); line-height: 1.5; }
.feedback-text strong { color: var(--text); }
.feedback-rec { display: inline-block; padding: 3px 10px; border-radius: 4px; font-size: 12px; font-weight: 600; margin-top: 8px; }
.rec-strong-hire { background: rgba(0,184,148,0.2); color: var(--green); }
.rec-hire { background: rgba(0,184,148,0.1); color: var(--green); }
.rec-no-hire { background: rgba(214,48,49,0.1); color: var(--red); }
.rec-strong-no-hire { background: rgba(214,48,49,0.2); color: var(--red); }

/* Empty state */
.empty-state { text-align: center; padding: 40px 20px; color: var(--text-dim); }
.empty-state p { font-size: 14px; }

/* Responsive */
@media (max-width: 768px) {
  .pipeline { flex-direction: column; }
  .pipeline-col { max-width: 100%; min-width: auto; }
  .form-grid { grid-template-columns: 1fr; }
  .form-group.full-width { grid-column: span 1; }
  .detail-grid { grid-template-columns: 1fr; }
  .chat-panel { width: calc(100vw - 32px); right: 16px; bottom: 16px; height: calc(100vh - 32px); }
  .chat-fab { right: 16px; bottom: 16px; }
}

/* Chat Agent Widget */
.chat-fab { position:fixed; bottom:24px; right:24px; width:56px; height:56px; border-radius:50%; background:var(--accent); color:#fff; border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; box-shadow:0 4px 12px rgba(108,92,231,0.4); z-index:1000; transition:all 0.2s; }
.chat-fab:hover { background:var(--accent-hover); transform:scale(1.05); }
.chat-fab-active { background:var(--surface2); box-shadow:none; }
.chat-panel { position:fixed; bottom:20px; right:24px; width:600px; height:calc(100vh - 40px); background:var(--surface); border:1px solid var(--border); border-radius:12px; display:flex; flex-direction:column; z-index:1000; box-shadow:0 8px 32px rgba(0,0,0,0.4); overflow:hidden; }
.chat-panel.hidden { display:none; }
.chat-header { display:flex; align-items:center; justify-content:space-between; padding:14px 18px; border-bottom:1px solid var(--border); background:var(--surface2); }
.chat-header span { font-size:14px; font-weight:600; color:var(--accent); }
.chat-close { background:none; border:none; color:var(--text-dim); font-size:22px; cursor:pointer; padding:0 4px; line-height:1; }
.chat-close:hover { color:var(--text); }
.chat-messages { flex:1; overflow-y:auto; padding:16px; display:flex; flex-direction:column; gap:10px; }
.chat-message { max-width:85%; padding:10px 14px; border-radius:12px; font-size:13px; line-height:1.5; word-wrap:break-word; }
.chat-message.user { align-self:flex-end; background:var(--accent); color:#fff; border-bottom-right-radius:4px; }
.chat-message.assistant { align-self:flex-start; background:var(--surface2); color:var(--text); border-bottom-left-radius:4px; }
.chat-message.chat-error { color:var(--red); }
.chat-typing { display:flex; gap:4px; padding:12px 16px; }
.chat-typing span { width:8px; height:8px; border-radius:50%; background:var(--text-dim); animation:chatBounce 1.4s infinite ease-in-out both; }
.chat-typing span:nth-child(1) { animation-delay:-0.32s; }
.chat-typing span:nth-child(2) { animation-delay:-0.16s; }
@keyframes chatBounce { 0%,80%,100%{transform:scale(0)} 40%{transform:scale(1)} }
.chat-input-area { display:flex; gap:8px; padding:12px; border-top:1px solid var(--border); background:var(--surface); }
.chat-input-area input { flex:1; background:var(--surface2); border:1px solid var(--border); color:var(--text); padding:10px 14px; border-radius:8px; font-size:13px; outline:none; font-family:inherit; }
.chat-input-area input:focus { border-color:var(--accent); }
.chat-input-area input::placeholder { color:var(--text-dim); }
.chat-send-btn { background:var(--accent); color:#fff; border:none; width:40px; height:40px; border-radius:8px; cursor:pointer; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.chat-send-btn:hover { background:var(--accent-hover); }
.chat-send-btn:disabled { opacity:0.5; cursor:not-allowed; }
.chat-block { border:1px solid var(--border); border-radius:6px; margin-bottom:8px; overflow:hidden; font-size:12px; }
.chat-block summary { padding:6px 10px; cursor:pointer; font-weight:600; color:var(--text-dim); background:var(--bg); user-select:none; list-style:none; display:flex; align-items:center; gap:6px; }
.chat-block summary::before { content:'\\25B6'; font-size:9px; transition:transform 0.15s; }
.chat-block[open] summary::before { transform:rotate(90deg); }
.chat-block-content { padding:8px 10px; border-top:1px solid var(--border); max-height:240px; overflow-y:auto; }
.chat-thinking-block summary { color:var(--text-dim); }
.chat-thinking-block .chat-block-content { color:var(--text-dim); font-size:12px; line-height:1.5; white-space:pre-wrap; word-break:break-word; }
.chat-tool-block summary { color:var(--blue); font-family:monospace; font-size:11px; }
.tool-args-inline { color:var(--text-dim); font-weight:400; max-width:280px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; display:inline-block; vertical-align:bottom; }
.chat-tool-block .chat-block-content pre { margin:0; font-size:11px; color:var(--text-dim); white-space:pre-wrap; word-break:break-word; line-height:1.4; }
.chat-tool-spinner { padding:6px 10px; color:var(--text-dim); font-size:11px; font-style:italic; }
.chat-status-line { color:var(--text-dim); font-size:12px; font-style:italic; padding:4px 0; }
.chat-response-text { line-height:1.5; }

</style>
</head>
<body>
  <div id="login-screen">
    <div class="login-box">
      <h1>Pokee Recruiting</h1>
      <p>Enter password to continue</p>
      <input type="password" id="login-password" placeholder="Password" onkeydown="if(event.key==='Enter')attemptLogin()">
      <button onclick="attemptLogin()">Sign In</button>
      <div id="login-error" class="hidden"></div>
    </div>
  </div>
  <div id="app-content" class="hidden">
    <header>
      <div class="header-left">
        <h1>Pokee Recruiting</h1>
        <nav>
          <button class="nav-btn active" data-view="pipeline" onclick="switchView('pipeline')">Pipeline</button>
          <button class="nav-btn" data-view="table" onclick="switchView('table')">All Candidates</button>
        </nav>
      </div>
      <div class="header-right">
        <button class="btn-add" onclick="showAddModal()">+ Add Candidate</button>
        <button class="btn-logout" onclick="logout()">Logout</button>
      </div>
    </header>
    <main id="main-content"></main>
  </div>

  <!-- Add/Edit Candidate Modal -->
  <div id="candidate-modal" class="modal hidden">
    <div class="modal-content">
      <div class="modal-header">
        <h2 id="modal-title">Add Candidate</h2>
        <button class="modal-close" onclick="closeModal('candidate-modal')">&times;</button>
      </div>
      <form id="candidate-form" onsubmit="saveCandidate(event)">
        <input type="hidden" id="edit-id">
        <div class="form-grid">
          <div class="form-group">
            <label>Full Name *</label>
            <input type="text" id="f-name" required>
          </div>
          <div class="form-group">
            <label>Email</label>
            <input type="email" id="f-email">
          </div>
          <div class="form-group">
            <label>Phone</label>
            <input type="text" id="f-phone">
          </div>
          <div class="form-group">
            <label>Position</label>
            <input type="text" id="f-position">
          </div>
          <div class="form-group">
            <label>Department</label>
            <input type="text" id="f-department">
          </div>
          <div class="form-group">
            <label>Source</label>
            <select id="f-source">
              <option value="">Select...</option>
              <option value="Email">Email</option>
              <option value="R2 Storage">R2 Storage</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Referral">Referral</option>
              <option value="Website">Website</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div class="form-group">
            <label>Stage</label>
            <select id="f-stage">
              <option value="Lead">Lead</option>
              <option value="Proceed to Interview">Proceed to Interview</option>
              <option value="Interview 1 Complete">Interview 1 Complete</option>
              <option value="Interview 2 Complete">Interview 2 Complete</option>
              <option value="Decision">Decision</option>
            </select>
          </div>
          <div class="form-group" id="decision-group" style="display:none">
            <label>Decision</label>
            <select id="f-decision">
              <option value="">Pending...</option>
              <option value="Hire">Hire</option>
              <option value="Reject">Reject</option>
              <option value="On Hold">On Hold</option>
            </select>
          </div>
          <div class="form-group">
            <label>Interviewer 1 Name</label>
            <input type="text" id="f-int1-name">
          </div>
          <div class="form-group">
            <label>Interviewer 1 Email</label>
            <input type="email" id="f-int1-email">
          </div>
          <div class="form-group">
            <label>Interviewer 2 Name</label>
            <input type="text" id="f-int2-name">
          </div>
          <div class="form-group">
            <label>Interviewer 2 Email</label>
            <input type="email" id="f-int2-email">
          </div>
          <div class="form-group full-width">
            <label>Resume URL</label>
            <input type="text" id="f-resume-url">
          </div>
          <div class="form-group full-width">
            <label>Notes</label>
            <textarea id="f-notes" rows="3"></textarea>
          </div>
        </div>
        <div class="form-actions">
          <button type="button" onclick="closeModal('candidate-modal')">Cancel</button>
          <button type="submit" class="btn-primary">Save</button>
        </div>
      </form>
    </div>
  </div>

  <!-- Candidate Detail / Feedback Modal -->
  <div id="detail-modal" class="modal hidden">
    <div class="modal-content modal-large">
      <div class="modal-header">
        <h2 id="detail-title">Candidate Details</h2>
        <button class="modal-close" onclick="closeModal('detail-modal')">&times;</button>
      </div>
      <div id="detail-body"></div>
    </div>
  </div>

  <!-- Feedback Modal -->
  <div id="feedback-modal" class="modal hidden">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Submit Interview Feedback</h2>
        <button class="modal-close" onclick="closeModal('feedback-modal')">&times;</button>
      </div>
      <form id="feedback-form" onsubmit="saveFeedback(event)">
        <input type="hidden" id="fb-candidate-id">
        <div class="form-grid">
          <div class="form-group">
            <label>Interviewer Name *</label>
            <input type="text" id="fb-name" required>
          </div>
          <div class="form-group">
            <label>Role *</label>
            <select id="fb-role" required>
              <option value="Interviewer 1">Interviewer 1</option>
              <option value="Interviewer 2">Interviewer 2</option>
            </select>
          </div>
          <div class="form-group">
            <label>Overall Rating (1-5)</label>
            <div class="star-input" id="fb-rating-stars"></div>
          </div>
          <div class="form-group">
            <label>Technical Score (1-5)</label>
            <div class="score-input">
              <input type="range" id="fb-technical" min="0" max="5" value="0">
              <span id="fb-technical-val">0</span>
            </div>
          </div>
          <div class="form-group">
            <label>Cultural Fit Score (1-5)</label>
            <div class="score-input">
              <input type="range" id="fb-cultural" min="0" max="5" value="0">
              <span id="fb-cultural-val">0</span>
            </div>
          </div>
          <div class="form-group">
            <label>Communication Score (1-5)</label>
            <div class="score-input">
              <input type="range" id="fb-communication" min="0" max="5" value="0">
              <span id="fb-communication-val">0</span>
            </div>
          </div>
          <div class="form-group full-width">
            <label>Strengths</label>
            <textarea id="fb-strengths" rows="2"></textarea>
          </div>
          <div class="form-group full-width">
            <label>Weaknesses</label>
            <textarea id="fb-weaknesses" rows="2"></textarea>
          </div>
          <div class="form-group">
            <label>Recommendation</label>
            <select id="fb-recommendation">
              <option value="">Select...</option>
              <option value="Strong Hire">Strong Hire</option>
              <option value="Hire">Hire</option>
              <option value="No Hire">No Hire</option>
              <option value="Strong No Hire">Strong No Hire</option>
            </select>
          </div>
          <div class="form-group full-width">
            <label>Additional Comments</label>
            <textarea id="fb-comments" rows="3"></textarea>
          </div>
        </div>
        <div class="form-actions">
          <button type="button" onclick="closeModal('feedback-modal')">Cancel</button>
          <button type="submit" class="btn-primary">Submit Feedback</button>
        </div>
      </form>
    </div>
  </div>

  <script>
const API_BASE = '';
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
    return \`<div class="pipeline-col \${STAGE_CLASSES[i]}">
      <div class="pipeline-header">
        <h3>\${stage}</h3>
        <span class="pipeline-count">\${stageCandidates.length}</span>
      </div>
      <div class="pipeline-cards">
        \${stageCandidates.length === 0 ? '<div class="empty-state"><p>No candidates</p></div>' :
          stageCandidates.map(c => renderCard(c)).join('')}
      </div>
    </div>\`;
  }).join('') + '</div>';
}

function renderCard(c) {
  let decisionHtml = '';
  if (c.stage === 'Decision' && c.decision) {
    const cls = c.decision === 'Hire' ? 'decision-hire' : c.decision === 'Reject' ? 'decision-reject' : 'decision-onhold';
    decisionHtml = \`<span class="card-decision \${cls}">\${c.decision}</span>\`;
  }
  return \`<div class="candidate-card" onclick="showDetail(\${c.id})">
    <div class="card-name">\${esc(c.name)}</div>
    <div class="card-position">\${esc(c.position || 'No position specified')}</div>
    <div class="card-meta">
      \${c.source ? \`<span class="card-source">\${esc(c.source)}</span>\` : '<span></span>'}
      \${decisionHtml || \`<span class="card-date">\${c.applied_date || ''}</span>\`}
    </div>
  </div>\`;
}

// Table View
function renderTable() {
  const main = document.getElementById('main-content');
  main.innerHTML = \`<div class="table-container"><table>
    <thead><tr>
      <th>Name</th><th>Email</th><th>Position</th><th>Department</th><th>Stage</th><th>Decision</th><th>Source</th><th>Applied</th>
    </tr></thead>
    <tbody>
      \${candidates.map(c => \`<tr onclick="showDetail(\${c.id})">
        <td><strong>\${esc(c.name)}</strong></td>
        <td>\${esc(c.email)}</td>
        <td>\${esc(c.position)}</td>
        <td>\${esc(c.department)}</td>
        <td><span class="stage-badge \${stageBadgeClass(c.stage)}">\${c.stage}</span></td>
        <td>\${c.decision ? \`<span class="card-decision \${c.decision === 'Hire' ? 'decision-hire' : c.decision === 'Reject' ? 'decision-reject' : 'decision-onhold'}">\${c.decision}</span>\` : '-'}</td>
        <td>\${esc(c.source)}</td>
        <td>\${c.applied_date || ''}</td>
      </tr>\`).join('')}
    </tbody></table></div>\`;
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
  const url = id ? \`\${API_BASE}/api/candidates/\${id}\` : \`\${API_BASE}/api/candidates\`;
  const method = id ? 'PUT' : 'POST';
  await fetch(url, { method, headers: authHeaders(), body: JSON.stringify(body) });
  closeModal('candidate-modal');
  await loadData();
  if (id) showDetail(parseInt(id));
}

// Detail View
async function showDetail(id) {
  const res = await fetch(\`\${API_BASE}/api/candidates/\${id}\`, { headers: authHeaders() });
  const c = await res.json();
  document.getElementById('detail-title').textContent = c.name;
  document.getElementById('detail-body').innerHTML = \`
    <div class="detail-section">
      <div class="detail-actions">
        <label>Stage: </label>
        <select class="stage-select" onchange="updateStage(\${c.id}, this.value)">
          \${STAGES.map(s => \`<option value="\${s}" \${s === c.stage ? 'selected' : ''}>\${s}</option>\`).join('')}
        </select>
        \${c.stage === 'Decision' ? \`<select class="stage-select" onchange="updateDecision(\${c.id}, this.value)">
          <option value="" \${!c.decision ? 'selected' : ''}>Pending...</option>
          <option value="Hire" \${c.decision === 'Hire' ? 'selected' : ''}>Hire</option>
          <option value="Reject" \${c.decision === 'Reject' ? 'selected' : ''}>Reject</option>
          <option value="On Hold" \${c.decision === 'On Hold' ? 'selected' : ''}>On Hold</option>
        </select>\` : ''}
        <button class="btn-accent" onclick="showFeedbackModal(\${c.id}, '\${esc(c.interviewer_1_name)}', '\${esc(c.interviewer_2_name)}')">Add Feedback</button>
        <button onclick='showEditModal(\${JSON.stringify(c).replace(/'/g, "\\\\'")})'>Edit</button>
        <button class="btn-danger" onclick="deleteCandidate(\${c.id})">Delete</button>
      </div>
    </div>
    <div class="detail-section">
      <h3>Candidate Info</h3>
      <div class="detail-grid">
        <div class="detail-field"><label>Email</label><span>\${esc(c.email) || '-'}</span></div>
        <div class="detail-field"><label>Phone</label><span>\${esc(c.phone) || '-'}</span></div>
        <div class="detail-field"><label>Position</label><span>\${esc(c.position) || '-'}</span></div>
        <div class="detail-field"><label>Department</label><span>\${esc(c.department) || '-'}</span></div>
        <div class="detail-field"><label>Source</label><span>\${esc(c.source) || '-'}</span></div>
        <div class="detail-field"><label>Applied</label><span>\${c.applied_date || '-'}</span></div>
        <div class="detail-field"><label>Resume</label><span>\${c.resume_url ? \`<button onclick="previewResume('\${esc(c.resume_url)}', '\${esc(c.resume_filename)}')" style="background:var(--accent);color:white;border:none;padding:6px 14px;border-radius:6px;cursor:pointer;font-size:13px;font-weight:500">Preview Resume</button>\` : '-'}</span></div>
        <div class="detail-field"><label>Resume File</label><span>\${esc(c.resume_filename) || '-'}</span></div>
      </div>
    </div>
    <div class="detail-section">
      <h3>Interviewers</h3>
      <div class="detail-grid">
        <div class="detail-field"><label>Interviewer 1</label><span>\${esc(c.interviewer_1_name) || '-'} \${c.interviewer_1_email ? \`(\${esc(c.interviewer_1_email)})\` : ''}</span></div>
        <div class="detail-field"><label>Interviewer 2</label><span>\${esc(c.interviewer_2_name) || '-'} \${c.interviewer_2_email ? \`(\${esc(c.interviewer_2_email)})\` : ''}</span></div>
      </div>
    </div>
    \${c.notes ? \`<div class="detail-section"><h3>Notes</h3><p style="font-size:14px;line-height:1.6;color:var(--text-dim)">\${esc(c.notes)}</p></div>\` : ''}
    <div class="detail-section">
      <h3>Interview Feedback (\${(c.feedback || []).length})</h3>
      \${(c.feedback || []).length === 0 ? '<p style="color:var(--text-dim);font-size:14px">No feedback yet</p>' :
        (c.feedback || []).map(fb => renderFeedbackCard(fb)).join('')}
    </div>\`;
  openModal('detail-modal');
}

function renderFeedbackCard(fb) {
  const recClass = fb.recommendation ? 'rec-' + fb.recommendation.toLowerCase().replace(/ /g, '-') : '';
  return \`<div class="feedback-card">
    <div class="feedback-header">
      <strong>\${esc(fb.interviewer_name)}</strong>
      <span class="fb-role">\${fb.interviewer_role}</span>
    </div>
    <div class="feedback-scores">
      <div class="feedback-score"><span class="score-label">Overall</span><span class="score-value">\${fb.rating}/5</span></div>
      <div class="feedback-score"><span class="score-label">Technical</span><span class="score-value">\${fb.technical_score}/5</span></div>
      <div class="feedback-score"><span class="score-label">Cultural</span><span class="score-value">\${fb.cultural_score}/5</span></div>
      <div class="feedback-score"><span class="score-label">Comms</span><span class="score-value">\${fb.communication_score}/5</span></div>
    </div>
    \${fb.strengths ? \`<div class="feedback-text"><strong>Strengths:</strong> \${esc(fb.strengths)}</div>\` : ''}
    \${fb.weaknesses ? \`<div class="feedback-text"><strong>Weaknesses:</strong> \${esc(fb.weaknesses)}</div>\` : ''}
    \${fb.comments ? \`<div class="feedback-text" style="margin-top:8px"><strong>Comments:</strong> \${esc(fb.comments)}</div>\` : ''}
    \${fb.recommendation ? \`<span class="feedback-rec \${recClass}">\${fb.recommendation}</span>\` : ''}
  </div>\`;
}

async function updateStage(id, stage) {
  await fetch(\`\${API_BASE}/api/candidates/\${id}/stage\`, {
    method: 'PUT', headers: authHeaders(),
    body: JSON.stringify({ stage, decision: '' })
  });
  await loadData();
  showDetail(id);
}

async function updateDecision(id, decision) {
  const c = candidates.find(x => x.id === id);
  await fetch(\`\${API_BASE}/api/candidates/\${id}/stage\`, {
    method: 'PUT', headers: authHeaders(),
    body: JSON.stringify({ stage: 'Decision', decision })
  });
  await loadData();
  showDetail(id);
}

async function deleteCandidate(id) {
  if (!confirm('Delete this candidate?')) return;
  await fetch(\`\${API_BASE}/api/candidates/\${id}\`, { method: 'DELETE', headers: authHeaders() });
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
    const input = document.getElementById(\`fb-\${key}\`);
    const display = document.getElementById(\`fb-\${key}-val\`);
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
  await fetch(\`\${API_BASE}/api/feedback\`, { method: 'POST', headers: authHeaders(), body: JSON.stringify(body) });
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

// ── Chat Agent Widget ──
let chatMessages = [];
let chatOpen = false;

function chatScrollToBottom() {
  const c = document.getElementById('chat-messages');
  if (!c) return;
  if (c.scrollHeight - c.scrollTop - c.clientHeight < 120) c.scrollTop = c.scrollHeight;
}

function initChatWidget() {
  const fab = document.createElement('button');
  fab.className = 'chat-fab'; fab.id = 'chat-fab';
  fab.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';
  fab.onclick = toggleChat;
  document.body.appendChild(fab);

  const panel = document.createElement('div');
  panel.className = 'chat-panel hidden'; panel.id = 'chat-panel';
  panel.innerHTML = '<div class="chat-header"><span>Recruiting Agent</span><button class="chat-close" onclick="toggleChat()">&times;</button></div>'
    + '<div class="chat-messages" id="chat-messages"><div class="chat-message assistant">Hi! I can help you search, add, update, or delete candidates. What would you like to do?</div></div>'
    + '<div class="chat-input-area"><input type="text" id="chat-input" placeholder="Ask me anything about candidates..." onkeydown="if(event.key===\'Enter\'){event.preventDefault();sendChatMessage()}">'
    + '<button class="chat-send-btn" id="chat-send" onclick="sendChatMessage()"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13"/><path d="M22 2L15 22L11 13L2 9L22 2Z"/></svg></button></div>';
  document.body.appendChild(panel);
}

function toggleChat() {
  chatOpen = !chatOpen;
  const panel = document.getElementById('chat-panel');
  const fab = document.getElementById('chat-fab');
  if (chatOpen) { panel.classList.remove('hidden'); fab.classList.add('chat-fab-active'); document.getElementById('chat-input').focus(); }
  else { panel.classList.add('hidden'); fab.classList.remove('chat-fab-active'); }
}

async function sendChatMessage() {
  const input = document.getElementById('chat-input');
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  const mc = document.getElementById('chat-messages');
  const userDiv = document.createElement('div'); userDiv.className = 'chat-message user'; userDiv.textContent = text;
  mc.appendChild(userDiv); mc.scrollTop = mc.scrollHeight;
  chatMessages.push({ role: 'user', content: text });
  const typing = document.createElement('div'); typing.className = 'chat-message assistant chat-typing';
  typing.innerHTML = '<span></span><span></span><span></span>';
  mc.appendChild(typing); mc.scrollTop = mc.scrollHeight;
  input.disabled = true; document.getElementById('chat-send').disabled = true;

  try {
    const res = await fetch(API_BASE + '/api/agent', { method: 'POST', headers: authHeaders(), body: JSON.stringify({ messages: chatMessages }) });
    if (res.status === 401) { clearToken(); location.reload(); return; }
    typing.remove();
    const aMsg = document.createElement('div'); aMsg.className = 'chat-message assistant'; mc.appendChild(aMsg);
    let fullText = '', dataModified = false, statusEl = null, responseEl = null;
    const reader = res.body.getReader(), decoder = new TextDecoder();
    let sseBuffer = '';
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      sseBuffer += decoder.decode(value, { stream: true });
      const lines = sseBuffer.split('\\n'); sseBuffer = lines.pop();
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith('data:')) continue;
        let parsed; try { parsed = JSON.parse(trimmed.slice(5).trim()); } catch { continue; }
        if (parsed.type === 'thinking') {
          if (statusEl) { statusEl.remove(); statusEl = null; }
          const d = document.createElement('details'); d.className = 'chat-block chat-thinking-block';
          d.innerHTML = '<summary>Thinking</summary><div class="chat-block-content">' + esc(parsed.content) + '</div>';
          aMsg.appendChild(d); chatScrollToBottom();
        } else if (parsed.type === 'tool_start') {
          if (statusEl) { statusEl.remove(); statusEl = null; }
          const d = document.createElement('details'); d.className = 'chat-block chat-tool-block';
          d.innerHTML = '<summary>' + esc(parsed.name) + '(<span class="tool-args-inline">' + esc(JSON.stringify(parsed.args)) + '</span>)</summary><div class="chat-tool-spinner">Running...</div>';
          aMsg.appendChild(d); chatScrollToBottom();
        } else if (parsed.type === 'tool_result') {
          const blocks = aMsg.querySelectorAll('.chat-tool-block');
          const last = blocks[blocks.length - 1];
          if (last) { const sp = last.querySelector('.chat-tool-spinner'); if (sp) sp.remove();
            const r = document.createElement('div'); r.className = 'chat-block-content';
            const pre = document.createElement('pre'); pre.textContent = JSON.stringify(parsed.result, null, 2);
            r.appendChild(pre); last.appendChild(r); }
          chatScrollToBottom();
        } else if (parsed.type === 'text') {
          if (statusEl) { statusEl.remove(); statusEl = null; }
          fullText += parsed.content;
          if (!responseEl) { responseEl = document.createElement('div'); responseEl.className = 'chat-response-text'; aMsg.appendChild(responseEl); }
          responseEl.innerHTML = esc(fullText).replace(/\\*\\*(.*?)\\*\\*/g, '<strong>$1</strong>').replace(/\\n/g, '<br>');
          chatScrollToBottom();
        } else if (parsed.type === 'status') {
          if (!statusEl) { statusEl = document.createElement('div'); statusEl.className = 'chat-status-line'; aMsg.appendChild(statusEl); }
          statusEl.textContent = parsed.content; chatScrollToBottom();
        } else if (parsed.type === 'done') {
          if (statusEl) { statusEl.remove(); statusEl = null; }
          dataModified = parsed.data_modified;
        } else if (parsed.type === 'error') {
          if (statusEl) { statusEl.remove(); statusEl = null; }
          fullText += parsed.content || 'An error occurred.'; aMsg.classList.add('chat-error');
          if (!responseEl) { responseEl = document.createElement('div'); responseEl.className = 'chat-response-text'; aMsg.appendChild(responseEl); }
          responseEl.innerHTML = esc(fullText);
        }
      }
    }
    if (!fullText && !aMsg.querySelector('.chat-block')) { aMsg.innerHTML = '<em>No response</em>'; }
    chatMessages.push({ role: 'assistant', content: fullText });
    if (dataModified) { await loadData(); render(); }
  } catch (e) {
    typing.remove();
    const err = document.createElement('div'); err.className = 'chat-message assistant chat-error'; err.textContent = 'Failed to get response.';
    mc.appendChild(err); chatScrollToBottom();
  } finally { input.disabled = false; document.getElementById('chat-send').disabled = false; input.focus(); }
}

// Init
if (getToken()) showApp();
else document.getElementById('login-screen').classList.remove('hidden');
initChatWidget();

</script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js"></script>

<!-- Resume Preview Modal -->
<div id="resume-preview-modal" class="modal hidden">
  <div class="modal-content" style="width:90vw;max-width:1000px;height:90vh;display:flex;flex-direction:column">
    <div class="modal-header">
      <h2 id="resume-preview-title">Resume Preview</h2>
      <button class="modal-close" onclick="closeResumePreview()">&times;</button>
    </div>
    <iframe id="resume-preview-frame" src="" style="flex:1;border:none;background:#fff;border-radius:0 0 12px 12px"></iframe>
    <div id="resume-preview-docx" style="flex:1;overflow-y:auto;background:#fff;padding:32px;border-radius:0 0 12px 12px;color:#222;font-family:serif;display:none"></div>
  </div>
</div>

</body>
</html>
`;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    if (method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }


    // Serve frontend for non-API routes
    if (!path.startsWith('/api')) {
      const HTML = INLINE_HTML;
      return new Response(HTML, {
        headers: { 'Content-Type': 'text/html;charset=UTF-8' },
      });
    }

    const json = (data, headers) => new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json', ...headers, ...corsHeaders },
    });

    // Auth check
    if (path === '/api/auth' && method === 'POST') {
      const body = await request.json();
      if (body.password === env.RECRUIT_PASSWORD) {
        return json({ ok: true });
      }
      return new Response(JSON.stringify({ error: 'Invalid password' }), {
        status: 401, headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // GET /api/resume?key=resumes/xxx.pdf&token=xxx - proxy R2 resume files
    // Handled before general auth since iframes can't send Authorization headers
    if (path === '/api/resume' && method === 'GET') {
      const qToken = url.searchParams.get('token') || '';
      if (qToken !== env.RECRUIT_PASSWORD) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401, headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      }
      const key = url.searchParams.get('key');
      if (!key) return json({ error: 'Missing key parameter' }, { status: 400 });
      const object = await env.RESUMES.get(key);
      if (!object) return new Response('Resume not found', { status: 404, headers: corsHeaders });
      const headers = new Headers(corsHeaders);
      headers.set('Content-Type', object.httpMetadata?.contentType || 'application/pdf');
      headers.set('Content-Disposition', 'inline');
      headers.set('Cache-Control', 'public, max-age=3600');
      return new Response(object.body, { headers });
    }

    const authHeader = request.headers.get('Authorization') || '';
    const token = authHeader.replace('Bearer ', '');
    if (token !== env.RECRUIT_PASSWORD) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401, headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    const db = env.DB;

    try {
      // GET /api/candidates - list all candidates
      if (path === '/api/candidates' && method === 'GET') {
        const { results } = await db.prepare('SELECT * FROM candidates ORDER BY updated_at DESC').all();
        return json(results);
      }

      // GET /api/candidates/:id - get single candidate with feedback
      if (path.match(/^\/api\/candidates\/\d+$/) && method === 'GET') {
        const id = path.split('/').pop();
        const candidate = await db.prepare('SELECT * FROM candidates WHERE id = ?').bind(id).first();
        if (!candidate) return json({ error: 'Not found' }, { status: 404 });
        const { results: feedback } = await db.prepare('SELECT * FROM feedback WHERE candidate_id = ? ORDER BY created_at DESC').bind(id).all();
        return json({ ...candidate, feedback });
      }

      // POST /api/candidates - create candidate
      if (path === '/api/candidates' && method === 'POST') {
        const body = await request.json();
        const result = await db.prepare(
          `INSERT INTO candidates (name, email, phone, position, department, source, resume_url, resume_filename, stage, interviewer_1_name, interviewer_1_email, interviewer_2_name, interviewer_2_email, notes)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        ).bind(
          body.name || '', body.email || '', body.phone || '',
          body.position || '', body.department || '', body.source || '',
          body.resume_url || '', body.resume_filename || '',
          body.stage || 'Lead',
          body.interviewer_1_name || '', body.interviewer_1_email || '',
          body.interviewer_2_name || '', body.interviewer_2_email || '',
          body.notes || ''
        ).run();
        return json({ ok: true, id: result.meta.last_row_id });
      }

      // PUT /api/candidates/:id - update candidate
      if (path.match(/^\/api\/candidates\/\d+$/) && method === 'PUT') {
        const id = path.split('/').pop();
        const body = await request.json();
        await db.prepare(
          `UPDATE candidates SET name=?, email=?, phone=?, position=?, department=?, source=?,
           resume_url=?, resume_filename=?, stage=?, decision=?,
           interviewer_1_name=?, interviewer_1_email=?,
           interviewer_2_name=?, interviewer_2_email=?,
           notes=?, updated_at=datetime('now')
           WHERE id=?`
        ).bind(
          body.name, body.email || '', body.phone || '',
          body.position || '', body.department || '', body.source || '',
          body.resume_url || '', body.resume_filename || '',
          body.stage || 'Lead', body.decision || '',
          body.interviewer_1_name || '', body.interviewer_1_email || '',
          body.interviewer_2_name || '', body.interviewer_2_email || '',
          body.notes || '', id
        ).run();
        return json({ ok: true });
      }

      // PUT /api/candidates/:id/stage - update just the stage
      if (path.match(/^\/api\/candidates\/\d+\/stage$/) && method === 'PUT') {
        const id = path.split('/')[3];
        const body = await request.json();
        await db.prepare(
          `UPDATE candidates SET stage=?, decision=?, updated_at=datetime('now') WHERE id=?`
        ).bind(body.stage, body.decision || '', id).run();
        return json({ ok: true });
      }

      // DELETE /api/candidates/:id
      if (path.match(/^\/api\/candidates\/\d+$/) && method === 'DELETE') {
        const id = path.split('/').pop();
        await db.prepare('DELETE FROM candidates WHERE id = ?').bind(id).run();
        return json({ ok: true });
      }

      // POST /api/feedback - add feedback
      if (path === '/api/feedback' && method === 'POST') {
        const body = await request.json();
        const result = await db.prepare(
          `INSERT INTO feedback (candidate_id, interviewer_name, interviewer_role, rating, technical_score, cultural_score, communication_score, strengths, weaknesses, recommendation, comments)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        ).bind(
          body.candidate_id, body.interviewer_name || '', body.interviewer_role || 'Interviewer 1',
          body.rating || 0, body.technical_score || 0, body.cultural_score || 0, body.communication_score || 0,
          body.strengths || '', body.weaknesses || '', body.recommendation || '', body.comments || ''
        ).run();
        // Update candidate stage based on feedback role
        const stage = body.interviewer_role === 'Interviewer 1' ? 'Interview 1 Complete' : 'Interview 2 Complete';
        await db.prepare(`UPDATE candidates SET stage=?, updated_at=datetime('now') WHERE id=? AND stage IN ('Proceed to Interview', 'Interview 1 Complete')`)
          .bind(stage, body.candidate_id).run();
        return json({ ok: true, id: result.meta.last_row_id });
      }

      // GET /api/feedback/:candidateId
      if (path.match(/^\/api\/feedback\/\d+$/) && method === 'GET') {
        const candidateId = path.split('/').pop();
        const { results } = await db.prepare('SELECT * FROM feedback WHERE candidate_id = ? ORDER BY created_at DESC').bind(candidateId).all();
        return json(results);
      }

      // DELETE /api/feedback/:id
      if (path.match(/^\/api\/feedback\/\d+$/) && method === 'DELETE') {
        const id = path.split('/').pop();
        await db.prepare('DELETE FROM feedback WHERE id = ?').bind(id).run();
        return json({ ok: true });
      }

      // GET /api/stats - pipeline stats
      if (path === '/api/stats' && method === 'GET') {
        const { results } = await db.prepare(
          `SELECT stage, COUNT(*) as count FROM candidates GROUP BY stage`
        ).all();
        return json(results);
      }

      // POST /api/agent
      if (path === '/api/agent' && method === 'POST') {
        const body = await request.json();
        return handleAgent(env, body, corsHeaders);
      }

      return json({ error: 'Not found' }, { status: 404 });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }
  }
};

// ── Agent — AI-powered candidate management ──

const MODEL_API_URL = 'http://136.112.61.95:8200/v1/chat/completions';

const AGENT_SYSTEM_PROMPT = `You are a helpful recruiting assistant for Pokee. You help manage candidates through natural conversation.

Each candidate has these fields:
- name, email, phone, position, department
- source (Email, R2 Storage, LinkedIn, Referral, Website, Other)
- stage: Lead → Proceed to Interview → Interview 1 Complete → Interview 2 Complete → Decision
- decision (Hire, Reject, On Hold) — only when stage is Decision
- interviewer_1_name, interviewer_1_email, interviewer_2_name, interviewer_2_email
- notes, applied_date, resume_url, resume_filename

Guidelines:
- When adding a candidate, only name is required. Default stage to "Lead".
- When updating, search first to get the ID, then update only fields mentioned.
- When deleting, search first to confirm which candidate.
- Be concise and conversational. Format results clearly.
- If search returns multiple matches, ask the user to clarify.`;

const AGENT_TOOLS = [
  { type: 'function', function: { name: 'search_candidates', description: 'Search for candidates by keyword. Returns matches with IDs and key details.', parameters: { type: 'object', properties: { query: { type: 'string', description: 'Search keyword for name, email, position, department, etc.' } }, required: ['query'] } } },
  { type: 'function', function: { name: 'get_candidate_details', description: 'Get full details for a candidate by ID, including feedback.', parameters: { type: 'object', properties: { candidate_id: { type: 'number', description: 'The candidate ID' } }, required: ['candidate_id'] } } },
  { type: 'function', function: { name: 'add_candidate', description: 'Add a new candidate. Only name is required.', parameters: { type: 'object', properties: { name: { type: 'string' }, email: { type: 'string' }, phone: { type: 'string' }, position: { type: 'string' }, department: { type: 'string' }, source: { type: 'string', enum: ['Email', 'R2 Storage', 'LinkedIn', 'Referral', 'Website', 'Other'] }, stage: { type: 'string', enum: ['Lead', 'Proceed to Interview', 'Interview 1 Complete', 'Interview 2 Complete', 'Decision'] }, interviewer_1_name: { type: 'string' }, interviewer_1_email: { type: 'string' }, interviewer_2_name: { type: 'string' }, interviewer_2_email: { type: 'string' }, notes: { type: 'string' } }, required: ['name'] } } },
  { type: 'function', function: { name: 'update_candidate', description: 'Update fields on an existing candidate. Only provided fields are changed.', parameters: { type: 'object', properties: { candidate_id: { type: 'number', description: 'Candidate ID (use search_candidates to find)' }, name: { type: 'string' }, email: { type: 'string' }, phone: { type: 'string' }, position: { type: 'string' }, department: { type: 'string' }, source: { type: 'string' }, stage: { type: 'string', enum: ['Lead', 'Proceed to Interview', 'Interview 1 Complete', 'Interview 2 Complete', 'Decision'] }, decision: { type: 'string', enum: ['', 'Hire', 'Reject', 'On Hold'] }, interviewer_1_name: { type: 'string' }, interviewer_1_email: { type: 'string' }, interviewer_2_name: { type: 'string' }, interviewer_2_email: { type: 'string' }, notes: { type: 'string' } }, required: ['candidate_id'] } } },
  { type: 'function', function: { name: 'delete_candidate', description: 'Permanently delete a candidate and all feedback. Cannot be undone.', parameters: { type: 'object', properties: { candidate_id: { type: 'number', description: 'Candidate ID to delete' } }, required: ['candidate_id'] } } }
];

function handleAgent(env, body, corsHeaders) {
  const { messages } = body;
  if (!messages || !messages.length) return new Response(JSON.stringify({ error: 'No messages' }), { headers: { 'Content-Type': 'application/json', ...corsHeaders } });

  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();
  const encoder = new TextEncoder();
  const sendSSE = (type, data = {}) => writer.write(encoder.encode(`data: ${JSON.stringify({ type, ...data })}\n\n`));

  processAgent(env, messages, sendSSE).catch(err => sendSSE('error', { content: err.message || 'Internal error' })).finally(() => writer.close());

  return new Response(readable, { headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', ...corsHeaders } });
}

async function processAgent(env, messages, sendSSE) {
  const systemPrompt = AGENT_SYSTEM_PROMPT;
  let conversationMessages = [{ role: 'system', content: systemPrompt }, ...messages.map(m => ({ role: m.role, content: m.content }))];
  let dataModified = false;

  for (let i = 0; i < 10; i++) {
    sendSSE('status', { content: i === 0 ? 'Thinking...' : 'Processing...' });

    const response = await fetch(MODEL_API_URL, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'pokee-isaac', messages: conversationMessages, tools: AGENT_TOOLS, max_tokens: 4096, stream: true })
    });

    if (!response.ok) { sendSSE('error', { content: `Model API error: ${response.status}` }); sendSSE('done', { data_modified: dataModified }); return; }

    const accumulated = await accumulateStream(response.body);
    const rawContent = accumulated.content || '';
    const { thinkingText, cleanText, toolCalls: contentToolCalls } = parseModelContent(rawContent);
    const allThinking = [accumulated.reasoningContent, thinkingText].filter(Boolean).join('\n');

    if (allThinking) sendSSE('thinking', { content: allThinking });

    // OpenAI-style tool_calls
    if (accumulated.toolCalls.length > 0) {
      conversationMessages.push({ role: 'assistant', content: accumulated.content || null, tool_calls: accumulated.toolCalls });
      for (const tc of accumulated.toolCalls) {
        const fn = tc.function.name; let args; try { args = JSON.parse(tc.function.arguments); } catch { args = {}; }
        sendSSE('tool_start', { name: fn, args });
        let r; try { r = await executeTool(env.DB, fn, args); if (['add_candidate','update_candidate','delete_candidate'].includes(fn)) dataModified = true; } catch (e) { r = { error: e.message }; }
        sendSSE('tool_result', { name: fn, result: r });
        conversationMessages.push({ role: 'tool', tool_call_id: tc.id, content: JSON.stringify(r) });
      }
      continue;
    }

    // Content-based <tool_call> XML
    if (contentToolCalls.length > 0) {
      conversationMessages.push({ role: 'assistant', content: rawContent });
      for (const tc of contentToolCalls) {
        sendSSE('tool_start', { name: tc.name, args: tc.args });
        let r; try { r = await executeTool(env.DB, tc.name, tc.args); if (['add_candidate','update_candidate','delete_candidate'].includes(tc.name)) dataModified = true; } catch (e) { r = { error: e.message }; }
        sendSSE('tool_result', { name: tc.name, result: r });
        conversationMessages.push({ role: 'user', content: `<tool_response>\n${JSON.stringify(r)}\n</tool_response>` });
      }
      continue;
    }

    if (cleanText) sendSSE('text', { content: cleanText });
    sendSSE('done', { data_modified: dataModified });
    return;
  }
  sendSSE('text', { content: 'The request took too many steps.' });
  sendSSE('done', { data_modified: dataModified });
}

async function accumulateStream(body) {
  const reader = body.getReader(); const decoder = new TextDecoder();
  let sseBuffer = '', content = '', reasoningContent = '', toolCalls = [];
  while (true) {
    const { done, value } = await reader.read(); if (done) break;
    sseBuffer += decoder.decode(value, { stream: true });
    const lines = sseBuffer.split('\n'); sseBuffer = lines.pop();
    for (const line of lines) {
      const trimmed = line.trim(); if (!trimmed.startsWith('data:')) continue;
      const data = trimmed.slice(5).trim(); if (data === '[DONE]') continue;
      let parsed; try { parsed = JSON.parse(data); } catch { continue; }
      const delta = parsed.choices?.[0]?.delta; if (!delta) continue;
      if (delta.reasoning_content != null) { reasoningContent += delta.reasoning_content; continue; }
      if (delta.content != null) content += delta.content;
      if (delta.tool_calls) {
        for (const tc of delta.tool_calls) {
          const idx = tc.index ?? 0;
          if (!toolCalls[idx]) toolCalls[idx] = { id: '', type: 'function', function: { name: '', arguments: '' } };
          if (tc.id) toolCalls[idx].id = tc.id;
          if (tc.function?.name) toolCalls[idx].function.name = tc.function.name;
          if (tc.function?.arguments) toolCalls[idx].function.arguments += tc.function.arguments;
        }
      }
    }
  }
  toolCalls = toolCalls.filter(tc => tc && tc.function.name);
  return { content, reasoningContent, toolCalls };
}

function parseModelContent(content) {
  let text = content, thinkingText = '';
  const firstClose = text.indexOf('</think>');
  if (firstClose !== -1) { thinkingText = text.slice(0, firstClose).replace(/^<think>\s*/, '').trim(); text = text.slice(firstClose + 8); }
  text = text.replace(/<think>([\s\S]*?)<\/think>/g, (_, inner) => { thinkingText += (thinkingText ? '\n\n' : '') + inner.trim(); return ''; });

  const toolCalls = [];
  const re = /<tool_call>\s*<function=(\w+)>([\s\S]*?)<\/function>\s*<\/tool_call>/g;
  let m; while ((m = re.exec(text)) !== null) {
    const args = {}; const pr = /<parameter=(\w+)>([\s\S]*?)<\/parameter>/g; let pm;
    while ((pm = pr.exec(m[2])) !== null) { let v = pm[2].trim(); if (/^\d+$/.test(v)) v = Number(v); else { try { v = JSON.parse(v); } catch {} } args[pm[1]] = v; }
    if (args.id !== undefined && args.candidate_id === undefined) { args.candidate_id = args.id; delete args.id; }
    toolCalls.push({ name: m[1], args });
  }
  return { thinkingText, cleanText: text.replace(/<tool_call>[\s\S]*?<\/tool_call>/g, '').trim(), toolCalls };
}

async function executeTool(db, name, input) {
  switch (name) {
    case 'search_candidates': return execSearchCandidates(db, input);
    case 'get_candidate_details': return execGetCandidateDetails(db, input);
    case 'add_candidate': return execAddCandidate(db, input);
    case 'update_candidate': return execUpdateCandidate(db, input);
    case 'delete_candidate': return execDeleteCandidate(db, input);
    default: return { error: `Unknown tool: ${name}` };
  }
}

async function execSearchCandidates(db, { query }) {
  const q = `%${query}%`;
  const { results } = await db.prepare(`SELECT id, name, email, position, department, stage, decision, source, applied_date FROM candidates
    WHERE name LIKE ?1 OR email LIKE ?1 OR position LIKE ?1 OR department LIKE ?1 OR source LIKE ?1 OR notes LIKE ?1 ORDER BY updated_at DESC LIMIT 20`).bind(q).all();
  if (!results.length) return { message: 'No candidates found matching "' + query + '"', results: [] };
  return { message: `Found ${results.length} candidate(s)`, results: results.map(r => ({ id: r.id, name: r.name, email: r.email, position: r.position, department: r.department, stage: r.stage, decision: r.decision || '', source: r.source, applied_date: r.applied_date })) };
}

async function execGetCandidateDetails(db, { candidate_id }) {
  const c = await db.prepare('SELECT * FROM candidates WHERE id = ?').bind(candidate_id).first();
  if (!c) return { error: 'Candidate not found with ID ' + candidate_id };
  const { results: feedback } = await db.prepare('SELECT * FROM feedback WHERE candidate_id = ? ORDER BY created_at DESC').bind(candidate_id).all();
  return { ...c, feedback: feedback.map(f => ({ interviewer: f.interviewer_name, role: f.interviewer_role, rating: f.rating, technical: f.technical_score, cultural: f.cultural_score, communication: f.communication_score, recommendation: f.recommendation, strengths: f.strengths, weaknesses: f.weaknesses, comments: f.comments })) };
}

async function execAddCandidate(db, input) {
  const result = await db.prepare(
    `INSERT INTO candidates (name, email, phone, position, department, source, stage, interviewer_1_name, interviewer_1_email, interviewer_2_name, interviewer_2_email, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(input.name, input.email || '', input.phone || '', input.position || '', input.department || '', input.source || '', input.stage || 'Lead',
    input.interviewer_1_name || '', input.interviewer_1_email || '', input.interviewer_2_name || '', input.interviewer_2_email || '', input.notes || '').run();
  return { success: true, candidate_id: result.meta.last_row_id, name: input.name };
}

async function execUpdateCandidate(db, input) {
  const { candidate_id, ...fields } = input;
  const existing = await db.prepare('SELECT id FROM candidates WHERE id = ?').bind(candidate_id).first();
  if (!existing) return { error: 'Candidate not found with ID ' + candidate_id };
  const colMap = { name:'name', email:'email', phone:'phone', position:'position', department:'department', source:'source', stage:'stage', decision:'decision',
    interviewer_1_name:'interviewer_1_name', interviewer_1_email:'interviewer_1_email', interviewer_2_name:'interviewer_2_name', interviewer_2_email:'interviewer_2_email', notes:'notes' };
  const sets = [], vals = [];
  for (const [k, v] of Object.entries(fields)) { if (colMap[k]) { sets.push(`${colMap[k]} = ?`); vals.push(v); } }
  if (!sets.length) return { error: 'No valid fields to update' };
  sets.push("updated_at = datetime('now')");
  vals.push(candidate_id);
  await db.prepare(`UPDATE candidates SET ${sets.join(', ')} WHERE id = ?`).bind(...vals).run();
  const updated = await db.prepare('SELECT id, name, email, position, stage, decision FROM candidates WHERE id = ?').bind(candidate_id).first();
  return { success: true, message: 'Candidate updated', candidate: updated };
}

async function execDeleteCandidate(db, { candidate_id }) {
  const c = await db.prepare('SELECT name FROM candidates WHERE id = ?').bind(candidate_id).first();
  if (!c) return { error: 'Candidate not found with ID ' + candidate_id };
  await db.prepare('DELETE FROM candidates WHERE id = ?').bind(candidate_id).run();
  return { success: true, message: `Deleted "${c.name}" (ID: ${candidate_id})` };
}
