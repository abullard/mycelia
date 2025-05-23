import { ReactFlowProvider } from "@xyflow/react";
import { ReactNode } from "react";

export interface ProvidersProps {
    children: ReactNode;
}

export default function Providers(props: ProvidersProps) {
    const { children } = props;

    return (
        <ReactFlowProvider>
            {children}
        </ReactFlowProvider>
    );
}
