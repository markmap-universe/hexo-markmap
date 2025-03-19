/*
  Plugin self-use style.
*/
export default (darkThemeCssSelector: string) => /* css */`
  .markmap-wrap {
    position: relative;
    height: 500px;
    width: 100%;
    background: #FFFFFF;
  }
  
  ${darkThemeCssSelector} .markmap-wrap {
    background: #1a1a1a;
  }
  
  .markmap-wrap > svg {
    width: 100%;
    height: 100%;
  }
  
  .mm-toolbar {
    position: absolute;
    right: .5em;
    bottom: .5em;
  }
  `

  +

  /**
    Override of the default markmap styles.
    https://github.com/markmap/markmap/blob/master/packages/markmap-view/src/style.css
    https://cdn.jsdelivr.net/npm/markmap-toolbar/dist/style.css
  */
  /* css */ `
  ${darkThemeCssSelector} .markmap {
    --markmap-code-bg: #1a1b26;
    --markmap-code-color: #ddd;
    --markmap-circle-open-bg: #444;
    --markmap-text-color: #eee;
  }
  
  ${darkThemeCssSelector} .mm-toolbar {
    --un-border-opacity: 1;
    border-color: rgb(82 82 91 / var(--un-border-opacity));
    --un-bg-opacity: 1;
    background-color: rgb(39 39 42 / var(--un-bg-opacity));
    --un-text-opacity: 1;
    color: rgb(161 161 170 / var(--un-text-opacity));
  }
  `
