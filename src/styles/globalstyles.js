import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
*{
    box-sizing: border-box
}

body{
    margin:0;
    padding:0;
}

*, *::before,*::after, h1,h2,h3,h4,h5{
    margin:0;
    padding:0
}


  

// &>:first-child{}
// div:nth-of-type(1){}
//   @media(max-width: 700px){}
//  &::-webkit-scrollbar{
//  display: none  
// }

// &>*:nth-child(1){}
// &:hover{}


`

export const LightTheme = {

    // body: '#d4cec9',
    body: '#ebece6',
    text: '#010101',
    grey: '#10016D',
    main: '#FEAD01', // yellow
  }
  
  
  
  
  export const DarkTheme = {
    body: "black",
    text: "#FFF",
    main: '#FEAD01',
    grey: '#7D7F7B',
  }