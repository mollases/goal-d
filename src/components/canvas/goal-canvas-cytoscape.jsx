import cytoscape from 'cytoscape'
import coseBilkent from 'cytoscape-cose-bilkent'
import edgehandles from 'cytoscape-edgehandles'
import cxtmenu from 'cytoscape-cxtmenu'
import uuid from 'uuid'

import GoalDContextMenu from './goal-canvas-context.jsx'
import GoalDEdge from './goal-canvas-edge.jsx'

coseBilkent(cytoscape)
edgehandles(cytoscape)
cxtmenu(cytoscape)

export default (elements) => {
  const cy = cytoscape({
    container: document.getElementById('cy'),
    panningEnabled: false,
    elements,
    layout: { name: 'preset' },
    style: cytoscape.stylesheet()
      .selector('node')
      .css({
        'background-color': '#B3767E',
        'width': 'mapData(baz, 0, 10, 10, 40)',
        'height': 'mapData(baz, 0, 10, 10, 40)',
        'content': 'data(label)'
      })
      .selector('edge')
      .css({
        'content': 'data(label)',
        'curve-style': 'bezier',
        'width': 2,
        'target-arrow-shape': 'triangle',
        'opacity': 0.5
      })
      .selector(':selected')
      .css({
        'background-color': 'black',
        'line-color': 'black',
        'target-arrow-color': 'black',
        'source-arrow-color': 'black',
        'opacity': 1
      })
      .selector(':parent')
      .css({
        'background-opacity': 0.333
      })
      .selector('.faded')
      .css({
        'opacity': 0.25,
        'text-opacity': 0
      })
  })

  cy.edgehandles(GoalDEdge.bind(this)())
  cy.cxtmenu(GoalDContextMenu)

  var tappedBefore
  var tappedTimeout

  cy.on('tap', (event) => {
    var tappedNow = event.target
    if (tappedTimeout && tappedBefore) {
      clearTimeout(tappedTimeout)
    }
    if (tappedBefore === tappedNow) {
      tappedNow.trigger('doubleTap', event.position)
      tappedBefore = null
    } else {
      tappedTimeout = setTimeout(() => { tappedBefore = null }, 300)
      tappedBefore = tappedNow
    }
  })

  cy.on('doubleTap', (event, pos) => {
    cy.add({ data: { label: '', id: uuid() }, position: pos })
  })
  return cy
}
