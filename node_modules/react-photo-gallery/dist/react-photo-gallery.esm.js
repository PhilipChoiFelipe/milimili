import React from 'react';
import PropTypes from 'prop-types';
import ResizeObserver from 'resize-observer-polyfill';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

var imgWithClick = {
  cursor: 'pointer'
};

var Photo = function Photo(_ref) {
  var index = _ref.index,
      onClick = _ref.onClick,
      photo = _ref.photo,
      margin = _ref.margin,
      direction = _ref.direction,
      top = _ref.top,
      left = _ref.left;
  var imgStyle = {
    margin: margin
  };

  if (direction === 'column') {
    imgStyle.position = 'absolute';
    imgStyle.left = left;
    imgStyle.top = top;
  }

  var handleClick = function handleClick(event) {
    onClick(event, {
      photo: photo,
      index: index
    });
  };

  return React.createElement("img", _extends({
    style: onClick ? _objectSpread({}, imgStyle, imgWithClick) : imgStyle
  }, photo, {
    onClick: onClick ? handleClick : null
  }));
};

var photoPropType = PropTypes.shape({
  src: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  alt: PropTypes.string,
  title: PropTypes.string,
  srcSet: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  sizes: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
});
Photo.propTypes = {
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func,
  photo: photoPropType.isRequired,
  margin: PropTypes.number,
  top: function top(props) {
    if (props.direction === 'column' && typeof props.top !== 'number') {
      return new Error('top is a required number when direction is set to `column`');
    }
  },
  left: function left(props) {
    if (props.direction === 'column' && typeof props.left !== 'number') {
      return new Error('left is a required number when direction is set to `column`');
    }
  },
  direction: PropTypes.string
};

function round(value, decimals) {
  if (!decimals) decimals = 0;
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
} // return two decimal places rounded number

function ratio(_ref) {
  var width = _ref.width,
      height = _ref.height;
  return round(width / height, 2);
} // takes the Gallery's photos array, width of the container,
// margin between photos Gallery prop, and columns Gallery prop.
// calculates, sizes based on columns and returns the photos array
// with new height/width props in each object

function computeSizes(_ref2) {
  var photos = _ref2.photos,
      columns = _ref2.columns,
      width = _ref2.width,
      margin = _ref2.margin;

  if (!width) {
    return [];
  } // divide photos over rows, max cells based on `columns`
  // effectively resulting in [[0, 1, 2], [3, 4, 5], [6, 7]]


  var rows = photos.reduce(function (acc, cell, idx) {
    var row = Math.floor(idx / columns);
    acc[row] = acc[row] ? [].concat(_toConsumableArray(acc[row]), [cell]) : [cell]; // eslint-disable-line no-param-reassign

    return acc;
  }, []); // calculate total ratio of each row, and adjust each cell height and width
  // accordingly.

  var ratios = [];
  var rowsWithSizes = rows.map(function (row, rowIndex) {
    var totalRatio = row.reduce(function (result, photo) {
      return result + ratio(photo);
    }, 0);
    var rowWidth = width - row.length * (margin * 2); // save total ratio of each row

    if (rowIndex !== rows.length - 1) ratios.push(totalRatio); // assign height
    // 3 scenarios...
    //  if its a regular row where row.length === columns
    //    rowWidth / totalRatio
    //  if columns > row.length
    //    if !lastRow
    //      use the average aspect ratio of previous rows
    //    else (all photos are on a single row)
    //      ...

    var height = row.length === columns ? rowWidth / totalRatio : photos.length < columns ? rowWidth / totalRatio * (row.length / columns) : rowWidth / (ratios.reduce(function (acc, item) {
      return acc + item;
    }, 0) / (rows.length - 1));
    return row.map(function (photo) {
      return _objectSpread({}, photo, {
        height: round(height, 1),
        width: round(height * ratio(photo), 1)
      });
    });
  });
  return rowsWithSizes.reduce(function (acc, row) {
    return [].concat(_toConsumableArray(acc), _toConsumableArray(row));
  }, []);
}
function computeSizesColumns(_ref3) {
  var photos = _ref3.photos,
      columns = _ref3.columns,
      width = _ref3.width,
      margin = _ref3.margin;
  // calculate each colWidth based on total width and column amount
  var colWidth = (width - margin * 2 * columns) / columns; // map through each photo to assign adjusted height and width based on colWidth

  var photosWithSizes = photos.map(function (photo) {
    var newHeight = photo.height / photo.width * colWidth;
    return _objectSpread({}, photo, {
      width: round(colWidth, 1),
      height: round(newHeight, 1)
    });
  }); // store all possible left positions
  // and current top positions for each column

  var colLeftPositions = [];
  var colCurrTopPositions = [];

  for (var i = 0; i < columns; i++) {
    colLeftPositions[i] = round(i * (colWidth + margin * 2), 1);
    colCurrTopPositions[i] = 0;
  } // map through each photo, then reduce thru each "column"
  // find column with the smallest height and assign to photo's 'top'
  // update that column's height with this photo's height


  var photosPositioned = photosWithSizes.map(function (photo) {
    var smallestCol = colCurrTopPositions.reduce(function (acc, item, i) {
      acc = item < colCurrTopPositions[acc] ? i : acc;
      return acc;
    }, 0);
    photo.top = colCurrTopPositions[smallestCol];
    photo.left = colLeftPositions[smallestCol];
    colCurrTopPositions[smallestCol] = colCurrTopPositions[smallestCol] + photo.height + margin * 2; // store the tallest col to use for gallery height because of abs positioned elements

    var tallestCol = colCurrTopPositions.reduce(function (acc, item, i) {
      acc = item > colCurrTopPositions[acc] ? i : acc;
      return acc;
    }, 0);
    photo.containerHeight = colCurrTopPositions[tallestCol];
    return photo;
  });
  return photosPositioned;
}

