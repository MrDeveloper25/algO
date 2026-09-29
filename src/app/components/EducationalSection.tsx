"use client";

import { useState } from "react";

interface EducationalSectionProps {
  onSelectAlgorithm?: (algoName: string) => void;
  selectedAlgorithm?: string;
}

export default function EducationalSection({ onSelectAlgorithm, selectedAlgorithm }: EducationalSectionProps) {
  const [expandedAlgo, setExpandedAlgo] = useState<any | null>(null);

  const algorithms = [
    { name: "Bubble Sort", complexity: "O(n²)", description: "Compara elementos adyacentes repetidamente y los intercambia si están en el orden incorrecto, haciendo que los valores más grandes 'floten' hacia el final.", insight: "Intuitivo pero muy ineficiente en colecciones de datos extensas." },
    { name: "Optimized Bubble Sort", complexity: "O(n²)", description: "Mejora del Bubble Sort clásico que incluye una bandera para detectar si el arreglo ya está ordenado, deteniendo la ejecución tempranamente y ahorrando iteraciones innecesarias.", insight: "Reduce el tiempo de ejecución a O(n) en el mejor de los casos." },
    { name: "Selection Sort", complexity: "O(n²)", description: "Busca repetidamente el elemento menor de la parte desordenada y lo coloca al principio de la sub-lista ordenada.", insight: "Realiza un número mínimo de intercambios en comparación con otros métodos cuadráticos." },
    { name: "Insertion Sort", complexity: "O(n²)", description: "Construye el arreglo ordenado elemento por elemento, tomando cada nuevo valor y reubicándolo en su posición correcta dentro de la sección previa.", insight: "Excepcionalmente eficiente cuando el arreglo ya está semi-ordenado." },
    { name: "Gnome Sort", complexity: "O(n²)", description: "Funciona de manera similar a cómo un gnomo ordena macetas: avanza si los elementos están en orden y retrocede para intercambiarlos si están desordenados.", insight: "Su lógica combina el comportamiento de Insertion Sort con un control de pasos singular." },
    { name: "Exchange Sort", complexity: "O(n²)", description: "Compara el elemento actual con todos los elementos subsiguientes de la lista, realizando un intercambio directo cada vez que encuentra uno menor.", insight: "Uno de los enfoques de fuerza bruta más directos y fáciles de conceptualizar." },
    { name: "Quick Sort", complexity: "O(n log n)", description: "Utiliza la técnica de divide y vencerás seleccionando un pivote para particionar el arreglo en sub-listas de elementos menores y mayores.", insight: "Es uno de los algoritmos más rápidos en la práctica para arreglos generales de gran tamaño." },
    { name: "Merge Sort", complexity: "O(n log n)", description: "Divide recursivamente el arreglo a la mitad hasta tener unidades mínimas, para luego fusionarlas de manera ordenada y estructurada.", insight: "Garantiza un rendimiento óptimo incluso en el peor caso, requiriendo memoria adicional." }
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
        <h2 className="text-2xl font-black text-[var(--ink)] tracking-wide text-cyber-heading transition-colors duration-300">Sección Educativa</h2>
        <p className="text-xs text-[var(--mute)] uppercase tracking-widest mt-1 font-mono transition-colors duration-300">
          Haz clic en cualquier tarjeta para expandir los detalles y sincronizar el algoritmo
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
        {algorithms.map((algo, index) => {
          const isSelected = selectedAlgorithm === algo.name;
          return (
            <div 
              key={index} 
              onClick={() => handleCardClick(algo)}
              className={`edu-card p-6 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:border-orange-500 hover:scale-[1.02] hover:shadow-lg hover:shadow-orange-500/15 active:scale-[0.98] ${
                isSelected ? "border-orange-500 bg-orange-500/10 shadow-[0_0_20px_rgba(249,115,22,0.15)]" : ""
              }`}
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-orange-500 tracking-tight">{algo.name}</h3>
                  <span className="complexity-badge">
                    {algo.complexity}
                  </span>
                </div>
                <p className="text-sm text-[var(--ink)] leading-relaxed mb-6">
                  {algo.description}
                </p>
              </div>
              
              <div className="insight-box">
                <span className="text-orange-500 font-bold uppercase tracking-wider block mb-1 text-[10px] font-mono">Quick Insight:</span>
                <p className="text-xs text-[var(--mute)]">{algo.insight}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal / Vista Pantalla Completa al hacer clic en tarjetas */}
      {expandedAlgo && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 transition-all duration-300 animate-in fade-in"
          onClick={() => setExpandedAlgo(null)}
        >
          <div 
            className="bg-[var(--card)] border border-orange-500/60 rounded-2xl p-8 max-w-xl w-full relative shadow-[0_0_40px_rgba(249,115,22,0.25)] scale-100 transform transition-all text-[var(--ink)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setExpandedAlgo(null)}
              className="absolute top-5 right-5 text-[var(--mute)] hover:text-[var(--ink)] font-mono text-xs bg-[var(--card-2)] border border-[var(--line)] px-3 py-1.5 rounded-lg transition-colors"
            >
                Cerrar
            </button>
            <div className="flex items-center gap-3 mb-6">
              <h3 className="text-2xl font-black text-orange-500 tracking-tight">{expandedAlgo.name}</h3>
              <span className="complexity-badge text-sm px-3 py-1">
                {expandedAlgo.complexity}
              </span>
            </div>
            
            <p className="text-[var(--ink)] text-base leading-relaxed mb-6">
              {expandedAlgo.description}
            </p>
            
            <div className="insight-box p-4 bg-orange-500/10 border border-orange-500/30 rounded-xl">
              <span className="text-orange-500 font-bold uppercase tracking-wider block mb-2 text-xs font-mono">Quick Insight:</span>
              <p className="text-[var(--mute)] text-sm leading-relaxed">{expandedAlgo.insight}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}