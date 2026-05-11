import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import {
  Terminal,
  Check,
  Clock,
  ArrowRight,
  ShieldCheck,
  Zap,
  GitPullRequest,
  LayoutDashboard,
  Code2,
  ChevronRight,
} from 'lucide-react';

/* ─── GitHub Icon (lucide removed Github in recent versions) ─────────────────── */
const GithubIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.021C22 6.484 17.522 2 12 2z" />
  </svg>
);

/* ─── Global Styles ─────────────────────────────────────────────────────────── */
const CustomStyles = () => (
  <style
    dangerouslySetInnerHTML={{
      __html: `
    ::selection { background: #3f3f46; color: #fafafa; }
    input, textarea { color-scheme: dark; }
    @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
    .cursor-blink { animation: blink 1.1s step-end infinite; }
    @keyframes fade-in { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
    .fade-in { animation: fade-in 0.5s ease forwards; }
  `,
    }}
  />
);

/* ─── Navbar ─────────────────────────────────────────────────────────────────── */
const Navbar = () => (
  <nav className="w-full border-b border-zinc-800 bg-[#09090b]/95 backdrop-blur sticky top-0 z-50">
    <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-7 h-7 bg-zinc-100 rounded-md flex items-center justify-center">
          <ShieldCheck className="w-4 h-4 text-zinc-900" />
        </div>
        <span className="font-semibold tracking-tight text-zinc-100 text-[15px]">Velonus</span>
        <span className="px-2 py-0.5 rounded-full bg-zinc-800/80 text-[10px] font-mono text-zinc-400 uppercase tracking-wider ml-1">
          v0.1.0-alpha
        </span>
      </div>
      <div className="flex items-center gap-6">
        <a
          href="https://github.com/AliAmmar15/Velonus"
          target="_blank"
          rel="noreferrer"
          className="text-zinc-500 hover:text-zinc-300 transition-colors"
          aria-label="GitHub"
        >
          <GithubIcon className="w-4 h-4" />
        </a>
        <a
          href="#beta-form"
          className="text-sm font-medium text-zinc-900 bg-zinc-100 hover:bg-white px-4 py-1.5 rounded-md transition-colors"
        >
          Join Beta
        </a>
      </div>
    </div>
  </nav>
);

/* ─── Terminal Mockup ────────────────────────────────────────────────────────── */
const TerminalMockup = () => {
  const lines = [
    { type: 'cmd',   content: 'Velonus scan ./src' },
    { type: 'info',  content: 'Initializing scanner pipeline...' },
    { type: 'check', content: 'Secrets (trufflehog + entropy)   0 findings' },
    { type: 'check', content: 'Bandit (Python SAST)             2 findings' },
    { type: 'check', content: 'Semgrep (pattern matching)       1 finding' },
    { type: 'check', content: 'pip-audit (dependency CVEs)      1 finding' },
    { type: 'check', content: 'Safety (vulnerability DB)        1 finding' },
    { type: 'info',  content: 'Normalizing and deduplicating 214 raw signals...' },
  ];

  const findings = [
    { sev: 'HIGH',   color: 'text-red-400',    msg: 'Hardcoded JWT secret',          loc: 'src/auth/config.py:12' },
    { sev: 'MED',    color: 'text-yellow-400', msg: "Outdated 'requests==2.28.1' (CVE-2023-32681)", loc: null },
    { sev: 'MED',    color: 'text-yellow-400', msg: 'Unsanitized SQL input',          loc: 'src/db/users.py:44' },
  ];

  return (
    <div className="w-full rounded-lg overflow-hidden border border-zinc-800 bg-[#0c0c0e] my-14">
      {/* Title bar */}
      <div className="h-10 border-b border-zinc-800 flex items-center px-4 gap-2 bg-[#121214]">
        <div className="w-3 h-3 rounded-full bg-zinc-700" />
        <div className="w-3 h-3 rounded-full bg-zinc-700" />
        <div className="w-3 h-3 rounded-full bg-zinc-700" />
        <div className="ml-4 text-xs font-mono text-zinc-500">~/projects/api-backend</div>
        <div className="ml-auto text-xs font-mono text-zinc-600">zsh</div>
      </div>

      <div className="p-5 font-mono text-[13px] leading-relaxed text-zinc-400 overflow-x-auto">
        {/* Command lines */}
        {lines.map((l, i) =>
          l.type === 'cmd' ? (
            <div key={i} className="flex gap-2 mb-2">
              <span className="text-zinc-600 select-none">$</span>
              <span className="text-zinc-100">{l.content}</span>
            </div>
          ) : l.type === 'check' ? (
            <div key={i} className="flex items-center gap-2 mt-1">
              <Check className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
              <span className="text-zinc-500">{l.content}</span>
            </div>
          ) : (
            <div key={i} className="text-zinc-600 mt-2">{l.content}</div>
          )
        )}

        {/* Findings block */}
        <div className="mt-5 border-l-2 border-zinc-700 pl-4">
          <div className="text-zinc-200 font-semibold mb-3">
            3 actionable issues after deduplication:
          </div>
          {findings.map((f, i) => (
            <div key={i} className="mt-1.5 text-zinc-300 flex flex-wrap gap-x-1">
              <span className="text-zinc-500">{i + 1}.</span>
              <span className={`font-semibold ${f.color}`}>[{f.sev}]</span>
              <span>{f.msg}</span>
              {f.loc && <span className="text-zinc-600">— {f.loc}</span>}
            </div>
          ))}
        </div>

        {/* AI note */}
        <div className="mt-5 px-3 py-2.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-500 text-xs leading-relaxed">
          <span className="text-zinc-400 font-semibold">Coming in Phase 2:</span> AI exploitability
          scoring, false-positive filtering, and automated code fixes via{' '}
          <span className="text-zinc-400">claude-sonnet-4-6</span>.
        </div>

        {/* Prompt cursor */}
        <div className="flex gap-2 mt-5">
          <span className="text-zinc-600 select-none">$</span>
          <span className="cursor-blink w-2 h-4 bg-zinc-400 inline-block" />
        </div>
      </div>
    </div>
  );
};

