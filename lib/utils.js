const { walkTree } = require("markmap-common");

function fold(tree, maxDepth = 0) {
    if (typeof maxDepth === 'undefined' ||
        typeof parseInt(maxDepth) !== 'number' ||
        maxDepth <= 0
    ) { return; }
    maxDepth = parseInt(maxDepth);
    walkTree(tree, (node, next) => {
        // Here depths are in sequence of [0, 2, 4, ..., 2n]
        if (node.d >= maxDepth * 2) {
            node.p = Object.assign(node.p, { f: true });
        }
        next();
    });
}

function escapeData(str) {
    if (str.length == 0) return "";
    let s = str.replace(/&/g, "&amp;");
    s = s.replace(/</g, "&lt;");
    s = s.replace(/>/g, "&gt;");
    s = s.replace(/ /g, "&nbsp;");
    s = s.replace(/\'/g, "&#39;");
    s = s.replace(/\"/g, "&quot;");
    return s;
}

module.exports = { escapeData, fold }
