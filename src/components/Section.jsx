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
