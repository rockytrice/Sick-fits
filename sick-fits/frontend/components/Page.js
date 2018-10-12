import React, { Component } from 'react'
import Header from "../components/Header"
import Meta from "../components/Meta";
import styled, {ThemeProvider, injectGlobal} from "styled-components";

const theme = {
  red: '#FF0000',
  black: '#393939',
  grey: '#3A3A3A',
  lightgrey: '#E1E1E1',
  offWhite: '#EDEDED',
  maxWidth: 'auto',
  bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
};


const StyledPage = styled.div`
background:white;
color:${props => props.theme.black}
`;
const Inner = styled.div`
max-width:${props => props.theme.maxWidth};
margin: 0 auto;
padding: 2rem;

`;
export default class Page extends Component {
  render() {
    return (
      // allows you to specify values up high and any child can access those values via react context API
      <ThemeProvider theme={theme}>
        <StyledPage>
          <Meta />
          <Header />
          <Inner>
            {this.props.children}
          </Inner>
        </StyledPage>
      </ThemeProvider>
      
    )
  }
}
