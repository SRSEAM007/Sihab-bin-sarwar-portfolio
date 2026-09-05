import { type FormEvent, type ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { TooltipProvider } from '@/components/ui/tooltip';
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  Clock3,
  ExternalLink,
  FlaskConical,
  Github,
  Linkedin,
  Mail,
  Menu,
  Moon,
  Phone,
  Send,
  Sun,
  X,
} from 'lucide-react';
import {
  Link,
  Route,
  Switch,
  Router as WouterRouter,
  useLocation,
  useParams,
} from 'wouter';
import { profile } from '@/data/profile';
import { projects } from '@/data/projects';
import { research } from '@/data/research';
import { blog } from '@/content/blog';

const queryClient = new QueryClient();

type Project = {
  slug: string;
  index: string;
  title: string;
  category: string;
  year: string;
  description: string;
  tags: string[];
  featured?: boolean;
  overview: string;
  challenge: string;
  approach: string[];
  outcome: string;
  repo: string;
  live?: string;
  paper?: string;
  image?: string;
};

type ResearchItem = {
  slug: string;
  title: string;
  year: string;
  status: string;
  type: string;
  summary: string;
  question: string;
  notes: string[];
  pdf?: string;
  repo?: string;
};

type BlogBlock = string | { type: 'image'; src: string; alt: string; caption?: string };

type BlogItem = {
  slug: string;
  title: string;
  date: string;
  read: string;
  category: string;
  summary: string;
  featured?: boolean;
  body: BlogBlock[];
  coverImage?: string;
};

const content = {
  ...profile,
  projects,
  research,
  blog,
};

