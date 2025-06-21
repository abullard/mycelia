import React, { useRef, useEffect, useLayoutEffect } from 'react';
import { Handle, Position, type Node, type NodeProps } from '@xyflow/react';
import styled from 'styled-components';
 
export type NodeData = {
  label: string;
};
 
function MindMapNode({ id, data }: NodeProps<Node<NodeData>>) {
  const inputRef = useRef<HTMLInputElement>(undefined);
 
  useLayoutEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.width = `${data.label.length * 8}px`;
    }
  }, [data.label.length]);
 
  useEffect(() => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus({ preventScroll: true });
      }
    }, 1);
  }, []);
 
  return (
    <>
      <InputWrapper>
        <DragHandle>
          {/* icon taken from grommet https://icons.grommet.io */}
          <svg viewBox="0 0 24 24">
            <path
              fill="#333"
              stroke="#333"
              strokeWidth="1"
              d="M15 5h2V3h-2v2zM7 5h2V3H7v2zm8 8h2v-2h-2v2zm-8 0h2v-2H7v2zm8 8h2v-2h-2v2zm-8 0h2v-2H7v2z"
            />
          </svg>
        </DragHandle>
        <span style={{fontSize:'10px'}}>{data.label}</span>
      </InputWrapper>
 
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Top} />
    </>
  );
}
 
export default MindMapNode;

const InputWrapper = styled.div`
    display: flex;
    height: 20px;
    z-index: 1;
    position: relative;
    pointer-events: none;
`;

const DragHandle = styled.div`
    background: transparent;
    width: 14px;
    height: 100%;
    margin-right: 4px;
    display: flex;
    align-items: center;
    pointer-events: all;
`;