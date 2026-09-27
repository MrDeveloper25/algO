// utils/sorting.ts

// ==========================================
// INTERFACES BASE (Métricas y Animación)
// ==========================================
export interface StepRecord {
  currentArray: number[];
  comparingIndices: [number, number]; 
  swapped: boolean; 
}

export interface AlgorithmResult {
  algorithmName: string;
  sortedArray: number[];
  history: StepRecord[];
  executionTimeMs: number; 
  comparisons: number;     
  swaps: number;           
}

// ==========================================
// TAREA 2.1: LOS 6 ALGORITMOS DE FUERZA BRUTA
// ==========================================

export function bubbleSort(arr: number[]): AlgorithmResult {
  const history: StepRecord[] = [];
  let comparisons = 0, swaps = 0;
  const startTime = performance.now();
  let arrayCopy = [...arr];
  let n = arrayCopy.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      comparisons++;
      history.push({ currentArray: [...arrayCopy], comparingIndices: [j, j + 1], swapped: false });

      if (arrayCopy[j] > arrayCopy[j + 1]) {
        let temp = arrayCopy[j];
        arrayCopy[j] = arrayCopy[j + 1];
        arrayCopy[j + 1] = temp;
        swaps++;
        history.push({ currentArray: [...arrayCopy], comparingIndices: [j, j + 1], swapped: true });
      }
    }
  }
  return { algorithmName: "Bubble Sort", sortedArray: arrayCopy, history, executionTimeMs: performance.now() - startTime, comparisons, swaps };
}

export function selectionSort(arr: number[]): AlgorithmResult {
  const history: StepRecord[] = [];
  let comparisons = 0, swaps = 0;
  const startTime = performance.now();
  let arrayCopy = [...arr];
  let n = arrayCopy.length;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      comparisons++;
      history.push({ currentArray: [...arrayCopy], comparingIndices: [minIdx, j], swapped: false });
      if (arrayCopy[j] < arrayCopy[minIdx]) minIdx = j;
    }
    if (minIdx !== i) {
      let temp = arrayCopy[i];
      arrayCopy[i] = arrayCopy[minIdx];
      arrayCopy[minIdx] = temp;
      swaps++;
      history.push({ currentArray: [...arrayCopy], comparingIndices: [i, minIdx], swapped: true });
    }
  }
  return { algorithmName: "Selection Sort", sortedArray: arrayCopy, history, executionTimeMs: performance.now() - startTime, comparisons, swaps };
}

export function insertionSort(arr: number[]): AlgorithmResult {
  const history: StepRecord[] = [];
  let comparisons = 0, swaps = 0;
  const startTime = performance.now();
  let arrayCopy = [...arr];
  let n = arrayCopy.length;

  for (let i = 1; i < n; i++) {
    let key = arrayCopy[i];
    let j = i - 1;
    comparisons++;
    history.push({ currentArray: [...arrayCopy], comparingIndices: [j, i], swapped: false });
    while (j >= 0 && arrayCopy[j] > key) {
      arrayCopy[j + 1] = arrayCopy[j];
      swaps++;
      history.push({ currentArray: [...arrayCopy], comparingIndices: [j, j + 1], swapped: true });
      j = j - 1;
      if (j >= 0) {
        comparisons++;
        history.push({ currentArray: [...arrayCopy], comparingIndices: [j, j + 1], swapped: false });
      }
    }
    arrayCopy[j + 1] = key;
  }
  return { algorithmName: "Insertion Sort", sortedArray: arrayCopy, history, executionTimeMs: performance.now() - startTime, comparisons, swaps };
}

