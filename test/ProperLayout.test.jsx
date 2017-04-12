'use strict';

import React from 'react';
import { mount, render } from 'enzyme';
import Layout from '../src/components/Layout';
import Section from '../src/components/Section';
// import Col from '../src/components/Col';
// import Row from '../src/components/Row';

describe("Mounted Simple Layout with Two Sections", () => {
	const wrapper = mount(
		<Layout>
			<Section />
			<Section />
		</Layout>
	);
	const sections = wrapper.children();
	const children = wrapper.state('children');

	it("should Layout.props.children should be length 2", () => {
		expect(children.length).toBe(2);
	});

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
			// expect(node.prop('size')).toBe('50%');
			expect(node.mount().state('width')).toBe('50%');
		});
	});
});
