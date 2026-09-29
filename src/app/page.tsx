"use client";

import { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import MetricsPanel from "./components/MetricsPanel";
import EducationalSection from "./components/EducationalSection";

export default function Home() {
  const [arraySize, setArraySize] = useState<number>(30);
  const [array, setArray] = useState<number[]>([]);
  
  const [comparing, setComparing] = useState<number[]>([]);
  const [swapping, setSwapping] = useState<number[]>([]);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);
  const [pivot, setPivot] = useState<number | null>(null);

  const [sorting, setSorting] = useState<boolean>(false);
  const [comparisons, setComparisons] = useState<number>(0);
  const [swaps, setSwaps] = useState<number>(0);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>("Bubble Sort");
  const [animationSpeed, setAnimationSpeed] = useState<number>(1);
  const speedRef = useRef(1);
  const stopRequestedRef = useRef(false);

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
    setSortedIndices([]);
    setPivot(null);
    setComparisons(0);
    setSwaps(0);
    setTimeElapsed(0);
  };

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

  const runBubbleSort = async (isOptimized: boolean = false) => {
    let arr = [...array];
    let compCount = 0;
    let swapCount = 0;
    let swapped: boolean;

    for (let i = 0; i < arr.length; i++) {
      swapped = false; 
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (stopRequestedRef.current) { setSorting(false); setComparing([]); return; }
        
        compCount++;
        setComparing([j, j + 1]);
        setSwapping([]);

        if (arr[j] > arr[j + 1]) {
          let temp = arr[j]; arr[j] = arr[j + 1]; arr[j + 1] = temp;
          swapCount++;
          swapped = true;
          setSwapping([j, j + 1]);
        }
        
        setComparisons(compCount);
        setSwaps(swapCount);
        setArray([...arr]);

        const delay = Math.max(5, 20 / speedRef.current);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
      setSortedIndices(prev => [...prev, arr.length - 1 - i]);
      if (isOptimized && !swapped) {
        setSortedIndices(Array.from({ length: arr.length }, (_, idx) => idx));
        break; 
      }
    }
  };

  const runSelectionSort = async () => {
    let arr = [...array];
    let compCount = 0;
    let swapCount = 0;

    for (let i = 0; i < arr.length; i++) {
      let minIndex = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (stopRequestedRef.current) { setSorting(false); setComparing([]); return; }
        compCount++;
        setComparing([minIndex, j]);
        setComparisons(compCount);
        
        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
        const delay = Math.max(5, 20 / speedRef.current);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
      if (minIndex !== i) {
        let temp = arr[i]; arr[i] = arr[minIndex]; arr[minIndex] = temp;
        swapCount++;
        setSwaps(swapCount);
        setArray([...arr]);
      }
      setSortedIndices(prev => [...prev, i]);
    }
    setSortedIndices(Array.from({ length: arr.length }, (_, idx) => idx));
  };

  const runInsertionSort = async () => {
    let arr = [...array];
    let compCount = 0;
    let swapCount = 0;

    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;

      while (j >= 0 && arr[j] > key) {
        if (stopRequestedRef.current) { setSorting(false); setComparing([]); return; }
        compCount++;
        arr[j + 1] = arr[j];
        swapCount++;
        setComparisons(compCount);
        setSwaps(swapCount);
        setComparing([j, j + 1]);
        setArray([...arr]);
        j--;
        const delay = Math.max(5, 20 / speedRef.current);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
      arr[j + 1] = key;
      setArray([...arr]);
    }
    setSortedIndices(Array.from({ length: arr.length }, (_, idx) => idx));
  };

  const runGnomeSort = async () => {
    let arr = [...array];
    let compCount = 0;
    let swapCount = 0;
    let index = 0;

    while (index < arr.length) {
      if (stopRequestedRef.current) { setSorting(false); setComparing([]); return; }
      if (index === 0) index++;
      
      compCount++;
      setComparing([index - 1, index]);
      setComparisons(compCount);

      if (arr[index] >= arr[index - 1]) {
        index++;
      } else {
        let temp = arr[index]; arr[index] = arr[index - 1]; arr[index - 1] = temp;
        swapCount++;
        setSwaps(swapCount);
        setArray([...arr]);
        index--;
      }
      const delay = Math.max(5, 20 / speedRef.current);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
    setSortedIndices(Array.from({ length: arr.length }, (_, idx) => idx));
  };

  const runExchangeSort = async () => {
    let arr = [...array];
    let compCount = 0;
    let swapCount = 0;

    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        if (stopRequestedRef.current) { setSorting(false); setComparing([]); return; }
        compCount++;
        setComparing([i, j]);
        setComparisons(compCount);

        if (arr[j] < arr[i]) {
          let temp = arr[i]; arr[i] = arr[j]; arr[j] = temp;
          swapCount++;
          setSwaps(swapCount);
          setArray([...arr]);
        }
        const delay = Math.max(5, 20 / speedRef.current);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
      setSortedIndices(prev => [...prev, i]);
    }
    setSortedIndices(Array.from({ length: arr.length }, (_, idx) => idx));
  };

  const runQuickSort = async () => {
    let arr = [...array];
    let compCount = 0;
    let swapCount = 0;

    const partition = async (low: number, high: number) => {
      let pivotVal = arr[high];
      setPivot(high);
      let i = low - 1;

      for (let j = low; j <= high - 1; j++) {
        if (stopRequestedRef.current) return high;
        compCount++;
        setComparing([j, high]);
        setComparisons(compCount);

        if (arr[j] < pivotVal) {
          i++;
          let temp = arr[i]; arr[i] = arr[j]; arr[j] = temp;
          swapCount++;
          setSwaps(swapCount);
          setArray([...arr]);
        }
        const delay = Math.max(5, 20 / speedRef.current);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
      let temp = arr[i + 1]; arr[i + 1] = arr[high]; arr[high] = temp;
      swapCount++;
      setSwaps(swapCount);
      setArray([...arr]);
      setPivot(null);
      return i + 1;
    };

    const quickSortHelper = async (low: number, high: number) => {
      if (low < high) {
        let pi = await partition(low, high);
        if (stopRequestedRef.current) return;
        await quickSortHelper(low, pi - 1);
        if (stopRequestedRef.current) return;
        await quickSortHelper(pi + 1, high);
      }
    };

    await quickSortHelper(0, arr.length - 1);
    if (!stopRequestedRef.current) {
      setSortedIndices(Array.from({ length: arr.length }, (_, idx) => idx));
    }
  };

  const runMergeSort = async () => {
    let arr = [...array];
    let compCount = 0;
    let swapCount = 0;

    const merge = async (left: number, mid: number, right: number) => {
      let n1 = mid - left + 1;
      let n2 = right - mid;
      let L = arr.slice(left, mid + 1);
      let R = arr.slice(mid + 1, right + 1);

      let i = 0, j = 0, k = left;

      while (i < n1 && j < n2) {
        if (stopRequestedRef.current) return;
        compCount++;
        setComparisons(compCount);
        setComparing([left + i, mid + 1 + j]);

        if (L[i] <= R[j]) {
          arr[k] = L[i];
          i++;
        } else {
          arr[k] = R[j];
          j++;
          swapCount++;
          setSwaps(swapCount);
        }
        setArray([...arr]);
        k++;
        const delay = Math.max(5, 20 / speedRef.current);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }

      while (i < n1) {
        if (stopRequestedRef.current) return;
        arr[k] = L[i];
        i++; k++;
        setArray([...arr]);
        const delay = Math.max(5, 20 / speedRef.current);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }

      while (j < n2) {
        if (stopRequestedRef.current) return;
        arr[k] = R[j];
        j++; k++;
        setArray([...arr]);
        const delay = Math.max(5, 20 / speedRef.current);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    };

    const mergeSortHelper = async (left: number, right: number) => {
      if (left >= right) return;
      let mid = Math.floor(left + (right - left) / 2);
      await mergeSortHelper(left, mid);
      await mergeSortHelper(mid + 1, right);
      await merge(left, mid, right);
    };

    await mergeSortHelper(0, arr.length - 1);
    if (!stopRequestedRef.current) {
      setSortedIndices(Array.from({ length: arr.length }, (_, idx) => idx));
    }
  };

  const startSorting = async () => {
    if (sorting) return;
    stopRequestedRef.current = false;
    setSorting(true);
    resetStates();
    
    const startTime = performance.now();

    if (selectedAlgorithm === "Bubble Sort") {
      await runBubbleSort(false);
    } else if (selectedAlgorithm === "Optimized Bubble Sort") {
      await runBubbleSort(true);
    } else if (selectedAlgorithm === "Selection Sort") {
      await runSelectionSort();
    } else if (selectedAlgorithm === "Insertion Sort") {
      await runInsertionSort();
    } else if (selectedAlgorithm === "Gnome Sort") {
      await runGnomeSort();
    } else if (selectedAlgorithm === "Exchange Sort") {
      await runExchangeSort();
    } else if (selectedAlgorithm === "Quick Sort") {
      await runQuickSort();
    } else if (selectedAlgorithm === "Merge Sort") {
      await runMergeSort();
    } else {
      await runBubbleSort(false);
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
          
          <div className="w-full h-full flex items-end justify-center gap-[1px] relative overflow-hidden">
            {array.map((value, index) => {
              const isComparing = comparing.includes(index);
              const isSwapping = swapping.includes(index);
              const isSorted = sortedIndices.includes(index);
              const isPivot = pivot === index;

              let barClass = "bar-default";
              if (isComparing) barClass = "bar-comparing";
              if (isSwapping) barClass = "bar-swapping";
              if (isPivot) barClass = "bar-pivot";
              if (isSorted) barClass = "bar-sorted";

              return (
                <div
                  key={index}
                  style={{ height: `${(value / 110) * 100}%` }}
                  className={`flex-1 transition-all duration-75 rounded-t relative ${barClass}`}
                />
              );
            })}
          </div>
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