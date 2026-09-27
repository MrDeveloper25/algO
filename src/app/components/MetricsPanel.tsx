export default function MetricsPanel() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl mx-auto mt-6">
      <div className="bg-gray-900 border border-gray-800 p-4 rounded-xl flex flex-col items-center justify-center shadow-sm">
        <span className="text-gray-400 text-xs uppercase tracking-wider font-semibold mb-1">Tiempo de Ejecución</span>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-white">0.00</span>
          <span className="text-sm text-gray-500">ms</span>
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 p-4 rounded-xl flex flex-col items-center justify-center shadow-sm">
        <span className="text-gray-400 text-xs uppercase tracking-wider font-semibold mb-1">Comparaciones</span>
        <span className="text-3xl font-bold text-white">0</span>
      </div>

      <div className="bg-gray-900 border border-gray-800 p-4 rounded-xl flex flex-col items-center justify-center shadow-sm">
        <span className="text-gray-400 text-xs uppercase tracking-wider font-semibold mb-1">Intercambios</span>
        <span className="text-3xl font-bold text-white">0</span>
      </div>
    </div>
  );
}