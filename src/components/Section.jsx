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

		this.computeClasses = this.computeClasses.bind(this);
	}

	// componentDidMount() {
	// 	this.setState(() => ({
	// 		height: this.props.height,
	// 		width: this.props.width
	// 	}));
	// }

	// componentWillReceiveProps(nextProps) {
	// 	if (this.props.width !== nextProps.width || this.props.height !== nextProps.height) {
	// 		this.setState(() => ({
	// 			...this.state,
	// 			width: nextProps.width,
	// 			height: nextProps.height
	// 		}));
	// 	}
	// }

	computeClasses() {
		let className = this.state.className;

		if (this.state.direction === 'row') {
			className += ' row';
		} else if (this.state.direction === 'column') {
			className += ' column';
		}

		return className;
	}

	render () {
		let styles = {
			height: this.props.height + 'px',
			width: this.props.width + 'px',
			top: this.props.top + 'px',
			left: this.props.left + 'px',
			border: '1px solid blue'
		};

		return (
			<div
				key={this.state.key}
				id={this.state.key}
				style={styles}
				className={this.state.className}>
					{/*this.state.key*/}
					{this.props.children}
			</div>
		);
	}
}

export default Section;
