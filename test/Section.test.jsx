'use strict';

import React from 'react';
import { shallow, mount } from 'enzyme';
import { Section } from '../src/ProperLayout';

describe('Shallow <Section />', () => {
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

describe("Mounted <Section />", () => {
	const wrapper = mount(<Section />);

	it("has props.type='columns'", () => {
		expect(wrapper.prop('type')).toBe('columns');
	});

	it("has props.mode='default'", () => {
		expect(wrapper.prop('mode')).toBe('default');
	});

	it("has props.index=0", () => {
		expect(wrapper.prop('index')).toBe(0);
	});

	it("has state.key='section--*'", () => {
		expect(wrapper.state('key')).toMatch(/^section--[\w-]+$/);
	});

	it("has state.className='section'", () => {
		expect(wrapper.state('className')).toBe('section');
	});

	it("has state.width=undefined", () => {
		expect(wrapper.state('width')).toBe(undefined);
	});

	it("has state.height='100%'", () => {
		expect(wrapper.state('height')).toBe('100%');
	});

	it("has class='section'", () => {
		expect(wrapper.hasClass('section')).toBe(true);
	});

	let styles = wrapper.find('div').prop('style');

	it("has style.width=undefined", () => {
		expect(styles.width).toBe(undefined);
	});

	it("has style.height='100%'", () => {
		expect(styles.height).toBe('100%');
	});

	it("has style.left='0%'", () => {
		expect(styles.left).toBe('0%');
	});
});

describe("Mounted <Section size='100px' />", () => {
	const wrapper = mount(<Section size='100px' />);

	it("has props.size='100px'", () => {
		expect(wrapper.prop('size')).toBe('100px');
	});

	it("has state.width='100px'", () => {
		expect(wrapper.state('width')).toBe('100px');
	});

	it("has state.height='100%'", () => {
		expect(wrapper.state('height')).toBe('100%');
	});

	let styles = wrapper.find('div').prop('style');

	it("has style.width='100px'", () => {
		expect(styles.width).toBe('100px');
	});

	it("has style.height='100%'", () => {
		expect(styles.height).toBe('100%');
	});
});

describe("Mounted <Section size='50%' />", () => {
	const wrapper = mount(<Section size='50%' />);

	it("has props.size='50%'", () => {
		expect(wrapper.prop('size')).toBe('50%');
	});

	it("has state.width='50%'", () => {
		expect(wrapper.state('width')).toBe('50%');
	});

	it("has state.height='100%'", () => {
		expect(wrapper.state('height')).toBe('100%');
	});

	let styles = wrapper.find('div').prop('style');

	it("has style.width='50%'", () => {
		expect(styles.width).toBe('50%');
	});

	it("has style.height='100%'", () => {
		expect(styles.height).toBe('100%');
	});
});
