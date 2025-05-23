import { styled } from "styled-components";
import MindMapGraph from "../mind-map/mind-map-graph";
import PromptAndOutput from "../chat/prompt-and-output";

const SplitView = () => {
    return (<SplitContainer>
        <LeftPane>
            <MindMapGraph />
        </LeftPane>
        <RightPane>
            <PromptAndOutput />
        </RightPane>
    </SplitContainer>);
}

export default SplitView;

const SplitContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw; 
`;

const LeftPane = styled.div`
  flex: 1;
  padding: 2rem;
`;

const RightPane = styled.div`
  flex: 1;
  padding: 2rem;
  border-left: 1px solid #ddd;
`;