function Header() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.localStorage.getItem('portfolio-theme') === 'dark';
  });
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    window.localStorage.setItem('portfolio-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);
  const navigation = [
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/research', label: 'Research' },
    { href: '/blog', label: 'Notes' },
  ];
  const isActive = (href: string) => location === href || location.startsWith(`${href}/`);
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="brand-mark" data-testid="link-brand" onClick={() => setOpen(false)}>
          <span className="brand-symbol">S</span>
          <span className="brand-copy">
            <span className="brand-name">{content.identity.name}</span>
            <span className="brand-role">portfolio / 2026</span>
          </span>
        </Link>
        <nav className={`desktop-nav ${open ? 'open' : ''}`} aria-label="Primary navigation">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link ${isActive(item.href) ? 'active' : ''}`}
              data-testid={`link-nav-${item.label.toLowerCase()}`}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          className="theme-toggle"
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          aria-pressed={darkMode}
          data-testid="button-theme-toggle"
          onClick={() => setDarkMode((value) => !value)}
        >
          {darkMode ? <Sun size={15} /> : <Moon size={15} />}
          <span>{darkMode ? 'Light' : 'Dark'}</span>
        </button>
        <a href={content.identity.resumeUrl} className="header-resume" target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>
          Resume
        </a>
        <Link href="/contact" className="header-cta" data-testid="link-contact-header" onClick={() => setOpen(false)}>
          Start a conversation <ArrowUpRight size={14} />
        </Link>
        <button
          type="button"
          className="menu-toggle"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open}
          data-testid="button-toggle-menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <span>© 2024 Sihab Bin Sarwar · built with curiosity</span>
        <span>
          <Link href="/contact" data-testid="link-footer-contact">Open to thoughtful work</Link>
        </span>
      </div>
    </footer>
  );
}

function Shell({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  useEffect(() => {
    const labels: Record<string, string> = {
      '/': 'Home',
      '/about': 'About',
      '/projects': 'Projects',
      '/research': 'Research',
      '/blog': 'Notes',
      '/contact': 'Contact',
    };
    const section = Object.entries(labels).find(([path]) => location === path || (path !== '/' && location.startsWith(`${path}/`)))?.[1] ?? 'Portfolio';
    document.title = `${section} — Sihab Bin Sarwar`;
  }, [location]);
  return (
    <div className="site-shell">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

function PageIntro({ kicker, title, lede }: { kicker: string; title: ReactNode; lede: string }) {
  return (
    <div className="page-intro reveal">
      <p className="page-kicker">{kicker}</p>
      <h1 className="page-title">{title}</h1>
      <p className="page-lede">{lede}</p>
    </div>
  );
}

function SectionHeading({ title, note, link, href }: { title: string; note?: string; link?: string; href?: string }) {
  return (
    <div className="section-heading">
      <h2 className="section-title">{title}</h2>
      {link && href ? (
        <Link href={href} className="section-link" data-testid={`link-section-${title.toLowerCase()}`}>
          {link} <ArrowUpRight size={14} />
        </Link>
      ) : note ? <p className="section-note">{note}</p> : null}
    </div>
  );
}

function ProjectCard({ project, tall = false }: { project: Project; tall?: boolean }) {
  return (
    <Link href={`/projects/${project.slug}`} className={`project-card ${tall ? 'tall' : ''}`} data-testid={`card-project-${project.slug}`}>
      <div className="project-image">
        <img src={project.image || '/images/project-grid.svg'} alt={`${project.title} project visual`} loading="lazy" />
        <span>{project.category}</span>
      </div>
      <div>
        <div className="card-topline">
          <span className="card-index">/ {project.index}</span>
          <span>{project.category}</span>
        </div>
        <h3 className="card-title">{project.title}</h3>
        <p className="card-description">{project.description}</p>
      </div>
      <div className="card-footer">
        <div className="tag-list">
          {project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
        </div>
        <ArrowUpRight className="arrow-icon" size={19} />
      </div>
    </Link>
  );
}

function HomePage() {
  return (
    <Shell>
      <div className="page-frame">
        <section className="hero">
          <div className="hero-grid">
            <div className="hero-copy reveal">
              <p className="eyebrow">01 — Sihab Bin Sarwar / currently learning in public</p>
              <h1 className="display-xl">
                Turning <span className="highlight">data</span><br />
                into useful <span className="accent-line">systems.</span>
              </h1>
              <div className="hero-actions">
                <Link href="/projects" className="button-primary" data-testid="link-hero-projects">See selected work <ArrowUpRight size={15} /></Link>
                <Link href="/about" className="button-secondary" data-testid="link-hero-about">Read the short version <ChevronRight size={15} /></Link>
                <a href={content.identity.resumeUrl} className="button-text" target="_blank" rel="noreferrer" data-testid="link-hero-resume">View resume <ExternalLink size={14} /></a>
              </div>
              <div className="hero-contact">
                <a href={`mailto:${content.identity.email}`}>{content.identity.email}</a>
                <span>{content.identity.phone}</span>
                <span>{content.identity.availability}</span>
              </div>
            </div>
            <div className="hero-support reveal reveal-delay-2">
              <div className="signal-panel">
                <div className="signal-head">
                  <span><span className="status-dot" /> &nbsp; signal / profile</span>
                  <span>v.01</span>
                </div>
                <div className="signal-plot">
                  <svg className="signal-path" viewBox="0 0 300 220" preserveAspectRatio="none" aria-label="A rising signal line">
                    <polyline points="0,190 34,175 62,182 88,125 121,145 147,105 174,117 205,61 235,81 264,33 300,45" />
                    <circle cx="88" cy="125" r="4" /><circle cx="205" cy="61" r="4" /><circle cx="264" cy="33" r="4" />
                  </svg>
                  <span className="signal-caption">data → model → decision</span>
                </div>
              </div>
              <p>{content.identity.description}</p>
            </div>
          </div>
        </section>

        <section className="stat-strip reveal reveal-delay-1" aria-label="Portfolio summary">
          {content.identity.summaryStats.map((stat) => (
            <div className="stat-item" key={stat.label}><span className="stat-value">{stat.value}</span><span className="stat-label">{stat.label}</span></div>
          ))}
        </section>

        <section className="section">
          <SectionHeading title="Selected work" note="A few artifacts from the space between a question and a working system." link="All projects" href="/projects" />
          <div className="feature-grid">
            <ProjectCard project={content.projects[0]} tall />
            <ProjectCard project={content.projects[1]} />
            <ProjectCard project={content.projects[2]} />
          </div>
        </section>

        <section className="section">
          <SectionHeading title="Recent notes" note="Short observations from building, reading, and testing ideas." link="Read the notebook" href="/blog" />
          <div className="writing-list">
            {content.blog.map((post) => (
              <Link className="writing-row" href={`/blog/${post.slug}`} key={post.slug} data-testid={`link-note-${post.slug}`}>
                <span className="writing-date">{post.date}</span>
                <h3 className="writing-title">{post.title}</h3>
                <span className="writing-type">{post.category}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </Shell>
  );
}

function AboutPage() {
  return (
    <Shell>
      <div className="page-frame">
        <PageIntro kicker="02 — context" title={<>A little more <em>signal</em>, a little less noise.</>} lede="The short version of how I work, what I care about, and the questions currently taking up space in my notebook." />
        <section className="about-split section" style={{ paddingTop: 0 }}>
          <div className="about-portrait reveal">
            <div className="portrait-grid" />
            <div className="profile-photo-placeholder">
              {content.identity.photoUrl ? (
                <img src={content.identity.photoUrl} alt={content.identity.photoAlt} loading="lazy" />
              ) : (
                <span>Add photo URL</span>
              )}
            </div>
            <span className="portrait-label">CS / DS / ML</span>
            <span className="portrait-initials">SBS</span>
          </div>
          <div className="reveal reveal-delay-1">
            <p className="lead-copy">{content.identity.intro}</p>
            <p className="body-copy">{content.identity.description}</p>
            <p className="body-copy">My work moves between modeling, software, and the interfaces that help someone make sense of the output. I care about practical systems, clear explanations, and learning from the edge cases.</p>
            <ul className="bullet-list">
              <li>Currently focused on data science, machine learning, and reliable product engineering.</li>
              <li>Learning in public through small experiments, reading notes, and honest postmortems.</li>
              <li>Open to internships, research collaborations, and hard problems with useful edges.</li>
            </ul>
          </div>
        </section>
        <section className="section">
          <SectionHeading title="Education & toolkit" note="A maintained snapshot, not a finished inventory." />
          <div className="education-skills">
            <div>
              {content.education.map((item) => (
                <div className="education-item" key={item.school}>
                  <span className="timeline-date">{item.graduation}</span>
                  <h3 className="timeline-title">{item.school}</h3>
                  <p className="timeline-copy">{item.degree}</p>
                </div>
              ))}
              <a href={content.identity.resumeUrl} className="button-secondary resume-link" target="_blank" rel="noreferrer">
                View / download resume <ExternalLink size={14} />
              </a>
            </div>
            <div className="skills-grid">
              {Object.entries(content.skills).map(([group, items]) => (
                <div className="skill-group" key={group}>
                  <span className="field-label">{group}</span>
                  <div className="tag-list">{items.map((skill) => <span className="tag" key={skill}>{skill}</span>)}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="section">
          <SectionHeading title="A working timeline" note="The places where a curiosity became a practice." />
            <div className="timeline">
              {content.experience.map((item) => (
                <div className="timeline-item" key={item.role}>
                  <span className="timeline-date">{item.period}</span>
                  <h3 className="timeline-title">{item.role} · {item.organization}</h3>
                  <p className="timeline-copy">{item.details}</p>
                </div>
              ))}
              <div className="timeline-item"><span className="timeline-date">Now</span><h3 className="timeline-title">Academic projects & research</h3><p className="timeline-copy">Building classification, prediction, database, and algorithms projects while sharpening the engineering layer behind each result.</p></div>
            </div>
        </section>
          <section className="section">
            <SectionHeading title="Certifications & activities" note="The signals behind the work." />
            <div className="cv-grid">
              <div><span className="field-label">Certifications</span><ul className="bullet-list compact-list">{content.certifications.map((item) => <li key={item}>{item}</li>)}</ul></div>
              <div><span className="field-label">Beyond coursework</span><ul className="bullet-list compact-list">{content.activities.map((item) => <li key={item}>{item}</li>)}</ul></div>
            </div>
          </section>
      </div>
    </Shell>
  );
}

function ProjectsPage() {
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Machine Learning', 'Data Science', 'Computer Vision', 'Web Development', 'Other'];
  const visible = filter === 'All' ? content.projects : content.projects.filter((item) => item.category === filter);
  return (
    <Shell>
      <div className="page-frame">
        <PageIntro kicker="03 — selected work" title={<>Things built to survive <em>contact</em> with reality.</>} lede="A collection of project studies across modeling, developer tools, and software systems. Every entry includes the decisions behind the artifact." />
        <div className="filter-row" role="group" aria-label="Filter projects">
          {filters.map((item) => <button type="button" className={`filter-button ${filter === item ? 'selected' : ''}`} key={item} onClick={() => setFilter(item)} data-testid={`button-filter-${item.toLowerCase().replaceAll(' ', '-')}`}>{item}</button>)}
        </div>
        {visible.length > 0 ? <div className="project-list">{visible.map((project) => <ProjectCard project={project} key={project.slug} />)}</div> : <div className="empty-state"><h2>No studies in this lane yet.</h2><p>The archive is still growing. Try another filter or return to the full set.</p></div>}
      </div>
    </Shell>
  );
}

function ResearchPage() {
  return (
    <Shell>
      <div className="page-frame">
        <PageIntro kicker="04 — research notebook" title={<>Questions before <em>answers.</em></>} lede="Working papers, experiments, and careful notes on making technical systems more honest about what they know." />
        <div className="research-grid">
          {content.research.map((item) => (
            <Link href={`/research/${item.slug}`} className="research-card" key={item.slug} data-testid={`card-research-${item.slug}`}>
              <span className="research-status">{item.status}</span>
              <div className="paper-meta"><span>{item.type}</span><span>{item.year}</span></div>
              <h2 className="card-title">{item.title}</h2>
              <p className="card-description">{item.summary}</p>
              <div className="card-footer"><span className="font-mono" style={{ fontSize: 10 }}>Open notebook</span><ArrowUpRight size={17} /></div>
            </Link>
          ))}
        </div>
        <section className="section" style={{ paddingBottom: 0 }}>
          <div className="empty-state"><FlaskConical size={24} style={{ marginBottom: 12 }} /><h2>More field notes are incubating.</h2><p>When an idea has earned a few failed experiments and a sharper question, it will appear here.</p></div>
        </section>
      </div>
    </Shell>
  );
}

function BlogPage() {
  return (
    <Shell>
      <div className="page-frame">
        <PageIntro kicker="05 — notes from the edge" title={<>A notebook for the <em>in-between.</em></>} lede="Writing about models, software, research habits, and the small decisions that make technical work trustworthy." />
        <div className="blog-grid">
          {content.blog.map((post) => (
            <Link href={`/blog/${post.slug}`} className={`blog-card ${post.featured ? 'featured' : ''}`} key={post.slug} data-testid={`card-blog-${post.slug}`}>
                {post.coverImage ? <img className="blog-cover" src={post.coverImage} alt="" loading="lazy" /> : null}
              <div className="card-meta"><span>{post.category}</span><span>{post.date}</span></div>
              <h2 className="card-title">{post.title}</h2>
              <p className="card-description">{post.summary}</p>
              <div className="card-footer"><span className="font-mono" style={{ fontSize: 10 }}>{post.read}</span><ArrowUpRight size={17} /></div>
            </Link>
          ))}
        </div>
      </div>
    </Shell>
  );
}

function DetailNotFound({ kind }: { kind: string }) {
  return (
    <Shell>
      <div className="page-frame narrow">
        <div className="not-found">
          <span className="not-found-code">404 / {kind} not found</span>
          <h1>That page is still a question.</h1>
          <p>The requested entry does not exist in this notebook.</p>
          <Link href="/" className="button-primary" data-testid="link-not-found-home">Return to the index <ArrowLeft size={15} /></Link>
        </div>
      </div>
    </Shell>
  );
}

function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = content.projects.find((item) => item.slug === slug);
  if (!project) return <DetailNotFound kind="project" />;
  return (
    <Shell>
      <div className="page-frame">
        <Link href="/projects" className="section-link" data-testid="link-back-projects"><ArrowLeft size={14} /> Back to projects</Link>
        <div className="detail-hero" style={{ marginTop: 54 }}>
          <div className="reveal"><p className="page-kicker">{project.category} / {project.year}</p><h1 className="detail-title">{project.title}</h1></div>
          <aside className="detail-aside reveal reveal-delay-1"><span className="detail-aside-label">Project brief</span><p>{project.description}</p><div className="tag-list">{project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div></aside>
        </div>
        <article className="article">
          <p>{project.overview}</p>
          <h2>The question</h2><p>{project.challenge}</p>
          <div className="callout">The most useful output is not always a prediction. Sometimes it is a better decision about what to measure next.</div>
          <h2>How it came together</h2>
          <ul>{project.approach.map((step) => <li key={step}>{step}</li>)}</ul>
          <h2>What changed</h2><p>{project.outcome}</p>
           <div className="code-block">// project link<br />{project.repo || 'add repository URL in src/data/projects.js'}<br /><br />status = "documented and open to critique"</div>
          <div className="detail-actions">
             {project.repo ? <a href={`https://${project.repo}`} className="button-primary" target="_blank" rel="noreferrer" data-testid="link-project-repository">GitHub <Github size={14} /></a> : <span className="button-secondary is-placeholder">GitHub (add URL)</span>}
            <a href={project.live ? `https://${project.live}` : '#project-live-demo'} className={`button-secondary ${project.live ? '' : 'is-placeholder'}`} target={project.live ? '_blank' : undefined} rel={project.live ? 'noreferrer' : undefined} data-testid="link-project-demo" onClick={(event) => { if (!project.live) event.preventDefault(); }}>Live demo {project.live ? <ExternalLink size={14} /> : <span>(add URL)</span>}</a>
            <a href={project.paper ? `https://${project.paper}` : '#project-paper'} className={`button-secondary ${project.paper ? '' : 'is-placeholder'}`} target={project.paper ? '_blank' : undefined} rel={project.paper ? 'noreferrer' : undefined} data-testid="link-project-paper" onClick={(event) => { if (!project.paper) event.preventDefault(); }}>Paper {project.paper ? <ExternalLink size={14} /> : <span>(add PDF)</span>}</a>
          </div>
        </article>
      </div>
    </Shell>
  );
}

function ResearchDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const item = content.research.find((entry) => entry.slug === slug);
  if (!item) return <DetailNotFound kind="research entry" />;
  return (
    <Shell>
      <div className="page-frame">
        <Link href="/research" className="section-link" data-testid="link-back-research"><ArrowLeft size={14} /> Back to research</Link>
        <div className="detail-hero" style={{ marginTop: 54 }}>
          <div className="reveal"><p className="page-kicker">{item.type} / {item.year}</p><h1 className="detail-title">{item.title}</h1></div>
          <aside className="detail-aside reveal reveal-delay-1"><span className="research-status">{item.status}</span><p>{item.summary}</p></aside>
        </div>
        <article className="article">
          <p>{item.question}</p>
          <h2>Working notes</h2>
          <ul>{item.notes.map((note) => <li key={note}>{note}</li>)}</ul>
          <div className="callout">A research note is allowed to be unfinished. Its job is to make the next experiment more precise.</div>
          <h2>Next pass</h2><p>These notes are intentionally editable placeholder content. The next iteration will add measurements, references, and a clearer account of what changed between trials.</p>
          <div className="detail-actions">
            {item.repo ? <a href={`https://${item.repo}`} className="button-primary" target="_blank" rel="noreferrer">GitHub <Github size={14} /></a> : <span className="button-secondary is-placeholder">GitHub (add URL)</span>}
            {item.pdf ? <a href={item.pdf} className="button-secondary" target="_blank" rel="noreferrer">Paper PDF <ExternalLink size={14} /></a> : <span className="button-secondary is-placeholder">Paper PDF (add URL)</span>}
          </div>
        </article>
      </div>
    </Shell>
  );
}

