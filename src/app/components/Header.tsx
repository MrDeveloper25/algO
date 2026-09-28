import { useState, useEffect } from "react";

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
  sorting 
}: HeaderProps) {
  
  // Estado local para permitir escritura libre sin perder el foco
  const [localSize, setLocalSize] = useState<string>(String(arraySize));

  // Sincroniza si el arraySize cambia desde fuera
  useEffect(() => {
    setLocalSize(String(arraySize));
  }, [arraySize]);

  return (
    <header className="header-hud p-5 rounded-2xl max-w-6xl mx-auto w-full border-b border-[var(--line,#252A3A)] bg-[var(--card,#161927)]">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4">
        {/* Logotipo actualizado con la "O" métrica interactiva */}
        <div className="flex items-center gap-3">
          <div className="font-extrabold text-2xl tracking-tight flex items-center gap-0.5 text-slate-100">
            alg
            <i aria-hidden="true" className="inline-flex items-end gap-0.5 w-[26px] h-[26px] border-[3px] border-cyan-500 rounded-full p-[0_4px_3px] overflow-hidden not-italic">
              <b className="flex-1 bg-cyan-500 rounded-[1px]" style={{height:'40%'}}></b>
              <b className="flex-1 bg-cyan-500 rounded-[1px]" style={{height:'100%'}}></b>
              <b className="flex-1 bg-cyan-500 rounded-[1px]" style={{height:'65%'}}></b>
            </i>
          </div>
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-mono mt-0.5 hidden sm:block">Control & Telemetry HUD</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <select 
            disabled={sorting}
            className="px-3 py-2 text-sm font-medium rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface-alt)] disabled:opacity-50 text-slate-200"
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
              type="text" 
              inputMode="numeric"
              value={localSize}
              onChange={(e) => {
                const cleanValue = e.target.value.replace(/\D/g, "");
                setLocalSize(cleanValue);
              }}
              onBlur={() => {
                const val = Number(localSize);
                const clamped = isNaN(val) ? 5 : Math.min(Math.max(val, 5), 120);
                setLocalSize(String(clamped));
                setArraySize(clamped);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.currentTarget.blur();
                }
              }}
              disabled={sorting}
              className="w-12 bg-transparent text-cyan-300 text-center font-mono font-bold text-sm border-none focus:ring-0 outline-none"
            />
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface-alt)]">
            <span className="text-xs text-slate-400 font-mono">Velocidad:</span>
            <select
              value={animationSpeed}
              onChange={(e) => setAnimationSpeed(Number(e.target.value))}
              className="bg-transparent text-cyan-300 text-center font-mono font-bold text-sm border-none focus:ring-0 cursor-pointer"
            >
              <option value={1} className="bg-slate-900">1x</option>
              <option value={3} className="bg-slate-900">3x</option>
              <option value={5} className="bg-slate-900">5x</option>
              <option value={10} className="bg-slate-900">10x</option>
            </select>
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

          {sorting && onStop ? (
            <button 
              onClick={onStop}
              className="btn-cyber-danger px-5 py-2 text-xs uppercase tracking-wider cursor-pointer bg-red-500/20 border border-red-500/50 text-red-400 hover:bg-red-500/30 transition-all rounded-lg font-mono font-bold"
            >
              Detener
            </button>
          ) : (
            <button 
              onClick={onSort}
              disabled={sorting}
              className="btn-cyber-primary px-5 py-2 text-xs uppercase tracking-wider cursor-pointer disabled:opacity-50"
            >
              {sorting ? 'Procesando...' : 'Iniciar Orden'}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}