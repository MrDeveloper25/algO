export default function Header() {
  return (
    <header className="bg-gray-900 border-b border-gray-800 p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-cyan-400 tracking-wide">algO</h1>
          <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Control Panel</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          {/* Selector con los 7 algoritmos exactos */}
          <select className="bg-gray-800 text-gray-200 border border-gray-700 p-2 rounded focus:outline-none focus:border-cyan-500 transition-colors">
            <option value="bubble">Bubble Sort</option>
            <option value="selection">Selection Sort</option>
            <option value="insertion">Insertion Sort</option>
            <option value="gnome">Gnome Sort</option>
            <option value="exchange">Exchange Sort</option>
            <option value="quick">Quick Sort</option>
            <option value="merge">Merge Sort</option>
          </select>

          {/* Input numérico para tamaño de dataset personalizado */}
          <div className="flex items-center gap-2 bg-gray-800 border border-gray-700 px-3 py-1.5 rounded">
            <span className="text-xs text-gray-400">Elementos:</span>
            <input 
              type="number" 
              defaultValue={50} 
              min={5} 
              max={500} 
              className="w-16 bg-transparent text-gray-200 focus:outline-none text-center font-mono"
            />
          </div>

          <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded font-medium transition-colors">
            Generar Arreglo
          </button>
          
          <button className="bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-2 rounded font-bold shadow-lg shadow-cyan-900/50 transition-all active:scale-95">
            Ordenar
          </button>
        </div>
      </div>
    </header>
  );
}