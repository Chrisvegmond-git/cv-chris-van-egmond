# CV data

**`cv.json`** is the single source of content for the CV. The page loads it at runtime and renders the layout.

- Edit this file to change your name, intro, experience, education, skills, etc.
- Keep valid JSON (commas, quotes). Use `null` for optional fields you want to omit (e.g. no location for an employer).
- To add a new employer: add an object to `experience` with `company`, optional `location`, and `roles` (array of `{ "title", "dates", "bullets" }`).
- To add a new role at an existing company: add an object to that employer’s `roles` array.
