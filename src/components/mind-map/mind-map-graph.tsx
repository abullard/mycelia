// we need to import the React Flow styles to make it work
import '@xyflow/react/dist/style.css';
import '../../css/mind-map.css';

import React, { useCallback, useRef } from 'react';
import {
  ReactFlow,
  Controls,
  useStoreApi,
  ConnectionLineType,
  type NodeOrigin,
  type OnConnectStart,
} from '@xyflow/react';
import { useShallow } from 'zustand/shallow';
import useStore, { RFState } from '@/store/store';
import MindMapNode from './mind-map-node';
import MindMapEdge from './mind-map-edge';

const selector = (state: RFState) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  addChildNode: state.addChildNode,
  setSelectedNode: state.setSelectedNode,
});

const nodeTypes = {
  mindmap: MindMapNode,
};

const edgeTypes = {
  mindmap: MindMapEdge,
};

const nodeOrigin: NodeOrigin = [0.5, 0.5];
const connectionLineStyle = { stroke: '#F6AD55', strokeWidth: 3 };
const defaultEdgeOptions = { style: connectionLineStyle, type: 'mindmap' };

function MindMapGraph() {
  // whenever you use multiple values, you should use shallow for making sure that the component only re-renders when one of the values change
  const { nodes, edges, onNodesChange, onEdgesChange, setSelectedNode } = useStore(
    useShallow(selector),
  );
  const connectingNodeId = useRef<string | null>(null);
  const store = useStoreApi();

  const onConnectStart: OnConnectStart = useCallback((_, { nodeId }) => {
    const { nodeLookup } = store.getState();

    connectingNodeId.current = nodeId;

    if (connectingNodeId.current) {
      const currentNode = nodeLookup.get(connectingNodeId.current);

      if (currentNode) {
        setSelectedNode(currentNode);
      }
    }
  }, []);

  // const setCenter: SetCenter = () => {
  // TODO AJB 06/20/2025: scroll mindmap to center
  // };

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      onConnectStart={onConnectStart}
      nodeOrigin={nodeOrigin}
      connectionLineStyle={connectionLineStyle}
      defaultEdgeOptions={defaultEdgeOptions}
      connectionLineType={ConnectionLineType.Straight}
      fitView
    >
      <Controls showInteractive={false} />
    </ReactFlow>
  );
}

export default () => (
  <MindMapGraph />
);