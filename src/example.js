import Properlayout from "./layout";
import $ from "jquery";
import React from "react";

$(() => {
	let container = document.getElementById('example');
	let Row = Properlayout.Row;
	let Col = Properlayout.Row;
	let Layout = Properlayout.Layout;

	React.render(
		<Layout mode="spaced" type="columns">
			<Col gravity={0.3}>
				<Layout>
					<Row>
						Sidebar content 1
					</Row>
					<Row>
						Sidebar content 2
					</Row>
				</Layout>
			</Col>
			<Col>
				<Layout>
					<Row gravity={-1} height={35}>
						header
					</Row>
					<Row>
						Main content
					</Row>
				</Layout>
			</Col>
		</Layout>,
		container
	);
});