/* ─── Stats Bar ──────────────────────────────────────────────────────────────── */
const StatsBar = () => {
  const stats = [
    { value: '5', label: 'Analysis tools orchestrated' },
    { value: '312', label: 'Unit tests passing' },
    { value: '<30s', label: 'Scan time target' },
    { value: 'SARIF', label: 'Native CI/CD output' },
  ];
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-zinc-800 rounded-lg overflow-hidden border border-zinc-800 my-14">
      {stats.map((s, i) => (
        <div key={i} className="bg-[#0f0f11] px-6 py-5 text-center">
          <div className="text-2xl font-semibold text-zinc-100 tracking-tight">{s.value}</div>
          <div className="text-xs text-zinc-500 mt-1">{s.label}</div>
        </div>
      ))}
    </div>
  );
};

/* ─── Transparency Section ───────────────────────────────────────────────────── */
const TransparencySection = () => {
  const working = [
    'Local CLI scanner — pip installable, zero config',
    'Parallel 5-tool orchestration (secrets, Bandit, Semgrep, pip-audit, Safety)',
    'Deterministic SHA-256 fingerprinting — track findings across scans',
    'Deduplication: 214 raw signals → 3 actionable issues',
    'SARIF 2.1.0 output — uploads to GitHub Security tab automatically',
    'CWE + OWASP Top 10 mappings on every finding',
    'Rich terminal output with severity-sorted tables',
    'GitHub Actions CI pipeline (lint, typecheck, 312 passing tests)',
  ];

  const roadmap = [
    {
      icon: <Zap className="w-4 h-4" />,
      title: 'AI Prioritization',
      desc: 'Claude Haiku scores exploitability, kills false positives in bulk',
      phase: 'Phase 2',
    },
    {
      icon: <Code2 className="w-4 h-4" />,
      title: 'Automated Code Fixes',
      desc: 'Claude Sonnet generates production-ready patches, cached by fingerprint',
      phase: 'Phase 2',
    },
    {
      icon: <GitPullRequest className="w-4 h-4" />,
      title: 'GitHub PR Integration',
      desc: 'Inline review comments with one-click fix suggestions on every PR',
      phase: 'Phase 3',
    },
    {
      icon: <LayoutDashboard className="w-4 h-4" />,
      title: 'Web Dashboard',
      desc: 'Scan history, finding trends, suppression management',
      phase: 'Phase 4',
    },
  ];

  return (
    <section className="py-16 border-t border-zinc-900">
      <div className="grid md:grid-cols-2 gap-14">
        {/* Working */}
        <div>
          <h3 className="text-base font-semibold text-zinc-100 mb-6 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-zinc-400" />
            What's working today
          </h3>
          <ul className="space-y-3.5">
            {working.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-zinc-400 leading-snug">
                <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Roadmap */}
        <div>
          <h3 className="text-base font-semibold text-zinc-100 mb-6 flex items-center gap-2">
            <Clock className="w-4 h-4 text-zinc-400" />
            What we're building next
          </h3>
          <ul className="space-y-5">
            {roadmap.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-md bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 shrink-0 mt-0.5">
                  {item.icon}
                </div>
                <div>
                  <div className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                    {item.title}
                    <span className="text-[10px] font-mono text-zinc-600 bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded">
                      {item.phase}
                    </span>
                  </div>
                  <div className="text-xs text-zinc-500 mt-0.5 leading-snug">{item.desc}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

/* ─── How It Works ───────────────────────────────────────────────────────────── */
const HowItWorks = () => {
  const steps = [
    {
      n: '01',
      title: 'Orchestrate',
      desc: 'One command runs five analysis tools in parallel — static analysis, secret detection, and dependency CVE scanning.',
    },
    {
      n: '02',
      title: 'Normalize',
      desc: 'Hundreds of raw signals collapse into deduplicated, fingerprinted findings with CWE and OWASP mappings.',
    },
    {
      n: '03',
      title: 'Prioritize (soon)',
      desc: 'AI scores each finding by actual exploitability in your codebase. Low-signal noise is filtered, not surfaced.',
    },
    {
      n: '04',
      title: 'Fix (soon)',
      desc: 'AI generates secure, context-aware code patches. Accept them in one click via GitHub PR suggestions.',
    },
  ];

  return (
    <section className="py-16 border-t border-zinc-900">
      <h2 className="text-xl font-semibold text-zinc-100 mb-10">How it works</h2>
      <div className="grid sm:grid-cols-2 gap-8">
        {steps.map((s, i) => (
          <div key={i} className="flex gap-4">
            <div className="text-3xl font-bold text-zinc-800 font-mono tabular-nums shrink-0 leading-none mt-1">
              {s.n}
            </div>
            <div>
              <h3 className="text-sm font-semibold text-zinc-200 mb-1">{s.title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

/* ─── Manifesto ──────────────────────────────────────────────────────────────── */
const Manifesto = () => (
  <section className="py-16 border-t border-zinc-900">
    <h2 className="text-xl font-semibold text-zinc-100 mb-6">Why we're building this</h2>
    <div className="space-y-4">
      <p className="text-zinc-400 leading-relaxed text-[15px]">
        Every serious security tool we've used has the same problem: it tells you <em>that</em> you have issues,
        not <em>which ones matter</em> or <em>how to fix them</em>. The result is 200-item dashboards,
        blocked pipelines, and developers who've learned to click "dismiss all."
      </p>
      <p className="text-zinc-400 leading-relaxed text-[15px]">
        Velonus is built around a different assumption: <span className="text-zinc-200">developers will fix
        security issues if you remove the friction</span>. That means fewer findings (only the real ones),
        plain-English context, and generated code patches they can apply without becoming a security expert.
      </p>
      <p className="text-zinc-400 leading-relaxed text-[15px]">
        We have a working scanner pipeline today. The AI layer is next. We're building in public and we need
        real Python codebases to validate against — that's why we're running this beta.
      </p>
    </div>
  </section>
);

/* ─── Beta Form ──────────────────────────────────────────────────────────────── */
const EMAILJS_SERVICE  = 'service_2iucag7';
const EMAILJS_NOTIFY   = 'template_h6hxhj4';  // velonus_notify  → sends to you
const EMAILJS_CONFIRM  = 'template_3a18ru8';  // velonus_confirm → sends to them
const EMAILJS_KEY      = 'znd0sXMqnDHGUmi_q';

const BetaForm = () => {
  const [status, setStatus] = useState('idle');
  const [error, setError]   = useState('');
  const [fields, setFields] = useState({
    from_name: '',
    from_email: '',
    github_url: '',
    project_type: '',
  });

  const set = (key) => (e) => setFields((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setError('');

    const params = {
      from_name:    fields.from_name,
      from_email:   fields.from_email,
      github_url:   fields.github_url  || '—',
      project_type: fields.project_type || '—',
    };

    try {
      await emailjs.send(EMAILJS_SERVICE, EMAILJS_NOTIFY,  params, EMAILJS_KEY);
      await emailjs.send(EMAILJS_SERVICE, EMAILJS_CONFIRM, params, EMAILJS_KEY);
      setStatus('success');
    } catch (err) {
      console.error('EmailJS error', err);
      setError('Something went wrong — please try again or email us directly.');
      setStatus('idle');
    }
  };

  return (
    <section id="beta-form" className="py-16 border-t border-zinc-900 mb-24">
      <div className="bg-[#0f0f11] border border-zinc-800 rounded-xl p-8 sm:p-10">
        <div className="mb-8 max-w-lg">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-400 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
            Phase 1 in progress — CLI available now
          </div>
          <h2 className="text-xl font-semibold text-zinc-100 mb-2">
            Help us validate the scanner.
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed">
            We're looking for Python developers willing to run{' '}
            <code className="font-mono text-zinc-300 bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800 text-xs">
              velonus scan
            </code>{' '}
            against their codebase, tell us what we miss, and shape the AI layer before it ships.
          </p>
        </div>

        {status === 'success' ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8 flex flex-col items-center justify-center text-center fade-in">
            <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center mb-4">
              <Check className="w-5 h-5 text-zinc-300" />
            </div>
            <h3 className="text-zinc-100 font-semibold mb-1">You're on the list.</h3>
            <p className="text-sm text-zinc-500 max-w-xs">
              We'll reach out with install instructions when the next test build is ready.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">
                  Name
                </label>
                <input
                  required
                  type="text"
                  value={fields.from_name}
                  onChange={set('from_name')}
                  className="w-full bg-[#09090b] border border-zinc-800 rounded-lg px-3 py-2.5 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-all"
                  placeholder="Jane Doe"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">
                  Email
                </label>
                <input
                  required
                  type="email"
                  value={fields.from_email}
                  onChange={set('from_email')}
                  className="w-full bg-[#09090b] border border-zinc-800 rounded-lg px-3 py-2.5 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-all"
                  placeholder="jane@example.com"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">
                GitHub profile or repo{' '}
                <span className="text-zinc-700 normal-case font-normal">(optional)</span>
              </label>
              <input
                type="url"
                value={fields.github_url}
                onChange={set('github_url')}
                className="w-full bg-[#09090b] border border-zinc-800 rounded-lg px-3 py-2.5 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-all"
                placeholder="https://github.com/janedoe"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">
                What kind of project would you scan?{' '}
                <span className="text-zinc-700 normal-case font-normal">(optional)</span>
              </label>
              <input
                type="text"
                value={fields.project_type}
                onChange={set('project_type')}
                className="w-full bg-[#09090b] border border-zinc-800 rounded-lg px-3 py-2.5 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-all"
                placeholder="FastAPI backend, LangChain app, Django monolith..."
              />
            </div>

            {error && (
              <p className="text-xs text-red-400">{error}</p>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full sm:w-auto mt-2 bg-zinc-100 hover:bg-white text-zinc-900 font-semibold py-2.5 px-6 rounded-lg transition-colors disabled:opacity-50 text-sm flex items-center justify-center gap-2"
            >
              {status === 'submitting' ? (
                'Submitting...'
              ) : (
                <>
                  Request Beta Access
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

/* ─── Footer ─────────────────────────────────────────────────────────────────── */
const Footer = () => (
  <footer className="py-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4">
    <div className="flex items-center gap-2">
      <ShieldCheck className="w-4 h-4 text-zinc-600" />
      <span className="text-xs text-zinc-600">Velonus — Building in public.</span>
    </div>
    <div className="flex items-center gap-5">
      <a
        href="https://github.com/AliAmmar15/Velonus"
        target="_blank"
        rel="noreferrer"
        className="text-zinc-600 hover:text-zinc-300 transition-colors flex items-center gap-1.5 text-xs"
      >
        <GithubIcon className="w-3.5 h-3.5" />
        Open source CLI
      </a>
      <a href="#beta-form" className="text-zinc-600 hover:text-zinc-300 transition-colors text-xs flex items-center gap-1">
        Join beta
        <ChevronRight className="w-3 h-3" />
      </a>
    </div>
  </footer>
);

/* ─── App ────────────────────────────────────────────────────────────────────── */
export default function App() {
  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-300 font-sans antialiased">
      <CustomStyles />
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 pt-20">
        {/* Hero */}
        <header className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-400 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
            Phase 1 in progress — scanner pipeline live
          </div>

          <h1 className="text-4xl sm:text-5xl font-semibold text-zinc-100 tracking-tight leading-[1.15] mb-5">
            The AI security copilot{' '}
            <span className="text-zinc-500">built for developers,</span>{' '}
            not auditors.
          </h1>

          <p className="text-base text-zinc-400 leading-relaxed mb-8 max-w-xl">
            Velonus runs five analysis tools in parallel, collapses hundreds of raw signals into the
            findings that actually matter, and is being built to write the fixes for you.
            Working CLI today. AI remediation next.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#beta-form"
              className="inline-flex items-center gap-2 bg-zinc-100 hover:bg-white text-zinc-900 text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
            >
              Join the beta
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/AliAmmar15/Velonus"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-zinc-800 hover:border-zinc-600 text-zinc-400 hover:text-zinc-200 text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              View on GitHub
            </a>
          </div>
        </header>

        <TerminalMockup />
        <StatsBar />
        <TransparencySection />
        <HowItWorks />
        <Manifesto />
        <BetaForm />
      </main>

      <div className="max-w-4xl mx-auto px-6">
        <Footer />
      </div>
    </div>
  );
}
