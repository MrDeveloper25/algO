# algO - Visualizador y Benchmark de Algoritmos de Ordenamiento (Runtime Lab)

## Integrantes
* **Arturo Said González Mercado**
* **Cuauhtémoc Soria Hernández**
* **José Eduardo González Hernández**
* **Leonardo Axel Luna Nochebuena**

---

## Repositorio de GitHub y Tablero
* **URL del Repositorio:** [https://github.com/MrDeveloper25/algO](https://github.com/MrDeveloper25/algO)
* **URL del Tablero (GitHub Project):** [https://github.com/users/MrDeveloper25/projects/7](https://github.com/users/MrDeveloper25/projects/7)

---

## Descripción
`algO` (también conocido como *Runtime Lab*) es una plataforma web interactiva de alta fidelidad visual diseñada para explorar, simular y analizar el rendimiento de diversos algoritmos de ordenamiento en tiempo real. Combina un motor de simulación gráfica con un panel de telemetría, métricas detalladas y una sección educativa teórica basada en la complejidad computacional.

---

## Objetivo
Proveer una herramienta educativa accesible, fluida y de grado profesional que facilite la comprensión del funcionamiento interno, comportamiento asintótico y eficiencia de los algoritmos de ordenamiento a través de visualizaciones interactivas y métricas de rendimiento precisas.

---

## Algoritmos implementados
El simulador soporta y detalla 8 algoritmos de ordenamiento clásicos y optimizados:
1. **Bubble Sort** (Ordenamiento de burbuja clásico)
2. **Optimized Bubble Sort** (Burbuja optimizada con parada temprana por bandera)
3. **Selection Sort** (Ordenamiento por selección)
4. **Insertion Sort** (Ordenamiento por inserción)
5. **Gnome Sort** (Ordenamiento gnomo)
6. **Exchange Sort** (Ordenamiento por intercambio directo)
7. **Quick Sort** (Ordenamiento rápido basado en partición y recursividad)
8. **Merge Sort** (Ordenamiento por mezcla basado en la técnica de divide y vencerás)

---

## Tecnologías utilizadas
* **Framework:** Next.js (App Router con React y TypeScript)
* **Estilos:** Tailwind CSS y variables CSS personalizadas (Identidad visual carbón/cobre con soporte para modo claro y oscuro)
* **Control de Versiones y Despliegue:** Git, GitHub y Vercel (CI/CD automatizado)
* **Rendimiento UI:** `requestAnimationFrame` para animaciones de cursor fluido y control asíncrono optimizado con referencias (`useRef`).

---

## Cómo ejecutar el proyecto
Sigue estos pasos para levantar el entorno de desarrollo localmente:

1. **Clona el repositorio:**
   ```bash
   git clone [https://github.com/MrDeveloper25/algO.git](https://github.com/MrDeveloper25/algO.git)

   cd algO
   npm install
   npm run dev