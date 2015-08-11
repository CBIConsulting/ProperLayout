import React from "react/addons";
import Underscore from "underscore";
import jQuery from "jquery";
require('!style!css!sass!./properlayout.scss');

const _ = Underscore;
const $ = jQuery;

const Row = React.createClass({
  mixins: [React.addons.PureRenderMixin],

  getDefaultProps: function() {
    return {
      mode: 'border',
      fill: true,
      gravity: 1,
      width: null,
      height: null,
      last: false,
      className: null,
      uniqueId: _.uniqueId('layout-row-')
    }
  },

  getInitialState: function() {
    return {
      innerWidth: null,
      innerHeight: null
    }
  },

  setSize(width = this.props.width, height = this.props.height) {
    let node = React.findDOMNode(this);
    let $node = $(node);
    let $inner = $(React.findDOMNode(this.refs.inner));

    $node.width(width);
    $node.height(height);

    if (this.props.mode == 'spaced') {
      $inner.width(width - 16);
      $inner.height(height - 8);

      if (this.props.last) {
        $inner.height(height - 16);
      }
    } else {
      $inner.width(width);
      $inner.height(height);
    }
  },

  componentDidMount: function() {
    this.computeSize();
  },

  componentDidUpdate: function() {
    if (!this.state.innerWidth) {
      this.computeSize();
    }
  },

  computeSize: function() {
    let sizes = {
      innerWidth: this.props.width,
      innerHeight: this.props.height
    }

    if (this.props.mode == 'spaced') {
      sizes = {
        innerWidth: this.props.width - 16,
        innerHeight: this.props.height - 8
      };

      if (this.props.last) {
        sizes.innerHeight -= 8;
      }
    }

    this.setState(sizes);
  },

  render: function() {
    let className = 'layout-row';

    let style = {
      width: this.props.width,
      height: this.props.height
    };

    if (this.props.className) {
      className += ' '+this.props.className;
      className = _.uniq(className.split(' ')).join(' ');
    }

    if (!this.state.innerWidth) {
      return <div className={className} style={style}></div>;
    }

    let innerStyle = {
      width: this.state.innerWidth,
      height: this.state.innerHeight
    };

    return <div className={className} style={style} id={this.props.uniqueId}>
      <div className="l-inner row-inner" ref="inner" style={innerStyle} key={this.props.uniqueId + '-inner'}>
        {this.props.children}
      </div>
    </div>;
  }
});

const Col = React.createClass({
  mixins: [React.addons.PureRenderMixin],

  getDefaultProps: function() {
    return {
      mode: 'border',
      fill: true,
      gravity: 1,
      width: null,
      height: null,
      last: false,
      className: null,
      uniqueId: _.uniqueId('layout-row-')
    }
  },

  getInitialState: function() {
    return {
      innerWidth: null,
      innerHeight: null
    }
  },

  componentDidMount: function() {
    this.computeSize();
  },

  componentDidUpdate: function() {
    if (!this.state.innerWidth) {
      this.computeSize();
    }
  },

  setSize(width = this.props.width, height = this.props.height) {
    let node = React.findDOMNode(this);
    let $node = $(node);
    let $inner = $(React.findDOMNode(this.refs.inner));

    $node.width(width);
    $node.height(height);

    if (this.props.mode == 'spaced') {
      $inner.width(width - 8);
      $inner.height(height - 16);

      if (this.props.last) {
        $inner.width(width - 16);
      }
    } else {
      $inner.width(width);
      $inner.height(height);
    }
  },

  computeSize: function() {
    let sizes = {
      innerWidth: this.props.width,
      innerHeight: this.props.height
    }

    if (this.props.mode == 'spaced') {
      sizes = {
        innerHeight: this.props.height - 16,
        innerWidth: this.props.width - 8
      };

      if (this.props.last) {
        sizes.innerWidth -= 8;
      }
    }

    this.setState(sizes);
  },

  render: function() {
    let className = 'layout-col';

    let style = {
      width: this.props.width,
      height: this.props.height
    };

    if (this.props.className) {
      className += ' '+this.props.className;
      className = _.uniq(className.split(' ')).join(' ');
    }

    if (!this.state.innerWidth) {
      return <div className={className} style={style}></div>;
    }

    let innerStyle = {
      width: this.state.innerWidth,
      height: this.state.innerHeight
    };

    return <div className={className} style={style} id={this.props.uniqueId}>
      <div className="l-inner col-inner" ref="inner" style={innerStyle} key={this.props.uniqueId + '-inner'}>
        {this.props.children}
      </div>
    </div>;
  }
});

