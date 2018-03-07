import mermaid  from 'mermaid'
import crypto  from 'crypto'

const mermaidNode = { svgGraph:"" }

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
    info: {}
}

function callback(svgGraph) {
	mermaidNode.svgGraph = svgGraph
	console.log("svgGraph: "+mermaidNode.svgGraph)
}

const mermaidChart = (code, theme) => {
	var svgGraph = ''
	var svgId = '233'
    try {
    	const mermaidAPI = mermaid.mermaidAPI
    	mermaidAPI.initialize({ startOnLoad:false, theme: theme });
        mermaid.parse(code)
        // crypto.randomBytes(8, function(err, buffer) {
        //     svgId = buffer.toString('hex')
        // })
        console.log("code: "+code)
        console.log("Id: "+svgId)
        mermaidAPI.render(svgId, code, callback)
    } catch (e) {
        mermaidNode.svgGraph = `<pre>${code}</pre>`
        console.error(e)
    }
}

const MermaidPlugin = (md) => {
    const temp = md.renderer.rules.fence.bind(md.renderer.rules)
    md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
    	const themeForMermaid = md.themeForMermaid || 'default'
        const token = tokens[idx]
        const code = token.content.trim()
        if (token.info === 'mermaid') {
            mermaidChart(code, themeForMermaid)
            return mermaidNode.svgGraph
        }
        return temp(tokens, idx, options, env, slf)
    }
}

export default MermaidPlugin
