import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

// OUR COLOR PALETTE AND FONTS
  :root {

    // PRIMARY COLORS
    --orange: #FDA346
    --gold: #FADA80
    --beige: #FFFAEA
    // SECONDARY COLORS
    --blue: #4083BB;
    --green: #53B675;
    --red:  #FB483B;
    // DARK TEXT COLOR
    --darkgrey: #333333;
    --lightgrey:  #575757;
    // FONT FOR THE WHOLE WEBSITE
    --font: 'Arimo', sans-serif;
  }

  /* http://meyerweb.com/eric/tools/css/reset/
      v2.0 | 20110126
      License: none (public domain)
  */

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
      margin: 0;
      padding: 0;
      border: 0;
      box-sizing: border-box;
      font-size: 100%;
      vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
      display: block;
  }
  body {
    line-height: 1.2; 
      margin: 0px;
      font-family: var(--font);
      background-color: #fffaea;
    /*   color: var(--darkgrey); */
  }
  ol, ul {
      list-style: none;
  }
  blockquote, q {
      quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
      content: '';
      content: none;
  }

h1 {
  font-size: 2em;
  color: var(--darkgrey);
}
h2,
h3,
label,
button {
	border: none;
  cursor: pointer;
}
p {
  color: var(--darkgrey);
}
a {
  text-decoration: none;
  color: var(--darkgrey);
  &:hover {color: var(--red)}
}
li,
blockquote,
input {
}
`;
