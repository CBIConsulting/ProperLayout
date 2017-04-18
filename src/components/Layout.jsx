'use strict';

import React, { Component, PropTypes, Children } from 'react';
import shortid from 'shortid';

class Layout extends Component {
	constructor(props) {
		super(props);

		this.state = {
			key: 'layout--' + shortid.generate(),
			className: 'layout',
			children: null,
			isChildFixed: null,
			adjustTimeout: null
		};

		this.evaluateClasses = this.evaluateClasses.bind(this);
		this.evaluateSizeType = this.evaluateSizeType.bind(this);
		this.evaluateDeprecatedProps = this.evaluateDeprecatedProps.bind(this);
		this.isChildFixed = this.isChildFixed.bind(this);
		this.calculateAutoSize = this.calculateAutoSize.bind(this);
		this.updateChildren = this.updateChildren.bind(this);
		this.handleResize = this.handleResize.bind(this);
	}

	componentDidMount() {
		// This needs to be done here because Layout should render once for
		// accesing its node and get dimensions to render children
		this.setState(() => ({
			...this.state,
			className: this.evaluateClasses(),
			children: this.updateChildren(),
			isChildFixed: this.isChildFixed()
		}));

		window.addEventListener('resize', this.handleResize);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize);
	}

	// Adds different CSS classes depending on what props were defined
	evaluateClasses() {
		let className = this.state.className;

		if (this.props.type === 'columns') {
			className += ' columns';
		} else {
			className += ' rows';
		}

		if (this.props.direction === 'reverse') {
			className += ' reverse';
		}

		if (this.props.mode === 'spaced') {
			className += ' spaced';
		}

		return className;
	}

	// Returns size type received in child props
	evaluateSizeType(size) {
		let pixel = /^\d+(?:\.\d+)?px$/;
		let percent = /^\d+(?:\.\d+)?%$/;

		if (pixel.test(size)) {
			return 'pixel';
		} else if (percent.test(size)) {
			return 'percent';
		}
	}

	// Evaluate child props to convert deprecated gravity, width, height to size
	evaluateDeprecatedProps(child) {
		let props = {...child.props};

		if (props.size) {
			return props;
		} else {
			if (props.width && this.props.type === 'columns') {
				props.size = parseFloat(props.width) + 'px';
			}

			if (props.height && this.props.type === 'rows') {
				props.size = parseFloat(props.height) + 'px';
			}

			if (props.gravity >= 0 && props.gravity <= 1) {
				props.size = 100 * props.gravity + '%';
			}

			return props;
		}
	}

	// Check if there is a child with fixed size
	// (this prevents re-rendering when all sections are responsive)
	isChildFixed() {
		if (Children.count(this.props.children)) {
			return Children.map(this.props.children, child => {
				let props = child.props;

				if (props.size && this.evaluateSizeType(props.size) == 'pixel') {
					return true;
				} else if (props.gravity === -1) {
					if (props.width || props.height) {
						return true;
					}
				} else {
					return false;
				}
			}).some(child => child);
		} else {
			return false;
		}
	}

	// Handles page resizing
	handleResize() {
		// Update children when at least one has fixed size
		if (this.state.isChildFixed) {
			this.setState(() => ({
				...this.state,
				children: this.updateChildren()
			}), () => {
				// Get last rendered values to readjust children
				let parent = this.props.type === 'columns'
					? this.node.offsetWidth
					: this.node.offsetHeight;
				let children = 0;

				this.node.childNodes.forEach(child => {
					children += this.props.type === 'columns'
					? child.offsetWidth
					: child.offsetHeight;
				});

				// Adjusting children with a timeout,
				// so it will update only the last time
				if (parent !== children) {
					clearTimeout(this.state.adjustTimeout);

					this.setState(() => ({
						...this.state,
						adjustTimeout: setTimeout(() => {
							this.setState(() => ({
								...this.state,
								children: this.updateChildren()
							}));
						}, 200)
					}));
				}
			});
		}
	}

	// Calculates and returns size for elements without custom sizes
	calculateAutoSize() {
		let counter = 0;
		let totalSpace = this.props.type === 'columns'
			? this.node.offsetWidth
			: this.node.offsetHeight;
		let freeSpace = totalSpace;

		Children.forEach(this.props.children, (child, index) => {
			let props = this.evaluateDeprecatedProps(child);
			let size = props.size;

			if (!size) {
				counter++;
			} else {
				let parsedSize = parseFloat(size);
				let sizeType = this.evaluateSizeType(size);

				if (sizeType === 'pixel') {
					freeSpace -= parsedSize;
				} else if (sizeType === 'percent') {
					freeSpace -= totalSpace / 100 * parsedSize;
				}
			}
		});

		// Setting size for elements without custom sizes
		// let autoSize = parseFloat((freeSpace * 100 / totalSpace / counter).toFixed(2));
		let autoSize = freeSpace * 100 / totalSpace / counter;

		// Avoid negative autoSizes so it wont push siblings over it
		if (autoSize < 0) {
			autoSize = 0;
		}

		return { autoSize, totalSpace	};
	}

	// Updating children props for positioning
	updateChildren() {
		let { autoSize, totalSpace } = this.calculateAutoSize();
		let nextPosition = 0;

		return Children.map(this.props.children, (child, index) => {
			let props = this.evaluateDeprecatedProps(child);

			props.type = this.props.type;
			props.mode = this.props.mode;
			props.index = index;

			if (props.size) {
				let sizeType = this.evaluateSizeType(props.size);
				let parsedSize = parseFloat(props.size);

				props.position = nextPosition + '%';

				if (sizeType === 'pixel') {
					// nextPosition += parseFloat((parsedSize * 100 / totalSpace).toFixed(2));
					nextPosition += parsedSize * 100 / totalSpace;

				} else if (sizeType === 'percent') {
					nextPosition += parsedSize;
				}
			} else {
				props.size = autoSize + '%';
				props.position = nextPosition + '%';

				nextPosition += autoSize;
			}

			return React.cloneElement(child, props);
		});
	}

	render() {
		return (
			<div
				key={this.state.key}
				style={{width: '100%', height: '100%'}}
				ref={node => this.node = node}
				className={this.state.className}>
					{this.state.children}
			</div>
		);
	}
}

Layout.defaultProps = {
	type: 'columns',
	mode: 'default',
	direction: 'default'
};

Layout.propTypes = {
	type: PropTypes.oneOf(['columns', 'rows']),
	mode: PropTypes.oneOf(['default', 'spaced']),
	direction: PropTypes.oneOf(['default', 'reverse'])
};

export default Layout;
