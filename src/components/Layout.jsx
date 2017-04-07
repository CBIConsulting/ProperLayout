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
			isChildFixed: null
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
	}

	// Handles page resizing
	handleResize() {
		if (this.state.isChildFixed) {
			this.setState(() => ({
				...this.state,
				children: this.updateChildren()
			}));
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
		let autoSize = parseFloat((freeSpace * 100 / totalSpace / counter).toFixed(2));

		return { autoSize, totalSpace	};
	}

	// Updating children props for positioning
	updateChildren() {
		let { autoSize, totalSpace } = this.calculateAutoSize();
		let nextPosition = 0;
		let type = this.props.type;

		return Children.map(this.props.children, (child, index) => {
			let props = this.evaluateDeprecatedProps(child);

			props.type = this.props.type;
			props.mode = this.props.mode;
			props.index = index;

			if (type === 'columns') {
				if (!props.size) {
					props.position = nextPosition + '%';
					nextPosition += autoSize;

					if (this.props.mode === 'spaced') {
						props.height = 'calc(100% - 32px)';
						props.width = 'calc(' + autoSize + '% - 16px)';
					} else {
						props.height = '100%';
						props.width = autoSize + '%';
					}
				} else {
					let sizeType = this.evaluateSizeType(props.size);
					let parsedSize = parseFloat(props.size);
					props.position = nextPosition + '%';

					if (sizeType === 'pixel') {
						nextPosition += parseFloat((parsedSize * 100 / totalSpace).toFixed(2));

						if (this.props.mode === 'spaced') {
							props.width = 'calc(' + props.size + ' - 16px)';
							props.height = 'calc(100% - 32px)';
						} else {
							props.width = props.size;
							props.height = '100%';
						}
					} else if (sizeType === 'percent') {
						nextPosition += parseFloat(parsedSize.toFixed(2));

						if (this.props.mode === 'spaced') {
							props.width = 'calc(' + props.size + ' - 16px)';
							props.height = 'calc(100% - 32px)';
						} else {
							props.width = props.size;
							props.height = '100%';
						}
					}
				}
			} else if (type === 'rows') {
				if (!props.size) {
					props.position = nextPosition + '%';
					nextPosition += autoSize;

					if (this.props.mode === 'spaced') {
						props.width = 'calc(100% - 16px)';
						props.height = 'calc(' + autoSize + '% - 32px)';
					} else {
						props.width = '100%';
						props.height = autoSize + '%';
					}
				} else {
					let sizeType = this.evaluateSizeType(props.size);
					let parsedSize = parseFloat(props.size);
					props.position = nextPosition + '%';

					if (sizeType === 'pixel') {
						nextPosition += parseFloat((parsedSize * 100 / totalSpace).toFixed(2));

						if (this.props.mode === 'spaced') {
							props.width = 'calc(100% - 16px)';
							props.height = 'calc(' + props.size + ' - 32px)';
						} else {
							props.width = '100%';
							props.height = props.size;
						}
					} else if (sizeType === 'percent') {
						nextPosition += parseFloat(parsedSize.toFixed(2));

						if (this.props.mode === 'spaced') {
							props.width = 'calc(100% - 16px)';
							props.height = 'calc(' + props.size + ' - 32px)';
						} else {
							props.width = '100%';
							props.height = props.size;
						}
					}
				}
			}

			return React.cloneElement(child, props);
		});
	}

	render() {
		return (
			<div
				key={this.state.key}
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
	direction: 'default',
	justify: 'flex-start'
};

Layout.propTypes = {
	type: PropTypes.oneOf(['columns', 'rows']),
	mode: PropTypes.oneOf(['default', 'spaced']),
	direction: PropTypes.oneOf(['default', 'reverse']),
	justify: PropTypes.oneOf(['flex-start', 'flex-end', 'center', 'space-between', 'space-around'])
};

export default Layout;
