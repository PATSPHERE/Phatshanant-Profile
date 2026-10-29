# QPM Learning Checkpoint receiver

## Deployment target
Bind this script to the private Google Sheet **QPM Learning Checkpoint — Results**. The receiver only appends to the `Results` tab; `doGet()` returns a generic status message and never reads learner records.

## Setup
1. Open the destination spreadsheet while signed in as its owner.
2. Open **Extensions → Apps Script** and replace the starter file with `Code.gs`.
3. Run `setupCheckpoint()` once and authorize the bound script. It stores the spreadsheet ID in Script Properties and validates the existing Results headers.
4. Run `runQpmCheckpointTests()`. The suite checks server-side pass/fail scoring, duplicate request handling, dashboard updates and cleanup of its synthetic QA rows.
5. Create a **Web app** deployment that executes as the owner. Anonymous access is required for learners using the public QPM quiz. This setting makes the endpoint callable; it does not share the spreadsheet or return its rows.
6. Add the deployed URL to the Quiz's `SUBMISSION_ENDPOINT` configuration, publish the Learning Hub and verify the public quiz URL.

## Data contract
The browser sends only learner name, employee ID, 12 selected options (A–D), and an idempotency key. The server calculates score, percentage, pass/fail and attempt number. It rejects browser-supplied scores and validates all submitted fields.

## Privacy
The destination spreadsheet should remain restricted to the owner and explicitly authorized QPM administrators. Do not enable link sharing for the spreadsheet. Never add row-reading endpoints to this web app.
