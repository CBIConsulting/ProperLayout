/* global expect, it, describe */

'use strict'

import React from 'react'
import { shallow, mount } from 'enzyme'
import { Layout } from '../src/ProperLayout'

describe('Layout', () => {
  describe('Shallow <Layout />', () => {
    const wrapper = shallow(<Layout />)

    it('returns a <div>', () => {
      expect(wrapper.is('div')).to.be.true
    })

    it("has class='layout'", () => {
      expect(wrapper.hasClass('layout')).to.be.true
    })
  })

  describe('Mounted <Layout />', () => {
    const wrapper = mount(<Layout />)

    it("has props.type='columns'", () => {
      expect(wrapper.prop('type')).to.equal('columns')
    })

    it("has props.mode='default'", () => {
      expect(wrapper.prop('mode')).to.equal('default')
    })

    it("has props.direction='default'", () => {
      expect(wrapper.prop('direction')).to.equal('default')
    })

    it("has state.className='layout columns'", () => {
      expect(wrapper.state('className')).to.equal('layout columns')
    })

    it('has state.children=undefined', () => {
      expect(wrapper.state('children')).to.be.undefined
    })

    it('has state.isChildFixed=false', () => {
      expect(wrapper.state('isChildFixed')).to.be.false
    })

    it('has state.adjustTimeout=null', () => {
      expect(wrapper.state('adjustTimeout')).to.be.null
    })

    it("has class='layout columns'", () => {
      expect(wrapper.hasClass('layout')).to.be.true
      expect(wrapper.hasClass('columns')).to.be.true
    })
  })

  describe("Mounted <Layout type='columns' />", () => {
    const wrapper = mount(<Layout type='columns' />)

    it("has props.type='columns'", () => {
      expect(wrapper.prop('type')).to.equal('columns')
    })

    it("has state.className='layout columns'", () => {
      expect(wrapper.state('className')).to.equal('layout columns')
    })

    it("has class='layout columns'", () => {
      expect(wrapper.hasClass('layout')).to.be.true
      expect(wrapper.hasClass('columns')).to.be.true
    })
  })

  describe("Mounted <Layout type='rows' />", () => {
    const wrapper = mount(<Layout type='rows' />)

    it("has props.type='rows'", () => {
      expect(wrapper.prop('type')).to.equal('rows')
    })

    it("has state.className='layout rows'", () => {
      expect(wrapper.state('className')).to.equal('layout rows')
    })

    it("has class='layout rows'", () => {
      expect(wrapper.hasClass('layout')).to.be.true
      expect(wrapper.hasClass('rows')).to.be.true
    })
  })

  describe("Mounter <Layout mode='spaced' />", () => {
    const wrapper = mount(<Layout mode='spaced' />)

    it("has props.mode='spaced'", () => {
      expect(wrapper.prop('mode')).to.equal('spaced')
    })

    it("should have state.className='layout columns spaced'", () => {
      expect(wrapper.state('className')).to.equal('layout columns spaced')
    })

    it("should have class='layout columns spaced'", () => {
      expect(wrapper.hasClass('layout')).to.be.true
      expect(wrapper.hasClass('columns')).to.be.true
      expect(wrapper.hasClass('spaced')).to.be.true
    })
  })

  describe("Mounter <Layout direction='reverse'", () => {
    const wrapper = mount(<Layout direction='reverse' />)

    it("should have props.direction='reverse'", () => {
      expect(wrapper.prop('direction')).to.equal('reverse')
    })

    it("should have state.className='layout columns reverse'", () => {
      expect(wrapper.state('className')).to.equal('layout columns reverse')
    })

    it("should have class='layout columns reverse'", () => {
      expect(wrapper.hasClass('layout')).to.be.true
      expect(wrapper.hasClass('columns')).to.be.true
      expect(wrapper.hasClass('reverse')).to.be.true
    })
  })
})
