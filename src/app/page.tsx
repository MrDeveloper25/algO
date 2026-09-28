"use client";

import { useState, useEffect } from "react";
import Header from "./components/Header";
import MetricsPanel from "./components/MetricsPanel";
import EducationalSection from "./components/EducationalSection";

export default function Home() {
  const [arraySize, setArraySize] = useState<number>(50);
  const [array, setArray] = useState<number[]>([]);
  const [comparing, setComparing] = useState<number[]>([]);
  const [sorting, setSorting] = useState<boolean>(false);
  
  const [comparisons, setComparisons] = useState<number>(0);
  const [swaps, setSwaps] = useState<number>(0);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);

  const generateNewArray = () => {
    if (sorting) return;
    const newArr = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 100) + 10);
    setArray(newArr);
    setComparing([]);
    setComparisons(0);
    setSwaps(0);
    setTimeElapsed(0);
  };

  useEffect(() => {
    generateNewArray();
  }, [arraySize]);

  const startSorting = async () => {
    if (sorting) return;
    setSorting(true);
    const startTime = performance.now();

    let arr = [...array];
    let compCount = 0;
    let swapCount = 0;

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        setComparing([j, j + 1]);
        compCount++;
        setComparisons(compCount);

        if (arr[j] > arr[j + 1]) {
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          swapCount++;
          setSwaps(swapCount);
        }
        setArray([...arr]);
        await new Promise((resolve) => setTimeout(resolve, 20));
      }
    }

    setComparing([]);
    setSorting(false);
    const endTime = performance.now();
    setTimeElapsed(Number((endTime - startTime).toFixed(2)));
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
    setComparisons(0);
    setSwaps(0);
    setTimeElapsed(0);
  };

  return (
    <main className="min-h-screen bg-[#030712] text-slate-100 p-6 md:p-8 flex flex-col gap-8">
      <Header
        {...({
          onGenerate: generateNewArray,
          onSort: startSorting,
          onShuffle: shuffleArray,
          arraySize,
          setArraySize,
          sorting,
        } as any)}
      />

      {/* Contenedor dinámico de barras con fondo texturizado y profundidad */}
      <div className="w-full max-w-6xl mx-auto h-[420px] bg-gradient-to-b from-[#0b132b]/90 to-[#030712] border border-white/10 rounded-2xl p-6 flex items-end justify-center gap-[1px] overflow-hidden relative shadow-2xl backdrop-blur-xl">
        {/* Cuadrícula sutil de fondo */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        {array.map((value, index) => {
          const isComparing = comparing.includes(index);
          return (
            <div
              key={index}
              style={{ height: `${(value / 110) * 100}%` }}
              className={`flex-1 transition-all duration-75 rounded-t ${
                isComparing 
                  ? 'bg-cyan-400 shadow-[0_0_18px_#22d3ee] scale-y-105 z-10 brightness-125' 
                  : 'bg-gradient-to-t from-sky-700 via-cyan-600 to-cyan-400 opacity-90 hover:opacity-100'
              }`}
            />
          );
        })}
      </div>

      {/* Panel de Métricas Alineado */}
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