export default function EducationalSection() {
  const algorithms = [
    {
      name: "Bubble Sort",
      complexity: "O(n²)",
      description: "Compara elementos adyacentes repetidamente y los intercambia si están en el orden incorrecto, haciendo que los valores más grandes 'floten' hacia el final.",
      insight: "Intuitivo pero muy ineficiente en colecciones de datos extensas."
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

  return (
    <section className="w-full max-w-6xl mx-auto mt-16 px-4 pb-20">
      <div className="cyber-divider" />
      
      <div className="mb-10">
        <h2 className="text-2xl font-black text-white tracking-wide text-cyber-heading">Sección Educativa</h2>
        <p className="text-xs text-slate-400 uppercase tracking-widest mt-1 font-mono">
          Complejidad Big O y Quick Insights de los 7 Algoritmos
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {algorithms.map((algo, index) => (
          <div 
            key={index} 
            className={`edu-card p-6 flex flex-col justify-between ${
              index === 6 ? "md:col-span-2 lg:col-span-1" : ""
            }`}
          >
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-cyan-400 tracking-tight">{algo.name}</h3>
                <span className="complexity-badge">
                  {algo.complexity}
                </span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                {algo.description}
              </p>
            </div>
            
            <div className="insight-box">
              <span className="text-cyan-400 font-bold uppercase tracking-wider block mb-1 text-[10px] font-mono">Quick Insight:</span>
              {algo.insight}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}