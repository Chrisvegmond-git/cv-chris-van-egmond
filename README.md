# Chris van Egmond — CV

Web version of my CV. Content is loaded from **`data/cv.json`**, so you can add or edit experience, education, skills, etc. by editing that file.

## Two versions

| File | Description |
|------|-------------|
| **`index.html`** | Long version (full detail, 2 pages when printed) |
| **`compact.html`** | Compact version (customize for shorter CV) |

- **View:** Run a local server (see below) or use [GitHub Pages](https://pages.github.com/). Opening `index.html` directly in a browser will not load the data (browsers block `fetch` from `file://`).
- **Download as PDF:** Use the "Download as PDF" button to open the print dialog and save the page as PDF.

## Local preview

```bash
# From the repo root:
python3 -m http.server 8000
# Then open http://localhost:8000
```

## Editing content

Edit **`data/cv.json`**. The structure is:

| Section | What to edit |
|--------|----------------|
| **personal** | `name`, `nationality` |
| **intro** | Summary paragraph (string) |
| **traits** | Array of short keywords |
| **skills.cloudPlatforms** | Array of platform names |
| **skills.programming** | Array of `{ "name": "...", "level": 1–7 }` |
| **experience** | Array of employers; each has `company`, optional `location`, and `roles` (array of `title`, `dates`, `bullets`) |
| **interests** | Single string |
| **languages** | Array of `{ "language": "...", "level": "..." }` |
| **education** | Array of `school`, `dates`, `degree`, `details` |
| **extra** | Array of items with `organization`, optional `dates`, optional `roles`, optional `bullets`, optional `summary` |
| **contact** | `email`, `location`, `phone`, `linkedin` |

Add a new job by appending a role to an existing employer's `roles`, or add a new object to `experience`. Add education or extra-curricular entries by appending to the `education` or `extra` arrays.
