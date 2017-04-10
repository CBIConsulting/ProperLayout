import React, { Component } from 'react';
import Section from './Section';

function Row(Section) {
	return class Row extends Component {
		componentDidMount() {
			console.warn(
				'You are using <' + this.constructor.name + '> component.\n' +
				'<' + this.constructor.name + '> is deprecated and might cease to exist in future versions of ProperLayout.\n' +
				'We reacomend to use <Section> instead, which will work with the same props.'
			);
		}

		render() {
			return (
				<Section {...this.props} />
			);
		}
	};
}

export default Row(Section);
