"use client";
import { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import MetricsPanel from "./components/MetricsPanel";
import EducationalSection from "./components/EducationalSection";

export default function Home() {
  const [arraySize, setArraySize] = useState<number>(30);
  const [array, setArray] = useState<number[]>([]);
  const [comparing, setComparing] = useState<number[]>([]);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]); 
  const [sorting, setSorting] = useState<boolean>(false);
  const [comparisons, setComparisons] = useState<number>(0);
  const [swaps, setSwaps] = useState<number>(0);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  
  // Estado centralizado del algoritmo activo
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>("Bubble Sort");
  
  const [animationSpeed, setAnimationSpeed] = useState<number>(1);
  const speedRef = useRef(1);
  const stopRequestedRef = useRef(false);

  // Referencias optimizadas para el cursor personalizado (Evita re-renderizados de React)
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);
  const mousePos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    speedRef.current = animationSpeed;
  }, [animationSpeed]);

  // Manejador del movimiento del cursor ultrafluido con requestAnimationFrame
  useEffect(() => {
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === "BUTTON" || 
        target.tagName === "A" || 
        target.closest("button") || 
        target.closest("a") || 
        target.closest(".edu-card") ||
        target.closest("select");
      
      setIsPointer(!!isInteractive);
    };

    const updateCursor = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
      }
      animationFrameId = requestAnimationFrame(updateCursor);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animationFrameId = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const generateNewArray = () => {
    if (sorting) return;
    const newArr = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 100) + 10);
    setArray(newArr);
    setComparing([]);
    setSortedIndices([]);
    setComparisons(0);
    setSwaps(0);
    setTimeElapsed(0);
  };

  useEffect(() => {
    generateNewArray();
  }, [arraySize]);

  const handleStop = () => {
    stopRequestedRef.current = true;
    setSorting(false);
    setComparing([]);
  };

  const startSorting = async () => {
    if (sorting) return;
    stopRequestedRef.current = false;
    setSorting(true);
    setSortedIndices([]);
    
    const startTime = performance.now();
    let arr = [...array];
    let compCount = 0;
    let swapCount = 0;
    let swapped: boolean;

    for (let i = 0; i < arr.length; i++) {
      swapped = false; 
      
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (stopRequestedRef.current) {
          setSorting(false);
          setComparing([]);
          return;
        }
        
        compCount++;
        
        if (arr[j] > arr[j + 1]) {
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          swapCount++;
          swapped = true;
        }
        
        setComparing([j, j + 1]);
        setComparisons(compCount);
        setSwaps(swapCount);
        setArray([...arr]);

        const delay = Math.max(5, 20 / speedRef.current);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
      
      setSortedIndices(prev => [...prev, arr.length - 1 - i]);

      if (!swapped) {
        const allSorted = Array.from({ length: arr.length }, (_, idx) => idx);
        setSortedIndices(allSorted);
        break; 
      }
    }
    
    if (!stopRequestedRef.current) {
      setComparing([]);
      setSorting(false);
      const endTime = performance.now();
      setTimeElapsed(Number((endTime - startTime).toFixed(2)));
    }
  };

  const shuffleArray = () => {
    if (sorting) return;
    let arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setArray(arr);
    setComparing([]);
    setSortedIndices([]);
    setComparisons(0);
    setSwaps(0);
    setTimeElapsed(0);
  };

  return (
    <main className="min-h-screen bg-[#030712] text-slate-100 p-6 md:p-8 flex flex-col gap-8 cursor-none selection:bg-cyan-500 selection:text-black">
      
    {/* CURSOR PERSONALIZADO */}
    <div 
      ref={cursorRef}
      style={{ left: 0, top: 0 }}
      className={`fixed pointer-events-none z-[9999] rounded-full border border-cyan-400 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-colors duration-150 ${
        isPointer 
          ? "w-12 h-12 bg-cyan-500/20 border-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.6)]" 
          : "w-8 h-8 bg-transparent shadow-[0_0_10px_rgba(34,211,238,0.3)]"
      }`}
    >
      <div className="w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee]" />
    </div>    

      <Header
        {...({
          onGenerate: generateNewArray,
          onSort: startSorting,
          onStop: handleStop,
          onShuffle: shuffleArray,
          arraySize,
          setArraySize,
          animationSpeed, 
          setAnimationSpeed, 
          sorting,
          selectedAlgorithm,
          setSelectedAlgorithm,
        } as any)}
      />

      {/* Barra de telemetría y sincronización del Algoritmo Activo */}
      <div className="w-full max-w-6xl mx-auto px-6 py-3.5 bg-[#0b132b]/80 border border-cyan-500/30 rounded-xl flex flex-col sm:flex-row justify-between items-center gap-2 shadow-lg backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs uppercase tracking-widest text-slate-400 font-mono">Algoritmo Activo en Simulador:</span>
        </div>
        <span className="text-cyan-400 font-bold tracking-wide text-sm bg-cyan-950/60 px-4 py-1 rounded-lg border border-cyan-500/20">
          {selectedAlgorithm}
        </span>
      </div>

      {/* Contenedor de la Gráfica Educativa */}
      <div className="w-full max-w-6xl mx-auto h-[420px] bg-gradient-to-b from-[#0b132b]/90 to-[#030712] border border-white/10 rounded-2xl p-6 flex items-end justify-center gap-[1px] overflow-hidden relative shadow-2xl backdrop-blur-xl">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        
        {array.map((value, index) => {
          const isComparing = comparing.includes(index);
          const isSorted = sortedIndices.includes(index);

          let barColor = 'bg-gradient-to-t from-sky-700 via-cyan-600 to-cyan-400 opacity-80';
          let glowEffect = '';

          if (isComparing) {
            barColor = 'bg-gradient-to-t from-pink-600 via-fuchsia-500 to-pink-400 brightness-125';
            glowEffect = 'shadow-[0_0_20px_#ec4899] scale-y-[1.03] z-20';
          } else if (isSorted) {
            barColor = 'bg-gradient-to-t from-emerald-700 via-teal-600 to-emerald-400 opacity-95';
            glowEffect = 'shadow-[0_0_10px_#10b981]';
          }

          return (
            <div
              key={index}
              style={{ height: `${(value / 110) * 100}%` }}
              className={`flex-1 transition-all duration-75 rounded-t ${barColor} ${glowEffect}`}
            />
          );
        })}
      </div>

      <div className="w-full">
        <MetricsPanel
          {...({
            timeElapsed,
            comparisons,
            swaps,
          } as any)}
        />
      </div>

      <EducationalSection 
        selectedAlgorithm={selectedAlgorithm}
        onSelectAlgorithm={(algoName) => setSelectedAlgorithm(algoName)}
      />
    </main>
  );
}