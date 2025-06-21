import { useState } from "react";
import TextArea from "./text-area";
import useStore, { RFState } from "@/store/store";
import { useShallow } from "zustand/shallow";
import { XYPosition, type Node } from "@xyflow/react";

const selector = (state: RFState) => ({
    selectedNode: state.selectedNode,
    addChildNode: state.addChildNode,
});

const createNewNode = (selectedNode: Node, text: string, addChildNode: (selectedNode: Node, pos: XYPosition, text: string) => void) => {
    const randomSignFlipOne = Math.random() < 0.5 ? -1 : 1;
    const randomSignFlipTwo = Math.random() < 0.5 ? -1 : 1;

    const pos = {
        x: randomSignFlipOne * (Math.random() * 200),
        y: randomSignFlipTwo * (Math.random() * 200),
    };

    if (selectedNode) {
        addChildNode(selectedNode, pos, text);
    }
};

function PromptAndOutput() {
    const [text, setText] = useState<string>('');

    const { addChildNode, selectedNode } = useStore(
        useShallow(selector),
    );

    return (
        <TextArea
            id="prompt"
            label="prompt area"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onSubmit={() => createNewNode(selectedNode, text, addChildNode)}
            placeholder="Ask anything."
        />
    );
}

export default PromptAndOutput;