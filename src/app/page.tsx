"use client";

import { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import MetricsPanel from "./components/MetricsPanel";
import EducationalSection from "./components/EducationalSection";

export default function Home() {
  const [arraySize, setArraySize] = useState<number>(50);
  const [array, setArray] = useState<number[]>([]);
  
  // Estados para los colores de la leyenda
  const [comparing, setComparing] = useState<number[]>([]);
  const [swapping, setSwapping] = useState<number[]>([]);
  const [sorted, setSorted] = useState<number[]>([]);
  const [pivot, setPivot] = useState<number | null>(null);

  const [sorting, setSorting] = useState<boolean>(false);
  const [comparisons, setComparisons] = useState<number>(0);
  const [swaps, setSwaps] = useState<number>(0);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);

  const [animationSpeed, setAnimationSpeed] = useState<number>(1);
  const speedRef = useRef(1);
  const stopRequestedRef = useRef(false);

  // ESTADO PARA EL MODO CLARO / OSCURO
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  // Aplica la clase light-mode al documento HTML
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

  // Lógica de Ordenamiento con Burbuja Mejorada
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
    <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)] p-6 md:p-8 flex flex-col gap-8">
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
        } as any)}
      />

      <div className="w-full max-w-6xl mx-auto flex flex-col gap-5">
        
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

        {/* Leyenda usando variables CSS para soportar los dos temas */}
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

      <EducationalSection />
    </main>
  );
}