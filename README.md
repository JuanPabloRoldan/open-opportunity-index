# Open Opportunity Index

An open, community-maintained index of scholarships, fellowships, summer schools,
research internships and travel grants — organised around the question the big lists
answer badly: **am I eligible, and is it actually funded?**

International-student first, with an engineering / mechanical / aerospace / fluids emphasis.
This is a *verification-and-filtering layer*, not another link dump: every entry links to the
**official** provider page, and eligibility is surfaced up front (open worldwide vs. restricted
countries vs. region-locked vs. must-be-enrolled-in-host vs. citizenship-restricted).

The whole site is one self-contained `index.html`. No build step, no framework, no database.

---

## Live site

Once hosted (see below), the site lets a student filter ~50+ opportunities by type, degree
level, field, eligibility scope and funding, and click straight through to the source.

## Host it for free (GitHub Pages, ~2 minutes)

1. Create a public repo and add `index.html` (plus this folder's other files).
2. **Settings → Pages → Source: “Deploy from a branch” → `main` / `/ (root)` → Save.**
3. Your site goes live at `https://<you>.github.io/<repo>/`.
4. In `index.html`, edit the `SITE` block near the top of the `<script>` so
   `repoUrl` and `submitUrl` point back at your repo, then commit.

Prefer **Cloudflare Pages**? Connect the repo, set *no* build command and output directory `/`.

## Add or edit an opportunity

Everything lives in **one array** near the top of the `<script>` in `index.html`, between the
`⬇ DATA` and `⬆ END DATA` banners. Copy an existing `{ … }` block, change the fields, commit.
The “Download data (JSON)” button on the site is generated from that same array, so it can
never drift out of sync.

### Schema

| Field | Values / notes |
|---|---|
| `name`, `provider`, `desc` | Original wording — don't paste marketing copy. `desc` ≤ 2 sentences. |
| `type` | `scholarship` · `fellowship` · `summer-school` · `internship` · `travel-grant` · `postdoc` · `phd` · `grant` · `database` |
| `dest` | Destination country / region (free text) |
| `levels[]` | `undergrad` · `masters` · `phd` · `postdoc` · `recent-grad` |
| `fields[]` | `any` · `engineering` · `mechanical` · `aerospace` · `fluids` · `physics` · `cs` |
| `scope` | `worldwide` · `restricted` · `region` · `host-enrolled` · `us-only` |
| `scopeNote` | The eligibility catch in one sentence (nationality, residence, host-nomination…) |
| `funding` | `full` · `partial` · `stipend` · `varies` — never guess `full`; if travel or tuition isn't covered it's `partial`, and say so |
| `fundNote` | What's covered |
| `deadline` | Approximate window (`"Typically Jan"`), **not** a hard date — the card always shows a “confirm at source” reminder |
| `url` | The **official** provider page only — never an aggregator repost |
| `demo` | *(optional)* e.g. `"Women only"` — adds a demographic flag |
| `verified` | Date (`"YYYY-MM-DD"`) you last confirmed this against the official page. The monthly staleness check flags anything older than 6 months. |

**Rules of thumb**

- “International” that really means *a country list* → `restricted`, not `worldwide`.
- ESA-states / Commonwealth-style limits → `region`.
- Citizen-only (e.g. NASA) → `us-only`.
- No duplicates. Prefer fully-funded, genuinely international-eligible programmes.

## Automation

- **`.github/workflows/link-check.yml`** runs every week (and on every push) and checks that
  every official link still resolves. If any break, it opens/updates a GitHub issue listing them.
- **`.github/workflows/staleness-check.yml`** runs monthly and flags entries whose `verified`
  date is older than 6 months (configurable), opening an issue listing what to re-confirm. This
  is the "does a human still vouch for this?" check that a link-checker can't make — a URL can
  resolve perfectly while the programme quietly changed its rules. Logic lives in
  `scripts/check-staleness.mjs`, which parses the `DATA` array straight out of `index.html`.
- Deliberately **not** doing blind web-scraping: layouts change, terms of service vary, and
  scraped entries reintroduce the exact "unverified, eligibility-buried" problem this project
  exists to fix. Scheduled link + staleness checks plus human-verified submissions is the
  durable model.

### Sensible next steps (not built yet)

- Pulling from real structured feeds where they exist (e.g. EURAXESS, some society RSS).
- Deadline calendar export / weekly digest.
- More entries: DAAD RISE, Argonne ATPESC, EuroHPC/EPCC HPC schools, JSPS Summer Program,
  ThinkSwiss, Amgen Scholars, KITP programs — all good candidates to add through the pipeline above.

## Licensing

- **Dataset & written descriptions:** [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
- **Site code:** MIT (see `LICENSE`).
- Program names and official descriptions belong to their respective providers; we link to
  authoritative sources and write original summaries.

## Data accuracy

Deadlines and eligibility rules change every cycle. Treat everything here as a starting point and
**confirm on the official page before applying.** Spotted something out of date? Open an issue via
**Submit an opportunity** — corrections are as welcome as additions.
