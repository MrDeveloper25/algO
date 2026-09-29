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
  
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>("Bubble Sort");
  
  const [animationSpeed, setAnimationSpeed] = useState<number>(1);
  const speedRef = useRef(1);
  const stopRequestedRef = useRef(false);

  const cursorRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);
  const mousePos = useRef({ x: -100, y: -100 });

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

  // ----- LÓGICA DE LOS 8 ALGORITMOS DE ORDENAMIENTO -----

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
        if (arr[j] > arr[j + 1]) {
          let temp = arr[j]; arr[j] = arr[j + 1]; arr[j + 1] = temp;
          swapCount++;
          swapped = true;
        }
        
        setComparing([j, j + 1]);
        setComparisons(compCount);
        setSwaps(swapCount);
        setArray([...arr]);

        await new Promise((resolve) => setTimeout(resolve, Math.max(5, 20 / speedRef.current)));
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
        await new Promise((resolve) => setTimeout(resolve, Math.max(5, 20 / speedRef.current)));
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
        await new Promise((resolve) => setTimeout(resolve, Math.max(5, 20 / speedRef.current)));
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
      await new Promise((resolve) => setTimeout(resolve, Math.max(5, 20 / speedRef.current)));
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
        await new Promise((resolve) => setTimeout(resolve, Math.max(5, 20 / speedRef.current)));
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
      let pivot = arr[high];
      let i = low - 1;

      for (let j = low; j <= high - 1; j++) {
        if (stopRequestedRef.current) return high;
        compCount++;
        setComparing([j, high]);
        setComparisons(compCount);

        if (arr[j] < pivot) {
          i++;
          let temp = arr[i]; arr[i] = arr[j]; arr[j] = temp;
          swapCount++;
          setSwaps(swapCount);
          setArray([...arr]);
        }
        await new Promise((resolve) => setTimeout(resolve, Math.max(5, 20 / speedRef.current)));
      }
      let temp = arr[i + 1]; arr[i + 1] = arr[high]; arr[high] = temp;
      swapCount++;
      setSwaps(swapCount);
      setArray([...arr]);
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
        await new Promise((resolve) => setTimeout(resolve, Math.max(5, 20 / speedRef.current)));
      }

      while (i < n1) {
        if (stopRequestedRef.current) return;
        arr[k] = L[i];
        i++; k++;
        setArray([...arr]);
        await new Promise((resolve) => setTimeout(resolve, Math.max(5, 20 / speedRef.current)));
      }

      while (j < n2) {
        if (stopRequestedRef.current) return;
        arr[k] = R[j];
        j++; k++;
        setArray([...arr]);
        await new Promise((resolve) => setTimeout(resolve, Math.max(5, 20 / speedRef.current)));
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
    setSortedIndices([]);
    
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

      <div className="w-full max-w-6xl mx-auto px-6 py-3.5 bg-[#0b132b]/80 border border-cyan-500/30 rounded-xl flex flex-col sm:flex-row justify-between items-center gap-2 shadow-lg backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs uppercase tracking-widest text-slate-400 font-mono">Algoritmo Activo en Simulador:</span>
        </div>
        <span className="text-cyan-400 font-bold tracking-wide text-sm bg-cyan-950/60 px-4 py-1 rounded-lg border border-cyan-500/20">
          {selectedAlgorithm}
        </span>
      </div>

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