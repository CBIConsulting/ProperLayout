'use strict';

import React from 'react';
import { mount } from 'enzyme';
import { Layout, Section } from '../src/ProperLayout';
import '../src/styles/main.scss';

describe("Mounted Simple Layout with Two Sections", () => {
	const wrapper = mount(
		<Layout>
			<Section />
			<Section />
		</Layout>
	);

	const sections = wrapper.find(Section);
	// const instance = wrapper.instance();


	it("should render two inner Section divs", () => {
		expect(sections.length).toBe(2);
		sections.forEach(node => {
			expect(node.length).toBe(1);
			expect(node.find(Section).exists()).toBe(true);
			expect(node.find('div').exists()).toBe(true);
		});
	});

	it("should have two inner Sections with width='50%'", () => {
		sections.forEach(node => {
			// console.log(node.getDOMNode().offsetHeight);
			expect(node.props().position).toBe('50%');
		});
	});
});
