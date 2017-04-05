import React, { Component, PropTypes, Children } from 'react';
import shortid from 'shortid';

class Layout extends Component {
	constructor(props) {
		super(props);

		this.state = {
			key: 'layout--' + shortid.generate(),
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
	}

	componentDidMount() {
		this.setState(() => ({
			...this.state,
			className: this.computeClasses(this.state.className),
			children: this.computeChildren(this.state.type)
		}));

		window.addEventListener('resize', e => {
			this.setState(() => ({
				...this.state,
				children: this.computeChildren(this.state.type)
			}));
		});
	}

	computeClasses(className) {
		if (this.state.type === 'row') {
			className += ' row';
		} else {
			className += ' column';
		}

		if (this.state.direction === 'reverse') {
			className += ' reverse';
		}

		if (this.state.mode === 'spaced') {
			className += ' spaced';
		}

		return className;
	}

	computeChildren(type) {
		let counter = 0;
		let totalSpace = type === 'row' ? this.node.offsetWidth : this.node.offsetHeight;
		let freeSpace = totalSpace;

		// Calculating space variables
		Children.forEach(this.props.children, (child, index) => {
			let width = child.props.width;
			let height = child.props.height;

			if (type === 'row') {
				if (!width) {
					counter++;
				} else {
					if (/px/.test(width)) {
						freeSpace -= parseFloat(width);
					} else if (/%/.test(width)) {
						freeSpace -= (totalSpace / 100) * parseFloat(width);
					}
				}
			} else if (type === 'column') {
				if (!height) {
					counter++;
				} else {
					if (/px/.test(height)) {
						freeSpace -= parseFloat(height);
					} else if (/%/.test(height)) {
						freeSpace -= (totalSpace / 100) * parseFloat(height);
					}
				}
			}
		});

		let size = parseFloat((((freeSpace * 100) / totalSpace) / counter).toFixed(2));

		// Updating children props for positioning
		let nextPosition = 0;
		return Children.map(this.props.children, (child, index) => {
			let props = {
				...child.props,
				type: this.state.type,
				mode: this.state.mode,
				index: index
			};


			if (type === 'row') {
				if (!child.props.width) {
					if (this.state.mode === 'spaced') {
						props.height = 'calc(100% - 32px)';
						props.width = 'calc(' + size + '% - 16px)';
					} else {
						props.height = '100%';
						props.width = size + '%';
					}
					props.left = nextPosition + '%';
					nextPosition += size;
				} else {
					props.height = '100%';
					props.left = nextPosition + '%';
					if (/px/.test(props.width)) {
						nextPosition += parseFloat(((parseFloat(props.width) * 100) / totalSpace).toFixed(2));
					} else if (/%/.test(props.width)) {
						nextPosition += parseFloat(props.width);
					}
				}
			} else if (type === 'column') {
				if (!child.props.height) {
					props.top = nextPosition + '%';
					nextPosition += size;
					if (this.state.mode === 'spaced') {
						props.height = 'calc(' + size + '% - 32px)';
						props.width = 'calc(100% - 16px)';
					} else {
						props.width = '100%';
						props.height = size + '%';
					}
				} else {
					props.top = nextPosition + '%';
					if (/px/.test(props.height)) {
						nextPosition += parseFloat(((parseFloat(props.height) * 100) / totalSpace).toFixed(2));
						if (this.state.mode === 'spaced') {
							props.width = 'calc(100% - 16px)';
							props.height = 'calc(' + props.height + ' - 32px)';
						} else {
							props.width = '100%';
						}
					} else if (/%/.test(props.height)) {
						nextPosition += parseFloat(parseFloat(props.height).toFixed(2));
						if (this.state.mode === 'spaced') {
							props.width = 'calc(100% - 16px)';
							props.height = 'calc(' + props.height + ' - 32px)';
						} else {
							props.width = '100%';
						}
					}
				}
			}

			console.log('next position:', nextPosition)

			return React.cloneElement(child, props);
		});
	}

	render () {
		let styles = {};

		return (
			<div
				key={this.state.key}
				ref={node => this.node = node}
				className={this.state.className}
				style={styles}>
					{this.state.children}
			</div>
		);
	}
}

export default Layout;
