import React from 'react';
import { shallow } from 'enzyme';
import Layout from '../src/components/Layout';

describe('<Layout />', () => {
	const wrapper = shallow(<Layout />);

	it("is a <div>", () => {
		expect(wrapper.is('div')).toBe(true);
	});

	it("is a <div> with class='layout'", () => {
		expect(wrapper.is('div.layout')).toBe(true);
	});

	it("has key='layout--*'", () => {
		expect(wrapper.key()).toMatch(/^layout--[\w-]+$/);
	});
});
