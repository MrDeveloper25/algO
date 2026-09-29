interface BenchmarkResult {
  algorithm: string;
  time: number;
  comparisons: number;
  swaps: number;
}

interface MetricsComparisonProps {
  results: BenchmarkResult[];
}

export default function MetricsComparisonPanel({ results }: MetricsComparisonProps) {
  if (results.length === 0) return null;

  // Ordenar de más rápido a más lento
  const sortedResults = [...results].sort((a, b) => a.time - b.time);

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-[var(--card)] border border-[var(--line)] rounded-2xl shadow-xl transition-colors duration-300">
      <h3 className="text-sm font-mono uppercase tracking-widest text-[var(--mute)] mb-4">
        📊 Resultados de Benchmark (Comparativa)
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm font-mono">
          <thead>
            <tr className="border-b border-[var(--line)] text-[var(--mute)]">
              <th className="py-2 px-4">Ranking</th>
              <th className="py-2 px-4">Algoritmo</th>
              <th className="py-2 px-4">Tiempo (ms)</th>
              <th className="py-2 px-4">Comparaciones</th>
              <th className="py-2 px-4">Intercambios</th>
            </tr>
          </thead>
          <tbody>
            {sortedResults.map((res, index) => (
              <tr key={res.algorithm} className="border-b border-[var(--line)]/50 hover:bg-[var(--card-2)]">
                <td className="py-3 px-4 font-bold text-orange-500">#{index + 1}</td>
                <td className="py-3 px-4 font-semibold text-[var(--ink)]">{res.algorithm}</td>
                <td className="py-3 px-4 text-emerald-400">{res.time} ms</td>
                <td className="py-3 px-4 text-slate-300">{res.comparisons}</td>
                <td className="py-3 px-4 text-slate-300">{res.swaps}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}