/**
 * QPM Learning Checkpoint — bound Apps Script receiver.
 * Setup: open the destination spreadsheet > Extensions > Apps Script,
 * paste this file, run setupCheckpoint() once, then deploy as a web app.
 */
const CONFIG = {
  resultsSheetName: "Results",
  passMark: 9,
  total: 12,
  headers: [
    "Submission ID", "Submitted At", "Full Name", "Employee ID",
    "Score", "Total", "Percentage", "Result", "Attempt",
    "Q1", "Q2", "Q3", "Q4", "Q5", "Q6",
    "Q7", "Q8", "Q9", "Q10", "Q11", "Q12"
  ],
  // Answer key is authoritative here; never accept a browser-supplied score.
  answerKey: [1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1]
};

function setupCheckpoint() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) throw new Error("Open this script from the destination spreadsheet.");
  const sheet = ss.getSheetByName(CONFIG.resultsSheetName);
  if (!sheet) throw new Error("The Results tab was not found.");
  const current = sheet.getRange(1, 1, 1, CONFIG.headers.length).getDisplayValues()[0];
  const hasHeaders = current.some(String);
  if (hasHeaders && CONFIG.headers.some((header, i) => current[i] !== header)) {
    throw new Error("Results headers do not match; no changes were made.");
  }
  if (!hasHeaders) sheet.getRange(1, 1, 1, CONFIG.headers.length).setValues([CONFIG.headers]);
  PropertiesService.getScriptProperties().setProperty("SPREADSHEET_ID", ss.getId());
  return { ok: true, spreadsheetConfigured: true, resultsTab: CONFIG.resultsSheetName };
}

function doGet() {
  return HtmlService.createHtmlOutput("QPM Learning Checkpoint receiver is ready.")
    .setTitle("QPM Learning Checkpoint");
}

function doPost(e) {
  let requestId = "";
  try {
    const raw = e && e.parameter && e.parameter.payload;
    if (!raw || raw.length > 12000) throw new Error("Invalid request.");
    const payload = JSON.parse(raw);
    requestId = String(payload.requestId || "");
    const result = recordSubmission_(validatePayload_(payload));
    return responseHtml_({
      ok: true,
      requestId,
      duplicate: result.duplicate,
      score: result.score,
      total: CONFIG.total,
      percentage: result.percentage,
      result: result.result,
      attempt: result.attempt,
      correctAnswers: CONFIG.answerKey
    });
  } catch (err) {
    // Deliberately omit names, employee IDs, answers, and exception details from logs/responses.
    console.error("Checkpoint submission rejected.");
    return responseHtml_({ ok: false, requestId, error: "ส่งผลสอบไม่สำเร็จ กรุณาลองใหม่อีกครั้ง" });
  }
}

function validatePayload_(payload) {
  if (!payload || typeof payload !== "object") throw new Error("Invalid request.");
  const submissionId = String(payload.submissionId || "").trim();
  const fullName = String(payload.fullName || "").trim().replace(/\s+/g, " ");
  const employeeId = String(payload.employeeId || "").trim();
  const answers = payload.answers;
  if (!/^[A-Za-z0-9_-]{16,80}$/.test(submissionId)) throw new Error("Invalid request.");
  if (!fullName || fullName.length > 160 || /[\u0000-\u001f]/.test(fullName)) throw new Error("Invalid request.");
  if (!/^[A-Za-z0-9_-]{2,40}$/.test(employeeId)) throw new Error("Invalid request.");
  if (!Array.isArray(answers) || answers.length !== CONFIG.total ||
      answers.some(value => !Number.isInteger(value) || value < 0 || value > 3)) {
    throw new Error("Invalid request.");
  }
  return { submissionId, fullName, employeeId, answers };
}

function recordSubmission_(payload) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const ss = openTargetSpreadsheet_();
    const sheet = ss.getSheetByName(CONFIG.resultsSheetName);
    if (!sheet) throw new Error("Results tab missing.");
    ensureHeaders_(sheet);

    const lastRow = sheet.getLastRow();
    if (lastRow >= 2) {
      const duplicateCell = sheet.getRange(2, 1, lastRow - 1, 1)
        .createTextFinder(payload.submissionId).matchEntireCell(true).findNext();
      if (duplicateCell) {
        const prior = sheet.getRange(duplicateCell.getRow(), 5, 1, 5).getValues()[0];
        return {
          duplicate: true,
          score: Number(prior[0]),
          total: Number(prior[1]),
          percentage: Number(prior[2]),
          result: String(prior[3]),
          attempt: Number(prior[4])
        };
      }
    }

    const score = payload.answers.reduce((sum, answer, i) =>
      sum + (answer === CONFIG.answerKey[i] ? 1 : 0), 0);
    const percentage = Math.round((score / CONFIG.total) * 10000) / 100;
    const result = score >= CONFIG.passMark ? "ผ่าน" : "ไม่ผ่าน";
    const employeeKey = payload.employeeId.toUpperCase();
    let attempt = 1;
    if (lastRow >= 2) {
      const employeeIds = sheet.getRange(2, 4, lastRow - 1, 1).getDisplayValues();
      attempt += employeeIds.reduce((count, row) =>
        count + (String(row[0]).trim().toUpperCase() === employeeKey ? 1 : 0), 0);
    }

    sheet.appendRow([
      safeCellText_(payload.submissionId),
      new Date(),
      safeCellText_(payload.fullName),
      safeCellText_(payload.employeeId),
      score,
      CONFIG.total,
      percentage,
      result,
      attempt,
      ...payload.answers.map(answer => String.fromCharCode(65 + answer))
    ]);
    SpreadsheetApp.flush();
    return { duplicate: false, score, total: CONFIG.total, percentage, result, attempt };
  } finally {
    lock.releaseLock();
  }
}

