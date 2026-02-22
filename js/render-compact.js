/**
 * Compact CV renderer - loads from data/cv-compact.json
 */
(function () {
  function el(tag, attrs, children) {
    var n = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === 'className') n.className = attrs[k];
        else if (k === 'html') n.innerHTML = attrs[k];
        else if (k.startsWith('on')) n.addEventListener(k.slice(2).toLowerCase(), attrs[k]);
        else if (attrs[k] != null) n.setAttribute(k, attrs[k]);
      });
    }
    if (children) children.forEach(function (c) {
      if (typeof c === 'string') n.appendChild(document.createTextNode(c));
      else if (c) n.appendChild(c);
    });
    return n;
  }

  function renderIntro(data) {
    return el('div', { className: 'intro-box' }, [
      el('div', { className: 'intro-content' }, [
        el('header', { className: 'page-header' }, [
          el('h1', null, [data.personal.name])
        ]),
        el('p', { className: 'summary' }, [data.intro]),
        el('div', { className: 'traits' }, data.traits.map(function (t) {
          return el('span', { className: 'trait' }, [t]);
        }))
      ]),
      el('img', { src: data.photo, alt: data.personal.name, className: 'cv-photo' })
    ]);
  }

  function renderEducationLanguagesRow(data) {
    var eduLines = data.education.map(function (e) {
      return el('div', { className: 'edu-line' }, [
        el('span', { className: 'edu-degree' }, [e.degree]),
        el('span', { className: 'edu-school' }, [e.school])
      ]);
    });
    var langLines = data.languages.map(function (l) {
      return el('span', { className: 'lang-line' }, [
        l.language + ' (' + l.level + ')'
      ]);
    });
    return el('div', { className: 'edu-lang-row' }, [
      el('div', { className: 'education-compact' }, [
        el('h3', null, ['Education']),
        el('div', { className: 'compact-lines' }, eduLines)
      ]),
      el('div', { className: 'languages-compact' }, [
        el('h3', null, ['Languages']),
        el('div', { className: 'compact-lines' }, langLines)
      ])
    ]);
  }

  function renderSkills(data) {
    var cloud = el('div', { className: 'skills-col' }, [
      el('section', null, [
        el('h3', null, ['Cloud Platforms']),
        el('ul', null, data.skills.cloudPlatforms.map(function (s) {
          return el('li', null, [s]);
        }))
      ])
    ]);
    var mlPlatforms = el('div', { className: 'skills-col' }, [
      el('section', null, [
        el('h3', null, ['DevOps']),
        el('ul', null, data.skills.mlPlatforms.map(function (s) {
          return el('li', null, [s]);
        }))
      ])
    ]);
    var maxLevel = 7;
    var programming = el('div', { className: 'skills-col' }, [
      el('section', null, [
        el('h3', null, ['Programming']),
        el('div', { className: 'programming' }, data.skills.programming.map(function (s) {
          var dots = [];
          for (var i = 0; i < maxLevel; i++) {
            dots.push(el('span', { className: i < s.level ? 'filled' : '' }));
          }
          return el('div', { className: 'skill' }, [
            el('span', { className: 'skill-name' }, [s.name]),
            el('div', { className: 'skill-dots' }, dots)
          ]);
        }))
      ])
    ]);
    var skillParts = [cloud, mlPlatforms, programming];
    if (data.interests && data.interests.length) {
      var interestsCol = el('div', { className: 'skills-col' }, [
        el('section', null, [
          el('h3', null, ['Interests']),
          el('ul', { className: 'skills-list' }, data.interests.map(function (i) {
            return el('li', null, [i]);
          }))
        ])
      ]);
      skillParts.push(interestsCol);
    }
    return el('div', { className: 'skills-top block-section' }, skillParts);
  }

  function renderExperience(employers) {
    var employersEl = employers.map(function (emp) {
      var name = emp.company + (emp.location ? ' · ' + emp.location : '');
      var rolesEl = emp.roles.map(function (r) {
        return el('div', { className: 'role' }, [
          el('div', { className: 'role-header' }, [
            el('span', { className: 'role-title' }, [r.title]),
            el('span', { className: 'role-dates' }, [r.dates])
          ]),
          r.bullets && r.bullets.length ? el('ul', null, r.bullets.map(function (b) {
            return el('li', { html: b });
          })) : null
        ].filter(Boolean));
      });
      return el('div', { className: 'employer' }, [
        el('div', { className: 'employer-name' }, [name]),
        rolesEl
      ].flat());
    });
    return el('section', { className: 'experience-section' }, [
      el('h2', null, ['Experience']),
      employersEl
    ].flat());
  }

  function renderExtra(data) {
    var extraItems = data.extra.map(function (x) {
      var roleEls = x.roles ? x.roles.map(function (r) { return el('div', { className: 'job-role' }, [r]); }) : [];
      var parts = [
        el('div', { className: 'job-header' }, [
          el('span', { className: 'job-company' }, [x.organization]),
          x.dates ? el('span', { className: 'job-dates' }, [x.dates]) : null
        ].filter(Boolean))
      ].concat(roleEls);
      if (x.bullets && x.bullets.length) parts.push(el('ul', null, x.bullets.map(function (b) { return el('li', { html: b }); })));
      if (x.summary) parts.push(el('p', { style: 'margin:0; font-size:0.9rem;' }, [x.summary]));
      return el('div', { className: 'extra-item' }, parts);
    });

    return el('section', { className: 'extra-section' }, [
      el('h2', null, ['Extra curricular']),
      extraItems
    ].flat());
  }

  function renderContact(data) {
    var c = data.contact;
    return el('footer', { className: 'contact' }, [
      el('a', { href: 'mailto:' + c.email }, [c.email]),
      el('span', null, [c.location]),
      el('a', { href: 'tel:' + c.phone.replace(/\s/g, '') }, [c.phone]),
      el('a', { href: c.linkedin, target: '_blank', rel: 'noopener noreferrer' }, ['LinkedIn'])
    ]);
  }

  function render(data) {
    var root = document.getElementById('cv-root');
    if (!root) return;
    root.appendChild(renderIntro(data));
    root.appendChild(renderEducationLanguagesRow(data));
    root.appendChild(renderSkills(data));
    root.appendChild(renderExperience((data.experience || []).filter(function (e) { return e.show !== false; })));
    root.appendChild(renderExtra(data));
    root.appendChild(renderContact(data));
  }

  function showError(msg) {
    var root = document.getElementById('cv-root');
    if (root) {
      root.innerHTML = '<p style="padding:2rem;color:#64748b;">' + msg + '</p>';
    }
  }

  fetch('data/cv-compact.json')
    .then(function (r) { return r.ok ? r.json() : Promise.reject(new Error('Failed to load data')); })
    .then(render)
    .catch(function () {
      showError('Could not load CV data. Open this page via a local server (e.g. <code>python3 -m http.server 8000</code>) or deploy to GitHub Pages.');
    });
})();
