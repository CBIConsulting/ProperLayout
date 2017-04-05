import React, { Component, PropTypes } from 'react';
import shortid from 'shortid';

class Section extends Component {
	constructor(props) {
		super(props);

		this.state = {
			key: this.props.type + '--' + shortid.generate(),
			mode: this.props.mode || 'default',
			className: 'section'
		};

		// this.computeClasses = this.computeClasses.bind(this);
	}

	// computeClasses() {
	// 	let className = this.state.className;
	//
	// 	if (this.state.direction === 'row') {
	// 		className += ' row';
	// 	} else if (this.state.direction === 'column') {
	// 		className += ' column';
	// 	}
	//
	// 	return className;
	// }

	render () {
		let styles = {
			height: this.props.height,
			width: this.props.width,
			top: this.props.top,
			left: this.props.left,
			border: '1px solid blue'
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

export default Section;
