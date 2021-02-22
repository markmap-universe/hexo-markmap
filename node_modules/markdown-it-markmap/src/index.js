/*
 * @file index.js
 *
 * @brief plugin entry point
 * @author David Suárez
 * @date Sat, 09 May 20 19:45:15 +0200
 *
 * @license
 *
 * markdown-it-markmap: markdown-it markmap-lib plugin
 *
 * Copyright (c) 2020 David Suárez
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 *
 */

import { transform } from 'markmap-lib/dist/transform';

const markmapPlugin = (md) => {

  const temp = md.renderer.rules.fence.bind(md.renderer.rules);

  md.renderer.rules.fence = (tokens, idx, options, env, slf) => {

    const token = tokens[idx];

    if (token.info === 'mindmap') {
      try {
        const data = transform(token.content.trim());
        return `<svg class="markmap-svg">${JSON.stringify(data)}</svg>`;

      } catch (ex) {
        return `<pre>${ex}</pre>`
      }
    }

    return temp(tokens, idx, options, env, slf)
  };
};

export default markmapPlugin
