'use strict';

// import React from 'react';
// import ReactDOM from 'react-dom';
// import { renderIntoDocument } from 'react-dom/test-utils';
// import { shallow, mount, render } from 'enzyme';
// import '../src/styles/main';

window.FindReact = function(dom) {
	for (var key in dom) {
		if (key.startsWith("__reactInternalInstance$")) {
			var compInternals = dom[key]._currentElement;
			var compWrapper = compInternals._owner;
			var comp = compWrapper._instance;
			return comp;
		}
	}
	return null;
};

describe('Trying ReactTestUtils', () => {
	let elem = (
		<div id='haha' style={{
			width: '100%',
			height: '100%',
			background: 'red'
		}}>
			Element
		</div>
	);

	// let wrapper = mount(elem);
	// let cheerio = wrapper.render();

	ReactDOM.render(elem, document.body);

	it('should have width=100% and height=100%', () => {
		expect(1).toBe(2);
	});
});
