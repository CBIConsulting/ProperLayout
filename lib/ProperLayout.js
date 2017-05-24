(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("prop-types"), require("react"), require("shortid"));
	else if(typeof define === 'function' && define.amd)
		define(["prop-types", "react", "shortid"], factory);
	else if(typeof exports === 'object')
		exports["ProperLayout"] = factory(require("prop-types"), require("react"), require("shortid"));
	else
		root["ProperLayout"] = factory(root["prop-types"], root["react"], root["shortid"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_9__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = function(originalModule) {
	if(!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		Object.defineProperty(module, "exports", {
			enumerable: true,
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };




class Section extends __WEBPACK_IMPORTED_MODULE_0_react__["PureComponent"] {
  constructor(props) {
    super(props);

    this.state = {
      className: 'proper-section',
      width: null,
      height: null
    };

    this.evaluateClasses = this.evaluateClasses.bind(this);
    this.calculateDimensions = this.calculateDimensions.bind(this);
    this.warnDeprecatedProps = this.warnDeprecatedProps.bind(this);
  }

  componentWillMount() {
    this.warnDeprecatedProps();

    let { width, height } = this.calculateDimensions();

    this.setState(() => _extends({}, this.state, {
      className: this.evaluateClasses(),
      width,
      height
    }));
  }

  componentWillReceiveProps(nextProps) {
    let { width, height } = this.calculateDimensions();

    this.setState(() => _extends({}, this.state, {
      className: this.evaluateClasses(nextProps),
      width,
      height
    }));
  }

  evaluateClasses(props = this.props, state = this.state) {
    state = this.state.className.split(' ');
    props = props.className.split(' ');

    let newClasses = props.filter(x => x && state.indexOf(x) < 0);
    let remainClasses = state.filter(x => props.indexOf(x) >= 0 || x === 'proper-section');

    return remainClasses.concat(newClasses).join(' ');
  }

  calculateDimensions() {
    let size = this.props.size;
    let type = this.props.type;
    let mode = this.props.mode;

    let width, height;

    if (type === 'columns' && mode === 'default') {
      height = '100%';
      width = size;
    } else if (type === 'columns' && mode === 'spaced') {
      height = 'calc(100% - 32px)';
      width = 'calc(' + size + ' - 16px)';
    } else if (type === 'rows' && mode === 'default') {
      height = size;
      width = '100%';
    } else if (type === 'rows' && mode === 'spaced') {
      height = 'calc(' + size + ' - 32px)';
      width = 'calc(100% - 16px)';
    }

    return { width, height };
  }

  warnDeprecatedProps() {
    let props = this.props;

    if (props.gravity) {
      console.warn('You are using \'gravity\' prop in ' + this.constructor.name + '.\n' + 'This prop is deprecated and might cease to exist in future versions of ProperLayout.\n' + 'You might want to use instead a percent value for \'size\'.');
    }

    if (props.width) {
      console.warn('You are using \'width\' prop in <' + this.constructor.name + '>.\n' + 'This prop is deprecated and might cease to exist in future versions of ProperLayout.\n' + 'You might want to use instead a pixel value for \'size\'.');
    }

    if (props.height) {
      console.warn('You are using \'height\' prop in <' + this.constructor.name + '>.\n' + 'This prop is deprecated and might cease to exist in future versions of ProperLayout.\n' + 'You might want to use instead a pixel value for \'size\'.');
    }
  }

  render() {
    let styles = {
      width: this.state.width,
      height: this.state.height
    };

    if (this.props.type === 'columns') {
      styles.left = this.props.position;
    } else {
      styles.top = this.props.position;
    }

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      {
        style: styles,
        className: this.state.className },
      this.props.children || this.props.index + 1
    );
  }
}

Section.defaultProps = {
  type: 'columns',
  mode: 'default',
  position: '0%',
  className: '',
  index: 0
};

Section.propTypes = {
  type: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOf(['columns', 'rows']),
  mode: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOf(['default', 'spaced']),
  size: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  position: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  gravity: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
  width: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
  height: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
  index: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number
};

/* harmony default export */ __webpack_exports__["a"] = (Section);
module.exports = exports['default'];
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)(module)))

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Section__ = __webpack_require__(1);


class Col extends __WEBPACK_IMPORTED_MODULE_0__Section__["a" /* default */] {
  componentWillMount() {
    console.warn('\nYou are using <' + this.constructor.name + '> component. ' + '<' + this.constructor.name + '> is deprecated and \nmight cease to exist in future versions of ProperLayout.\n' + 'We recommend to use <Section> instead, which will work with the same props.');

    super.componentWillMount();
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Col);
module.exports = exports['default'];
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)(module)))

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_shortid__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_shortid___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_shortid__);


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };





