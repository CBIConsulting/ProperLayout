import React from "react";
import ReactDOM from 'react-dom';
import { Layout, Section, Button } from "../src/ProperLayout.jsx";

let main = document.createElement('div');
main.id = 'main';
document.body.appendChild(main);

ReactDOM.render(
	<Layout
		type='row'>
		<Section>
			<Button/>
		</Section>
		<Section />
		<Section />
		<Section />
		<Section />
		<Section />
		<Section />
		<Section />
		<Section />
	</Layout>,
	main
);
