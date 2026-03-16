DROP TABLE IF EXISTS feedback;
DROP TABLE IF EXISTS candidates;

CREATE TABLE candidates (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT DEFAULT '',
  phone TEXT DEFAULT '',
  position TEXT DEFAULT '',
  department TEXT DEFAULT '',
  source TEXT DEFAULT '',
  resume_url TEXT DEFAULT '',
  resume_filename TEXT DEFAULT '',
  stage TEXT NOT NULL DEFAULT 'Lead' CHECK(stage IN ('Lead', 'Proceed to Interview', 'Interview 1 Complete', 'Interview 2 Complete', 'Decision')),
  decision TEXT DEFAULT '' CHECK(decision IN ('', 'Hire', 'Reject', 'On Hold')),
  interviewer_1_name TEXT DEFAULT '',
  interviewer_1_email TEXT DEFAULT '',
  interviewer_2_name TEXT DEFAULT '',
  interviewer_2_email TEXT DEFAULT '',
  notes TEXT DEFAULT '',
  applied_date TEXT DEFAULT (date('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE feedback (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  candidate_id INTEGER NOT NULL,
  interviewer_name TEXT NOT NULL,
  interviewer_role TEXT NOT NULL CHECK(interviewer_role IN ('Interviewer 1', 'Interviewer 2')),
  rating INTEGER DEFAULT 0 CHECK(rating BETWEEN 0 AND 5),
  technical_score INTEGER DEFAULT 0 CHECK(technical_score BETWEEN 0 AND 5),
  cultural_score INTEGER DEFAULT 0 CHECK(cultural_score BETWEEN 0 AND 5),
  communication_score INTEGER DEFAULT 0 CHECK(communication_score BETWEEN 0 AND 5),
  strengths TEXT DEFAULT '',
  weaknesses TEXT DEFAULT '',
  recommendation TEXT DEFAULT '' CHECK(recommendation IN ('', 'Strong Hire', 'Hire', 'No Hire', 'Strong No Hire')),
  comments TEXT DEFAULT '',
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE
);
