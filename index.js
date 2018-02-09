'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mermaid = require('mermaid');

var _mermaid2 = _interopRequireDefault(_mermaid);

var _utils = require('mermaid/src/utils');

var _utils2 = _interopRequireDefault(_utils);

var _flowRenderer = require('mermaid/src/diagrams/flowchart/flowRenderer');

var _flowRenderer2 = _interopRequireDefault(_flowRenderer);

var _sequenceRenderer = require('mermaid/src/diagrams/sequenceDiagram/sequenceRenderer');

var _sequenceRenderer2 = _interopRequireDefault(_sequenceRenderer);

var _exampleRenderer = require('mermaid/src/diagrams/example/exampleRenderer');

var _exampleRenderer2 = _interopRequireDefault(_exampleRenderer);

var _ganttRenderer = require('mermaid/src/diagrams/gantt/ganttRenderer');

var _ganttRenderer2 = _interopRequireDefault(_ganttRenderer);

var _classRenderer = require('mermaid/src/diagrams/classDiagram/classRenderer');

var _classRenderer2 = _interopRequireDefault(_classRenderer);

var _gitGraphRenderer = require('mermaid/src/diagrams/gitGraph/gitGraphRenderer');

var _gitGraphRenderer2 = _interopRequireDefault(_gitGraphRenderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var uidLength = 16;
var crypto = window.crypto || window.msCrypto;
var alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
var array = new Uint32Array(uidLength);

function uid() {
	crypto.getRandomValues(array);
	return array.cl_map(function (value) {
		return alphabet[value % alphabet.length];
	}).join('');
}

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
var mermaidChart = function mermaidChart(code) {
	var mermaidSvgId = 'mermaid-svg-' + uid();
	var txt = code;
	var parsedHtml = '';
	try {
		var graphType = _utils2.default.detectType(txt);
		switch (graphType) {
			case 'gitGraph':
				config.flowchart.arrowMarkerAbsolute = config.arrowMarkerAbsolute;
				_gitGraphRenderer2.default.setConf(config.gitGraph);
				_gitGraphRenderer2.default.draw(txt, svgId, false);
				break;
			case 'graph':
				config.flowchart.arrowMarkerAbsolute = config.arrowMarkerAbsolute;
				_flowRenderer2.default.setConf(config.flowchart);
				_flowRenderer2.default.draw(txt, svgId, false);
				break;
			case 'dotGraph':
				config.flowchart.arrowMarkerAbsolute = config.arrowMarkerAbsolute;
				_flowRenderer2.default.setConf(config.flowchart);
				_flowRenderer2.default.draw(txt, svgId, true);
				break;
			case 'sequenceDiagram':
				config.sequenceDiagram.arrowMarkerAbsolute = config.arrowMarkerAbsolute;
				_sequenceRenderer2.default.setConf(config.sequenceDiagram);
				_sequenceRenderer2.default.draw(txt, svgId);
				break;
			case 'gantt':
				config.gantt.arrowMarkerAbsolute = config.arrowMarkerAbsolute;
				_ganttRenderer2.default.setConf(config.gantt);
				_ganttRenderer2.default.draw(txt, svgId);
				break;
			case 'classDiagram':
				config.classDiagram.arrowMarkerAbsolute = config.arrowMarkerAbsolute;
				_classRenderer2.default.setConf(config.classDiagram);
				_classRenderer2.default.draw(txt, svgId);
				break;
			case 'info':
			default:
				config.info.arrowMarkerAbsolute = config.arrowMarkerAbsolute;
				info.draw(txt, svgId, 'Unknown');
				break;

				var _parsedHtml = '<div class="mermaid"><svg xmlns="http://www.w3.org/2000/svg" id="' + mermaidSvgId + '"><g></g>' + txt + '</svg></div>';
		}
	} catch (e) {
		parsedHtml = '<pre>' + code + '</pre>';
		console.error(e);
		console.error(txt);
	}
	return parsedHtml;
};

var MermaidPlugin = function MermaidPlugin(md) {
	md.mermaid = _mermaid2.default;
	var temp = md.renderer.rules.fence.bind(md.renderer.rules);
	md.renderer.rules.fence = function (tokens, idx, options, env, slf) {
		var token = tokens[idx];
		var code = token.content.trim();
		if (token.info === 'mermaid') {
			return mermaidChart(code);
		}
		return temp(tokens, idx, options, env, slf);
	};
};

exports.default = MermaidPlugin;
module.exports = exports['default'];