class Layout extends __WEBPACK_IMPORTED_MODULE_0_react__["Component"] {
  constructor(props) {
    super(props);

    this.state = {
      key: 'layout--' + __WEBPACK_IMPORTED_MODULE_2_shortid___default.a.generate(),
      className: 'layout',
      children: null,
      isChildFixed: null,
      adjustTimeout: null
    };

    this.evaluateClasses = this.evaluateClasses.bind(this);
    this.evaluateSizeType = this.evaluateSizeType.bind(this);
    this.evaluateDeprecatedProps = this.evaluateDeprecatedProps.bind(this);
    this.isChildFixed = this.isChildFixed.bind(this);
    this.calculateAutoSize = this.calculateAutoSize.bind(this);
    this.updateChildren = this.updateChildren.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.getDimensions = this.getDimensions.bind(this);
  }

  componentDidMount() {
    // This needs to be done here because Layout should render once for
    // accesing its node and get dimensions to render children
    this.setState(() => _extends({}, this.state, {
      className: this.evaluateClasses(),
      children: this.updateChildren(),
      isChildFixed: this.isChildFixed()
    }));

    window.addEventListener('resize', this.handleResize);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(() => _extends({}, this.state, {
      children: this.updateChildren(nextProps, true)
    }));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  // Adds different CSS classes depending on what props were defined
  evaluateClasses() {
    let className = this.state.className;

    if (this.props.type === 'columns') {
      className += ' columns';
    } else {
      className += ' rows';
    }

    if (this.props.direction === 'reverse') {
      className += ' reverse';
    }

    if (this.props.mode === 'spaced') {
      className += ' spaced';
    }

    if (this.props.borders) {
      className += ' borders';
    }

    return className;
  }

  // Returns size type received in child props
  evaluateSizeType(size) {
    let percent = /^\d+(?:\.\d+)?%$/;

    if (percent.test(size)) {
      return 'percent';
    }

    return 'pixel';
  }

  evaluateDeprecatedProps(child) {
    let props = _extends({}, child.props);

    if (props.size) {
      return props;
    }

    if (props.width && this.props.type === 'columns') {
      props.size = parseFloat(props.width) + 'px';
    }

    if (props.height && this.props.type === 'rows') {
      props.size = parseFloat(props.height) + 'px';
    }

    if (props.gravity >= 0 && props.gravity <= 1) {
      props.size = 100 * props.gravity + '%';
    }

    return props;
  }

  // Check if there is a child with fixed size
  // (this prevents re-rendering when all sections are responsive)
  isChildFixed() {
    if (__WEBPACK_IMPORTED_MODULE_0_react__["Children"].count(this.props.children)) {
      return __WEBPACK_IMPORTED_MODULE_0_react__["Children"].map(this.props.children, child => {
        let props = child.props;

        if (props.size && this.evaluateSizeType(props.size) === 'pixel') {
          return true;
        }

        if (props.gravity === -1 && (props.width || props.height)) {
          return true;
        }

        return false;
      }).some(child => child);
    }

    return false;
  }

  // Handles page resizing
  handleResize() {
    // Update children when at least one has fixed size
    if (this.state.isChildFixed) {
      this.setState(() => _extends({}, this.state, {
        children: this.updateChildren()
      }), () => {
        // Get last rendered values to readjust children
        let parent = this.props.type === 'columns' ? this.getDimensions(this.node).width : this.getDimensions(this.node).height;
        let children = 0;

        this.node.childNodes.forEach(child => {
          children += this.props.type === 'columns' ? this.getDimensions(child).width : this.getDimensions(child).height;
        });

        // Adjusting children with a timeout,
        // so it will update only the last time
        if (parent !== children) {
          clearTimeout(this.state.adjustTimeout);

          this.setState(() => _extends({}, this.state, {
            adjustTimeout: setTimeout(() => {
              this.setState(() => _extends({}, this.state, {
                children: this.updateChildren()
              }));
            }, 200)
          }));
        }
      });
    }
  }

  // Return rendered width and height from a node
  getDimensions(node) {
    let dimensions = node.getBoundingClientRect();

    return {
      width: dimensions.width,
      height: dimensions.height
    };
  }

  // Calculates and returns size for elements without custom sizes
  calculateAutoSize(props = this.props) {
    let counter = 0;
    let totalSpace = props.type === 'columns' ? this.getDimensions(this.node).width : this.getDimensions(this.node).height;
    let freeSpace = totalSpace;

    __WEBPACK_IMPORTED_MODULE_0_react__["Children"].forEach(props.children, (child, index) => {
      let childProps = this.evaluateDeprecatedProps(child);
      let size = childProps.size;

      if (!size) {
        counter++;
      } else {
        let parsedSize = parseFloat(size);
        let sizeType = this.evaluateSizeType(size);

        if (sizeType === 'pixel') {
          freeSpace -= parsedSize;
        } else if (sizeType === 'percent') {
          freeSpace -= totalSpace / 100 * parsedSize;
        }
      }
    });

    // Setting size for elements without custom sizes
    let autoSize = freeSpace * 100 / totalSpace / counter;

    // Avoid negative autoSizes so it wont push siblings over it
    if (autoSize < 0) {
      autoSize = 0;
    }

    return { autoSize, totalSpace };
  }

  // Updating children props for positioning
  updateChildren(props = this.props, manual) {
    let { autoSize, totalSpace } = this.calculateAutoSize(props);
    let nextPosition = 0;

    return __WEBPACK_IMPORTED_MODULE_0_react__["Children"].map(props.children, (child, index) => {
      let childProps = this.evaluateDeprecatedProps(child);

      if (manual) {
        childProps.key = 'section--' + __WEBPACK_IMPORTED_MODULE_2_shortid___default.a.generate();
      }

      childProps.type = props.type;
      childProps.mode = props.mode;
      childProps.borders = props.borders;
      childProps.index = index;

      if (childProps.size) {
        let sizeType = this.evaluateSizeType(childProps.size);
        let parsedSize = parseFloat(childProps.size);

        childProps.position = nextPosition + '%';

        if (sizeType === 'pixel') {
          nextPosition += parsedSize * 100 / totalSpace;
        } else if (sizeType === 'percent') {
          nextPosition += parsedSize;
        }
      } else {
        childProps.size = autoSize + '%';
        childProps.position = nextPosition + '%';

        nextPosition += autoSize;
      }

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.cloneElement(child, childProps);
    });
  }

  render() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      {
        style: { width: '100%', height: '100%' },
        ref: node => {
          this.node = node;
        },
        className: 'ProperLayout ' + this.state.className },
      this.state.children
    );
  }
}

