export default {
  menuRadius: 100, // the radius of the circular menu in pixels
  selector: 'node, edge', // elements matching this Cytoscape.js selector will trigger cxtmenus
  commands: (ele) => {
    var cmds = [{
      content: 'delete',
      select: (ele) => {
        ele.remove()
      }
    }]
    // if (ele.isEdge()) {
    //   cmds.push({
    //     content: 'dashed',
    //     select: (ele) => {
    //       ele.style({ 'line-style': 'dashed' })
    //     }
    //   }, {
    //     content: 'solid',
    //     select: (ele) => {
    //       ele.style({ 'line-style': 'solid' })
    //     }
    //   }, {
    //     content: 'dotted',
    //     select: (ele) => {
    //       ele.style({ 'line-style': 'dotted' })
    //     }
    //   })
    // } else if (ele.isParent()) {
    //   cmds.push({
    //     content: 'free children',
    //     select: (ele) => {
    //       ele.children().move({ parent: null })
    //     }
    //   })
    // }
    return cmds
  }, // function( ele ){ return [ /*...*/ ] }, // example function for commands
  fillColor: 'rgba(0, 0, 0, 0.75)', // the background colour of the menu
  activeFillColor: 'rgba(92, 194, 237, 0.75)', // the colour used to indicate the selected command
  activePadding: 20, // additional size in pixels for the active command
  indicatorSize: 24, // the size in pixels of the pointer to the active command
  separatorWidth: 3, // the empty spacing in pixels between successive commands
  spotlightPadding: 4, // extra spacing in pixels between the element and the spotlight
  minSpotlightRadius: 24, // the minimum radius in pixels of the spotlight
  maxSpotlightRadius: 38, // the maximum radius in pixels of the spotlight
  openMenuEvents: 'cxttapstart taphold', // space-separated cytoscape events that will open the menu; only `cxttapstart` and/or `taphold` work here
  itemColor: 'white', // the colour of text in the command's content
  itemTextShadowColor: 'black', // the text shadow colour of the command's content
  zIndex: 9999, // the z-index of the ui div
  atMouse: false // draw menu at mouse position
}
