import React from 'react';
import { shallow, mount } from 'enzyme';
import Layout from '../src/components/Layout';

describe('<Layout />', () => {
	const wrapper = shallow(<Layout />);

	it("returns a <div>", () => {
		expect(wrapper.is('div')).toBe(true);
	});

	it("is a <div> with class='layout'", () => {
		expect(wrapper.is('div.layout')).toBe(true);
	});

	it("has key='layout--*'", () => {
		expect(wrapper.key()).toMatch(/^layout--[\w-]+$/);
	});
});

describe("Mounted <Layout />", () => {
	const wrapper = mount(<Layout />);

	it("has state.key='layout--*'", () => {
		expect(wrapper.state('key')).toMatch(/^layout--[\w-]+$/);
	});

	it("has state.className='layout columns'", () => {
		expect(wrapper.state('className')).toMatch(/^layout\scolumns$/);
	});

	it("has state.children='undefined'", () => {
		expect(wrapper.state('children')).toBe(undefined);
	});

	it("has state.isChildFixed='false'", () => {
		expect(wrapper.state('isChildFixed')).toBe(false);
	});

	it("has state.adjustTimeout='null'", () => {
		expect(wrapper.state('adjustTimeout')).toBe(null);
	});

	it("has props.type='columns'", () => {
		expect(wrapper.prop('type')).toBe('columns');
	});

	it("has props.mode='default'", () => {
		expect(wrapper.prop('mode')).toBe('default');
	});

	it("has props.direction='default'", () => {
		expect(wrapper.prop('direction')).toBe('default');
	});

	it("has class='layout'", () => {
		expect(wrapper.hasClass('columns')).toBe(true);
		expect(wrapper.hasClass(''))
	});
});
