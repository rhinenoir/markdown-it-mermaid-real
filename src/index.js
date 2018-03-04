import mermaid  from 'mermaid'
import mermaidAPI  from 'mermaid/src/mermaidAPI'
import crypto  from 'crypto'

const mermaidNode = {code:"", id:"", content:""}

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
    console.log(svgGraph)
    mermaidNode.content=svgGraph
}
const mermaidChart = () => {
    try {
        mermaid.parse(mermaidNode.code)
        crypto.randomBytes(8,function(err, buffer) {
            const svgId = buffer.toString('hex')
        })
        mermaidAPI.render(svgId, mermaidNode.code, callback)
    } catch ({ str, hash }) {
        mermaidNode.content = `<pre>${mermaidNode.code}</pre>`
    }
}

const MermaidPlugin = (md) => {
    md.mermaid = mermaid
    const temp = md.renderer.rules.fence.bind(md.renderer.rules)
    md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
        const token = tokens[idx]
        const code = token.content.trim()
        if (token.info === 'mermaid') {
            mermaidNode.code = code
            mermaidChart()
            return mermaidNode.content
        }
        return temp(tokens, idx, options, env, slf)
    }
}

export default MermaidPlugin
