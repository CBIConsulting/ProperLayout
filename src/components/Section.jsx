'use strict'

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class Section extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      className: 'proper-section',
      width: null,
      height: null
    }

    this.evaluateClasses = this.evaluateClasses.bind(this)
    this.calculateDimensions = this.calculateDimensions.bind(this)
    this.warnDeprecatedProps = this.warnDeprecatedProps.bind(this)
  }

  componentWillMount () {
    this.warnDeprecatedProps()

    let {width, height} = this.calculateDimensions()

    this.setState(() => ({
      ...this.state,
      className: this.evaluateClasses(),
      width,
      height
    }))
  }

  componentWillReceiveProps (nextProps) {
    let {width, height} = this.calculateDimensions()

    this.setState(() => ({
      ...this.state,
      className: this.evaluateClasses(nextProps),
      width,
      height
    }))
  }

  evaluateClasses (props = this.props, state = this.state) {
    state = this.state.className.split(' ')
    props = props.className.split(' ')

    let newClasses = props.filter(x => x && state.indexOf(x) < 0)
    let remainClasses = state.filter(x => props.indexOf(x) >= 0 || x === 'proper-section')

    return remainClasses.concat(newClasses).join(' ')
  }

  calculateDimensions () {
    let size = this.props.size
    let type = this.props.type
    let mode = this.props.mode

    let width, height

    if (type === 'columns' && mode === 'default') {
      height = '100%'
      width = size
    } else if (type === 'columns' && mode === 'spaced') {
      height = 'calc(100% - 32px)'
      width = 'calc(' + size + ' - 16px)'
    } else if (type === 'rows' && mode === 'default') {
      height = size
      width = '100%'
    } else if (type === 'rows' && mode === 'spaced') {
      height = 'calc(' + size + ' - 32px)'
      width = 'calc(100% - 16px)'
    }

    return {width, height}
  }

  warnDeprecatedProps () {
    let props = this.props

    if (props.gravity) {
      console.warn(
        'You are using \'gravity\' prop in ' + this.constructor.name + '.\n' +
        'This prop is deprecated and might cease to exist in future versions of ProperLayout.\n' +
        'You might want to use instead a percent value for \'size\'.'
      )
    }

    if (props.width) {
      console.warn(
        'You are using \'width\' prop in <' + this.constructor.name + '>.\n' +
        'This prop is deprecated and might cease to exist in future versions of ProperLayout.\n' +
        'You might want to use instead a pixel value for \'size\'.'
      )
    }

    if (props.height) {
      console.warn(
        'You are using \'height\' prop in <' + this.constructor.name + '>.\n' +
        'This prop is deprecated and might cease to exist in future versions of ProperLayout.\n' +
        'You might want to use instead a pixel value for \'size\'.'
      )
    }
  }

  render () {
    let styles = {
      width: this.state.width,
      height: this.state.height
    }

    if (this.props.type === 'columns') {
      styles.left = this.props.position
    } else {
      styles.top = this.props.position
    }

    return (
      <div
        style={styles}
        className={this.state.className}>
        {this.props.children || this.props.index + 1}
      </div>
    )
  }
}

Section.defaultProps = {
  type: 'columns',
  mode: 'default',
  position: '0%',
  className: '',
  index: 0
}

Section.propTypes = {
  type: PropTypes.oneOf(['columns', 'rows']),
  mode: PropTypes.oneOf(['default', 'spaced']),
  size: PropTypes.string,
  position: PropTypes.string,
  gravity: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  index: PropTypes.number
}

export default Section
