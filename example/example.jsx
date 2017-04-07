'use strict';

import React from "react";
import ReactDOM from 'react-dom';
import { Layout, Section } from "../src/ProperLayout.jsx";

let main = document.createElement('div');
main.id = 'main';
document.body.appendChild(main);

ReactDOM.render(
	<Layout type='rows'>
		<Section size='70px'/>
		<Section>
			<Layout type='columns'>
				<Section size='160px' />
				<Section>
					<Layout type='rows' mode='spaced'>
						<Section size='20%'>
							<Layout mode='spaced'>
								<Section />
								<Section />
								<Section />
							</Layout>
						</Section>
						<Section />
						<Section />
						<Section />
					</Layout>
				</Section>
			</Layout>
		</Section>
	</Layout>,
	main
);