const Layout = React.createClass({
  mixins: [React.addons.PureRenderMixin],

  getDefaultProps: function() {
    return {
      mode: 'border',
      type: 'rows',
      className: null,
      uniqueId: _.uniqueId('layout-')
    }
  },

  getInitialState: function() {
    return {
      width: null,
      height: null,
      updating: false
    };
  },

  componentDidMount: function() {
    this.setLayoutSize();

    $(window).on('resize', this.onResize);
  },

  onResize(e) {
    if (!this.isMounted()) {
      return false;
    }

    let node = React.findDOMNode(this);
    let $node = $(node);
    let $el = $node.parent();
    let width = $el.width();
    let height = $el.height();

    this.setSize(width, height);
    /*this.setState({
      width: null,
      height: null,
      updating: true
    });*/
  },

  setSize(width, height) {
    let node = React.findDOMNode(this);
    let $node = $(node);

    $node.width(width);
    $node.height(height);

    this.width = width;
    this.height = height;

    this.computeSizes(this.props.children, true);
  },

  componentDidUpdate: function() {
    if (!this.state.width) {
      this.setLayoutSize();
    }
  },

  componentWillUnmount() {
    $(window).off('resize', this.onResize);
  },

  setLayoutSize: function(updating) {
    let node = React.findDOMNode(this);
    let $node = $(node);

    if (!this.state.width) {
      this.width = $node.width();
      this.height = $node.height();

      this.setState({
        width: $node.width(),
        height: $node.height()
      });
    }
  },

  computeSizes: function(children = this.props.children, updating = this.state.updating) {
    let availableHeight = this.height;
    let availableWidth = this.width;
    let usedHeight = 0;
    let usedWidth = 0;
    let fillElements = React.Children.count(children);
    let fillHeight, fillWidth;
    let lastIndex = null;
    let indexes = null;
    let nextRef = 1;
    let nextKey = 1;
    let contentKey = 1;
    let cCount = React.Children.count(children);
    let curChild = 0;
    let result = [];
    let cProps = [];
    let ChildComponent = Row;
    let ofselector = '.l-inner';

    if (this.props.type == 'columns') {
      ChildComponent = Col;
    }

    if (fillElements) {
      fillHeight = availableHeight / fillElements;
      fillWidth = availableWidth / fillElements;
    }

    if (!this.state.width) {
      return null;
    }

    if (updating) {
      $(ofselector).css('overflow', 'hidden');
    }

    React.Children.forEach(children, (child) => {
      let height = availableHeight;
      let width = availableWidth;
      let props = _.clone(child.props);

      if (props.gravity != 1 && props.gravity > 0) {
        if (this.props.type == 'rows') {
          height *= props.gravity;

          props.height = height;
          props.width = availableWidth;

          usedHeight += height;
        }

        if (this.props.type == 'columns') {
          width *= props.gravity;
          props.width = width;
          props.height = availableHeight;

          usedWidth += width;
        }

        fillElements--;
      } else {
        if (props.gravity == -1) {
          if (this.props.type == 'rows' && props.height) {
            props.gravity = -1;
            props.width = availableWidth;
            usedHeight += props.height;
            fillElements--;
          }

          if (this.props.type == 'columns' && props.width) {
            props.gravity = -1;
            props.height = availableHeight;
            usedWidth += props.width;
            fillElements--;
          }
        }
      }

      cProps.push(props);
    });

    if (this.props.type == 'rows' && fillElements) {
      availableHeight -= usedHeight;
      fillHeight = availableHeight / fillElements;
    }

    if (this.props.type == 'columns' && fillElements) {
      availableWidth -= usedWidth;
      fillWidth = availableWidth / fillElements;
    }

    _.each(cProps, (props) => {
      if (props.gravity == 1) {
        if (this.props.type == 'rows') {
          props.height = fillHeight;
          props.width = availableWidth;
        }

        if (this.props.type == 'columns') {
          props.width = fillWidth;
          props.height = availableHeight;
        }
      }
    });

    React.Children.forEach(children, (child) => {
      let curProps = cProps[curChild];

      curProps = _.extend(curProps, {
        ref: child.props.ref || this.props.uniqueId + '-' + (nextRef++),
        key: child.props.key || this.props.uniqueId + '-' + (nextKey++),
        mode: this.props.mode,
        last: ++curChild == cCount,
        uniqueId: this.props.uniqueId + '-content-' + (contentKey++)
      });

      if (!updating) {
        result.push(<ChildComponent key={curProps.key} {...curProps}>{child.props.children}</ChildComponent>);
      } else {
        if (this.refs[curProps.ref]) {
          this.refs[curProps.ref].setSize(curProps.width, curProps.height);
        }
      }
    });

    if (updating) {
      $(ofselector).css('overflow', 'auto');
      result = this.props.children;
    }

    return result;
  },

  render: function() {
    let className = "properlayout " + this.props.mode;

    if (this.props.className) {
      className += ' '+this.props.className;
    }

    if (!this.state.width) {
      return <div className={className} id={this.props.uniqueId}></div>;
    }

    let style = {};
    let children = this.computeSizes(this.props.children);

    style = {
      width: this.state.width,
      height: this.state.height
    };

    return <div className={className} style={style} id={this.props.uniqueId}>
      {children}
    </div>;
  }
});

export default {
  Layout: Layout,
  Row: Row,
  Col: Col
};