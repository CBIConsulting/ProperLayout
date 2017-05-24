/* global expect, it, describe */

'use strict'

import React from 'react'
import { shallow, mount } from 'enzyme'
import { Section } from '../src/ProperLayout'

describe('Section', () => {
  describe('Shallow <Section />', () => {
    const wrapper = shallow(<Section />)

    it('returns a <div>', () => {
      expect(wrapper.is('div')).to.be.true
    })

    it("has class='section'", () => {
      expect(wrapper.hasClass('proper-section')).to.be.true
    })
  })

  describe('Mounted <Section />', () => {
    const wrapper = mount(<Section />)

    it("has props.type='columns'", () => {
      expect(wrapper.prop('type')).to.equal('columns')
    })

    it("has props.mode='default'", () => {
      expect(wrapper.prop('mode')).to.equal('default')
    })

    it('has props.index=0', () => {
      expect(wrapper.prop('index')).to.equal(0)
    })

    it("has state.className='section'", () => {
      expect(wrapper.state('className')).to.equal('proper-section')
    })

    it('has state.width=undefined', () => {
      expect(wrapper.state('width')).to.be.undefined
    })

    it("has state.height='100%'", () => {
      expect(wrapper.state('height')).to.equal('100%')
    })

    it("has class='section'", () => {
      expect(wrapper.hasClass('proper-section')).to.be.true
    })

    let styles = wrapper.find('div').prop('style')

    it('has style.width=undefined', () => {
      expect(styles.width).to.be.undefined
    })

    it("has style.height='100%'", () => {
      expect(styles.height).to.equal('100%')
    })

    it("has style.left='0%'", () => {
      expect(styles.left).to.equal('0%')
    })
  })

  describe("Mounted <Section size='100px' />", () => {
    const wrapper = mount(<Section size='100px' />)

    it("has props.size='100px'", () => {
      expect(wrapper.prop('size')).to.equal('100px')
    })

    it("has state.width='100px'", () => {
      expect(wrapper.state('width')).to.equal('100px')
    })

    it("has state.height='100%'", () => {
      expect(wrapper.state('height')).to.equal('100%')
    })

    let styles = wrapper.find('div').prop('style')

    it("has style.width='100px'", () => {
      expect(styles.width).to.equal('100px')
    })

    it("has style.height='100%'", () => {
      expect(styles.height).to.equal('100%')
    })
  })

  describe("Mounted <Section size='50%' />", () => {
    const wrapper = mount(<Section size='50%' />)

    it("has props.size='50%'", () => {
      expect(wrapper.prop('size')).to.equal('50%')
    })

    it("has state.width='50%'", () => {
      expect(wrapper.state('width')).to.equal('50%')
    })

    it("has state.height='100%'", () => {
      expect(wrapper.state('height')).to.equal('100%')
    })

    let styles = wrapper.find('div').prop('style')

    it("has style.width='50%'", () => {
      expect(styles.width).to.equal('50%')
    })

    it("has style.height='100%'", () => {
      expect(styles.height).to.equal('100%')
    })
  })
})
