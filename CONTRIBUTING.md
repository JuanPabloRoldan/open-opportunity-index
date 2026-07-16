# Contributing

Thanks for helping keep this useful. There are two ways in.

## 1. Suggest an opportunity (no coding)

Open a new issue → **“Submit or correct an opportunity.”** Fill the form. A maintainer
verifies it against the official page and adds it. This is the preferred route — it keeps
spam, misleading “scholarships,” and dead reposts out of the dataset.

## 2. Edit directly (pull request)

1. Open `index.html`, find the `DATA` array (between the `⬇ DATA` and `⬆ END DATA` banners).
2. Copy an existing `{ … }` entry, edit the fields, keep it alphabetised within its section.
3. Set `verified` to today's date (`"YYYY-MM-DD"`) once you've confirmed it against the official page.
4. Bump `SITE.updated` at the top of the script.
5. Open a PR.

### What we accept

- The `url` points to the **official provider page** — not Mastersportal, Scholars4Dev,
  OpportunityDesk, or any aggregator. If no official page exists, the entry probably isn't ready.
- Eligibility is stated honestly. If “international” really means a fixed country list, use
  `scope: "restricted"` and say so in `scopeNote`.
- Funding isn't overstated. Free tuition but no airfare or housing is `partial`, not `full`.
- `desc` is your own words, ≤ 2 sentences. No copied marketing text.
- `deadline` is an approximate window, not a hard date we'd have to chase every year.

### What we decline

- Duplicates, dead programmes, pay-to-enter “opportunities,” and anything that only exists on
  a reposting site.

## Verifying

Before adding, open the official URL and confirm: the programme still runs, the eligibility
scope, and what funding actually covers. The weekly link-checker catches URLs that *break*, but
only a human catches a URL that quietly redirects to a generic page — so check.

## Style

- Fields are lowercase enums (see the schema table in the README).
- Keep sections grouped as they are in the file (flagship → engineering/aero → databases).
- One entry, one object. No trailing commas that break older parsers.
