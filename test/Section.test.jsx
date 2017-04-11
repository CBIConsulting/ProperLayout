import React from 'react';
import { shallow } from 'enzyme';
import Section from '../src/components/Section';

describe('<Section />', () => {
	const wrapper = shallow(<Section />);

	it("returns a <div>", () => {
		expect(wrapper.is('div')).toBe(true);
	});

	it("has class='section'", () => {
		expect(wrapper.hasClass('section')).toBe(true);
	});

	it("has key='section--*'", () => {
		expect(wrapper.key()).toMatch(/^section--[\w-]+$/);
	});
});
