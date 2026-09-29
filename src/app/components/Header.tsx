interface HeaderProps {
  onGenerate: () => void;
  onSort: () => void;
  onStop?: () => void;
  onShuffle?: () => void;
  arraySize: number;
  setArraySize: (size: number) => void;
  animationSpeed: number;
  setAnimationSpeed: (speed: number) => void;
  sorting: boolean;
  selectedAlgorithm: string;
  setSelectedAlgorithm: (algo: string) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export default function Header({ 
  onGenerate, 
  onSort, 
  onStop,
  onShuffle, 
  arraySize, 
  setArraySize, 
  animationSpeed, 
  setAnimationSpeed, 
  sorting,
  selectedAlgorithm,
  setSelectedAlgorithm,
  isDarkMode,
  toggleTheme
}: HeaderProps) {
  
  return (
    <header className="header-hud p-5 rounded-2xl max-w-6xl mx-auto w-full border-b border-[var(--line)] bg-[var(--card)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4">
        {/* Logotipo */}
        <div className="flex items-center gap-3">
          <div className="font-extrabold text-2xl tracking-tight flex items-center gap-0.5 text-[var(--ink)]">
            alg
            <i aria-hidden="true" className="inline-flex items-end gap-0.5 w-[26px] h-[26px] border-[3px] border-orange-500 rounded-full p-[0_4px_3px] overflow-hidden not-italic">
              <b className="flex-1 bg-orange-500 rounded-[1px]" style={{height:'40%'}}></b>
              <b className="flex-1 bg-orange-500 rounded-[1px]" style={{height:'100%'}}></b>
              <b className="flex-1 bg-orange-500 rounded-[1px]" style={{height:'65%'}}></b>
            </i>
          </div>
          <p className="text-[10px] text-[var(--mute)] uppercase tracking-widest font-mono mt-0.5 hidden sm:block">Control & Telemetry HUD</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          {/* Selector de Algoritmos */}
          <select 
            value={selectedAlgorithm}
            onChange={(e) => setSelectedAlgorithm(e.target.value)}
            disabled={sorting}
            className="px-3 py-2 text-sm font-medium rounded-lg border border-[var(--line)] bg-[var(--card-2)] disabled:opacity-50 text-[var(--ink)] cursor-pointer"
          >
            <option value="Bubble Sort">Bubble Sort</option>
            <option value="Optimized Bubble Sort">Optimized Bubble Sort</option>
            <option value="Selection Sort">Selection Sort</option>
            <option value="Insertion Sort">Insertion Sort</option>
            <option value="Gnome Sort">Gnome Sort</option>
            <option value="Exchange Sort">Exchange Sort</option>
            <option value="Quick Sort">Quick Sort</option>
            <option value="Merge Sort">Merge Sort</option>
          </select>

          {/* Slider Elementos */}
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg border border-[var(--line)] bg-[var(--card-2)]">
            <span className="text-xs text-[var(--mute)] font-mono">Elementos</span>
            <input 
              type="range" 
              min="5" 
              max="120" 
              step="1"
              value={arraySize}
              onChange={(e) => setArraySize(Number(e.target.value))}
              disabled={sorting}
              className="w-24 h-1.5 bg-[var(--line)] rounded-lg appearance-none cursor-pointer accent-orange-500 disabled:opacity-50"
            />
            <span className="text-orange-500 font-mono font-bold text-xs w-6 text-right">{arraySize}</span>
          </div>

          {/* Slider Velocidad */}
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg border border-[var(--line)] bg-[var(--card-2)]">
            <span className="text-xs text-[var(--mute)] font-mono">Velocidad</span>
            <input
              type="range" 
              min="1" 
              max="15" 
              step="1"
              value={animationSpeed}
              onChange={(e) => setAnimationSpeed(Number(e.target.value))}
              className="w-24 h-1.5 bg-[var(--line)] rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
            <span className="text-orange-500 font-mono font-bold text-xs w-6 text-right">{animationSpeed}x</span>
          </div>

          {/* Botón de Modo Claro / Oscuro */}
          <button 
            onClick={toggleTheme}
            className="btn-cyber-secondary px-4 py-2 text-xs font-semibold uppercase tracking-wider cursor-pointer border-[var(--line)] text-[var(--ink)]"
          >
            {isDarkMode ? 'Modo claro' : 'Modo oscuro'}
          </button>

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
              className="btn-cyber-secondary px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[var(--ink)] cursor-pointer disabled:opacity-50"
            >
              Desorganizar
            </button>
          )}

          {sorting && onStop ? (
            <button 
              onClick={onStop}
              className="btn-cyber-danger px-5 py-2 text-xs uppercase tracking-wider cursor-pointer bg-red-500/20 border border-red-500/50 text-red-500 hover:bg-red-500/30 transition-all rounded-lg font-mono font-bold"
            >
              Detener
            </button>
          ) : (
            <button 
              onClick={onSort}
              disabled={sorting}
              className="btn-cyber-primary px-5 py-2 text-xs uppercase tracking-wider cursor-pointer disabled:opacity-50"
            >
              {sorting ? 'Procesando...' : 'Iniciar orden'}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}