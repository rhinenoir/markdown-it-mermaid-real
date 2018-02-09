import mermaid  from 'mermaid'
import mermaidUtils  from 'mermaid/src/utils'
import flowRenderer  from 'mermaid/src/diagrams/flowchart/flowRenderer'
import seq  from 'mermaid/src/diagrams/sequenceDiagram/sequenceRenderer'
import inf from 'mermaid/src/diagrams/example/exampleRenderer'
import gantt  from 'mermaid/src/diagrams/gantt/ganttRenderer'
import classRenderer  from 'mermaid/src/diagrams/classDiagram/classRenderer'
import gitGraphRenderer  from 'mermaid/src/diagrams/gitGraph/gitGraphRenderer'

const uidLength = 16;
const crypto = window.crypto || window.msCrypto;
const alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const array = new Uint32Array(uidLength);

function uid() {
	crypto.getRandomValues(array);
	return array.cl_map(value => alphabet[value % alphabet.length]).join('');
}

const config = {
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
			['%I:%M', d => d.getHours()],
			// Monday a week
			['w. %U', d => d.getDay() === 1],
			// Day within a week (not monday)
			['%a %d', d => d.getDay() && d.getDate() !== 1],
			// within a month
			['%b %d', d => d.getDate() !== 1],
			// Month
			['%m-%y', d => d.getMonth()],
		],
	},
	classDiagram: {},
	gitGraph: {},
	info: {},
}
const mermaidChart = (code) => {
	const mermaidSvgId = `mermaid-svg-${uid()}`;
	const txt = code;
	var parsedHtml = '';
	try {
		const graphType = mermaidUtils.detectType(txt);
		switch (graphType) {
			case 'gitGraph':
				config.flowchart.arrowMarkerAbsolute = config.arrowMarkerAbsolute;
				gitGraphRenderer.setConf(config.gitGraph);
				gitGraphRenderer.draw(txt, svgId, false);
				break;
			case 'graph':
				config.flowchart.arrowMarkerAbsolute = config.arrowMarkerAbsolute;
				flowRenderer.setConf(config.flowchart);
				flowRenderer.draw(txt, svgId, false);
				break;
			case 'dotGraph':
				config.flowchart.arrowMarkerAbsolute = config.arrowMarkerAbsolute;
				flowRenderer.setConf(config.flowchart);
				flowRenderer.draw(txt, svgId, true);
				break;
			case 'sequenceDiagram':
				config.sequenceDiagram.arrowMarkerAbsolute = config.arrowMarkerAbsolute;
				seq.setConf(config.sequenceDiagram);
				seq.draw(txt, svgId);
				break;
			case 'gantt':
				config.gantt.arrowMarkerAbsolute = config.arrowMarkerAbsolute;
				gantt.setConf(config.gantt);
				gantt.draw(txt, svgId);
				break;
			case 'classDiagram':
				config.classDiagram.arrowMarkerAbsolute = config.arrowMarkerAbsolute;
				classRenderer.setConf(config.classDiagram);
				classRenderer.draw(txt, svgId);
				break;
			case 'info':
			default:
				config.info.arrowMarkerAbsolute = config.arrowMarkerAbsolute;
				info.draw(txt, svgId, 'Unknown');
				break;

			const parsedHtml = `<div class="mermaid"><svg xmlns="http://www.w3.org/2000/svg" id="${mermaidSvgId}"><g></g>${txt}</svg></div>`
		}
	} catch (e) {
		parsedHtml = `<pre>${code}</pre>`
		console.error(e);
		console.error(txt);
	}
	return parsedHtml
}

const MermaidPlugin = (md) => {
	md.mermaid = mermaid
	const temp = md.renderer.rules.fence.bind(md.renderer.rules)
	md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
		const token = tokens[idx]
		const code = token.content.trim()
		if (token.info === 'mermaid') {
			return mermaidChart(code)
		}
		return temp(tokens, idx, options, env, slf)
	}
}

export default MermaidPlugin