var Gallery =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Gallery, _React$Component);

  function Gallery() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Gallery);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Gallery)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      containerWidth: 0
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleClick", function (event, _ref) {
      var index = _ref.index;
      var _this$props = _this.props,
          photos = _this$props.photos,
          onClick = _this$props.onClick;
      onClick(event, {
        index: index,
        photo: photos[index],
        previous: photos[index - 1] || null,
        next: photos[index + 1] || null
      });
    });

    return _this;
  }

  _createClass(Gallery, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.animationFrameID = null;
      this.observer = new ResizeObserver(function (entries) {
        // only do something if width changes
        var newWidth = entries[0].contentRect.width;

        if (_this2.state.containerWidth !== newWidth) {
          // put in an animation frame to stop "benign errors" from
          // ResizObserver https://stackoverflow.com/questions/49384120/resizeobserver-loop-limit-exceeded
          _this2.animationFrameID = window.requestAnimationFrame(function () {
            _this2.setState({
              containerWidth: Math.floor(newWidth)
            });
          });
        }
      });
      this.observer.observe(this._gallery);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.observer.disconnect();
      window.cancelAnimationFrame(this.animationFrameID);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var containerWidth = this.state.containerWidth; // no containerWidth until after first render with refs, skip calculations and render nothing

      if (!containerWidth) return React.createElement("div", {
        ref: function ref(c) {
          return _this3._gallery = c;
        }
      }, "\xA0");
      var _this$props$ImageComp = this.props.ImageComponent,
          ImageComponent = _this$props$ImageComp === void 0 ? Photo : _this$props$ImageComp; // subtract 1 pixel because the browser may round up a pixel

      var _this$props2 = this.props,
          margin = _this$props2.margin,
          onClick = _this$props2.onClick,
          direction = _this$props2.direction;
      var columns = this.props.columns; // allow parent to calculate columns from containerWidth

      if (typeof columns === 'function') {
        columns = columns(containerWidth);
      } // set default breakpoints if user doesn't specify columns prop


      if (columns === undefined) {
        columns = 1;
        if (containerWidth >= 500) columns = 2;
        if (containerWidth >= 900) columns = 3;
        if (containerWidth >= 1500) columns = 4;
      }

      var photos = this.props.photos;
      var width = containerWidth - 1;
      var galleryStyle, thumbs;

      if (direction === 'row') {
        galleryStyle = {
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'row'
        };
        thumbs = computeSizes({
          width: width,
          columns: columns,
          margin: margin,
          photos: photos
        });
      }

      if (direction === 'column') {
        galleryStyle = {
          position: 'relative'
        };
        thumbs = computeSizesColumns({
          width: width,
          columns: columns,
          margin: margin,
          photos: photos
        });
        galleryStyle.height = thumbs[thumbs.length - 1].containerHeight;
      }

      return React.createElement("div", {
        className: "react-photo-gallery--gallery"
      }, React.createElement("div", {
        ref: function ref(c) {
          return _this3._gallery = c;
        },
        style: galleryStyle
      }, thumbs.map(function (photo, index) {
        var left = photo.left,
            top = photo.top,
            containerHeight = photo.containerHeight,
            rest = _objectWithoutProperties(photo, ["left", "top", "containerHeight"]);

        return React.createElement(ImageComponent, {
          key: photo.key || photo.src,
          margin: margin,
          index: index,
          photo: rest,
          direction: direction,
          left: left,
          top: top,
          onClick: onClick ? _this3.handleClick : null
        });
      })));
    }
  }]);

  return Gallery;
}(React.Component);

Gallery.propTypes = {
  photos: PropTypes.arrayOf(photoPropType).isRequired,
  direction: PropTypes.string,
  onClick: PropTypes.func,
  columns: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  margin: PropTypes.number,
  ImageComponent: PropTypes.func
};
Gallery.defaultProps = {
  margin: 2,
  direction: 'row'
};

export default Gallery;
