import Section from './Section';

class Row extends Section {
  componentWillMount() {
    console.warn('\nYou are using <' + this.constructor.name + '> component. ' + '<' + this.constructor.name + '> is deprecated and \nmight cease to exist in future versions of ProperLayout.\n' + 'We recommend to use <Section> instead, which will work with the same props.');

    super.componentWillMount();
  }
}

export default Row;
module.exports = exports['default'];