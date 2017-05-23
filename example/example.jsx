'use strict'

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Layout, Section, Row, Col } from '../src/ProperLayout'

let main = document.createElement('div')
main.id = 'main'
document.body.appendChild(main)

class Content extends React.Component {
  render () {
    return (
      <div style={{height: '100%'}}>
        <div style={{
          height: '300px',
          border: '1px solid red'
        }}>
          div1
        </div>
        <div style={{
          height: '100%',
          border: '3px solid limegreen'
        }}>
          div2
        </div>
      </div>
    )
  }
}

const cases = {
  simple: (
    <Layout>
      <Section />
      <Section />
    </Layout>
    ),
  fixedRow: (
    <Layout type='rows'>
      <Section size='300px' />
      <Section />
    </Layout>
  ),
  fixedCol: (
    <Layout>
      <Section size='300px' />
      <Section />
    </Layout>
  ),
  rows: (
    <Layout type='rows'>
      <Row />
      <Row />
    </Layout>
  ),
  columns: (
    <Layout type='columns'>
      <Col />
      <Col />
    </Layout>
  ),
  width: (
    <Layout>
      <Section gravity={-1} width={300} />
      <Section />
    </Layout>
  ),
  height: (
    <Layout type='rows'>
      <Section gravity={-1} height={300} />
      <Section />
    </Layout>
  ),
  common: (
    <Layout type='rows'>
      <Section size='80px' />
      <Section>
        <Layout>
          <Section size='20%' />
          <Section>
            <Layout type='rows' mode='spaced'>
              <Section>
                <Layout mode='spaced'>
                  <Section size='300px' />
                  <Section />
                  <Section size='300px' />
                </Layout>
              </Section>
              <Section />
              <Section />
            </Layout>
          </Section>
        </Layout>
      </Section>
    </Layout>
  ),
  singleLayout: (
    <Layout />
  ),
  singleSection: (
    <Section />
  ),
  tenColumns: (
    <Layout>
      <Section />
      <Section />
      <Section size='20px' />
      <Section />
      <Section />
      <Section />
      <Section />
      <Section />
      <Section />
      <Section />
    </Layout>
  ),
  withContent: (
    <Layout>
      <Section size='250px' />
      <Section>
        <Content />
      </Section>
    </Layout>
  ),
  borders: (
    <Layout borders>
      <Section size='400px' />
      <Section />
    </Layout>
  ),
  spacedBorders: (
    <Layout mode='spaced' borders>
      <Section />
      <Section />
    </Layout>
  )
}

class Borders extends Component {
  constructor (props) {
    super(props)
    this.state = {
      size1: '100px',
      size2: '150px',
      className: 'lololo'
    }
  }

  render () {
    return (
      <Layout borders>
        <Section size={this.state.size1}>
          <button onClick={() => {
            this.setState({
              size1: '200px',
              size2: '300px',
              className: 'lololo lalala'
            })
          }}>
            click
          </button>
        </Section>
        <Section size={this.state.size2}>
          <button onClick={() => {
            this.setState({
              className: 'lalala'
            })
          }}>
            click
          </button>
        </Section>
        <Section className={this.state.className} />
      </Layout>
    )
  }
}

ReactDOM.render(
  <Borders />,
  main
)

export default cases
