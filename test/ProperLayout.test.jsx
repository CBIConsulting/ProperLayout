/* global expect, it, describe, beforeEach, afterEach */

'use strict'

import React from 'react'
import { mount } from 'enzyme'
import { Layout, Section, Row, Col } from '../src/ProperLayout'
import '../src/styles/main.scss'

describe('ProperLayout:', () => {
  describe('mounted Simple Layout:', () => {
    let wrapper, sections, firstSection, secondSection

    beforeEach(() => {
      let main = document.createElement('div')
      main.id = 'main'
      document.body.appendChild(main)

      wrapper = mount(
        <Layout>
          <Section />
          <Section />
        </Layout>,
        {
          attachTo: main
        }
      )

      sections = wrapper.children()
      firstSection = wrapper.childAt(0)
      secondSection = wrapper.childAt(1)
    })

    afterEach(() => {
      let main = document.getElementById('main')
      document.body.removeChild(main)
    })

    it('should render two inner Section divs', () => {
      expect(sections.length).to.equal(2)

      sections.forEach(node => {
        expect(node.length).to.equal(1)
        expect(node.find(Section).exists()).to.equal(true)
        expect(node.find('div').exists()).to.equal(true)
      })
    })

    // props -> type, mode, position, size

    it("each Section should have props.type='columns'", () => {
      sections.forEach(section => {
        expect(section.node.props.type).to.equal('columns')
      })
    })

    it("each Section should have props.mode='default'", () => {
      sections.forEach(section => {
        expect(section.node.props.mode).to.equal('default')
      })
    })

    it("first Section should have props.position='0%'", () => {
      expect(firstSection.node.props.position).to.equal('0%')
    })

    it("second Section should have props.position='50%'", () => {
      expect(secondSection.node.props.position).to.equal('50%')
    })

    it("each Section should have props.size='50%'", () => {
      sections.forEach(section => {
        expect(section.node.props.size).to.equal('50%')
      })
    })

    // state -> width, height

    it("each Section should have state.width='50%'", () => {
      sections.forEach(section => {
        expect(section.node.state.width).to.equal('50%')
      })
    })

    it("each Section should have state.height='100%'", () => {
      sections.forEach(section => {
        expect(section.node.state.height).to.equal('100%')
      })
    })

    // styles -> width, height, left

    it("each Section should have style.width='50%'", () => {
      sections.forEach(section => {
        let styles = section.find('div.proper-section').node.style

        expect(styles.width).to.equal('50%')
      })
    })

    it("each Section should have style.height='100%'", () => {
      sections.forEach(section => {
        let styles = section.find('div.proper-section').node.style

        expect(styles.height).to.equal('100%')
      })
    })

    it("first Section should have style.left='0%'", () => {
      let styles = firstSection.find('div.proper-section').node.style

      expect(styles.left).to.equal('0%')
    })

    it("second Section should have style.left='50%'", () => {
      let styles = secondSection.find('div.proper-section').node.style

      expect(styles.left).to.equal('50%')
    })
  })

  describe("mounted Simple Layout with type='rows':", () => {
    let wrapper, sections, firstSection, secondSection

    beforeEach(() => {
      let main = document.createElement('div')
      main.id = 'main'
      document.body.appendChild(main)

      wrapper = mount(
        <Layout type='rows'>
          <Section />
          <Section />
        </Layout>,
        {
          attachTo: main
        }
      )

      sections = wrapper.children()
      firstSection = wrapper.childAt(0)
      secondSection = wrapper.childAt(1)
    })

    afterEach(() => {
      let main = document.getElementById('main')
      document.body.removeChild(main)
    })

    // props -> type, size, position

    it("each Section should have props.type='rows'", () => {
      sections.forEach(section => {
        expect(section.node.props.type).to.equal('rows')
      })
    })

    it("each Section should have props.size='50%'", () => {
      sections.forEach(section => {
        expect(section.node.props.size).to.equal('50%')
      })
    })

    it("first Section should have props.position='0%'", () => {
      expect(firstSection.node.props.position).to.equal('0%')
    })

    it("second Section should have props.position='50%'", () => {
      expect(secondSection.node.props.position).to.equal('50%')
    })

    // state -> width, height

    it("each Section should have state.width='100%'", () => {
      sections.forEach(section => {
        expect(section.node.state.width).to.equal('100%')
      })
    })

    it("each Section should have state.height='50%'", () => {
      sections.forEach(section => {
        expect(section.node.state.height).to.equal('50%')
      })
    })

    // styles -> width, height, top

    it("each Section should have style.width='100%'", () => {
      sections.forEach(section => {
        let styles = section.find('div.proper-section').node.style

        expect(styles.width).to.equal('100%')
      })
    })

    it("each Section should have style.height='50%'", () => {
      sections.forEach(section => {
        let styles = section.find('div.proper-section').node.style

        expect(styles.height).to.equal('50%')
      })
    })

    it("first Section should have style.top='0%'", () => {
      let styles = firstSection.find('div.proper-section').node.style

      expect(styles.top).to.equal('0%')
    })

    it("second Section should have style.top='50%'", () => {
      let styles = secondSection.find('div.proper-section').node.style

      expect(styles.top).to.equal('50%')
    })
  })

  describe("mounted Simple Layout with mode='spaced':", () => {
    let wrapper, sections

    beforeEach(() => {
      let main = document.createElement('div')
      main.id = 'main'
      document.body.appendChild(main)

      wrapper = mount(
        <Layout mode='spaced'>
          <Section />
          <Section />
        </Layout>,
        {
          attachTo: main
        }
      )

      sections = wrapper.children()
    })

    afterEach(() => {
      let main = document.getElementById('main')
      document.body.removeChild(main)
    })

    // props -> mode

    it("each Section should have props.mode='spaced'", () => {
      sections.forEach(section => {
        expect(section.node.props.mode).to.equal('spaced')
      })
    })

    // state -> width, height

    it("each Section should have state.width='calc(50% - 16px)'", () => {
      sections.forEach(section => {
        expect(section.node.state.width).to.equal('calc(50% - 16px)')
      })
    })

    it("each Section should have state.height='calc(100% - 32px)'", () => {
      sections.forEach(section => {
        expect(section.node.state.height).to.equal('calc(100% - 32px)')
      })
    })

    // styles -> width, height, margin

    it("each Section should have style.width='calc(50% - 16px)'", () => {
      sections.forEach(section => {
        let styles = section.find('div.proper-section').node.style

        expect(styles.width).to.equal('calc(50% - 16px)')
      })
    })

    it("each Section should have style.height='calc(100% - 32px)'", () => {
      sections.forEach(section => {
        let styles = section.find('div.proper-section').node.style

        expect(styles.height).to.equal('calc(100% - 32px)')
      })
    })

    it("each Section should have style.margin='16px 8px'", () => {
      sections.forEach(section => {
        let node = section.find('div.proper-section').node
        let styles = window.getComputedStyle(node)

        expect(styles.margin).to.equal('16px 8px')
      })
    })
  })

  describe("mounted Simple Layout width type='rows' and mode='spaced'", () => {
    let wrapper, sections

    beforeEach(() => {
      let main = document.createElement('div')
      main.id = 'main'
      document.body.appendChild(main)

      wrapper = mount(
        <Layout type='rows' mode='spaced'>
          <Section />
          <Section />
        </Layout>,
        {
          attachTo: main
        }
      )

      sections = wrapper.children()
    })

    afterEach(() => {
      let main = document.getElementById('main')
      document.body.removeChild(main)
    })

    // state -> width, height

    it("each Section should have state.width='calc(100% - 16px)'", () => {
      sections.forEach(section => {
        expect(section.node.state.width).to.equal('calc(100% - 16px)')
      })
    })

    it("each Section should have state.height='calc(50% - 32px)'", () => {
      sections.forEach(section => {
        expect(section.node.state.height).to.equal('calc(50% - 32px)')
      })
    })

    // styles -> width, height

    it("each Section should have style.width='calc(100% - 16px)'", () => {
      sections.forEach(section => {
        let styles = section.find('div.proper-section').node.style

        expect(styles.width).to.equal('calc(100% - 16px)')
      })
    })

    it("each Section should have style.height='calc(50% - 32px)'", () => {
      sections.forEach(section => {
        let styles = section.find('div.proper-section').node.style

        expect(styles.height).to.equal('calc(50% - 32px)')
      })
    })
  })

  describe('mounted Simple Layout with Cols', () => {
    let wrapper, cols, firstCol, secondCol

    beforeEach(() => {
      let main = document.createElement('div')
      main.id = 'main'
      document.body.appendChild(main)

      wrapper = mount(
        <Layout>
          <Col />
          <Col />
        </Layout>,
        {
          attachTo: main
        }
      )

      cols = wrapper.children()
      firstCol = wrapper.childAt(0)
      secondCol = wrapper.childAt(1)
    })

    afterEach(() => {
      let main = document.getElementById('main')
      document.body.removeChild(main)
    })

    // props -> type, mode, position, size

    it("each Col should have props.type='columns'", () => {
      cols.forEach(col => {
        expect(col.node.props.type).to.equal('columns')
      })
    })

    it("each Col should have props.mode='default'", () => {
      cols.forEach(col => {
        expect(col.node.props.mode).to.equal('default')
      })
    })

    it("first Col should have props.position='0%'", () => {
      expect(firstCol.node.props.position).to.equal('0%')
    })

    it("second Col should have props.positoin='50%'", () => {
      expect(secondCol.node.props.position).to.equal('50%')
    })

    it("each Col should have props.size='50%'", () => {
      cols.forEach(col => {
        expect(col.node.props.size).to.equal('50%')
      })
    })

    // state -> width, height

    it("each Col should have state.width='50%'", () => {
      cols.forEach(col => {
        expect(col.node.state.width).to.equal('50%')
      })
    })

    it("each Col should have state.height='100%'", () => {
      cols.forEach(col => {
        expect(col.node.state.height).to.equal('100%')
      })
    })

    // style -> width, height, left

    it("each Col should have style.width='50%'", () => {
      cols.forEach(col => {
        let styles = col.find('div.proper-section').node.style

        expect(styles.width).to.equal('50%')
      })
    })

    it("each Col should have style.height='100%'", () => {
      cols.forEach(col => {
        let styles = col.find('div.proper-section').node.style

        expect(styles.height).to.equal('100%')
      })
    })

    it("firsCol should have style.left='0%'", () => {
      let styles = firstCol.find('div.proper-section').node.style

      expect(styles.left).to.equal('0%')
    })

    it("secondCol should have style.left='50%'", () => {
      let styles = secondCol.find('div.proper-section').node.style

      expect(styles.left).to.equal('50%')
    })
  })

  describe('mounted Simple Layout with Cols', () => {
    let wrapper, rows, firstRow, secondRow

    beforeEach(() => {
      let main = document.createElement('div')
      main.id = 'main'
      document.body.appendChild(main)

      wrapper = mount(
        <Layout type='rows'>
          <Row />
          <Row />
        </Layout>,
        {
          attachTo: main
        }
      )

      rows = wrapper.children()
      firstRow = wrapper.childAt(0)
      secondRow = wrapper.childAt(1)
    })

    afterEach(() => {
      let main = document.getElementById('main')
      document.body.removeChild(main)
    })

    // props -> type, mode, position, size

    it("each Col should have props.type='rows'", () => {
      rows.forEach(row => {
        expect(row.node.props.type).to.equal('rows')
      })
    })

    it("each Col should have props.mode='default'", () => {
      rows.forEach(row => {
        expect(row.node.props.mode).to.equal('default')
      })
    })

    it("first Col should have props.position='0%'", () => {
      expect(firstRow.node.props.position).to.equal('0%')
    })

    it("second Col should have props.position='50%'", () => {
      expect(secondRow.node.props.position).to.equal('50%')
    })

    it("each Col should have props.size='50%'", () => {
      rows.forEach(row => {
        expect(row.node.props.size).to.equal('50%')
      })
    })

    // state -> width, height

    it("each Col should have state.width='100%'", () => {
      rows.forEach(row => {
        expect(row.node.state.width).to.equal('100%')
      })
    })

    it("each Col should have state.height='50%'", () => {
      rows.forEach(row => {
        expect(row.node.state.height).to.equal('50%')
      })
    })

    // style -> width, height, left

    it("each Col should have style.width='100%'", () => {
      rows.forEach(row => {
        let styles = row.find('div.proper-section').node.style

        expect(styles.width).to.equal('100%')
      })
    })

    it("each Col should have style.height='50%'", () => {
      rows.forEach(row => {
        let styles = row.find('div.proper-section').node.style

        expect(styles.height).to.equal('50%')
      })
    })

    it("firsCol should have style.top='0%'", () => {
      let styles = firstRow.find('div.proper-section').node.style

      expect(styles.top).to.equal('0%')
    })

    it("secondCol should have style.top='50%'", () => {
      let styles = secondRow.find('div.proper-section').node.style

      expect(styles.top).to.equal('50%')
    })
  })

  describe('Mounted Simple Layout with Section fixed size in  px', () => {
    let wrapper, firstSection, secondSection

    beforeEach(() => {
      let main = document.createElement('div')
      main.id = 'main'
      main.setAttribute('style', 'width: 1000px; height: 1000px')
      document.body.appendChild(main)

      wrapper = mount(
        <Layout>
          <Section />
          <Section size='300px' />
        </Layout>,
        {
          attachTo: main
        }
      )

      firstSection = wrapper.childAt(0)
      secondSection = wrapper.childAt(1)
    })

    afterEach(() => {
      let main = document.getElementById('main')
      document.body.removeChild(main)
    })

    // props -> size, position

    it("first Section should have props.size='70%'", () => {
      expect(firstSection.node.props.size).to.equal('70%')
    })

    it("second Section should have props.size='300px'", () => {
      expect(secondSection.node.props.size).to.equal('300px')
    })

    it("first Section should have props.position='0%'", () => {
      expect(firstSection.node.props.position).to.equal('0%')
    })

    it("second Section should have props.position='70%'", () => {
      expect(secondSection.node.props.position).to.equal('70%')
    })
  })

  describe("Mounted Simple Layout with type='rows' and Section fixed size in px", () => {
    let wrapper, firstSection, secondSection

    beforeEach(() => {
      let main = document.createElement('div')
      main.id = 'main'
      main.setAttribute('style', 'width: 1000px; height: 1000px')
      document.body.appendChild(main)

      wrapper = mount(
        <Layout type='rows'>
          <Section />
          <Section size='300px' />
        </Layout>,
        {
          attachTo: main
        }
      )

      firstSection = wrapper.childAt(0)
      secondSection = wrapper.childAt(1)
    })

    afterEach(() => {
      let main = document.getElementById('main')
      document.body.removeChild(main)
    })

    // props -> size, position

    it("first Section should have props.size='70%'", () => {
      expect(firstSection.node.props.size).to.equal('70%')
    })

    it("second Section should have props.size='300px'", () => {
      expect(secondSection.node.props.size).to.equal('300px')
    })

    it("first Section should have props.position='0%'", () => {
      expect(firstSection.node.props.position).to.equal('0%')
    })

    it("second Section should have props.position='70%'", () => {
      expect(secondSection.node.props.position).to.equal('70%')
    })
  })

  describe('Mounted Simple Layout with Section fixed size in %', () => {
    let wrapper, firstSection, secondSection

    beforeEach(() => {
      let main = document.createElement('div')
      main.id = 'main'
      main.setAttribute('style', 'width: 1000px; height: 1000px')
      document.body.appendChild(main)

      wrapper = mount(
        <Layout>
          <Section />
          <Section size='30%' />
        </Layout>,
        {
          attachTo: main
        }
      )

      firstSection = wrapper.childAt(0)
      secondSection = wrapper.childAt(1)
    })

    afterEach(() => {
      let main = document.getElementById('main')
      document.body.removeChild(main)
    })

    // props -> size, position

    it("first Section should have props.size='70%'", () => {
      expect(firstSection.node.props.size).to.equal('70%')
    })

    it("second Section should have props.size='30%'", () => {
      expect(secondSection.node.props.size).to.equal('30%')
    })

    it("first Section should have props.position='0%'", () => {
      expect(firstSection.node.props.position).to.equal('0%')
    })

    it("second Section should have props.position='70%'", () => {
      expect(secondSection.node.props.position).to.equal('70%')
    })
  })

  describe('Mounted Simple Layout with Section gravity=0.3', () => {
    let wrapper, firstSection, secondSection

    beforeEach(() => {
      let main = document.createElement('div')
      main.id = 'main'
      main.setAttribute('style', 'width: 1000px; height: 1000px')
      document.body.appendChild(main)

      wrapper = mount(
        <Layout>
          <Section />
          <Section gravity={0.3} />
        </Layout>,
        {
          attachTo: main
        }
      )

      firstSection = wrapper.childAt(0)
      secondSection = wrapper.childAt(1)
    })

    afterEach(() => {
      let main = document.getElementById('main')
      document.body.removeChild(main)
    })

    // props -> size, position

    it("first Section should have props.size='70%'", () => {
      expect(firstSection.node.props.size).to.equal('70%')
    })

    it("second Section should have props.size='30%'", () => {
      expect(secondSection.node.props.size).to.equal('30%')
    })

    it("first Section should have props.position='0%'", () => {
      expect(firstSection.node.props.position).to.equal('0%')
    })

    it("second Section should have props.position='70%'", () => {
      expect(secondSection.node.props.position).to.equal('70%')
    })
  })

  describe('Mounted Simple Layout with Section gravity=-1 and width=300', () => {
    let wrapper, firstSection, secondSection

    beforeEach(() => {
      let main = document.createElement('div')
      main.id = 'main'
      main.setAttribute('style', 'width: 1000px; height: 1000px')
      document.body.appendChild(main)

      wrapper = mount(
        <Layout>
          <Section />
          <Section gravity={-1} width={300} />
        </Layout>,
        {
          attachTo: main
        }
      )

      firstSection = wrapper.childAt(0)
      secondSection = wrapper.childAt(1)
    })

    afterEach(() => {
      let main = document.getElementById('main')
      document.body.removeChild(main)
    })

    // props -> size, position

    it("first Section should have props.size='70%'", () => {
      expect(firstSection.node.props.size).to.equal('70%')
    })

    it("second Section should have props.size='300px'", () => {
      expect(secondSection.node.props.size).to.equal('300px')
    })

    it("first Section should have props.position='0%'", () => {
      expect(firstSection.node.props.position).to.equal('0%')
    })

    it("second Section should have props.position='70%'", () => {
      expect(secondSection.node.props.position).to.equal('70%')
    })
  })

  describe('Mounted Simple Layout with Section gravity=-1 and height=300', () => {
    let wrapper, firstSection, secondSection

    beforeEach(() => {
      let main = document.createElement('div')
      main.id = 'main'
      main.setAttribute('style', 'width: 1000px; height: 1000px')
      document.body.appendChild(main)

      wrapper = mount(
        <Layout type='rows'>
          <Section />
          <Section gravity={-1} height={300} />
        </Layout>,
        {
          attachTo: main
        }
      )

      firstSection = wrapper.childAt(0)
      secondSection = wrapper.childAt(1)
    })

    afterEach(() => {
      let main = document.getElementById('main')
      document.body.removeChild(main)
    })

    // props -> size, position

    it("first Section should have props.size='70%'", () => {
      expect(firstSection.node.props.size).to.equal('70%')
    })

    it("second Section should have props.size='300px'", () => {
      expect(secondSection.node.props.size).to.equal('300px')
    })

    it("first Section should have props.position='0%'", () => {
      expect(firstSection.node.props.position).to.equal('0%')
    })

    it("second Section should have props.position='70%'", () => {
      expect(secondSection.node.props.position).to.equal('70%')
    })
  })

  describe('in mounted Simple Layout with borders', () => {
    let wrapper, sections

    beforeEach(() => {
      let main = document.createElement('div')
      main.id = 'main'
      main.setAttribute('style', 'width: 1000px; height: 1000px')
      document.body.appendChild(main)

      wrapper = mount(
        <Layout borders>
          <Section />
          <Section />
        </Layout>,
        {
          attachTo: main
        }
      )

      sections = wrapper.children()
    })

    afterEach(() => {
      let main = document.getElementById('main')
      document.body.removeChild(main)
    })

    it('Layout should have props.borders=true', () => {
      expect(wrapper.prop('borders')).to.be.true
    })

    it('Layout should have state.className="borders"', () => {
      expect(wrapper.state('className')).to.equal('layout columns borders')
    })

    it('Layout should have class="borders"', () => {
      expect(wrapper.hasClass('borders')).to.be.true
    })

    it('each Section should have style.border="1px solid #333"', () => {
      sections.forEach(section => {
        section = section.find('div.proper-section').node
        let styles = window.getComputedStyle(section)

        expect(styles.getPropertyValue('border')).to.equal('1px solid rgb(51, 51, 51)')
      })
    })
  })

  describe('in mounted Simple Layout spaced and with borders', () => {
    let wrapper, sections

    beforeEach(() => {
      let main = document.createElement('div')
      main.id = 'main'
      main.setAttribute('style', 'width: 1000px; height: 1000px')
      document.body.appendChild(main)

      wrapper = mount(
        <Layout mode='spaced' borders>
          <Section />
          <Section />
        </Layout>,
        {
          attachTo: main
        }
      )

      sections = wrapper.children()
    })

    afterEach(() => {
      let main = document.getElementById('main')
      document.body.removeChild(main)
    })

    it('Layout should have state.className="borders"', () => {
      expect(wrapper.state('className')).to.equal('layout columns spaced borders')
    })

    it('each Section should have style.border="1px dashed #333"', () => {
      sections.forEach(section => {
        section = section.find('div.proper-section').node
        let styles = window.getComputedStyle(section)

        expect(styles.getPropertyValue('border')).to.equal('1px dashed rgb(51, 51, 51)')
      })
    })
  })
})
