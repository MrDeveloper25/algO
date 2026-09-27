import Header from "./components/Header";
import MetricsPanel from "./components/MetricsPanel";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Header />
      
      <div className="p-8 flex flex-col items-center">
        {/* Aquí tus compañeros meterán el canvas de las barras animadas */}
        <div className="w-full max-w-5xl h-64 bg-gray-900/50 border border-gray-800 border-dashed rounded-xl flex items-center justify-center mb-8">
          <p className="text-gray-500">Espacio reservado para la visualización del algoritmo</p>
        </div>

        <MetricsPanel />
      </div>
    </main>
  );
}