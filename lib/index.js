/**
 * A Slate plugin that auto wrap selected block with some custom block.
 *
 * @param {Object} opts
 * return {Object}
 */

function AutoWrapBlock(opts) {
  if (!opts.type) throw new Error('You must provide a `type` option.')
  if (!opts.condition) throw new Error('You must provide a `condition` option.')
  if (!opts.component) throw new Error('You must provide a `component` option.')

  /**
   * On select.
   *
   * @param  {Event} e
   * @param  {Object} data
   * @param  {State} state
   * @param  {Function} getState
   * @param  {Object} props
   */

  function onSelect(e, data, state, { getState, props }) {
    setTimeout(() => autoWrap(getState, props.onChange), 1)
  }

  /**
   * On key down.
   *
   * @param  {Event} e
   * @param  {Object} data
   * @param  {State} state
   * @param  {Function} getState
   * @param  {Object} props
   */

  function onKeyDown(e, data, state, { getState, props }) {
    setTimeout(() => autoWrap(getState, props.onChange), 1)
  }

  /**
   * Get schema
   *
   * @param  {Object} node
   * @return {Function}
   */

  function getSchema(node) {
    const schema = {
      nodes: {}
    }
    schema.nodes[`${opts.type}`] = opts.component
    return schema
  }

  /**
   * Get wrapped block keys.
   *
   * @param  {List} nodes
   * @return {List}
   */

  function getWrappedBlockKeys(nodes) {
    return nodes
      .filter((node) => node.type === opts.type)
      .map((node) => node.nodes.first().nodes.first().key)
  }

  /**
   * Remove all wrapped blocks.
   *
   * @param  {State} wrappedBlockState
   * @return {State}
   */

  function removeAllWrappedBlock(wrappedBlockState) {
    const wrappedBlockKeys = getWrappedBlockKeys(wrappedBlockState.document.nodes)

    let state = wrappedBlockState
    if (wrappedBlockKeys.size > 0) {
      let transform = state.transform()
      for (const wrappedBlockKey of wrappedBlockKeys) {
        transform = transform
          .moveTo({ anchorKey: wrappedBlockKey, anchorOffset: 0 })
          .unwrapBlock(opts.type)
      }
      state = transform.apply()
    }
    return state
  }

  /**
   * Auto wrap.
   *
   * @param  {Function} getState
   * @param  {Function} onChange
   */

  function autoWrap(getState, onChange) {
    const state = getState()
    const { selection } = state

    const removedAllWrappedBlockState = removeAllWrappedBlock(state)

    let transform = removedAllWrappedBlockState
      .transform()
      .moveTo(selection)

    const currentNode = state.blocks.first()
    if (opts.condition(currentNode)) {
      transform = transform.wrapBlock(opts.type)
    }

    onChange(transform.apply())
  }

  /**
   * Return the plugin.
   *
   * @type {Object}
   */

  return {
    onSelect,
    onKeyDown,
    schema: getSchema()
  }
}

/**
 * Export.
 *
 * @type {Function}
 */

export default AutoWrapBlock
