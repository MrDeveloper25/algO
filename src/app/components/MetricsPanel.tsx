interface MetricsPanelProps {
  timeElapsed: number;
  comparisons: number;
  swaps: number;
}

export default function MetricsPanel({ timeElapsed, comparisons, swaps }: MetricsPanelProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-6xl mx-auto">
      <div className="metric-card">
        <span className="text-[11px] uppercase text-[var(--mute)] font-mono tracking-widest block mb-1">Tiempo de Ejecución</span>
        <div className="flex items-baseline gap-1.5 mt-2">
          <span className="text-3xl font-black font-mono text-orange-500 tracking-tight">{timeElapsed.toFixed(2)}</span>
          <span className="text-xs text-[var(--mute)] font-mono font-medium">ms</span>
        </div>
      </div>

      <div className="metric-card">
        <span className="text-[11px] uppercase text-[var(--mute)] font-mono tracking-widest block mb-1">Comparaciones</span>
        <span className="text-3xl font-black font-mono text-[var(--ink)] mt-2 tracking-tight block">{comparisons}</span>
      </div>

      <div className="metric-card">
        <span className="text-[11px] uppercase text-[var(--mute)] font-mono tracking-widest block mb-1">Intercambios</span>
        <span className="text-3xl font-black font-mono text-[var(--ink)] mt-2 tracking-tight block">{swaps}</span>
      </div>
    </div>
  );
}