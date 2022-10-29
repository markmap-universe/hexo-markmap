const { walkTree } = require("markmap-common")

const fold = (tree, maxDepth = 0) => {
  if (!maxDepth) return tree
  maxDepth = +maxDepth;
  walkTree(tree, (node, next) => {
    // Here depths are in sequence of [0, 2, 4, ..., 2n]
    if (node.d >= maxDepth * 2) {
      node.p = Object.assign(node.p, { f: true });
    }
    next();
  });
  return tree
}

module.exports = { fold }
