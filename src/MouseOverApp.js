import React from "react";
import {
  Content,
  Footer,
  Graph,
  Header,
  HelpBox,
  ImportantButton,
  Layout,
  Logo,
  TableC
} from "./MouseOverUI";


export default function MouseOverApp() {
  const helpText = "Mouse over something to see help!";
  
  return (
    <Layout>
      <Header>
        <Logo>Client</Logo>
      </Header>

      <Content>
        <Graph id="graph" />
        <ImportantButton id="important-button" />
        <TableC id="table" />
      </Content>

      <Footer>
        <HelpBox>{helpText}</HelpBox>
      </Footer>
    </Layout>
  );
}
