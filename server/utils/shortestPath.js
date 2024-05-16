// Require the Path model from the '../models/Path' file
const Path = require("../models/Path");

// Function to create a graph from the given edges
function createGraph(edges) {
  // Initialize an empty graph
  const graph = {};

  // Loop through each edge
  edges.forEach((edge) => {
    // If source node is not in the graph, add it
    if (!graph[edge.source]) {
      graph[edge.source] = [];
    }

    // If destination node is not in the graph, add it
    if (!graph[edge.destination]) {
      graph[edge.destination] = [];
    }

    // Add the edge from source to destination with its weight
    graph[edge.source].push({
      node: edge.destination,
      weight: edge.timeInMinutes,
    });
    // Since the graph is undirected, add the edge from destination to source as well
    graph[edge.destination].push({
      node: edge.source,
      weight: edge.timeInMinutes,
    });
  });

  // Return the created graph
  return graph;
}

// Function to find the shortest path using Dijkstra's algorithm
function dijkstra(graph, start) {
  // Initialize distances, visited nodes, and previous nodes
  const distances = {};
  const visited = {};
  const previousNodes = {};
  const nodes = Object.keys(graph);

  // Initialize all distances to Infinity and previous nodes to null
  nodes.forEach((node) => {
    distances[node] = Infinity;
    previousNodes[node] = null;
  });

  // Distance from start to itself is 0
  distances[start] = 0;

  // Loop until all nodes are visited
  while (nodes.length) {
    // Find the node with the minimum distance from start
    const currentNode = nodes.reduce((minNode, node) => {
      if (distances[node] < distances[minNode]) {
        return node;
      }
      return minNode;
    }, nodes[0]);

    // Get neighbors of the current node
    const neighbors = graph[currentNode];

    // Remove current node from unvisited nodes
    nodes.splice(nodes.indexOf(currentNode), 1);
    // Mark current node as visited
    visited[currentNode] = true;

    // Update distances to neighbors
    for (let i = 0; i < neighbors.length; i++) {
      const neighbor = neighbors[i].node;
      const weight = neighbors[i].weight;
      const tentativeDistance = distances[currentNode] + weight;

      if (tentativeDistance < distances[neighbor]) {
        distances[neighbor] = tentativeDistance;
        previousNodes[neighbor] = currentNode;
      }
    }
  }

  // Return the distances to all nodes from start
  return distances;
}

// Async function to calculate the shortest time between source and destination
async function calculateShortestTime(source, destination) {
  // Check if source and destination are provided
  if (!source || !destination) {
    return { error: "Source and destination are required." };
  }

  // If source is same as destination, time is 0
  if (source === destination) {
    return { time: 0 };
  }

  try {
    // Fetch all paths from the database
    const allPaths = await Path.find();
    // Create a graph from the fetched paths
    const graph = createGraph(allPaths);

    // Check if source node is present in the graph
    if (!(source in graph)) {
      return { error: "Source not present" };
    }

    // Check if destination node is present in the graph
    if (!(destination in graph)) {
      return { error: "Destination not present" };
    }

    // Calculate the shortest distances using Dijkstra's algorithm
    const distances = dijkstra(graph, source);
    // Get the shortest time to reach destination
    const shortestTime = distances[destination];

    // If no path found, return error
    if (!shortestTime) {
      return { error: "No path found" };
    }

    // Return the shortest time
    return { time: shortestTime };
  } catch (error) {
    // Return error if any exception occurs
    return { error: "An error occurred while calculating the shortest path." };
  }
}

// Export the calculateShortestTime function
module.exports = calculateShortestTime;
