import React, { Component } from 'react';

class Button extends Component {
	onClick (e) {
		let layout = document.querySelector('#main > .layout');
		console.log('current width:', layout.offsetWidth, 'current height:', layout.offsetHeight);
	}

	render () {
		return (
			<div id='button' onClick={this.onClick}>
				Check dimensions
			</div>
		);
	}
}

export default Button;