Layout.defaultProps = {
  type: 'columns',
  mode: 'default',
  direction: 'default',
  borders: false
};

Layout.propTypes = {
  type: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOf(['columns', 'rows']),
  mode: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOf(['default', 'spaced']),
  direction: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOf(['default', 'reverse'])
};

/* harmony default export */ __webpack_exports__["a"] = (Layout);
module.exports = exports['default'];
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)(module)))

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Section__ = __webpack_require__(1);


class Row extends __WEBPACK_IMPORTED_MODULE_0__Section__["a" /* default */] {
  componentWillMount() {
    console.warn('\nYou are using <' + this.constructor.name + '> component. ' + '<' + this.constructor.name + '> is deprecated and \nmight cease to exist in future versions of ProperLayout.\n' + 'We recommend to use <Section> instead, which will work with the same props.');

    super.componentWillMount();
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Row);
module.exports = exports['default'];
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)(module)))

/***/ }),
/* 7 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Layout__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Section__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Row__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Col__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__styles_main__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__styles_main___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__styles_main__);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Layout", function() { return __WEBPACK_IMPORTED_MODULE_0__components_Layout__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Section", function() { return __WEBPACK_IMPORTED_MODULE_1__components_Section__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Row", function() { return __WEBPACK_IMPORTED_MODULE_2__components_Row__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Col", function() { return __WEBPACK_IMPORTED_MODULE_3__components_Col__["a"]; });











/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_9__;

/***/ })
/******/ ]);
});