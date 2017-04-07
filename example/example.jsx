'use strict';

import React from "react";
import ReactDOM from 'react-dom';
import { Layout, Section, Row, Col } from "../src/ProperLayout.jsx";

let main = document.createElement('div');
main.id = 'main';
document.body.appendChild(main);

const examples = {
	simple: (
		<Layout>
			<Section />
			<Section />
		</Layout>
	),
	fixed: (
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
									<Section />
									<Section />
									<Section />
								</Layout>
							</Section>
							<Section />
							<Section />
						</Layout>
					</Section>
				</Layout>
			</Section>
		</Layout>
	)
};

ReactDOM.render(
	examples.common,
	main
);
