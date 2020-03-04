import React from 'react';
import styled from 'styled-components';
import Chart from './mouseover-images/Chart.png';
import Table from './mouseover-images/Table.png';

export const Header = styled.section`
  background: lightblue;
  height: 10vh;
  box-shadow: 0 0 10px;
  display: flex;
`;

export const Footer = styled.section`
  background: lightblue;
  height: 10vh;
  width: 100vw;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
`;

export const Layout = styled.section``;

export const Logo = styled.h1`
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-weight: 200;
  text-transform: uppercase;
  margin: 0 0 0 3vh;
  align-self: center;
  letter-spacing: 3px;
  color: grey;
`;


export const Content = styled.section`
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;
  height: 60vh;
  img {
    max-height: 20vh;
  }
`;


export const Graph = ({ id }) => <img src={Chart} alt="" id={id}/>;
export const TableC = ({ id }) => <img src={Table} alt="" id={id}/>;
export const ImportantButton = ({ id }) => <button id={id}>IMPORTANT</button>;

export const HelpBox = styled.div`
  background: white;
  height: 5vh;
  font-size: 1.5rem;
  width: 80vw;
  box-shadow: 0 0 5px lightblue inset;
  padding: 4px 0 0 10px;
  display: flex;
  align-content: center;
  margin-left: 3vh;
`;
