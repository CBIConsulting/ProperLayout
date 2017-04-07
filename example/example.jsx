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
	)
};

ReactDOM.render(
	examples.simple,
	main
);
