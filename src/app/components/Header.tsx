interface HeaderProps {
  onGenerate: () => void;
  onSort: () => void;
  onShuffle?: () => void;
  arraySize: number;
  setArraySize: (size: number) => void;
  sorting: boolean;
}

export default function Header({ onGenerate, onSort, onShuffle, arraySize, setArraySize, sorting }: HeaderProps) {
  return (
    <header className="header-hud p-5 rounded-2xl max-w-6xl mx-auto w-full">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-wider text-gradient-cyan">algO</h1>
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-mono mt-0.5">Control & Telemetry HUD</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <select 
            disabled={sorting}
            className="px-3 py-2 text-sm font-medium disabled:opacity-50"
          >
            <option value="bubble">Bubble Sort</option>
            <option value="selection">Selection Sort</option>
            <option value="insertion">Insertion Sort</option>
            <option value="gnome">Gnome Sort</option>
            <option value="exchange">Exchange Sort</option>
            <option value="quick">Quick Sort</option>
            <option value="merge">Merge Sort</option>
          </select>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface-alt)]">
            <span className="text-xs text-slate-400 font-mono">Elementos:</span>
            <input 
              type="number" 
              value={arraySize}
              onChange={(e) => setArraySize(Math.min(Math.max(Number(e.target.value), 5), 120))}
              min={5} 
              max={120} 
              disabled={sorting}
              className="w-12 bg-transparent text-cyan-300 text-center font-mono font-bold text-sm border-none focus:ring-0"
            />
          </div>

          <button 
            onClick={onGenerate}
            disabled={sorting}
            className="btn-cyber-secondary px-4 py-2 text-xs font-semibold uppercase tracking-wider cursor-pointer disabled:opacity-50"
          >
            Generar
          </button>

          {onShuffle && (
            <button 
              onClick={onShuffle}
              disabled={sorting}
              className="btn-cyber-secondary px-4 py-2 text-xs font-semibold uppercase tracking-wider text-amber-400 cursor-pointer disabled:opacity-50"
            >
              Desorganizar
            </button>
          )}
          
          <button 
            onClick={onSort}
            disabled={sorting}
            className="btn-cyber-primary px-5 py-2 text-xs uppercase tracking-wider cursor-pointer disabled:opacity-50"
          >
            {sorting ? 'Procesando...' : 'Iniciar Orden'}
          </button>
        </div>
      </div>
    </header>
  );
}