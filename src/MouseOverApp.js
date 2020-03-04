import React, {useEffect, useState} from "react";
import {
  Content,
  Footer,
  Graph,
  Header,
  HelpBox,
  ImportantButton,
  Layout,
  Logo,
  Table
} from "./MouseOverUI";
import {fromEvent} from "rxjs";
import {distinctUntilChanged, endWith, map, takeUntil} from 'rxjs/operators';


const defaultHelpText = "Mouse over something to see help!";
const helpTextById = {
  'graph': "This shows a trend in data over time",
  "table": "This shows tabulated data.",
  "important-button": "This does an important action!",
};






export default function MouseOverApp() {
  const helpText = defaultHelpText;

  useEffect(() => {

    // Todo!

  }, []);

  return (
    <Layout>
      <Header>
        <Logo>Client</Logo>
      </Header>

      <Content>
        <Graph id="graph" />
        <ImportantButton id="important-button" />
        <Table id="table" />
      </Content>

      <Footer>
        <HelpBox>{helpText}</HelpBox>
      </Footer>
    </Layout>
  );
}
