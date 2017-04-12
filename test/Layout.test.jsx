'use strict';

import React from 'react';
import { shallow, mount } from 'enzyme';
import Layout from '../src/components/Layout';

describe('Shallow <Layout />', () => {
	const wrapper = shallow(<Layout />);

	it("returns a <div>", () => {
		expect(wrapper.is('div')).toBe(true);
	});

	it("has class='layout'", () => {
		expect(wrapper.hasClass('layout')).toBe(true);
	});

	it("has key='layout--*'", () => {
		expect(wrapper.key()).toMatch(/^layout--[\w-]+$/);
	});
});

describe("Mounted <Layout />", () => {
	const wrapper = mount(<Layout />);

	it("has props.type='columns'", () => {
		expect(wrapper.prop('type')).toBe('columns');
	});

	it("has props.mode='default'", () => {
		expect(wrapper.prop('mode')).toBe('default');
	});

	it("has props.direction='default'", () => {
		expect(wrapper.prop('direction')).toBe('default');
	});

	it("has state.key='layout--*'", () => {
		expect(wrapper.state('key')).toMatch(/^layout--[\w-]+$/);
	});

	it("has state.className='layout columns'", () => {
		expect(wrapper.state('className')).toBe('layout columns');
	});

	it("has state.children=undefined", () => {
		expect(wrapper.state('children')).toBe(undefined);
	});

	it("has state.isChildFixed=false", () => {
		expect(wrapper.state('isChildFixed')).toBe(false);
	});

	it("has state.adjustTimeout=null", () => {
		expect(wrapper.state('adjustTimeout')).toBe(null);
	});

	it("has class='layout columns'", () => {
		expect(wrapper.hasClass('layout')).toBe(true);
		expect(wrapper.hasClass('columns')).toBe(true);
	});
});

describe("Mounted <Layout type='columns' />", () => {
	const wrapper = mount(<Layout type='columns' />);

	it("has props.type='columns'", () => {
		expect(wrapper.prop('type')).toBe('columns');
	});

	it("has state.className='layout columns'", () => {
		expect(wrapper.state('className')).toBe('layout columns');
	});

	it("has class='layout columns'", () => {
		expect(wrapper.hasClass('layout')).toBe(true);
		expect(wrapper.hasClass('columns')).toBe(true);
	});
});

describe("Mounted <Layout type='rows' />", () => {
	const wrapper = mount(<Layout type='rows' />);

	it("has props.type='rows'", () => {
		expect(wrapper.prop('type')).toBe('rows');
	});

	it("has state.className='layout rows'", () => {
		expect(wrapper.state('className')).toBe('layout rows');
	});

	it("has class='layout rows'", () => {
		expect(wrapper.hasClass('layout')).toBe(true);
		expect(wrapper.hasClass('rows')).toBe(true);
	});
});

describe("Mounter <Layout mode='spaced' />", () => {
	const wrapper = mount(<Layout mode='spaced' />);

	it("has props.mode='spaced'", () => {
		expect(wrapper.prop('mode')).toBe('spaced');
	});

	it("should have state.className='layout columns spaced'", () => {
		expect(wrapper.state('className')).toBe('layout columns spaced');
	});

	it("should have class='layout columns spaced'", () => {
		expect(wrapper.hasClass('layout')).toBe(true);
		expect(wrapper.hasClass('columns')).toBe(true);
		expect(wrapper.hasClass('spaced')).toBe(true);
	});
});

describe("Mounter <Layout direction='reverse'", () => {
	const wrapper = mount(<Layout direction='reverse' />);

	it("should have props.direction='reverse'", () => {
		expect(wrapper.prop('direction')).toBe('reverse');
	});

	it("should have state.className='layout columns reverse'", () => {
		expect(wrapper.state('className')).toBe('layout columns reverse');
	});

	it("should have class='layout columns reverse'", () => {
		expect(wrapper.hasClass('layout')).toBe(true);
		expect(wrapper.hasClass('columns')).toBe(true);
		expect(wrapper.hasClass('reverse')).toBe(true);
	});
});
