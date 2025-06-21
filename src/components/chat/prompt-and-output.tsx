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
    const [prompt, setPrompt] = useState<string>('');
    const [output, setOutput] = useState<string>('');

    const { addChildNode, selectedNode, setSelectedNode } = useStore(
        useShallow(selector),
    );

    const submit = useCallback(async () =>{
        createNewNode(selectedNode, prompt, addChildNode, setSelectedNode)
        const response = await PromptAndRespond(prompt);
        
        setOutput(response);
    }, [prompt, selectedNode]);

    return (
        <>
            <TextArea
                id="prompt"
                label="prompt area"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onSubmit={submit}
                placeholder="Ask anything."
            />
            <div>
                <span style={{fontSize:'24px'}}>
                    {output}
                </span>
            </div>
        </>
    );
}

export default PromptAndOutput;