import React, { Component, PropTypes, Children } from 'react';
import shortid from 'shortid';

class Layout extends Component {
	constructor(props) {
		super(props);

		this.state = {
			key: 'layout--' + shortid.generate(),
			height: null,
			width: null,
			parent: null,
			children: null,
			mode: this.props.mode || 'default',
			type: this.props.type || 'row',
			direction: this.props.direction || 'default',
			wrap: this.props.wrap || 'nowrap',
			justifyContent: this.props.justifyContent || 'flex-start',
			alignItems: this.props.alignItems || 'flex-start',
			alignContent: this.props.alignContent || 'flex-start',
			className: 'layout'
		};

		this.computeClasses = this.computeClasses.bind(this);
		this.computeChildren = this.computeChildren.bind(this);
		this.handleResize = this.handleResize.bind(this);
	}

	componentDidMount() {
		let parent = this.node.parentNode;

		// if (this.state.width !== parent.offsetWidth || this.state.height !== parent.offsetHeight) {
		console.log('layout dimensions changed');

		this.setState(() => ({
			...this.state,
			width: parent.offsetWidth,
			height: parent.offsetHeight,
			children: this.computeChildren(parent.offsetWidth, parent.offsetHeight),
			className: this.computeClasses()
		}));

		window.addEventListener('resize', this.handleResize);
		// }
	}

	handleResize(e) {
		let parent = this.node.parentNode;

		this.setState(() => ({
			...this.state,
			width: parent.offsetWidth,
			height: parent.offsetHeight,
			children: this.computeChildren(parent.offsetWidth, parent.offsetHeight)
		}));
	}

	computeClasses() {
		let className = this.state.className;

		if (this.state.type === 'row') {
			className += ' row';
		} else if (this.state.type === 'column') {
			className += ' column';
		}

		return className;
	}

	computeChildren(parentWidth, parentHeight) {
		let count = Children.count(this.props.children);
		let children = Children.map(this.props.children, (child, index) => {
			let props = {
				...child.props,
				type: this.state.type
			};

			let width = (parentWidth / count).toFixed(2);
			let height = (parentHeight / count).toFixed(2);

			if (this.state.type === 'row') {
				props.height = parentHeight;
				if (index === count - 1) {
					props.width = parentWidth - width * (count - 1);
				} else {
					props.width = width;
				}
			} else if (this.state.type === 'column') {
				if (index === count - 1) {
					props.height = parentHeight - height * (count - 1);
				} else {
					props.height = height;
				}
				props.width = parentWidth;
			}

			return React.cloneElement(child, props);
		});

		return children;
	}

	render () {
		let styles = {
			width: '100%',
			height: '100%',
			margin: 0
		};

		console.log('width:', this.state.width, 'height:', this.state.height);

		return (
			<div
				ref={node => this.node = node}
				className={this.state.className}
				style={styles}>
				{this.state.children}
			</div>
		);
	}
}

export default Layout;
