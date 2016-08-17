import React from 'react'

const clearNodeStyle = {
  backgroundColor: '#eee',
  position: 'relative'
}

const clearIconStyle = {
  border: '1px solid black',
  borderRadius: '50%',
  position: 'absolute',
  top: 0,
  right: 0,
  width: '20px',
  height: '20px',
  textAlign: 'center',
  zIndex: 2000,
  cursor: 'pointer'
}

class ClearNode extends React.Component {

  clearContent = () => {
    const { editor, state, node } = this.props

    const contentSelection = {
      anchorKey: node.key,
      anchorOffset: 0,
      focusKey: node.key,
      focusOffset: node.length
    }

    editor.props.onChange(
      state
        .transform()
        .moveTo(contentSelection)
        .delete()
        .apply()
    )
  }

  render() {
    return (
      <div style={clearNodeStyle}>
        <div style={clearIconStyle} onClick={this.clearContent} contentEditable={false}>X</div>
        {this.props.children}
      </div>
    )
  }
}

export default ClearNode