function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = content.blog.find((entry) => entry.slug === slug);
  if (!post) return <DetailNotFound kind="note" />;
  const blocks = post.body as unknown as BlogBlock[];
  return (
    <Shell>
      <div className="page-frame narrow">
        <Link href="/blog" className="section-link" data-testid="link-back-blog"><ArrowLeft size={14} /> Back to notes</Link>
        <div className="detail-hero" style={{ gridTemplateColumns: '1fr', marginTop: 54, marginBottom: 60 }}>
          <div className="reveal"><p className="page-kicker">{post.category} / {post.date} / {post.read}</p><h1 className="detail-title">{post.title}</h1></div>
        </div>
        {post.coverImage ? <img className="article-cover" src={post.coverImage} alt="" loading="lazy" /> : null}
        <article className="article">
          {blocks.map((block, index) => (
            typeof block === 'string' ? (
              <p key={`${post.slug}-paragraph-${index}`} className={index === 0 ? 'lead-copy' : ''}>{block}</p>
            ) : (
              <figure className="article-figure" key={`${post.slug}-image-${index}`}>
                <img src={block.src} alt={block.alt} loading="lazy" />
                {block.caption ? <figcaption>{block.caption}</figcaption> : null}
              </figure>
            )
          ))}
          <div className="callout">Good technical writing is a second interface: it gives another person a way into the work.</div>
          <h2>One thing to carry forward</h2><p>Keep the observation close to the decision. The distance between them is where assumptions tend to disappear.</p>
        </article>
      </div>
    </Shell>
  );
}

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const formEndpoint = import.meta.env.VITE_FORM_ENDPOINT as string | undefined;
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get('name') || '').trim();
    const email = String(form.get('email') || '').trim();
    const message = String(form.get('message') || '').trim();
    if (!name || !email || !message) {
      setError('Please add your name, email, and a short message.');
      return;
    }
    if (formEndpoint) {
      try {
        const response = await fetch(formEndpoint, {
          method: 'POST',
          body: form,
          headers: { Accept: 'application/json' },
        });
        if (!response.ok) throw new Error('Contact form request failed');
      } catch {
        setError('The form service could not receive this note. Please use the email link instead.');
        return;
      }
    }
    setError('');
    setSubmitted(true);
  };
  return (
    <Shell>
      <div className="page-frame">
        <PageIntro kicker="06 — contact" title={<>Have a good <em>question?</em></>} lede="I am open to research conversations, engineering internships, and collaborations where the problem is worth understanding properly." />
        <div className="contact-split">
          <div className="contact-card reveal">
            <p className="eyebrow">Direct line</p>
            <h2>Let’s make the first message useful.</h2>
            <p>Share the problem, the context, or the rough shape of an idea. It does not need to be polished before it reaches me.</p>
            <div className="contact-links">
              <a href={`mailto:${content.identity.email}`} className="contact-link" data-testid="link-contact-email"><span>{content.identity.email}</span><Mail size={15} /></a>
              <a href={`tel:${content.identity.phone}`} className="contact-link" data-testid="link-contact-phone"><span>{content.identity.phone}</span><Phone size={15} /></a>
              <a href={`https://${content.identity.github}`} className="contact-link" target="_blank" rel="noreferrer" data-testid="link-contact-github"><span>{content.identity.github}</span><Github size={15} /></a>
              <a href={`https://${content.identity.linkedin}`} className="contact-link" target="_blank" rel="noreferrer" data-testid="link-contact-linkedin"><span>{content.identity.linkedin}</span><Linkedin size={15} /></a>
            </div>
          </div>
          <div className="reveal reveal-delay-1">
            {submitted ? (
              <div className="success-state"><CheckCircle2 size={24} /><h2>Message drafted successfully.</h2><p>This frontend-only form is ready to connect to an email service. For now, your intent has been captured locally.</p></div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div><label className="field-label" htmlFor="contact-name">Your name</label><input className="field-input" id="contact-name" name="name" placeholder="A name I can use" data-testid="input-contact-name" /></div>
                <div><label className="field-label" htmlFor="contact-email">Email address</label><input className="field-input" id="contact-email" name="email" type="email" placeholder="you@example.com" data-testid="input-contact-email" /></div>
                <div><label className="field-label" htmlFor="contact-message">The useful part</label><textarea className="field-input textarea" id="contact-message" name="message" placeholder="What are you working on?" data-testid="input-contact-message" /></div>
                {error ? <p className="form-error" role="alert" data-testid="text-contact-error">{error}</p> : null}
                <button type="submit" className="button-primary" data-testid="button-contact-submit">Send the note <Send size={14} /></button>
                <p className="form-note">{formEndpoint ? 'Connected to the configured form service.' : 'To receive submissions, set VITE_FORM_ENDPOINT in your deployment environment. See README.md.'}</p>
              </form>
            )}
          </div>
        </div>
        <section className="section" style={{ paddingBottom: 0 }}>
          <div className="section-heading"><h2 className="section-title">Response time</h2><p className="section-note"><Clock3 size={14} style={{ verticalAlign: 'middle', marginRight: 6 }} /> Usually within a few thoughtful days.</p></div>
        </section>
      </div>
    </Shell>
  );
}

function NotFoundPage() {
  return <DetailNotFound kind="page" />;
}

function Router() {
  return (
    <ErrorBoundary>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/projects" component={ProjectsPage} />
        <Route path="/projects/:slug" component={ProjectDetailPage} />
        <Route path="/research" component={ResearchPage} />
        <Route path="/research/:slug" component={ResearchDetailPage} />
        <Route path="/blog" component={BlogPage} />
        <Route path="/blog/:slug" component={BlogDetailPage} />
        <Route path="/contact" component={ContactPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </ErrorBoundary>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;