export function cocktailSort(arr: number[]): AlgorithmResult {
  const history: StepRecord[] = [];
  let comparisons = 0, swaps = 0;
  const startTime = performance.now();
  let arrayCopy = [...arr];
  let swapped = true;
  let start = 0;
  let end = arrayCopy.length - 1;

  while (swapped) {
    swapped = false;
    for (let i = start; i < end; ++i) {
      comparisons++;
      history.push({ currentArray: [...arrayCopy], comparingIndices: [i, i + 1], swapped: false });
      if (arrayCopy[i] > arrayCopy[i + 1]) {
        let temp = arrayCopy[i];
        arrayCopy[i] = arrayCopy[i + 1];
        arrayCopy[i + 1] = temp;
        swaps++;
        history.push({ currentArray: [...arrayCopy], comparingIndices: [i, i + 1], swapped: true });
        swapped = true;
      }
    }
    if (!swapped) break;
    swapped = false;
    end = end - 1;
    for (let i = end - 1; i >= start; --i) {
      comparisons++;
      history.push({ currentArray: [...arrayCopy], comparingIndices: [i, i + 1], swapped: false });
      if (arrayCopy[i] > arrayCopy[i + 1]) {
        let temp = arrayCopy[i];
        arrayCopy[i] = arrayCopy[i + 1];
        arrayCopy[i + 1] = temp;
        swaps++;
        history.push({ currentArray: [...arrayCopy], comparingIndices: [i, i + 1], swapped: true });
        swapped = true;
      }
    }
    start = start + 1;
  }
  return { algorithmName: "Cocktail Sort", sortedArray: arrayCopy, history, executionTimeMs: performance.now() - startTime, comparisons, swaps };
}

export function gnomeSort(arr: number[]): AlgorithmResult {
  const history: StepRecord[] = [];
  let comparisons = 0, swaps = 0;
  const startTime = performance.now();
  let arrayCopy = [...arr];
  let index = 0;
  let n = arrayCopy.length;

  while (index < n) {
    if (index === 0) index++;
    comparisons++;
    history.push({ currentArray: [...arrayCopy], comparingIndices: [index, index - 1], swapped: false });
    
    if (arrayCopy[index] >= arrayCopy[index - 1]) {
      index++;
    } else {
      let temp = arrayCopy[index];
      arrayCopy[index] = arrayCopy[index - 1];
      arrayCopy[index - 1] = temp;
      swaps++;
      history.push({ currentArray: [...arrayCopy], comparingIndices: [index, index - 1], swapped: true });
      index--;
    }
  }
  return { algorithmName: "Gnome Sort", sortedArray: arrayCopy, history, executionTimeMs: performance.now() - startTime, comparisons, swaps };
}

export function oddEvenSort(arr: number[]): AlgorithmResult {
  const history: StepRecord[] = [];
  let comparisons = 0, swaps = 0;
  const startTime = performance.now();
  let arrayCopy = [...arr];
  let isSorted = false;
  let n = arrayCopy.length;

  while (!isSorted) {
    isSorted = true;
    for (let i = 1; i <= n - 2; i = i + 2) {
      comparisons++;
      history.push({ currentArray: [...arrayCopy], comparingIndices: [i, i + 1], swapped: false });
      if (arrayCopy[i] > arrayCopy[i + 1]) {
        let temp = arrayCopy[i];
        arrayCopy[i] = arrayCopy[i + 1];
        arrayCopy[i + 1] = temp;
        swaps++;
        history.push({ currentArray: [...arrayCopy], comparingIndices: [i, i + 1], swapped: true });
        isSorted = false;
      }
    }
    for (let i = 0; i <= n - 2; i = i + 2) {
      comparisons++;
      history.push({ currentArray: [...arrayCopy], comparingIndices: [i, i + 1], swapped: false });
      if (arrayCopy[i] > arrayCopy[i + 1]) {
        let temp = arrayCopy[i];
        arrayCopy[i] = arrayCopy[i + 1];
        arrayCopy[i + 1] = temp;
        swaps++;
        history.push({ currentArray: [...arrayCopy], comparingIndices: [i, i + 1], swapped: true });
        isSorted = false;
      }
    }
  }
  return { algorithmName: "Odd-Even Sort", sortedArray: arrayCopy, history, executionTimeMs: performance.now() - startTime, comparisons, swaps };
}