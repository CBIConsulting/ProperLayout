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

    return (
			<div className={className} style={style} id={this.props.uniqueId}>
	      <div className="l-inner col-inner" ref="inner" style={innerStyle} key={this.props.uniqueId + '-inner'}>
	        {this.props.children}
	      </div>
	    </div>
		)
  }
});
