"use client";
import { useState } from "react";

interface EducationalSectionProps {
  onSelectAlgorithm?: (algoName: string) => void;
  selectedAlgorithm?: string;
}

export default function EducationalSection({ onSelectAlgorithm, selectedAlgorithm }: EducationalSectionProps) {
  const [expandedAlgo, setExpandedAlgo] = useState<any | null>(null);

  const algorithms = [
    {
      name: "Bubble Sort",
      complexity: "O(n²)",
      description: "Compara elementos adyacentes repetidamente y los intercambia si están en el orden incorrecto, haciendo que los valores más grandes 'floten' hacia el final.",
      insight: "Intuitivo pero muy ineficiente en colecciones de datos extensas."
    },
    {
      name: "Optimized Bubble Sort",
      complexity: "O(n²)",
      description: "Mejora del Bubble Sort clásico que incluye una bandera para detectar si el arreglo ya está ordenado, deteniendo la ejecución tempranamente y ahorrando iteraciones innecesarias.",
      insight: "Reduce el tiempo de ejecución a O(n) en el mejor de los casos (cuando los datos ya están ordenados)."
    },
    {
      name: "Selection Sort",
      complexity: "O(n²)",
      description: "Busca repetidamente el elemento menor de la parte desordenada y lo coloca al principio de la sub-lista ordenada.",
      insight: "Realiza un número mínimo de intercambios en comparación con otros métodos cuadráticos."
    },
    {
      name: "Insertion Sort",
      complexity: "O(n²)",
      description: "Construye el arreglo ordenado elemento por elemento, tomando cada nuevo valor y reubicándolo en su posición correcta dentro de la sección previa.",
      insight: "Excepcionalmente eficiente cuando el arreglo ya está semi-ordenado."
    },
    {
      name: "Gnome Sort",
      complexity: "O(n²)",
      description: "Funciona de manera similar a cómo un gnomo ordena macetas: avanza si los elementos están en orden y retrocede para intercambiarlos si están desordenados.",
      insight: "Su lógica combina el comportamiento de Insertion Sort con un control de pasos singular."
    },
    {
      name: "Exchange Sort",
      complexity: "O(n²)",
      description: "Compara el elemento actual con todos los elementos subsiguientes de la lista, realizando un intercambio directo cada vez que encuentra uno menor.",
      insight: "Uno de los enfoques de fuerza bruta más directos y fáciles de conceptualizar."
    },
    {
      name: "Quick Sort",
      complexity: "O(n log n)",
      description: "Utiliza la técnica de divide y vencerás seleccionando un pivote para particionar el arreglo en sub-listas de elementos menores y mayores.",
      insight: "Es uno de los algoritmos más rápidos en la práctica para arreglos generales de gran tamaño."
    },
    {
      name: "Merge Sort",
      complexity: "O(n log n)",
      description: "Divide recursivamente el arreglo a la mitad hasta tener unidades mínimas, para luego fusionarlas de manera ordenada y estructurada.",
      insight: "Garantiza un rendimiento óptimo incluso en el peor caso, requiriendo memoria adicional."
    }
  ];

  const handleCardClick = (algo: any) => {
    setExpandedAlgo(algo);
    if (onSelectAlgorithm) {
      onSelectAlgorithm(algo.name);
    }
  };

  return (
    <section className="w-full max-w-6xl mx-auto mt-16 px-4 pb-20 relative">
      <div className="cyber-divider mb-8" />
      
      <div className="mb-10">
        <h2 className="text-2xl font-black text-white tracking-wide text-cyber-heading">Sección Educativa</h2>
        <p className="text-xs text-slate-400 uppercase tracking-widest mt-1 font-mono">
          Haz clic en cualquier tarjeta para expandir los detalles y sincronizar el algoritmo
        </p>
      </div>

      {/* Grid optimizado: 3 columnas, y las últimas tarjetas se centran o distribuyen simétricamente */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
        {algorithms.map((algo, index) => {
          const isSelected = selectedAlgorithm === algo.name;
          return (
            <div 
              key={index} 
              onClick={() => handleCardClick(algo)}
              className={`edu-card p-6 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:border-cyan-500 hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/15 active:scale-[0.98] ${
                isSelected ? "border-cyan-400 bg-cyan-950/20 shadow-[0_0_20px_rgba(34,211,238,0.15)]" : ""
              }`}
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-cyan-400 tracking-tight">{algo.name}</h3>
                  <span className="complexity-badge">
                    {algo.complexity}
                  </span>
                </div>
                {/* Se eliminó el line-clamp estricto para mostrar el texto completo de forma legible */}
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {algo.description}
                </p>
              </div>
              
              <div className="insight-box">
                <span className="text-cyan-400 font-bold uppercase tracking-wider block mb-1 text-[10px] font-mono">Quick Insight:</span>
                <p className="text-xs text-slate-300">{algo.insight}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal / Vista Expandida con Efecto Blur */}
      {expandedAlgo && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 transition-all duration-300 animate-in fade-in"
          onClick={() => setExpandedAlgo(null)}
        >
          <div 
            className="bg-[#12141c] border border-cyan-500/60 rounded-2xl p-8 max-w-xl w-full relative shadow-[0_0_40px_rgba(34,211,238,0.25)] scale-100 transform transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setExpandedAlgo(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white font-mono text-xs bg-slate-800/80 border border-slate-700 px-3 py-1.5 rounded-lg transition-colors hover:bg-slate-700"
            >
              ✕ Cerrar
            </button>

            <div className="flex items-center gap-3 mb-6">
              <h3 className="text-2xl font-black text-cyan-400 tracking-tight">{expandedAlgo.name}</h3>
              <span className="complexity-badge text-sm px-3 py-1">
                {expandedAlgo.complexity}
              </span>
            </div>
            
            <p className="text-slate-200 text-base leading-relaxed mb-6">
              {expandedAlgo.description}
            </p>
            
            <div className="insight-box p-4 bg-cyan-950/40 border border-cyan-500/30 rounded-xl">
              <span className="text-cyan-400 font-bold uppercase tracking-wider block mb-2 text-xs font-mono">Quick Insight:</span>
              <p className="text-slate-300 text-sm leading-relaxed">{expandedAlgo.insight}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}