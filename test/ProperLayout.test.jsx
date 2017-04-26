'use strict';

import React from 'react';
import { mount } from 'enzyme';
import { Layout, Section, Row, Col } from '../src/ProperLayout';
import '../src/styles/main.scss';

describe('ProperLayout', () => {
	let main = document.createElement('div');
	main.id = 'main';
	document.body.appendChild(main);

	describe("mounted Simple Layout:", () => {
		let wrapper, sections, firstSection, secondSection;

		beforeEach(() => {
			wrapper = mount(
				<Layout>
					<Section />
					<Section />
				</Layout>,
				{
					attachTo: main
				}
			);

			sections = wrapper.children();
			firstSection = wrapper.childAt(0);
			secondSection = wrapper.childAt(1);
		});

		it("should render two inner Section divs", () => {
			expect(sections.length).to.equal(2);

			sections.forEach(node => {
				expect(node.length).to.equal(1);
				expect(node.find(Section).exists()).to.equal(true);
				expect(node.find('div').exists()).to.equal(true);
			});
		});

		// props -> type, mode, position, size

		it("each Section should have props.type='columns'", () => {
			sections.forEach(section => {
				expect(section.node.props.type).to.equal('columns');
			});
		});

		it("each Section should have props.mode='default'", () => {
			sections.forEach(section => {
				expect(section.node.props.mode).to.equal('default');
			});
		});

		it("first Section should have props.position='0%'", () => {
			expect(firstSection.node.props.position).to.equal('0%');
		});

		it("second Section should have props.position='50%'", () => {
			expect(secondSection.node.props.position).to.equal('50%');
		});

		it("each Section should have props.size='50%'", () => {
			sections.forEach(section => {
				expect(section.node.props.size).to.equal('50%');
			});
		});

		// state -> width, height

		it("each Section should have state.width='50%'", () => {
			sections.forEach(section => {
				expect(section.node.state.width).to.equal('50%');
			});
		});

		it("each Section should have state.height='100%'", () => {
			sections.forEach(section => {
				expect(section.node.state.height).to.equal('100%');
			});
		});

		// styles -> width, height, left

		it("each Section should have style.width='50%'", () => {
			sections.forEach(section => {
				let styles = section.find('div.section').node.style;

				expect(styles.width).to.equal('50%');
			});
		});

		it("each Section should have style.height='100%'", () => {
			sections.forEach(section => {
				let styles = section.find('div.section').node.style;

				expect(styles.height).to.equal('100%');
			});
		});

		it("first Section should have style.left='0%'", () => {
			let styles = firstSection.find('div.section').node.style;

			expect(styles.left).to.equal('0%');
		});

		it("second Section should have style.left='50%'", () => {
			let styles = secondSection.find('div.section').node.style;

			expect(styles.left).to.equal('50%');
		});
	});

	describe("mounted Simple Layout with type='rows':", () => {
		let wrapper, sections, firstSection, secondSection;

		beforeEach(() => {
			wrapper = mount(
				<Layout type='rows'>
					<Section />
					<Section />
				</Layout>,
				{
					attachTo: main
				}
			);

			sections = wrapper.children();
			firstSection = wrapper.childAt(0);
			secondSection = wrapper.childAt(1);
		});

		// props -> type, size, position

		it("each Section should have props.type='rows'", () => {
			sections.forEach(section => {
				expect(section.node.props.type).to.equal('rows');
			});
		});

		it("each Section should have props.size='50%'", () => {
			sections.forEach(section => {
				expect(section.node.props.size).to.equal('50%');
			});
		});

		it("first Section should have props.position='0%'", () => {
			expect(firstSection.node.props.position).to.equal('0%');
		});

		it("second Section should have props.position='50%'", () => {
			expect(secondSection.node.props.position).to.equal('50%');
		});

		// state -> width, height

		it("each Section should have state.width='100%'", () => {
			sections.forEach(section => {
				expect(section.node.state.width).to.equal('100%');
			});
		});

		it("each Section should have state.height='50%'", () => {
			sections.forEach(section => {
				expect(section.node.state.height).to.equal('50%');
			});
		});

		// styles -> width, height, top

		it("each Section should have style.width='100%'", () => {
			sections.forEach(section => {
				let styles = section.find('div.section').node.style;

				expect(styles.width).to.equal('100%');
			});
		});

		it("each Section should have style.height='50%'", () => {
			sections.forEach(section => {
				let styles = section.find('div.section').node.style;

				expect(styles.height).to.equal('50%');
			});
		});

		it("first Section should have style.top='0%'", () => {
			let styles = firstSection.find('div.section').node.style;

			expect(styles.top).to.equal('0%');
		});

		it("second Section should have style.top='50%'", () => {
			let styles = secondSection.find('div.section').node.style;

			expect(styles.top).to.equal('50%');
		});
	});

	describe("mounted Simple Layout with mode='spaced':", () => {
		let wrapper, sections;

		beforeEach(() => {
			wrapper = mount(
				<Layout mode='spaced'>
					<Section />
					<Section />
				</Layout>,
				{
					attachTo: main
				}
			);

			sections = wrapper.children();
		});

		// props -> mode

		it("each Section should have props.mode='spaced'", () => {
			sections.forEach(section => {
				expect(section.node.props.mode).to.equal('spaced');
			});
		});

		// state -> width, height

		it("each Section should have state.width='calc(50% - 16px)'", () => {
			sections.forEach(section => {
				expect(section.node.state.width).to.equal('calc(50% - 16px)');
			});
		});

		it("each Section should have state.height='calc(100% - 32px)'", () => {
			sections.forEach(section => {
				expect(section.node.state.height).to.equal('calc(100% - 32px)');
			});
		});

		// styles -> width, height, margin

		it("each Section should have style.width='calc(50% - 16px)'", () => {
			sections.forEach(section => {
				let styles = section.find('div.section').node.style;

				expect(styles.width).to.equal('calc(50% - 16px)');
			});
		});

		it("each Section should have style.height='calc(100% - 32px)'", () => {
			sections.forEach(section => {
				let styles = section.find('div.section').node.style;

				expect(styles.height).to.equal('calc(100% - 32px)');
			});
		});

		it("each Section should have style.margin='16px 8px'", () => {
			sections.forEach(section => {
				let node = section.find('div.section').node;
				let styles = window.getComputedStyle(node);

				expect(styles.margin).to.equal('16px 8px');
			});
		});
	});

	describe("mounted Simple Layout width type='rows' and mode='spaced'", () => {
		let wrapper, sections;

		beforeEach(() => {
			wrapper = mount(
				<Layout type='rows' mode='spaced'>
					<Section />
					<Section />
				</Layout>,
				{
					attachTo: main
				}
			);

			sections = wrapper.children();
		});

		// state -> width, height

		it("each Section should have state.width='calc(100% - 16px)'", () => {
			sections.forEach(section => {
				expect(section.node.state.width).to.equal('calc(100% - 16px)');
			});
		});

		it("each Section should have state.height='calc(50% - 32px)'", () => {
			sections.forEach(section => {
				expect(section.node.state.height).to.equal('calc(50% - 32px)');
			});
		});

		// styles -> width, height

		it("each Section should have style.width='calc(100% - 16px)'", () => {
			sections.forEach(section => {
				let styles = section.find('div.section').node.style;

				expect(styles.width).to.equal('calc(100% - 16px)');
			});
		});

		it("each Section should have style.height='calc(50% - 32px)'", () => {
			sections.forEach(section => {
				let styles = section.find('div.section').node.style;

				expect(styles.height).to.equal('calc(50% - 32px)');
			});
		});
	});

	describe("mounted Simple Layout with Cols", () => {
		let wrapper, cols, firstCol, secondCol;

		beforeEach(() => {
			wrapper = mount(
				<Layout>
					<Col />
					<Col />
				</Layout>,
				{
					attachTo: main
				}
			);

			cols = wrapper.children();
			firstCol = wrapper.childAt(0);
			secondCol = wrapper.childAt(1);
		});

		// props -> type, mode, position, size

		it("each Col should have props.type='columns'", () => {
			cols.forEach(col => {
				expect(col.node.props.type).to.equal('columns');
			});
		});

		it ("each Col should have props.mode='default'", () => {
			cols.forEach(col => {
				expect(col.node.props.mode).to.equal('default');
			});
		});

		it("first Col should have props.position='0%'", () => {
			expect(firstCol.node.props.position).to.equal('0%');
		});

		it("second Col should have props.positoin='50%'", () => {
			expect(secondCol.node.props.position).to.equal('50%');
		});

		it("each Col should have props.size='50%'", () => {
			cols.forEach(col => {
				expect(col.node.props.size).to.equal('50%');
			});
		});

		// state -> width, height

		it("each Col should have state.width='50%'", () => {
			cols.forEach(col => {
				expect(col.node.state.width).to.equal('50%');
			});
		});

		it("each Col should have state.height='100%'", () => {
			cols.forEach(col => {
				expect(col.node.state.height).to.equal('100%');
			});
		});

		// style -> width, height, left

		it("each Col should have style.width='50%'", () => {
			cols.forEach(col => {
				let styles = col.find('div.section').node.style;

				expect(styles.width).to.equal('50%');
			});
		});

		it("each Col should have style.height='100%'", () => {
			cols.forEach(col => {
				let styles = col.find('div.section').node.style;

				expect(styles.height).to.equal('100%');
			});
		});

		it("firsCol should have style.left='0%'", () => {
			let styles = firstCol.find('div.section').node.style;

			expect(styles.left).to.equal('0%');
		});

		it("secondCol should have style.left='50%'", () => {
			let styles = secondCol.find('div.section').node.style;

			expect(styles.left).to.equal('50%');
		});
	});

	describe("mounted Simple Layout with Cols", () => {
		let wrapper, rows, firstRow, secondRow;

		beforeEach(() => {
			wrapper = mount(
				<Layout type='rows'>
					<Row />
					<Row />
				</Layout>,
				{
					attachTo: main
				}
			);

			rows = wrapper.children();
			firstRow = wrapper.childAt(0);
			secondRow = wrapper.childAt(1);
		});

		// props -> type, mode, position, size

		it("each Col should have props.type='rows'", () => {
			rows.forEach(row => {
				expect(row.node.props.type).to.equal('rows');
			});
		});

		it ("each Col should have props.mode='default'", () => {
			rows.forEach(row => {
				expect(row.node.props.mode).to.equal('default');
			});
		});

		it("first Col should have props.position='0%'", () => {
			expect(firstRow.node.props.position).to.equal('0%');
		});

		it("second Col should have props.position='50%'", () => {
			expect(secondRow.node.props.position).to.equal('50%');
		});

		it("each Col should have props.size='50%'", () => {
			rows.forEach(row => {
				expect(row.node.props.size).to.equal('50%');
			});
		});

		// state -> width, height

		it("each Col should have state.width='100%'", () => {
			rows.forEach(row => {
				expect(row.node.state.width).to.equal('100%');
			});
		});

		it("each Col should have state.height='50%'", () => {
			rows.forEach(row => {
				expect(row.node.state.height).to.equal('50%');
			});
		});

		// style -> width, height, left

		it("each Col should have style.width='100%'", () => {
			rows.forEach(row => {
				let styles = row.find('div.section').node.style;

				expect(styles.width).to.equal('100%');
			});
		});

		it("each Col should have style.height='50%'", () => {
			rows.forEach(row => {
				let styles = row.find('div.section').node.style;

				expect(styles.height).to.equal('50%');
			});
		});

		it("firsCol should have style.top='0%'", () => {
			let styles = firstRow.find('div.section').node.style;

			expect(styles.top).to.equal('0%');
		});

		it("secondCol should have style.top='50%'", () => {
			let styles = secondRow.find('div.section').node.style;

			expect(styles.top).to.equal('50%');
		});
	});
});
