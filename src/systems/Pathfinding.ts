class Node {
  constructor(
    public x: number,
    public z: number,
    public g: number = 0,
    public h: number = 0,
    public f: number = 0,
    public parent: Node | null = null
  ) {}
}

export const Pathfinding = {
  isBlocked(x: number, z: number): boolean {
    if (x < -12 || x > 12 || z < -12 || z > 12) return true; // Platform bounds

    // Command Hub
    if (x >= -2 && x <= 2 && z >= -2 && z <= 2) return true;
    
    // Smelter
    if (x >= -6 && x <= -4 && z >= -3 && z <= -1) return true;
    
    // Synth-Farm
    if (x >= 2 && x <= 6 && z >= -6 && z <= -2) return true;
    
    // DataHub
    if (x >= 2 && x <= 4 && z >= 4 && z <= 6) return true;

    return false;
  },

  heuristic(a: Node, b: Node): number {
    // Manhattan distance
    return Math.abs(a.x - b.x) + Math.abs(a.z - b.z);
  },

  calculatePath(startCoords: [number, number, number], endCoords: [number, number, number]): [number, number, number][] | null {
    const startX = Math.round(startCoords[0]);
    const startZ = Math.round(startCoords[2]);
    const endX = Math.round(endCoords[0]);
    const endZ = Math.round(endCoords[2]);

    if (this.isBlocked(endX, endZ)) {
      return null; // Target is inside a building
    }

    const openList: Node[] = [];
    const closedSet: Set<string> = new Set();
    
    const startNode = new Node(startX, startZ);
    const endNode = new Node(endX, endZ);
    
    openList.push(startNode);

    const maxIterations = 1000;
    let iterations = 0;

    while (openList.length > 0 && iterations < maxIterations) {
      iterations++;
      
      // Get lowest f score
      let currentIndex = 0;
      for (let i = 1; i < openList.length; i++) {
        if (openList[i].f < openList[currentIndex].f) {
          currentIndex = i;
        }
      }

      const currentNode = openList[currentIndex];

      if (currentNode.x === endNode.x && currentNode.z === endNode.z) {
        // Path found
        const path: [number, number, number][] = [];
        let curr: Node | null = currentNode;
        while (curr) {
          path.push([curr.x, 0, curr.z]);
          curr = curr.parent;
        }
        return path.reverse();
      }

      openList.splice(currentIndex, 1);
      closedSet.add(`${currentNode.x},${currentNode.z}`);

      // Generate neighbors (8-way movement)
      const neighbors = [
        { x: 0, z: -1 }, { x: 0, z: 1 }, { x: -1, z: 0 }, { x: 1, z: 0 },
        { x: -1, z: -1 }, { x: 1, z: -1 }, { x: -1, z: 1 }, { x: 1, z: 1 }
      ];

      for (const offset of neighbors) {
        const neighborX = currentNode.x + offset.x;
        const neighborZ = currentNode.z + offset.z;

        if (this.isBlocked(neighborX, neighborZ)) continue;
        if (closedSet.has(`${neighborX},${neighborZ}`)) continue;

        const gScore = currentNode.g + (Math.abs(offset.x) === 1 && Math.abs(offset.z) === 1 ? 1.414 : 1);
        
        let neighborNode = openList.find(n => n.x === neighborX && n.z === neighborZ);
        if (!neighborNode) {
          neighborNode = new Node(neighborX, neighborZ);
          neighborNode.h = this.heuristic(neighborNode, endNode);
          openList.push(neighborNode);
        } else if (gScore >= neighborNode.g) {
          continue; // Not a better path
        }

        neighborNode.parent = currentNode;
        neighborNode.g = gScore;
        neighborNode.f = neighborNode.g + neighborNode.h;
      }
    }

    return null; // No path found
  }
};
