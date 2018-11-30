import cytoscape from 'cytoscape'
import coseBilkent from 'cytoscape-cose-bilkent'
import edgehandles from 'cytoscape-edgehandles'
import cxtmenu from 'cytoscape-cxtmenu'
import uuid from 'uuid'

import GoalDContextMenu from './context-menu.js'
import GoalDEdge from './edge-handle.js'

coseBilkent(cytoscape)
edgehandles(cytoscape)
cxtmenu(cytoscape)

export default ({ selected, unselected, handleColor, element = 'cy', fontSize, userZoomingEnabled = false }) => {
  const cy = cytoscape({
    container: document.getElementById(element),
    userZoomingEnabled,
    layout: { name: 'preset' },
    style: cytoscape.stylesheet()
      .selector('node')
      .css({
        'background-color': unselected,
        'width': 'mapData(baz, 0, 10, 10, 40)',
        'height': 'mapData(baz, 0, 10, 10, 40)',
        'content': 'data(label)',
        'font-size': fontSize
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
        'background-color': selected,
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

  cy.edgehandles(GoalDEdge.bind(this)({ handleColor }))
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
