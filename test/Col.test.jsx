'use strict';

import React from 'react';
import {mount} from 'enzyme';
import {Col} from '../src/ProperLayout';
import '../src/styles/main.scss';

describe('Col', () => {
	describe('Shallow Col', () => {
		let wrapper = mount(
			<Col />
		);

		it("should have displayName='Col'", () => {
			expect(wrapper.find('Col')).to.have.lengthOf(1);
		});
	});
});
