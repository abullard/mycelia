import { useState } from "react";
import TextArea from "./text-area";
import useStore, { RFState } from "@/store/store";
import { useShallow } from "zustand/shallow";

const selector = (state: RFState) => ({
    addChildNode: state.addChildNode,
});

function PromptAndOutput() {
    const [text, setText] = useState<string>('');

    const { addChildNode } = useStore(
        useShallow(selector),
      );
    
    const createNewNode = () => {
        console.log(text);
        addChildNode(currentNodeId, Math.random(), text)
    }

    return (
        <TextArea 
            id="prompt"
            label="prompt area"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onSubmit={createNewNode}
            placeholder="Ask anything."
        />
    );
}

export default PromptAndOutput;