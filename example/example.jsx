import React from "react";
import ReactDOM from 'react-dom';
import { Layout } from "../src/ProperLayout.jsx";

let main = document.createElement('div');
document.body.appendChild(main);

ReactDOM.render(
	<Layout />,
	main
);
