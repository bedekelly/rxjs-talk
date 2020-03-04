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
  TableC
} from "./MouseOverUI";
import {fromEvent} from "rxjs";
import {distinctUntilChanged, endWith, map, takeUntil} from 'rxjs/operators';


const defaultHelpText = "Mouse over something to see help!";
const helpTextById = {
  'stop': "Stop receiving mouseover help",
  'graph': "This shows a trend in data over time",
  "table": "This shows tabulated data.",
  "important-button": "This does an important action!",
};


export default function MouseOverApp() {
  const [helpText, setHelpText] = useState(defaultHelpText);

  useEffect(() => {
    const stop$ = fromEvent(document.querySelector('#stop'), 'click');
    const mouseMove$ = fromEvent(document, "mousemove");
    const elements$ = mouseMove$.pipe(
      map(({x, y}) => document.elementFromPoint(x, y)),
      distinctUntilChanged(),
      map(element => {
        if (element == null) {
          return defaultHelpText;
        } else {
          return helpTextById[element.id] || defaultHelpText;
        }
      }),
      takeUntil(stop$),
      endWith('')
    );

    const subscription = elements$.subscribe(setHelpText);
    return () => subscription.unsubscribe();

  }, []);

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
        <button id="stop">Stop</button>
      </Footer>
    </Layout>
  );
}
