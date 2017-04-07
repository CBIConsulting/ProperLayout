'use strict';

import React, { Component, PropTypes } from 'react';
import shortid from 'shortid';

class Section extends Component {
	constructor(props) {
		super(props);

		this.state = {
			key: 'section--' + shortid.generate(),
			className: 'section'
		};

		this.warnDeprecatedProps = this.warnDeprecatedProps.bind(this);
	}

	componentDidMount() {
		this.warnDeprecatedProps();
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
			top: this.props.top,
			left: this.props.left,
			border: this.props.mode === 'default' ? '1px solid blue' : '1px dashed blue'
		};

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
	size: PropTypes.string
};

export default Section;