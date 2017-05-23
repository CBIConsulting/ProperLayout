/* global expect, it, describe */

'use strict'

import React from 'react'
import {mount} from 'enzyme'
import {Row} from '../src/ProperLayout'
import '../src/styles/main.scss'

describe('Row:', () => {
  describe('Shallow Row', () => {
    let wrapper = mount(
      <Row />
    )

    it("should have displayName='Row'", () => {
      expect(wrapper.find('Row')).to.have.lengthOf(1)
    })
  })
})