function openTargetSpreadsheet_() {
  const id = PropertiesService.getScriptProperties().getProperty("SPREADSHEET_ID");
  if (!id) throw new Error("Run setupCheckpoint() first.");
  return SpreadsheetApp.openById(id);
}

function ensureHeaders_(sheet) {
  const current = sheet.getRange(1, 1, 1, CONFIG.headers.length).getDisplayValues()[0];
  if (CONFIG.headers.some((header, i) => current[i] !== header)) {
    throw new Error("Results headers do not match.");
  }
}

function safeCellText_(value) {
  const text = String(value);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function responseHtml_(message) {
  const json = JSON.stringify(message).replace(/</g, "\\u003c");
  const html = '<!doctype html><meta charset="utf-8"><script>' +
    'window.parent.postMessage(' + json + ',"*");' +
    '</script><p>Submission received.</p>';
  return HtmlService.createHtmlOutput(html)
    .setTitle("QPM Learning Checkpoint")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Synthetic QA: tests pass, fail, duplicate idempotency and Dashboard formulas.
 * Test rows are deleted by exact Submission ID in finally, including on failure.
 */
function runQpmCheckpointTests() {
  const ss = openTargetSpreadsheet_();
  const sheet = ss.getSheetByName(CONFIG.resultsSheetName);
  if (!sheet) throw new Error("Results tab missing.");
  ensureHeaders_(sheet);
  const dashboard = ss.getSheetByName("Dashboard");
  if (!dashboard) throw new Error("Dashboard tab missing.");
  SpreadsheetApp.flush();
  const baseline = dashboard.getRange("B2:B6").getValues().flat().map(Number);
  const token = Utilities.getUuid().replace(/-/g, "");
  const passId = "QA-TEST-PASS-" + token;
  const failId = "QA-TEST-FAIL-" + token;
  const testIds = [passId, failId];
  let passed = false;
  try {
    const passing = {
      submissionId: passId,
      fullName: "QA Synthetic Learner",
      employeeId: "QA-PASS-" + token.slice(0, 12),
      answers: CONFIG.answerKey.slice()
    };
    const failing = {
      submissionId: failId,
      fullName: "QA Synthetic Learner",
      employeeId: "QA-FAIL-" + token.slice(0, 12),
      answers: CONFIG.answerKey.map(answer => (answer + 1) % 4)
    };
    const passResult = recordSubmission_(validatePayload_(passing));
    const failResult = recordSubmission_(validatePayload_(failing));
    const duplicateResult = recordSubmission_(validatePayload_(passing));
    SpreadsheetApp.flush();
    const during = dashboard.getRange("B2:B6").getValues().flat().map(Number);
    const expectedAttempts = baseline[0] + 2;
    const expectedLearners = baseline[1] + 2;
    const expectedPassed = baseline[2] + 1;
    if (passResult.score !== 12 || passResult.result !== "ผ่าน") throw new Error("Pass case failed.");
    if (failResult.score !== 0 || failResult.result !== "ไม่ผ่าน") throw new Error("Fail case failed.");
    if (!duplicateResult.duplicate || during[0] !== expectedAttempts ||
        during[1] !== expectedLearners || during[2] !== expectedPassed) {
      throw new Error("Idempotency or Dashboard check failed.");
    }
    passed = true;
    return {
      ok: true,
      passCase: "passed",
      failCase: "passed",
      duplicateRequest: "deduplicated",
      dashboard: "updated correctly",
      testRowsDeletedAfterRun: true
    };
  } finally {
    const matches = [];
    const lastRow = sheet.getLastRow();
    if (lastRow >= 2) {
      const ids = sheet.getRange(2, 1, lastRow - 1, 1).getDisplayValues();
      ids.forEach((row, index) => {
        if (testIds.indexOf(String(row[0])) >= 0) matches.push(index + 2);
      });
    }
    matches.sort((a, b) => b - a).forEach(row => sheet.deleteRow(row));
    SpreadsheetApp.flush();
    if (passed) {
      const after = dashboard.getRange("B2:B6").getValues().flat().map(Number);
      if (after.some((value, i) => value !== baseline[i])) {
        throw new Error("Dashboard did not return to its baseline after QA cleanup.");
      }
    }
  }
}
