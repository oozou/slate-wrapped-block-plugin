
<h3 align="center"><code>slate-wrapped-block-plugin</code></h3>

A [**Slate**](https://github.com/ianstormtaylor/slate) plugin to automatically wrap a custom block component around the selected block by condition. Useful for implementing block floating button or other behaviors.

---

### Install

```
npm install --save slate-wrapped-block
```

_You will need to have installed `slate` as a dependency already._

---

### Usage

```js
import AutoWrapBlock from 'slate-wrapped-block'
import { Editor } from 'slate'

// Add the plugin to your set of plugins...
const plugins = [
  AutoWrapBlock({
    type: 'wrap',
    condition: (node) =>
      node.type === 'paragraph' && !node.isEmpty
    component: (props) =>
      <div>{props}.children</div>
  })
]

// And later pass it into the Slate editor...
<Editor
  ...
  plugins={plugins}
/>
```

Option | Type | Description
--- | --- | ---
**`type`** | `String` | Type of block that is going to wrap around selected block.
**`condition`** | `Function` | A function that use to check selected block is going to be wrap or not.
**`component`** | `Function` | React component that is going to be wrap around selected block.

---

### Development

Clone the repository and then run:

```
npm install
npm run watch
```

And open the example page in your browser:

```
http://localhost:8888/
```

---

### License

Copyright &copy; 2016, [Oozou](http://oozou.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
