
import AutoWrapBlock from '..'
import React from 'react'
import ReactDOM from 'react-dom'
import initialState from './state.json'
import ClearNode from './nodes/clear'
import { Editor, Raw } from 'slate'

class Example extends React.Component {

  plugins = [
    AutoWrapBlock({
      type: 'close',
      condition: (node) =>
        node.type === 'paragraph' && !node.isEmpty,
      component: ClearNode,
    })
  ];

  state = {
    state: Raw.deserialize(initialState, { terse: true })
  };

  onChange = (state) => {
    this.setState({ state })
  }

  render = () => {
    return (
      <Editor
        onChange={this.onChange}
        plugins={this.plugins}
        state={this.state.state}
      />
    )
  }
}

const example = <Example />
const root = document.body.querySelector('main')
ReactDOM.render(example, root)
