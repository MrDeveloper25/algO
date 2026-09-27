export default function EducationalSection() {
  return (
    <section className="w-full max-w-7xl mx-auto mt-12 px-4 pb-16">
      <div className="border-t border-gray-800 pt-8 mb-8">
        <h2 className="text-xl font-bold text-white tracking-wide">Sección Educativa</h2>
        <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Complejidad Big O y Quick Insights de los 7 Algoritmos</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Tarjeta 1: Bubble Sort */}
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow-md flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-bold text-cyan-400">Bubble Sort</h3>
              <span className="text-xs bg-red-950 text-red-400 border border-red-800/50 px-2 py-1 rounded font-mono">O(n²)</span>
            </div>
            <p className="text-sm text-gray-300 mb-4">
              Compara elementos adyacentes repetidamente y los intercambia si están en el orden incorrecto, haciendo que los valores más grandes "floten" hacia el final.
            </p>
          </div>
          <div className="bg-gray-950 p-3 rounded border border-gray-800/60 text-xs text-gray-400">
            <span className="text-cyan-400 font-semibold">Quick Insight:</span> Intuitivo pero muy ineficiente en colecciones de datos extensas.
          </div>
        </div>

        {/* Tarjeta 2: Selection Sort */}
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow-md flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-bold text-cyan-400">Selection Sort</h3>
              <span className="text-xs bg-red-950 text-red-400 border border-red-800/50 px-2 py-1 rounded font-mono">O(n²)</span>
            </div>
            <p className="text-sm text-gray-300 mb-4">
              Busca repetidamente el elemento menor de la parte desordenada y lo coloca al principio de la sub-lista ordenada.
            </p>
          </div>
          <div className="bg-gray-950 p-3 rounded border border-gray-800/60 text-xs text-gray-400">
            <span className="text-cyan-400 font-semibold">Quick Insight:</span> Realiza un número mínimo de intercambios en comparación con otros métodos cuadráticos.
          </div>
        </div>

        {/* Tarjeta 3: Insertion Sort */}
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow-md flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-bold text-cyan-400">Insertion Sort</h3>
              <span className="text-xs bg-red-950 text-red-400 border border-red-800/50 px-2 py-1 rounded font-mono">O(n²)</span>
            </div>
            <p className="text-sm text-gray-300 mb-4">
              Construye el arreglo ordenado elemento por elemento, tomando cada nuevo valor y reubicándolo en su posición correcta dentro de la sección previa.
            </p>
          </div>
          <div className="bg-gray-950 p-3 rounded border border-gray-800/60 text-xs text-gray-400">
            <span className="text-cyan-400 font-semibold">Quick Insight:</span> Excepcionalmente eficiente cuando el arreglo ya está semi-ordenado.
          </div>
        </div>

        {/* Tarjeta 4: Gnome Sort */}
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow-md flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-bold text-cyan-400">Gnome Sort</h3>
              <span className="text-xs bg-red-950 text-red-400 border border-red-800/50 px-2 py-1 rounded font-mono">O(n²)</span>
            </div>
            <p className="text-sm text-gray-300 mb-4">
              Funciona de manera similar a cómo un gnomo ordena macetas: avanza si los elementos están en orden y retrocede para intercambiarlos si están desordenados.
            </p>
          </div>
          <div className="bg-gray-950 p-3 rounded border border-gray-800/60 text-xs text-gray-400">
            <span className="text-cyan-400 font-semibold">Quick Insight:</span> Su lógica combina el comportamiento de Insertion Sort con un control de pasos singular.
          </div>
        </div>

        {/* Tarjeta 5: Exchange Sort */}
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow-md flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-bold text-cyan-400">Exchange Sort</h3>
              <span className="text-xs bg-red-950 text-red-400 border border-red-800/50 px-2 py-1 rounded font-mono">O(n²)</span>
            </div>
            <p className="text-sm text-gray-300 mb-4">
              Compara el elemento actual con todos los elementos subsiguientes de la lista, realizando un intercambio directo cada vez que encuentra uno menor.
            </p>
          </div>
          <div className="bg-gray-950 p-3 rounded border border-gray-800/60 text-xs text-gray-400">
            <span className="text-cyan-400 font-semibold">Quick Insight:</span> Uno de los enfoques de fuerza bruta más directos y fáciles de conceptualizar.
          </div>
        </div>

        {/* Tarjeta 6: Quick Sort */}
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow-md flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-bold text-cyan-400">Quick Sort</h3>
              <span className="text-xs bg-emerald-950 text-emerald-400 border border-emerald-800/50 px-2 py-1 rounded font-mono">O(n log n)</span>
            </div>
            <p className="text-sm text-gray-300 mb-4">
              Utiliza la técnica de divide y vencerás seleccionando un pivote para particionar el arreglo en sub-listas de elementos menores y mayores.
            </p>
          </div>
          <div className="bg-gray-950 p-3 rounded border border-gray-800/60 text-xs text-gray-400">
            <span className="text-cyan-400 font-semibold">Quick Insight:</span> Es uno de los algoritmos más rápidos en la práctica para arreglos generales de gran tamaño.
          </div>
        </div>

        {/* Tarjeta 7: Merge Sort */}
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow-md flex flex-col justify-between lg:col-span-1">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-bold text-cyan-400">Merge Sort</h3>
              <span className="text-xs bg-emerald-950 text-emerald-400 border border-emerald-800/50 px-2 py-1 rounded font-mono">O(n log n)</span>
            </div>
            <p className="text-sm text-gray-300 mb-4">
              Divide recursivamente el arreglo a la mitad hasta tener unidades mínimas, para luego fusionarlas de manera ordenada y estructurada.
            </p>
          </div>
          <div className="bg-gray-950 p-3 rounded border border-gray-800/60 text-xs text-gray-400">
            <span className="text-cyan-400 font-semibold">Quick Insight:</span> Garantiza un rendimiento óptimo incluso en el peor caso, requiriendo memoria adicional.
          </div>
        </div>
      </div>
    </section>
  );
}