<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Ayushman Banerjee — Portfolio</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
  <style>
    /* ── Reset & Base ── */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --bg: #fafafa;
      --surface: #ffffff;
      --border: #e5e7eb;
      --text: #111827;
      --muted: #6b7280;
      --accent: #2563eb;
      --accent-light: #eff6ff;
      --accent-hover: #1d4ed8;
      --tag-bg: #f3f4f6;
      --tag-text: #374151;
      --shadow-sm: 0 1px 3px rgba(0,0,0,.07), 0 1px 2px rgba(0,0,0,.04);
      --shadow-md: 0 4px 16px rgba(0,0,0,.08);
      --shadow-lg: 0 10px 40px rgba(0,0,0,.10);
      --radius: 12px;
      --transition: .25s cubic-bezier(.4,0,.2,1);
    }
    html { scroll-behavior: smooth; font-size: 16px; }
    body {
      font-family: 'Inter', sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
    }
    a { color: inherit; text-decoration: none; }
    img { max-width: 100%; display: block; }
        /* ── Navbar ── */
    nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 100;
      background: rgba(250,250,250,.85);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--border);
      transition: box-shadow var(--transition);
    }
    nav.scrolled { box-shadow: var(--shadow-sm); }
    .nav-inner {
      display: flex; align-items: center; justify-content: space-between;
      height: 64px; max-width: 1100px; margin: 0 auto; padding: 0 24px;
    }
    .nav-logo { font-weight: 700; font-size: 1.1rem; color: var(--accent); letter-spacing: -.5px; }
    .nav-links { display: flex; gap: 32px; list-style: none; }
    .nav-links a {
      font-size: .9rem; font-weight: 500; color: var(--muted);
      transition: color var(--transition);
    }
    .nav-links a:hover { color: var(--text); }
    .nav-cta {
      background: var(--accent); color: #fff;
      padding: 8px 20px; border-radius: 8px; font-size: .875rem; font-weight: 600;
      transition: background var(--transition), transform var(--transition);
    }
    .nav-cta:hover { background: var(--accent-hover); transform: translateY(-1px); }
    .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; padding: 4px; }
    .hamburger span { display: block; width: 22px; height: 2px; background: var(--text); border-radius: 2px; transition: var(--transition); }
    /* ── Hero ── */
    #hero {
      min-height: 100vh; display: flex; align-items: center;
      padding-top: 64px; background: var(--bg);
    }
    .hero-inner { display: grid; grid-template-columns: 1fr auto; align-items: center; gap: 64px; }
    .hero-eyebrow {
      display: inline-flex; align-items: center; gap: 8px;
      background: var(--accent-light); color: var(--accent);
      padding: 6px 14px; border-radius: 100px; font-size: .8rem; font-weight: 600;
      margin-bottom: 24px; border: 1px solid #bfdbfe;
    }
    .hero-eyebrow .dot { width: 7px; height: 7px; background: var(--accent); border-radius: 50%; animation: pulse 2s infinite; }
    @keyframes pulse { 0%,100%{opacity:1}50%{opacity:.4} }
    .hero-title {
      font-size: clamp(2.5rem, 5vw, 3.75rem);
      font-weight: 700; line-height: 1.1; letter-spacing: -1.5px;
      margin-bottom: 20px;
    }
    .hero-title span { color: var(--accent); }
    .hero-sub {
      font-size: 1.15rem; color: var(--muted); max-width: 500px; line-height: 1.7;
      margin-bottom: 36px;
    }
    .hero-actions { display: flex; gap: 14px; flex-wrap: wrap; }
    .btn-primary {
      display: inline-flex; align-items: center; gap: 8px;
      background: var(--accent); color: #fff;
      padding: 13px 28px; border-radius: 10px; font-weight: 600; font-size: .95rem;
      transition: background var(--transition), transform var(--transition), box-shadow var(--transition);
      box-shadow: 0 4px 14px rgba(37,99,235,.3);
    }
    .btn-primary:hover { background: var(--accent-hover); transform: translateY(-2px); box-shadow: 0 6px 20px rgba(37,99,235,.35); }
    .btn-secondary {
      display: inline-flex; align-items: center; gap: 8px;
      background: var(--surface); color: var(--text);
      padding: 13px 28px; border-radius: 10px; font-weight: 600; font-size: .95rem;
      border: 1.5px solid var(--border);
      transition: border-color var(--transition), transform var(--transition);
    }
    .btn-secondary:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-2px); }
    .hero-avatar {
      width: 240px; height: 240px; border-radius: 50%;
      background: linear-gradient(135deg, #e0f2fe, #dbeafe);
      border: 3px solid var(--border);
      display: flex; align-items: center; justify-content: center;
      font-size: 5rem; flex-shrink: 0;
      box-shadow: var(--shadow-lg);
    }
    .hero-scroll {
      position: absolute; bottom: 32px; left: 50%; transform: translateX(-50%);
      display: flex; flex-direction: column; align-items: center; gap: 8px;
      color: var(--muted); font-size: .75rem; font-weight: 500; letter-spacing: .05em;
    }
    .scroll-line { width: 1px; height: 40px; background: linear-gradient(to bottom, var(--border), transparent); }
    /* ── Section Header ── */
    .section-label {
      display: inline-block;
      font-size: .75rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase;
      color: var(--accent); margin-bottom: 12px;
    }
    .section-title { font-size: clamp(1.75rem, 3.5vw, 2.5rem); font-weight: 700; letter-spacing: -.5px; margin-bottom: 16px; }
    .section-desc { color: var(--muted); max-width: 560px; font-size: 1.05rem; line-height: 1.7; }
    .section-header { margin-bottom: 56px; }
    .divider { width: 48px; height: 3px; background: var(--accent); border-radius: 2px; margin-top: 16px; }
    /* ── About ── */
    #about { background: var(--surface); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
    .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
    .about-text p { color: var(--muted); line-height: 1.8; margin-bottom: 16px; font-size: 1.025rem; }
    .about-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .about-card {
      background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius);
      padding: 24px; transition: transform var(--transition), box-shadow var(--transition);
    }
        .cert-row { display: flex; flex-direction: column; gap: 12px; margin-top: 32px; }
    .cert-badge {
      display: flex; align-items: center; gap: 12px;
      background: var(--bg); border: 1px solid var(--border); border-radius: 10px;
      padding: 14px 18px;
    }
    .cert-badge-icon { font-size: 1.4rem; }
    .cert-badge div strong { font-size: .9rem; font-weight: 600; display: block; }
    .cert-badge div span { font-size: .8rem; color: var(--muted); }
    /* ── Skills ── */
    #skills { background: var(--bg); }
    .skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; }
    .skill-category {
      background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius);
      padding: 28px; transition: transform var(--transition), box-shadow var(--transition);
    }
    .skill-category:hover { transform: translateY(-3px); box-shadow: var(--shadow-md); }
    .skill-cat-header { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; }
    .skill-cat-icon { font-size: 1.3rem; }
    .skill-cat-title { font-weight: 700; font-size: .95rem; }
    .skill-tags { display: flex; flex-wrap: wrap; gap: 8px; }
    .skill-tag {
      background: var(--tag-bg); color: var(--tag-text);
      padding: 5px 12px; border-radius: 6px; font-size: .82rem; font-weight: 500;
      border: 1px solid var(--border);
      transition: background var(--transition), color var(--transition);
    }
    .skill-tag:hover { background: var(--accent-light); color: var(--accent); border-color: #bfdbfe; }
    .skill-tag.highlight { background: var(--accent-light); color: var(--accent); border-color: #bfdbfe; }
    /* ── Projects ── */
    #projects { background: var(--surface); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
    .projects-grid { display: flex; flex-direction: column; gap: 32px; }
    .project-card {
      background: var(--bg); border: 1px solid var(--border); border-radius: 16px;
      padding: 40px; display: grid; grid-template-columns: 1fr auto;
      gap: 32px; align-items: start;
      transition: transform var(--transition), box-shadow var(--transition), border-color var(--transition);
      position: relative; overflow: hidden;
    }
    .project-card::before {
      content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
      background: linear-gradient(90deg, var(--accent), #60a5fa);
      transform: scaleX(0); transform-origin: left;
      transition: transform var(--transition);
    }
    .project-card:hover::before { transform: scaleX(1); }
    .project-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); border-color: #bfdbfe; }
    .project-number {
      font-family: 'JetBrains Mono', monospace;
      font-size: .75rem; color: var(--accent); font-weight: 500; margin-bottom: 12px;
    }
    .project-name {
      font-size: 1.5rem; font-weight: 700; letter-spacing: -.3px; margin-bottom: 8px;
    }
    .project-tagline { font-size: .95rem; color: var(--accent); font-weight: 500; margin-bottom: 14px; }
    .project-desc { color: var(--muted); line-height: 1.75; font-size: .97rem; margin-bottom: 24px; }
    .project-highlights { list-style: none; display: flex; flex-direction: column; gap: 8px; margin-bottom: 24px; }
    .project-highlights li {
      display: flex; align-items: flex-start; gap: 10px;
      font-size: .9rem; color: var(--muted);
    }
    .project-highlights li::before { content: '→'; color: var(--accent); font-weight: 700; flex-shrink: 0; margin-top: 1px; }
    .project-stack { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 28px; }
    .stack-tag {
      font-family: 'JetBrains Mono', monospace;
      font-size: .78rem; font-weight: 500;
      background: var(--surface); color: var(--accent);
      border: 1px solid #bfdbfe; padding: 4px 10px; border-radius: 6px;
    }
    .project-links { display: flex; gap: 12px; }
    .link-btn {
      display: inline-flex; align-items: center; gap: 7px;
      padding: 9px 20px; border-radius: 8px; font-size: .875rem; font-weight: 600;
      transition: transform var(--transition), box-shadow var(--transition);
    }
    .link-btn-primary {
      background: var(--accent); color: #fff;
      box-shadow: 0 2px 10px rgba(37,99,235,.25);
    }
    .link-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 4px 16px rgba(37,99,235,.35); }
    .link-btn-secondary { background: var(--surface); color: var(--text); border: 1.5px solid var(--border); }
    .link-btn-secondary:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-2px); }
    .project-badge {
      flex-shrink: 0; display: flex; flex-direction: column; align-items: flex-end; gap: 10px;
    }
    .badge-pill {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 6px 14px; border-radius: 100px; font-size: .78rem; font-weight: 600;
    }
    .badge-pill.live { background: #dcfce7; color: #16a34a; }
    .badge-pill.ml { background: #fef3c7; color: #d97706; }
    .badge-pill.full-stack { background: #ede9fe; color: #7c3aed; }
    .badge-pill.healthcare { background: #fce7f3; color: #db2777; }
    .badge-pill.ai { background: #e0f2fe; color: #0369a1; }
    .project-emoji { font-size: 3.5rem; }
    /* ── Contact ── */
    #contact { background: var(--bg); }
    .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
    .contact-info h2 { font-size: 2rem; font-weight: 700; margin-bottom: 16px; letter-spacing: -.5px; }
    .contact-info p { color: var(--muted); line-height: 1.75; margin-bottom: 32px; }
    .contact-links { display: flex; flex-direction: column; gap: 14px; }
    .contact-link {
      display: flex; align-items: center; gap: 14px;
      padding: 16px 20px; border-radius: var(--radius);
      border: 1px solid var(--border); background: var(--surface);
      transition: transform var(--transition), box-shadow var(--transition), border-color var(--transition);
    }
    .contact-link:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); border-color: var(--accent); }
    .contact-link-icon {
      width: 40px; height: 40px; border-radius: 10px;
      display: flex; align-items: center; justify-content: center;
      font-size: 1.1rem; flex-shrink: 0;
    }
    .contact-link-icon.email { background: #fee2e2; }
    .contact-link-icon.linkedin { background: #dbeafe; }
    .contact-link-icon.github { background: #f3f4f6; }
    .contact-link div strong { font-size: .9rem; font-weight: 600; display: block; margin-bottom: 2px; }
    .contact-link div span { font-size: .82rem; color: var(--muted); }
    .contact-form { display: flex; flex-direction: column; gap: 16px; }
    .form-group { display: flex; flex-direction: column; gap: 6px; }
    .form-group label { font-size: .85rem; font-weight: 600; color: var(--text); }
    .form-group input, .form-group textarea {
      padding: 12px 16px; border: 1.5px solid var(--border); border-radius: 10px;
      font-family: 'Inter', sans-serif; font-size: .95rem; color: var(--text);
      background: var(--surface); outline: none; resize: vertical;
      transition: border-color var(--transition), box-shadow var(--transition);
          .form-group textarea { min-height: 130px; }
    .form-submit {
      background: var(--accent); color: #fff;
      border: none; cursor: pointer;
      padding: 14px 28px; border-radius: 10px; font-size: .95rem; font-weight: 600;
      font-family: 'Inter', sans-serif;
      transition: background var(--transition), transform var(--transition);
      box-shadow: 0 4px 14px rgba(37,99,235,.3);
    }
    .form-submit:hover { background: var(--accent-hover); transform: translateY(-2px); }
    /* ── Footer ── */
    footer {
      border-top: 1px solid var(--border); padding: 32px 0;
      background: var(--surface);
    }
    .footer-inner { display: flex; align-items: center; justify-content: space-between; }
    .footer-copy { font-size: .85rem; color: var(--muted); }
    .footer-logo { font-weight: 700; color: var(--accent); font-size: .95rem; }
    .footer-links { display: flex; gap: 20px; }
    .footer-links a { font-size: .85rem; color: var(--muted); transition: color var(--transition); }
    .footer-links a:hover { color: var(--accent); }
    /* ── Scroll animations ── */
    .fade-up { opacity: 0; transform: translateY(28px); transition: opacity .6s ease, transform .6s ease; }
    .fade-up.visible { opacity: 1; transform: translateY(0); }
          .hero-inner { grid-template-columns: 1fr; gap: 40px; }
      .hero-avatar { width: 160px; height: 160px; font-size: 3.5rem; order: -1; }
      .about-grid { grid-template-columns: 1fr; gap: 40px; }
      .contact-grid { grid-template-columns: 1fr; gap: 48px; }
      .project-card { grid-template-columns: 1fr; }
      .project-badge { flex-direction: row; align-items: center; }
    }
    @media (max-width: 640px) {
      section { padding: 72px 0; }
      .nav-links { display: none; }
      .nav-links.open { display: flex; flex-direction: column; gap: 0; position: absolute; top: 64px; left: 0; right: 0; background: var(--surface); border-bottom: 1px solid var(--border); padding: 12px 0; }
      .nav-links.open a { padding: 12px 24px; display: block; }
      .hamburger { display: flex; }
      .about-cards { grid-template-columns: 1fr; }
      .hero-title { font-size: 2rem; }
    }
  </style>
</head>
<body>
  <!-- ── Navbar ── -->
  <nav id="navbar">
    <div class="nav-inner">
      <a href="#hero" class="nav-logo">AB.</a>
      <ul class="nav-links" id="navLinks">
        <li><a href="#about">About</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
            </div>
    </div>
  </nav>
  <!-- ── Hero ── -->
  <section id="hero">
    <div class="container">
      <div class="hero-inner">
        <div>
          <div class="hero-eyebrow">
            <span class="dot"></span>
            Available for opportunities
          </div>
          <h1 class="hero-title">
            Hi, I'm<br /><span>Ayushman Banerjee</span>
          </h1>
          <p class="hero-sub">
            Full-Stack Developer based in Lucknow, India — building clean, scalable web applications and ML-powered solutions that solve real problems.
          </p>
          <div class="hero-actions">
            <a href="#projects" class="btn-primary">
              <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 7h18M3 12h18M3 17h18"/></svg>
              View My Work
            </a>
            <a href="mailto:ayushmannbanerjee3108@gmail.com" class="btn-secondary">
              <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 4h16v16H4z"/><path d="M22 6l-10 7L2 6"/></svg>
              Get In Touch
            </a>
          </div>
        </div>
        <div class="hero-avatar">👨‍💻</div>
      </div>
    </div>
  </section>
  <!-- ── About ── -->
  <section id="about">
  <div class="container">
      <div class="about-grid">
        <div class="about-text fade-up">
          <span class="section-label">About Me</span>
          <h2 class="section-title">Passionate about building things that matter.</h2>
          <div class="divider" style="margin-bottom:24px;"></div>
          <p>I'm a Computer Science student from Lucknow, India with a strong focus on full-stack web development. I enjoy working across the entire stack — from crafting intuitive UIs to architecting backend APIs and integrating machine learning models into production-ready systems.</p>
          <p>My projects span fraud detection systems, healthcare software, and AI-driven hiring tools — each one a step towards solving real-world problems with clean engineering.</p>
          <div class="cert-row">
            <div class="cert-badge">
              <div class="cert-badge-icon">🏅</div>
              <div>
                <strong>NPTEL Certified</strong>
                <span>IIT / National Programme on Technology Enhanced Learning</span>
              </div>
            </div>
            <div class="cert-badge">
              <div class="cert-badge-icon">🎖️</div>
              <div>
                <strong>IBM Certified</strong>
                <span>Technology &amp; Software Development</span>
              </div>
            </div>
          </div>
        </div>
        <div class="about-cards fade-up">
          <div class="about-card">
            <div class="about-card-icon">🌐</div>
            <h4>Full-Stack Dev</h4>
            <p>End-to-end web apps from UI to backend APIs</p>
          </div>
          <div class="about-card">
            <div class="about-card-icon">🧠</div>
            <h4>ML Integration</h4>
            <p>Embedding trained models into production systems</p>
          </div>
          <div class="about-card">
            <div class="about-card-icon">☁️</div>
            <h4>Cloud & DevOps</h4>
            <p>Docker, Kubernetes, AWS, GCP deployments</p>
          </div>
          <div class="about-card">
            <div class="about-card-icon">📐</div>
            <h4>Clean Code</h4>
            <p>Scalable, maintainable, and well-documented systems</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- ── Skills ── -->
  <section id="skills">
    <div class="container">
      <div class="section-header fade-up">
        <span class="section-label">Tech Stack</span>
        <h2 class="section-title">What I work with</h2>
        <div class="divider"></div>
      </div>
      <div class="skills-grid">
        <div class="skill-category fade-up">
          <div class="skill-cat-header">
            <span class="skill-cat-icon">💻</span>
             <span class="skill-cat-title">Languages</span>
          </div>
          <div class="skill-tags">
            <span class="skill-tag highlight">JavaScript</span>
            <span class="skill-tag highlight">Python</span>
            <span class="skill-tag">HTML5</span>
            <span class="skill-tag">CSS3</span>
          </div>
        </div>
        <div class="skill-category fade-up">
          <div class="skill-cat-header">
            <span class="skill-cat-icon">⚛️</span>
            <span class="skill-cat-title">Frontend</span>
          </div>
          <div class="skill-tags">
            <span class="skill-tag highlight">React</span>
            <span class="skill-tag">Vite</span>
            <span class="skill-tag">Tailwind CSS</span>
            <span class="skill-tag">HTML/CSS/JS</span>
          </div>
        </div>
        <div class="skill-category fade-up">
          <div class="skill-cat-header">
            <span class="skill-cat-icon">🔧</span>
            <span class="skill-cat-title">Backend</span>
          </div>
          <div class="skill-tags">
            <span class="skill-tag highlight">Node.js</span>
            <span class="skill-tag highlight">FastAPI</span>
            <span class="skill-tag">Express.js</span>
            <span class="skill-tag">Django</span>
            <span class="skill-tag">Flask</span>
          </div>
        </div>
        <div class="skill-category fade-up">
          <div class="skill-cat-header">
            <span class="skill-cat-icon">🗄️</span>
            <span class="skill-cat-title">Databases</span>
          </div>
          <div class="skill-tags">
            <span class="skill-tag highlight">MongoDB</span>
            <span class="skill-tag">SQL</span>
          </div>
        </div>
        <div class="skill-category fade-up">
          <div class="skill-cat-header">
            <span class="skill-cat-icon">🧠</span>
            <span class="skill-cat-title">ML & Data</span>
          </div>
          <div class="skill-tags">
            <span class="skill-tag highlight">scikit-learn</span>
            <span class="skill-tag">pandas</span>
            <span class="skill-tag">NumPy</span>
            <span class="skill-tag">Matplotlib</span>
          </div>
        </div>
        <div class="skill-category fade-up">
          <div class="skill-cat-header">
            <span class="skill-cat-icon">☁️</span>
            <span class="skill-cat-title">Cloud & DevOps</span>
          </div>
          <div class="skill-tags">
            <span class="skill-tag highlight">Docker</span>
            <span class="skill-tag">Kubernetes</span>
            <span class="skill-tag">AWS</span>
            <span class="skill-tag">Google Cloud</span>
            <span class="skill-tag">Jenkins</span>
            <span class="skill-tag">Git</span>
          </div>
        </div>
        </div>
    </div>
  </section>
  <!-- ── Projects ── -->
  <section id="projects">
    <div class="container">
      <div class="section-header fade-up">
        <span class="section-label">Projects</span>
        <h2 class="section-title">Things I've built</h2>
        <p class="section-desc">Real-world applications covering fraud intelligence, healthcare digitisation, and AI-powered hiring.</p>
        <div class="divider"></div>
      </div>
      <div class="projects-grid">
        <!-- Project 1 — Sentinel -->
        <div class="project-card fade-up">
          <div>
            <div class="project-number">01 / 03</div>
            <h3 class="project-name">🛡️ Sentinel</h3>
            <div class="project-tagline">Detecting risk before it becomes a loss.</div>
            <p class="project-desc">
              A full-stack fraud detection platform that identifies suspicious financial transactions in real-time using a trained machine learning model. Built for financial monitoring teams that need fast, actionable intelligence — not just raw data.
            </p>
            <ul class="project-highlights">
              <li>Real-time single transaction prediction with High / Medium / Low risk scoring (≥70% | 40–69% | &lt;40%)</li>
              <li>Batch CSV/JSON upload and processing with persisted SQL audit trail</li>
                            <span class="stack-tag">Python</span>
              <span class="stack-tag">FastAPI</span>
              <span class="stack-tag">scikit-learn</span>
              <span class="stack-tag">React</span>
              <span class="stack-tag">Vite</span>
              <span class="stack-tag">Docker</span>
              <span class="stack-tag">Vercel</span>
            </div>
            <div class="project-links">
              <a href="https://sentinel-ai-webz.vercel.app" target="_blank" rel="noopener" class="link-btn link-btn-primary">
                <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                Live Demo
              </a>
              <a href="https://github.com/Ayushman3108" target="_blank" rel="noopener" class="link-btn link-btn-secondary">
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                Source Code
              </a>
            </div>
          </div>
          <div class="project-badge">
            <div class="badge-pill live">🟢 Live</div>
            <div class="badge-pill ml">🧠 ML</div>
            <div class="project-emoji">🛡️</div>
          </div>
        </div>
        <!-- Project 2 — Aarogya-47 -->
        <div class="project-card fade-up">
          <div>
            <div class="project-number">02 / 03</div>
            <h3 class="project-name">🏥 Aarogya-47</h3>
            <div class="project-tagline">Healthcare, reimagined for a digital India.</div>
            <p class="project-desc">
              A patient case-management platform built on top of India's Ayushman Bharat Digital Mission (ABDM) infrastructure. It eliminates physical queues and manual prescriptions by digitising the entire patient–doctor workflow end-to-end.
            </p>
            <ul class="project-highlights">
              <li>Patients log in with their 14-digit ABHA ID or by scanning a QR code — zero paperwork</li>
              <li>Complete online checkup flow through ABDM-verified government health infrastructure</li>
              <li>Doctors get a clean digital case-sheet view, eliminating thousands of manual prescription checks</li>
              <li>Fully responsive UI built with React and Tailwind CSS for accessibility on any device</li>
            </ul>
            <div class="project-stack">
              <span class="stack-tag">React</span>
              <span class="stack-tag">Tailwind CSS</span>
              <span class="stack-tag">JavaScript</span>
              <span class="stack-tag">HTML</span>
              <span class="stack-tag">CSS</span>
            </div>
            <div class="project-links">
              <a href="https://github.com/Ayushman3108" target="_blank" rel="noopener" class="link-btn link-btn-primary">
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                 View on GitHub
              </a>
            </div>
          </div>
          <div class="project-badge">
            <div class="badge-pill healthcare">🏥 Healthcare</div>
            <div class="badge-pill full-stack">🌐 Full-Stack</div>
            <div class="project-emoji">🏥</div>
          </div>
        </div>
        <!-- Project 3 — AI Resume Analyzer -->
        <div class="project-card fade-up">
          <div>
            <div class="project-number">03 / 03</div>
            <h3 class="project-name">📄 AI Resume Analyzer & ATS Checker</h3>
            <div class="project-tagline">Your resume, optimised to get past the gatekeepers.</div>
            <p class="project-desc">
              An intelligent full-stack hiring tool that evaluates resumes against job descriptions using ATS algorithms — scoring candidates on keyword density, skill alignment, section completeness, and formatting compatibility to give recruiters an instant, bias-free hiring signal.
            </p>
            <ul class="project-highlights">
              <li>Parses uploaded resumes and scores them across keyword match, skills coverage, and ATS formatting rules</li>
              <li>Compares candidate profile against a target job description to surface gaps and strengths</li>
              <li>Gives candidates actionable feedback to improve their ATS score before applying</li>
              <li>Full REST API backend with MongoDB for persistent candidate and job-description storage</li>
            </ul>
             <div class="project-stack">
              <span class="stack-tag">React</span>
              <span class="stack-tag">Tailwind CSS</span>
              <span class="stack-tag">Node.js</span>
              <span class="stack-tag">MongoDB</span>
              <span class="stack-tag">REST API</span>
            </div>
            <div class="project-links">
              <a href="https://github.com/Ayushman3108" target="_blank" rel="noopener" class="link-btn link-btn-primary">
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                View on GitHub
              </a>
            </div>
          </div>
          <div class="project-badge">
            <div class="badge-pill ai">🤖 AI</div>
            <div class="badge-pill full-stack">🌐 Full-Stack</div>
            <div class="project-emoji">📄</div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- ── Contact ── -->
  <section id="contact">
    <div class="container">
      <div class="contact-grid">
        <div class="fade-up">
          <span class="section-label">Contact</span>
          <h2 class="section-title">Let's build something together.</h2>
          <p>I'm actively looking for full-stack / software developer opportunities. Whether you have a role, a project idea, or just want to say hi — I'd love to hear from you.</p>
          <div class="contact-links">
            <a href="mailto:ayushmannbanerjee3108@gmail.com" class="contact-link">
              <div class="contact-link-icon email">📧</div>
              <div>
                <strong>Email</strong>
                <span>ayushmannbanerjee3108@gmail.com</span>
              </div>
            </a>
            <a href="https://www.linkedin.com/in/ayushman-banerjee-11742437b" target="_blank" rel="noopener" class="contact-link">
              <div class="contact-link-icon linkedin">💼</div>
              <div>
                <strong>LinkedIn</strong>
                <span>linkedin.com/in/ayushman-banerjee-11742437b</span>
              </div>
            </a>
            <a href="https://github.com/Ayushman3108" target="_blank" rel="noopener" class="contact-link">
              <div class="contact-link-icon github">🐙</div>
              <div>
                <strong>GitHub</strong>
                <span>github.com/Ayushman3108</span>
              </div>
            </a>
          </div>
        </div>
        <form class="contact-form fade-up" onsubmit="handleSubmit(event)">
          <div class="form-group">
            <label for="name">Your Name</label>
            <input type="text" id="name" placeholder="John Doe" required />
            </div>
          <div class="form-group">
            <label for="email">Your Email</label>
            <input type="email" id="email" placeholder="john@company.com" required />
          </div>
          <div class="form-group">
            <label for="message">Message</label>
            <textarea id="message" placeholder="Tell me about the opportunity or project..." required></textarea>
          </div>
          <button type="submit" class="form-submit">Send Message →</button>
        </form>
      </div>
    </div>
  </section>
  <!-- ── Footer ── -->
  <footer>
    <div class="container">
      <div class="footer-inner">
        <span class="footer-logo">AB.</span>
        <span class="footer-copy">© 2026 Ayushman Banerjee · Built with ❤️</span>
        <div class="footer-links">
          <a href="#hero">Top</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
    </div>
  </footer>
  <script>
  // Navbar scroll shadow
    window.addEventListener('scroll', () => {
      document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 10);
    });
    // Hamburger menu
    function toggleMenu() {
      document.getElementById('navLinks').classList.toggle('open');
    }
    // Close menu on link click
    document.querySelectorAll('.nav-links a').forEach(a =>
      a.addEventListener('click', () => document.getElementById('navLinks').classList.remove('open'))
    );
    // Scroll-triggered fade-up animations
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } }),
      { threshold: 0.12 }
    );
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
    // Contact form handler (mailto fallback)
    function handleSubmit(e) {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
      window.location.href = `mailto:ayushmannbanerjee3108@gmail.com?subject=${subject}&body=${body}`;
    }
  </script>
</body>
</html>
