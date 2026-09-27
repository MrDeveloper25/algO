export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white p-8 flex flex-col items-center justify-center">
      <div className="max-w-xl text-center space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-cyan-400">
          algO / Runtime Lab
        </h1>
        <p className="text-slate-400">
          Visualizador y Benchmark Web de Algoritmos de Ordenamiento.
        </p>
        <div className="inline-block bg-slate-900 border border-slate-800 rounded-lg p-4 text-left text-sm text-emerald-400 font-mono">
          Status: Despliegue activo y funcionando en Vercel 🚀
        </div>
      </div>
    </main>
  );
}