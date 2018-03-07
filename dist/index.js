module.exports =
/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mermaid = __webpack_require__(1);

var _mermaid2 = _interopRequireDefault(_mermaid);

var _crypto = __webpack_require__(2);

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mermaidNode = { svgGraph: "" };

var config = {
    logLevel: 5,
    startOnLoad: false,
    arrowMarkerAbsolute: false,
    flowchart: {},
    sequenceDiagram: {},
    gantt: {
        titleTopMargin: 25,
        barHeight: 20,
        barGap: 4,
        topPadding: 50,
        leftPadding: 75,
        gridLineStartPadding: 35,
        fontSize: 11,
        fontFamily: '"Open-Sans", "sans-serif"',
        numberSectionStyles: 3,
        axisFormatter: [
        // Within a day
        ['%I:%M', function (d) {
            return d.getHours();
        }],
        // Monday a week
        ['w. %U', function (d) {
            return d.getDay() === 1;
        }],
        // Day within a week (not monday)
        ['%a %d', function (d) {
            return d.getDay() && d.getDate() !== 1;
        }],
        // within a month
        ['%b %d', function (d) {
            return d.getDate() !== 1;
        }],
        // Month
        ['%m-%y', function (d) {
            return d.getMonth();
        }]]
    },
    classDiagram: {},
    gitGraph: {},
    info: {}
};

function callback(svgGraph) {
    mermaidNode.svgGraph = svgGraph;
    console.log("svgGraph: " + mermaidNode.svgGraph);
}

var mermaidChart = function mermaidChart(code, theme) {
    var svgGraph = '';
    var svgId = '233';
    try {
        var mermaidAPI = _mermaid2.default.mermaidAPI;
        mermaidAPI.initialize({ startOnLoad: false, theme: theme });
        _mermaid2.default.parse(code);
        // crypto.randomBytes(8, function(err, buffer) {
        //     svgId = buffer.toString('hex')
        // })
        console.log("code: " + code);
        console.log("Id: " + svgId);
        mermaidAPI.render(svgId, code, callback);
    } catch (e) {
        mermaidNode.svgGraph = '<pre>' + code + '</pre>';
        console.error(e);
    }
};

var MermaidPlugin = function MermaidPlugin(md) {
    var temp = md.renderer.rules.fence.bind(md.renderer.rules);
    md.renderer.rules.fence = function (tokens, idx, options, env, slf) {
        var themeForMermaid = md.themeForMermaid || 'default';
        var token = tokens[idx];
        var code = token.content.trim();
        if (token.info === 'mermaid') {
            mermaidChart(code, themeForMermaid);
            return mermaidNode.svgGraph;
        }
        return temp(tokens, idx, options, env, slf);
    };
};

exports.default = MermaidPlugin;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("mermaid");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map