import { useCallback, useState } from "react";
import TextArea from "./text-area";
import useStore, { RFState } from "@/store/store";
import { useShallow } from "zustand/shallow";
import { XYPosition, type Node } from "@xyflow/react";
import { PromptAndRespond } from "@/services/openai";

const selector = (state: RFState) => ({
    selectedNode: state.selectedNode,
    addChildNode: state.addChildNode,
    setSelectedNode: state.setSelectedNode,
});

const createNewNode = (
    selectedNode: Node,
    text: string,
    addChildNode: (selectedNode: Node, pos: XYPosition, text: string) => Node,
    setSelectedNode: (node: Node) => void,
) => {
    const randomSignFlipOne = Math.random() < 0.5 ? -1 : 1;
    const randomSignFlipTwo = Math.random() < 0.5 ? -1 : 1;

    const pos = {
        x: randomSignFlipOne * (Math.random() * 200),
        y: randomSignFlipTwo * (Math.random() * 200),
    };

    if (selectedNode) {
        const newNode: Node = addChildNode(selectedNode, pos, text);
        setSelectedNode(newNode);
    }
};


function PromptAndOutput() {
    const [text, setText] = useState<string>('');

    const { addChildNode, selectedNode, setSelectedNode } = useStore(
        useShallow(selector),
    );

    const submit = useCallback(async () =>{
        createNewNode(selectedNode, text, addChildNode, setSelectedNode)
        const response = await PromptAndRespond(text);
        
        console.log('AJB: response: ', response);
    }, [text, selectedNode]);

    return (
        <>
            <TextArea
                id="prompt"
                label="prompt area"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onSubmit={submit}
                placeholder="Ask anything."
            />
            <div>
                <span>

                </span>
            </div>
        </>
    );
}

export default PromptAndOutput;