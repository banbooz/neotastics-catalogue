import React from 'react';
import { createRoot } from 'react-dom/client';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { ArrowUpRight, Banknote, BrainCircuit, PiggyBank, Sparkles, TrendingUp } from 'lucide-react';
import './styles.css';

function App() {
  const [videosPerWeek, setVideosPerWeek] = React.useState(3);
  const [currentThumbnailCost, setCurrentThumbnailCost] = React.useState(30);
  const [aiThumbnailCost, setAiThumbnailCost] = React.useState(10);
  const [extraMonthlyBudget, setExtraMonthlyBudget] = React.useState(0);

  const calc = React.useMemo(() => {
    const videosPerYear = videosPerWeek * 52;
    const currentYearlyCost = videosPerYear * currentThumbnailCost;
    const aiYearlyCost = videosPerYear * aiThumbnailCost;
    const yearlySavings = Math.max(0, currentYearlyCost - aiYearlyCost);
    const monthlySavings = yearlySavings / 12;
    const threeYearSavings = yearlySavings * 3;
    const totalReinvestableYearly = yearlySavings + extraMonthlyBudget * 12;

    const monthlyData = Array.from({ length: 12 }, (_, i) => {
      const month = i + 1;
      return {
        month: `M${month}`,
        withoutAI: Math.round((currentYearlyCost / 12) * month),
        withAI: Math.round((aiYearlyCost / 12) * month),
        saved: Math.round((yearlySavings / 12) * month),
      };
    });

    const comparisonData = [
      { name: 'Without AI', cost: currentYearlyCost },
      { name: 'With AI', cost: aiYearlyCost },
      { name: 'Saved', cost: yearlySavings },
    ];

    return {
      videosPerYear,
      currentYearlyCost,
      aiYearlyCost,
      yearlySavings,
      monthlySavings,
      threeYearSavings,
      totalReinvestableYearly,
      monthlyData,
      comparisonData,
    };
  }, [videosPerWeek, currentThumbnailCost, aiThumbnailCost, extraMonthlyBudget]);

  const money = (n) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(Number.isFinite(n) ? n : 0);

  return (
    <main className="page">
      <div className="glow glow-one" />
      <div className="glow glow-two" />
      <div className="glow glow-three" />

      <section className="hero">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="hero-copy"
        >
          <div className="pill"><Sparkles size={16} /> AI-assisted thumbnail savings calculator</div>
          <h1>See how much your channel could save with AI thumbnails.</h1>
          <p>
            Enter your upload schedule and current thumbnail cost. This calculator shows how much money could stay inside your channel instead of being spent on every thumbnail.
          </p>

          <div className="mini-grid">
            <MiniStat icon={<BrainCircuit />} title="AI-assisted" text="Fast concepts, lower cost" />
            <MiniStat icon={<PiggyBank />} title="Budget friendly" text="Save per upload" />
            <MiniStat icon={<TrendingUp />} title="Reinvest" text="More videos, assets, edits" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="panel input-panel"
        >
          <h2>Your channel inputs</h2>
          <p className="muted">Change the numbers to match your channel.</p>

          <div className="field">
            <div className="field-row">
              <label>Videos per week</label>
              <span className="tag">{videosPerWeek}</span>
            </div>
            <input
              type="range"
              min="1"
              max="14"
              step="1"
              value={videosPerWeek}
              onChange={(e) => setVideosPerWeek(Number(e.target.value))}
            />
          </div>

          <NumberField label="Current thumbnail cost" value={currentThumbnailCost} onChange={setCurrentThumbnailCost} prefix="$" />
          <NumberField label="AI thumbnail service cost" value={aiThumbnailCost} onChange={setAiThumbnailCost} prefix="$" />
          <NumberField label="Extra monthly channel budget" value={extraMonthlyBudget} onChange={setExtraMonthlyBudget} prefix="$" />
        </motion.div>
      </section>

      <section className="results-grid">
        <ResultCard icon={<Banknote />} title="Current yearly thumbnail spend" value={money(calc.currentYearlyCost)} subtitle={`${calc.videosPerYear} thumbnails per year at ${money(currentThumbnailCost)} each`} />
        <ResultCard icon={<BrainCircuit />} title="AI-assisted yearly spend" value={money(calc.aiYearlyCost)} subtitle={`${calc.videosPerYear} thumbnails per year at ${money(aiThumbnailCost)} each`} />
        <ResultCard icon={<PiggyBank />} title="Estimated yearly savings" value={money(calc.yearlySavings)} subtitle={`${money(calc.monthlySavings)} saved per month`} highlight />
        <ResultCard icon={<TrendingUp />} title="3 year saving potential" value={money(calc.threeYearSavings)} subtitle="Money that could go back into growth" />
      </section>

      <section className="charts-grid">
        <div className="panel chart-panel">
          <div className="panel-heading">
            <div>
              <h2>Yearly cost comparison</h2>
              <p className="muted">Lower thumbnail cost means more budget left for the channel.</p>
            </div>
            <span className="icon-box"><Banknote size={24} /></span>
          </div>
          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={calc.comparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.12)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.72)" fontSize={12} />
                <YAxis stroke="rgba(255,255,255,0.72)" fontSize={12} tickFormatter={(v) => `$${v}`} />
                <Tooltip contentStyle={{ background: '#0b1f13', border: '1px solid rgba(52,211,153,0.35)', borderRadius: 16, color: 'white' }} formatter={(v) => money(v)} />
                <Bar dataKey="cost" radius={[14, 14, 0, 0]} fill="#34d399" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="panel chart-panel wide">
          <div className="panel-heading">
            <div>
              <h2>Savings building over 12 months</h2>
              <p className="muted">The difference gets bigger every month you keep uploading.</p>
            </div>
            <span className="icon-box"><ArrowUpRight size={24} /></span>
          </div>
          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={calc.monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.12)" />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.72)" fontSize={12} />
                <YAxis stroke="rgba(255,255,255,0.72)" fontSize={12} tickFormatter={(v) => `$${v}`} />
                <Tooltip contentStyle={{ background: '#0b1f13', border: '1px solid rgba(52,211,153,0.35)', borderRadius: 16, color: 'white' }} formatter={(v) => money(v)} />
                <Line type="monotone" dataKey="withoutAI" name="Without AI" stroke="#f87171" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="withAI" name="With AI" stroke="#34d399" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="saved" name="Saved" stroke="#bef264" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="reinvest-grid">
        <div className="panel reinvest-main">
          <h2>What could you do with the extra {money(calc.yearlySavings)}?</h2>
          <p className="muted big">
            Instead of losing that money to higher thumbnail costs, you could reinvest it into better editing, better assets, more uploads, music, recording gear, paid tools, or extra help for the channel.
          </p>

          <div className="reinvest-items">
            <ReinvestItem title="More videos" text="Fund extra uploads without increasing your total content budget." />
            <ReinvestItem title="Better production" text="Put savings into editing, audio, recording gear, or assets." />
            <ReinvestItem title="Faster testing" text="Try more thumbnail concepts without paying full design prices each time." />
            <ReinvestItem title="Channel growth" text="Keep more money available for ideas that can push the channel upward." />
          </div>
        </div>

        <div className="panel example-card">
          <div>
            <p className="kicker">Example</p>
            <h2>$30 → $10</h2>
            <p className="muted">If a creator goes from $30 per thumbnail to $10, they save $20 every upload.</p>
          </div>

          <div className="saving-box">
            <p>At {videosPerWeek} videos/week, that becomes</p>
            <strong>{money(calc.yearlySavings)}</strong>
            <span>saved per year</span>
          </div>

          <a className="button" href="mailto:banboozplays@gmail.com?subject=Free%20AI%20Thumbnail%20Sample">Book a free thumbnail sample</a>
        </div>
      </section>

      <footer>
        Results are estimates based on the numbers entered. Savings depend on upload volume, current design cost, and the agreed AI-assisted thumbnail price.
      </footer>
    </main>
  );
}

function MiniStat({ icon, title, text }) {
  return (
    <div className="mini-card">
      <div className="mini-icon">{icon}</div>
      <strong>{title}</strong>
      <span>{text}</span>
    </div>
  );
}

function NumberField({ label, value, onChange, prefix }) {
  return (
    <div className="field">
      <label>{label}</label>
      <div className="input-wrap">
        <span>{prefix}</span>
        <input
          type="number"
          min="0"
          value={value}
          onChange={(e) => onChange(Math.max(0, Number(e.target.value)))}
        />
      </div>
    </div>
  );
}

function ResultCard({ icon, title, value, subtitle, highlight }) {
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className={`result-card ${highlight ? 'highlight' : ''}`}>
      <div className="result-icon">{icon}</div>
      <p>{title}</p>
      <strong>{value}</strong>
      <span>{subtitle}</span>
    </motion.div>
  );
}

function ReinvestItem({ title, text }) {
  return (
    <div className="reinvest-item">
      <strong>{title}</strong>
      <p>{text}</p>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
