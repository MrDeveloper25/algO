"use client";

import { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import MetricsPanel from "./components/MetricsPanel";
import EducationalSection from "./components/EducationalSection";

export default function Home() {
  const [arraySize, setArraySize] = useState<number>(50);
  const [array, setArray] = useState<number[]>([]);
  
  const [comparing, setComparing] = useState<number[]>([]);
  const [swapping, setSwapping] = useState<number[]>([]);
  const [sorted, setSorted] = useState<number[]>([]);
  const [pivot, setPivot] = useState<number | null>(null);

  const [sorting, setSorting] = useState<boolean>(false);
  const [comparisons, setComparisons] = useState<number>(0);
  const [swaps, setSwaps] = useState<number>(0);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);

  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>("Bubble Sort");
  const [animationSpeed, setAnimationSpeed] = useState<number>(1);
  const speedRef = useRef(1);
  const stopRequestedRef = useRef(false);

  // Modo Claro / Oscuro
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  // Referencias para el cursor personalizado
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);
  const mousePos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.remove('light-mode');
    } else {
      document.documentElement.classList.add('light-mode');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  useEffect(() => {
    speedRef.current = animationSpeed;
  }, [animationSpeed]);

  // Manejador del cursor personalizado
  useEffect(() => {
    let animationFrameId: number;
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === "BUTTON" || 
        target.tagName === "A" || 
        target.tagName === "INPUT" ||
        target.tagName === "SELECT" ||
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

  const resetStates = () => {
    setComparing([]);
    setSwapping([]);
    setSorted([]);
    setPivot(null);
    setComparisons(0);
    setSwaps(0);
    setTimeElapsed(0);
  }

  const generateNewArray = () => {
    if (sorting) return;
    const newArr = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 100) + 10);
    setArray(newArr);
    resetStates();
  };

  useEffect(() => {
    generateNewArray();
  }, [arraySize]);

  const handleStop = () => {
    stopRequestedRef.current = true;
    setSorting(false);
    setComparing([]);
    setSwapping([]);
    setPivot(null);
  };

  const startSorting = async () => {
    if (sorting) return;
    stopRequestedRef.current = false;
    setSorting(true);
    setSorted([]);
    setSwapping([]);
    setPivot(null);
    
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
          setSwapping([]);
          return;
        }
        
        setComparing([j, j + 1]);
        setSwapping([]);
        compCount++;
        setComparisons(compCount);
        
        await new Promise((resolve) => setTimeout(resolve, 15 / speedRef.current));

        if (arr[j] > arr[j + 1]) {
          setSwapping([j, j + 1]);
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          swapCount++;
          setSwaps(swapCount);
          swapped = true; 
          setArray([...arr]);

          await new Promise((resolve) => setTimeout(resolve, 15 / speedRef.current));
        }
      }
      
      setSorted((prev) => [...prev, arr.length - 1 - i]);
      
      if (!swapped) {
        setSorted(Array.from({ length: arr.length }, (_, k) => k));
        break; 
      }
    }
    
    if (!stopRequestedRef.current) {
      setComparing([]);
      setSwapping([]);
      setPivot(null);
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
    resetStates();
  };

  return (
    <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)] p-6 md:p-8 flex flex-col gap-8 transition-colors duration-300">
      
      {/* CURSOR PERSONALIZADO */}
      <div 
        ref={cursorRef}
        style={{ left: 0, top: 0 }}
        className={`fixed pointer-events-none z-[9999] rounded-full border border-orange-500 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-colors duration-150 ${
          isPointer 
            ? "w-12 h-12 bg-orange-500/20 border-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.6)]" 
            : "w-8 h-8 bg-transparent shadow-[0_0_10px_rgba(249,115,22,0.3)]"
        }`}
      >
        <div className="w-1 h-1 bg-orange-500 rounded-full shadow-[0_0_8px_#f97316]" />
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
          isDarkMode,
          toggleTheme,
          selectedAlgorithm,
          setSelectedAlgorithm,
        } as any)}
      />

      {/* Sincronización del Algoritmo Activo */}
      <div className="w-full max-w-6xl mx-auto px-6 py-3.5 bg-[var(--card)] border border-orange-500/30 rounded-xl flex flex-col sm:flex-row justify-between items-center gap-2 shadow-lg backdrop-blur-md transition-colors duration-300">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
          <span className="text-xs uppercase tracking-widest text-[var(--mute)] font-mono">Algoritmo Activo en Simulador:</span>
        </div>
        <span className="text-orange-500 font-bold tracking-wide text-sm bg-orange-500/10 px-4 py-1 rounded-lg border border-orange-500/20">
          {selectedAlgorithm}
        </span>
      </div>

      <div className="w-full max-w-6xl mx-auto flex flex-col gap-5">
        
        {/* Contenedor de la Gráfica */}
        <div className="w-full h-[420px] bg-[var(--card)] border border-[var(--line)] rounded-2xl p-6 flex items-end justify-center gap-[1px] overflow-hidden relative shadow-2xl backdrop-blur-xl transition-colors duration-300">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--grid-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-line)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
          
          {array.map((value, index) => {
            let barClass = "bar-default";
            if (sorted.includes(index)) barClass = "bar-sorted";
            else if (swapping.includes(index)) barClass = "bar-swapping";
            else if (comparing.includes(index)) barClass = "bar-comparing";
            else if (pivot === index) barClass = "bar-pivot";

            return (
              <div
                key={index}
                style={{ height: `${(value / 110) * 100}%` }}
                className={`flex-1 transition-all duration-75 rounded-t relative ${barClass}`}
              />
            );
          })}
        </div>

        {/* Leyenda de Colores */}
        <div className="flex flex-wrap items-center justify-start gap-6 text-xs font-medium text-[var(--mute)] font-mono px-2">
          <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-sm bg-[var(--bar)]"></span> Sin tocar</div>
          <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-sm bg-[var(--cmp)]"></span> Comparando</div>
          <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-sm bg-[var(--swp)]"></span> Moviendo</div>
          <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-sm bg-[var(--pivot)] border border-[var(--line)]"></span> Pivote</div>
          <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-sm bg-[var(--ok)]"></span> Ordenado</div>
        </div>

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
        onSelectAlgorithm={(algoName: string) => setSelectedAlgorithm(algoName)}
      />
    </main>
  );
}