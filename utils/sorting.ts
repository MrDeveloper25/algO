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
// ALGORITMOS DE FUERZA BRUTA (5)
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

export function exchangeSort(arr: number[]): AlgorithmResult {
  const history: StepRecord[] = [];
  let comparisons = 0, swaps = 0;
  const startTime = performance.now();
  let arrayCopy = [...arr];
  let n = arrayCopy.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = i + 1; j < n; j++) {
      comparisons++;
      history.push({ currentArray: [...arrayCopy], comparingIndices: [i, j], swapped: false });

      if (arrayCopy[i] > arrayCopy[j]) {
        let temp = arrayCopy[i];
        arrayCopy[i] = arrayCopy[j];
        arrayCopy[j] = temp;
        swaps++;
        history.push({ currentArray: [...arrayCopy], comparingIndices: [i, j], swapped: true });
      }
    }
  }
  return { algorithmName: "Exchange Sort", sortedArray: arrayCopy, history, executionTimeMs: performance.now() - startTime, comparisons, swaps };
}

// ==========================================
// ALGORITMOS DIVIDE Y VENCERÁS (2)
// ==========================================

export function quickSort(arr: number[]): AlgorithmResult {
  const history: StepRecord[] = [];
  let comparisons = 0, swaps = 0;
  const startTime = performance.now();
  let arrayCopy = [...arr];

  function partition(low: number, high: number): number {
    let pivot = arrayCopy[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      comparisons++;
      history.push({ currentArray: [...arrayCopy], comparingIndices: [j, high], swapped: false });

      if (arrayCopy[j] < pivot) {
        i++;
        let temp = arrayCopy[i];
        arrayCopy[i] = arrayCopy[j];
        arrayCopy[j] = temp;
        swaps++;
        history.push({ currentArray: [...arrayCopy], comparingIndices: [i, j], swapped: true });
      }
    }
    let temp = arrayCopy[i + 1];
    arrayCopy[i + 1] = arrayCopy[high];
    arrayCopy[high] = temp;
    swaps++;
    history.push({ currentArray: [...arrayCopy], comparingIndices: [i + 1, high], swapped: true });
    return i + 1;
  }

  function quickSortRecursive(low: number, high: number) {
    if (low < high) {
      let pi = partition(low, high);
      quickSortRecursive(low, pi - 1);
      quickSortRecursive(pi + 1, high);
    }
  }

  quickSortRecursive(0, arrayCopy.length - 1);
  return { algorithmName: "Quick Sort", sortedArray: arrayCopy, history, executionTimeMs: performance.now() - startTime, comparisons, swaps };
}

export function mergeSort(arr: number[]): AlgorithmResult {
  const history: StepRecord[] = [];
  let comparisons = 0, swaps = 0; 
  const startTime = performance.now();
  let arrayCopy = [...arr];

  function merge(left: number, mid: number, right: number) {
    let n1 = mid - left + 1;
    let n2 = right - mid;
    let L = new Array(n1);
    let R = new Array(n2);

    for (let i = 0; i < n1; i++) L[i] = arrayCopy[left + i];
    for (let j = 0; j < n2; j++) R[j] = arrayCopy[mid + 1 + j];

    let i = 0, j = 0, k = left;

    while (i < n1 && j < n2) {
      comparisons++;
      history.push({ currentArray: [...arrayCopy], comparingIndices: [left + i, mid + 1 + j], swapped: false });
      
      if (L[i] <= R[j]) {
        arrayCopy[k] = L[i];
        i++;
      } else {
        arrayCopy[k] = R[j];
        j++;
      }
      swaps++; 
      history.push({ currentArray: [...arrayCopy], comparingIndices: [k, k], swapped: true });
      k++;
    }

    while (i < n1) {
      arrayCopy[k] = L[i];
      swaps++;
      history.push({ currentArray: [...arrayCopy], comparingIndices: [k, k], swapped: true });
      i++;
      k++;
    }

    while (j < n2) {
      arrayCopy[k] = R[j];
      swaps++;
      history.push({ currentArray: [...arrayCopy], comparingIndices: [k, k], swapped: true });
      j++;
      k++;
    }
  }

  function mergeSortRecursive(left: number, right: number) {
    if (left >= right) return;
    let mid = left + Math.floor((right - left) / 2);
    mergeSortRecursive(left, mid);
    mergeSortRecursive(mid + 1, right);
    merge(left, mid, right);
  }

  mergeSortRecursive(0, arrayCopy.length - 1);
  return { algorithmName: "Merge Sort", sortedArray: arrayCopy, history, executionTimeMs: performance.now() - startTime, comparisons, swaps };
}