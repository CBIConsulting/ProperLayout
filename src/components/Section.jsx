'use strict';

import React, { Component, PropTypes } from 'react';
import shortid from 'shortid';

class Section extends Component {
	constructor(props) {
		super(props);

		this.state = {
			key: 'section--' + shortid.generate(),
			className: 'section',
			width: null,
			height: null
		};

		this.calculateDimensions = this.calculateDimensions.bind(this);
		this.warnDeprecatedProps = this.warnDeprecatedProps.bind(this);
	}

	componentDidMount() {
		this.warnDeprecatedProps();

		let { width, height } = this.calculateDimensions();

		this.setState(() => ({
			...this.state,
			width,
			height
		}));
	}

	componentWillReceiveProps(nextProps) {
		// call to function that will calculate width and height
		// then setState with those props
		this.setState(() => ({
			...this.state,
		}));
	}

	calculateDimensions() {
		let size = this.props.size;
		let type = this.props.type;
		let mode = this.props.mode;

		let width, height;

		if (type === 'columns' && mode === 'default') {
			height = '100%';
			width = size;
		} else if (type === 'columns' && mode === 'spaced') {
			height = 'calc(100% - 32px)';
			width = 'calc(' + size + ' - 16px)';
		} else if (type === 'rows' && mode === 'default') {
			height = size;
			width = '100%';
		} else if (type === 'rows' && mode === 'spaced') {
			height = 'calc(' + size + ' - 32px)';
			width = 'calc(100% - 16px)';
		}

		return { width, height };
	}

	warnDeprecatedProps() {
		let props = this.props;

		if (props.gravity) {
			console.warn(
				"You are using 'gravity' prop in " + this.constructor.name + ".\n" +
				"This prop is deprecated and might cease to exist in future versions of ProperLayout.\n" +
				"You might want to use instead a percent value for 'size'."
			);
		}

		if (props.width) {
			console.warn(
				"You are using 'width' prop in <" + this.constructor.name + ">.\n" +
				"This prop is deprecated and might cease to exist in future versions of ProperLayout.\n" +
				"You might want to use instead a pixel value for 'size'."
			);
		}

		if (props.height) {
			console.warn(
				"You are using 'height' prop in <" + this.constructor.name + ">.\n" +
				"This prop is deprecated and might cease to exist in future versions of ProperLayout.\n" +
				"You might want to use instead a pixel value for 'size'."
			);
		}
	}

	render() {
		let styles = {
			height: this.props.height,
			width: this.props.width,
			border: this.props.mode === 'default' ? '1px solid blue' : '1px dashed blue'
		};

		if (this.props.type === 'columns') {
			styles.left = this.props.position;
		} else {
			styles.top = this.props.position;
		}

		return (
			<div
				key={this.state.key}
				style={styles}
				className={this.state.className}>
					{this.props.children}
					{this.props.index + 1}
			</div>
		);
	}
}

Section.propTypes = {
	type: PropTypes.oneOf(['columns', 'rows']),
	mode: PropTypes.oneOf(['default', 'spaced']),
	size: PropTypes.string,
	position: PropTypes.string,
	gravity: PropTypes.number,
	width: PropTypes.number,
	height: PropTypes.number
};

export default Section;
