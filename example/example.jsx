import React from "react";
import ReactDOM from 'react-dom';
import { Layout, Section } from "../src/ProperLayout.jsx";

let main = document.createElement('div');
main.id = 'main';
document.body.appendChild(main);

ReactDOM.render(
	<Layout type='column'>
		<Section height='80px' />
		<Section>
			<Layout type='row'>
				<Section width='250px' />
				<Section>
					<Layout type='column' mode='spaced'>
						<Section />
						<Section height='20%' />
						<Section />
					</Layout>
				</Section>
			</Layout>
		</Section>
	</Layout>,
	main
);
