import React from 'react'

const clearNodeStyle = {
  backgroundColor: '#eee',
  position: 'relative'
}

const clearIconStyle = {
  position: 'absolute',
  top: 3,
  right: 2,
  width: '20px',
  height: '20px',
  textAlign: 'center',
  zIndex: 2000,
  cursor: 'pointer',
  color: '#999'
}

class ClearNode extends React.Component {

  clearContent = () => {
    const { editor, state, node } = this.props

    const textNode = node.nodes.first().nodes.first()

    const contentSelection = {
      anchorKey: textNode.key,
      anchorOffset: 0,
      focusKey: textNode.key,
      focusOffset: textNode.length
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
        <div style={clearIconStyle} onClick={this.clearContent} contentEditable={false}><i className="fa fa-times-circle"></i></div>
        {this.props.children}
      </div>
    )
  }
}

export default ClearNode
