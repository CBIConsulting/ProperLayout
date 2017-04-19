import Section from './Section';

class Row extends Section {
	componentWillMount() {
		console.warn(
			'You are using <' + this.constructor.name + '> component.\n' +
			'<' + this.constructor.name + '> is deprecated and might cease to exist in future versions of ProperLayout.\n' +
			'We reacomend to use <Section> instead, which will work with the same props.'
		);

		super.componentWillMount();
	}
}

export default Row;
