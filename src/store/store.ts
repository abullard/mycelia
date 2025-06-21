import {
  applyNodeChanges,
  applyEdgeChanges,
  type Edge,
  type EdgeChange,
  type Node,
  type NodeChange,
  type OnNodesChange,
  type OnEdgesChange,
  type XYPosition,
} from '@xyflow/react';
import { create } from 'zustand';
import { nanoid } from 'nanoid/non-secure';

export type RFState = {
  nodes: Node[];
  edges: Edge[];
  selectedNode: Node;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  setSelectedNode: (node: Node) => void;
  addChildNode: (parentNode: Node, position: XYPosition, label: string) => Node;
};

const startingNode: Node = {
  id: 'root',
  /*
   TODO AJB 05/22/2025: vvv this maps to .react-flow__node-mindmap in mind-map.css
   you'll need to change this impl to just be the node you want
  */
  type: 'mindmap',
  data: { label: 'root' },
  position: { x: 0, y: 0 },
};

const useStore = create<RFState>((set, get) => ({
  nodes: [startingNode],

  edges: [],

  selectedNode: startingNode,

  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  setSelectedNode: (node: Node) => {
    set({
      selectedNode: node
    })
  },

  addChildNode: (parentNode: Node, position: XYPosition, label: string): Node => {
    const newNode = {
      id: nanoid(),
      type: 'mindmap',
      data: { label },
      position,
      parentId: parentNode.id,
    };

    const newEdge = {
      id: nanoid(),
      source: parentNode.id,
      target: newNode.id,
    };

    set({
      nodes: [...get().nodes, newNode],
      edges: [...get().edges, newEdge],
    });

    return newNode;
  },
}));

export default useStore;