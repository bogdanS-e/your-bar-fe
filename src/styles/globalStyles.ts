import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #ececec;
    color: #080808;
  }
  
  #modal-root {
    z-index: 100;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  *,
  *::after,
  *::before {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  // dropdown animation
  .dropdown-fade-enter {
    opacity: 0;
    transform: translateY(10px);
  }
  .dropdown-fade-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 300ms ease-in-out, transform 300ms ease-in-out;
  }
  .dropdown-fade-exit {
    opacity: 1;
    transform: translateY(0);
  }
  .dropdown-fade-exit-active {
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 300ms ease-in-out, transform 300ms ease-in-out;
  }

  // articles animation
  .article-enter {
    opacity: 0;
    transform: translateY(-20px);
  }
  .article-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 1000ms, transform 1000ms; /* Slow enter */
  }
  .article-exit {
    opacity: 1;
    transform: translateY(0);
  }
  .article-exit-active {
    opacity: 0;
    transform: translateY(-20px);
    transition: opacity 300ms, transform 300ms; /* Fast exit */
  }


  .fade-left-enter {
    opacity: 0;
    transform: translateX(20px); /* Start slightly to the right */
  }
  .fade-left-enter-active {
      opacity: 1;
      transform: translateX(0); /* Move to original position */
      transition: opacity 300ms ease-in, transform 300ms ease-in;
  }
  .fade-left-exit {
      opacity: 1;
      transform: translateX(0); /* Start at original position */
  }
  .fade-left-exit-active {
      opacity: 0;
      transform: translateX(20px); /* Move slightly to the right */
      transition: opacity 200ms ease-out, transform 200ms ease-out;
  }
`;

export default GlobalStyle;
