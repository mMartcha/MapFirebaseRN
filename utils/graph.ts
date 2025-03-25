import { LatLng } from "react-native-maps";

type Node = {
    id: number;
    coord: LatLng;
    building: boolean;
};

type Aresta = {
    n1: Node;
    n2: Node;
    dist: number;
};

type Graph = {
    nodes: Node[];
    arestas: Aresta[];
};

// Função para calcular a menor distância utilizando Dijkstra
function dijkstra(graph: Graph, startId: number, endId: number): number {
    const distances: Record<number, number> = {};
    const visited: Set<number> = new Set();
    const previous: Record<number, number | null> = {};
    const queue: { id: number; dist: number }[] = [];

    graph.nodes.forEach(node => {
        distances[node.id] = node.id === startId ? 0 : Infinity;
        previous[node.id] = null;
        queue.push({ id: node.id, dist: distances[node.id] });
    });

    while (queue.length > 0) {
        queue.sort((a, b) => a.dist - b.dist);
        const { id: currentId } = queue.shift()!;

        if (currentId === endId) break;
        if (visited.has(currentId)) continue;

        visited.add(currentId);

        graph.arestas.forEach(({ n1, n2, dist }) => {
            if (n1.id === currentId || n2.id === currentId) {
                const neighbor = n1.id === currentId ? n2 : n1;
                if (!visited.has(neighbor.id)) {
                    const newDist = distances[currentId] + dist;
                    if (newDist < distances[neighbor.id]) {
                        distances[neighbor.id] = newDist;
                        previous[neighbor.id] = currentId;
                        queue.push({ id: neighbor.id, dist: newDist });
                    }
                }
            }
        });
    }

    return distances[endId];
}


const nodes: Node[] = [
    { id: 1, coord: { latitude: -30.0277, longitude: -51.2287 }, building: true },
    { id: 2, coord: { latitude: -30.0280, longitude: -51.2290 }, building: false },
    { id: 3, coord: { latitude: -30.0290, longitude: -51.2300 }, building: true },
    { id: 4, coord: { latitude: -30.0300, longitude: -51.2310 }, building: false },
    { id: 5, coord: { latitude: -30.0310, longitude: -51.2320 }, building: true },
    { id: 6, coord: { latitude: -30.0320, longitude: -51.2330 }, building: false },
    { id: 7, coord: { latitude: -30.0330, longitude: -51.2340 }, building: true },
    { id: 8, coord: { latitude: -30.0340, longitude: -51.2350 }, building: false },
    { id: 9, coord: { latitude: -30.0350, longitude: -51.2360 }, building: true }
];

// Criando as arestas depois, referenciando os nós corretamente
const arestas: Aresta[] = [
    { n1: nodes[0], n2: nodes[1], dist: 50 },
    { n1: nodes[1], n2: nodes[2], dist: 70 },
    { n1: nodes[2], n2: nodes[3], dist: 60 },
    { n1: nodes[3], n2: nodes[4], dist: 80 },
    { n1: nodes[4], n2: nodes[5], dist: 90 },
    { n1: nodes[5], n2: nodes[6], dist: 100 },
    { n1: nodes[2], n2: nodes[5], dist: 110 },
    { n1: nodes[1], n2: nodes[4], dist: 120 },
    { n1: nodes[3], n2: nodes[7], dist: 130 },
    { n1: nodes[7], n2: nodes[8], dist: 140 },
    { n1: nodes[5], n2: nodes[8], dist: 150 }
];

// Criando o grafo
const graph: Graph = { nodes, arestas };


// Testando o Dijkstra



// Testando o Dijkstra

export function execDijkstra(){
    console.log("Distância mínima (1-9):", dijkstra(graph, 1, 9));
    console.log("Distância mínima (1-7):", dijkstra(graph, 1, 7));
    
}