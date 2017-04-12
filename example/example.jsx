'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Layout, Section, Row, Col } from '../src/ProperLayout';

let main = document.createElement('div');
main.id = 'main';
document.body.appendChild(main);

const cases = {
	simple: (
		<Layout>
			<Section />
			<Section />
		</Layout>
		),
	fixedRow: (
		<Layout type='rows'>
			<Section size='300px'/>
			<Section />
		</Layout>
	),
	fixedCol: (
		<Layout>
			<Section size='300px'/>
			<Section />
		</Layout>
	),
	rows: (
		<Layout type='rows'>
			<Row />
			<Row />
		</Layout>
	),
	columns: (
		<Layout type='columns'>
			<Col />
			<Col />
		</Layout>
	),
	width: (
		<Layout>
			<Section gravity={-1} width={300} />
			<Section />
		</Layout>
	),
	height: (
		<Layout type='rows'>
			<Section gravity={-1} height={300} />
			<Section />
		</Layout>
	),
	common: (
		<Layout type='rows'>
			<Section size='80px' />
			<Section>
				<Layout>
					<Section size='20%' />
					<Section>
						<Layout type='rows' mode='spaced'>
							<Section>
								<Layout mode='spaced'>
									<Section size='300px' />
									<Section />
									<Section size='300px' />
								</Layout>
							</Section>
							<Section />
							<Section />
						</Layout>
					</Section>
				</Layout>
			</Section>
		</Layout>
	),
	singleLayout: (
		<Layout />
	),
	singleSection: (
		<Section />
	)
};

ReactDOM.render(
	cases.simple,
	main
);

export default cases;
