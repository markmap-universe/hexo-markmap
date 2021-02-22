const markdownIt = require('markdown-it');
const markdownItMarkmap = require('markdown-it-markmap');

const mdi = markdownIt();
mdi.use(markdownItMarkmap);


module.exports =  (content) =>  {
  return (mdi.render(content));
}


