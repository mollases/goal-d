## Goal-d
fueled by http://js.cytoscape.org/

https://docs.aws.amazon.com/cli/latest/userguide/cli-install-macos.html#awscli-install-osx-path


# proposed routes
```
/user/
  -> about
  -> interests
  -> (network?)
  /map/:topic
      -> topic network
      -> model
      -> goal timeline
      -> show selector
  /model
    -> CRUD models (dont remember why I wanted this...)
/about
```

# proposed tables
```
user-details {about,interest,goal-network}
user-details-map {topic network with applied models}
user-details-map-topic {topic timeline}
user-details-models {models}
```

# TODO
* Goal completion
    - marking tasks as {open (white), in progress (yellow), completed (green), no go (gray)}
    - where to save these?
        - is there a way to update just that element? (refactor may be needed)
* click to edit text, move control plane to right or below cyto window
* lock down s3 access, move index to source from lambda?
* enter on title pressed
* optimize for phone
* graph! -> name the node
* what - why - how / where - who
* download file, share
* user + regular person, user explaining, 
* ui is confusing
* on topic, save (with user feedback)
* on topic, help with some kind of open symbol
* on topic, add a tutorial symbol, with tutorial
* on user page, delete topics, delete notes
* on user page, new topic should navigate to map
* chainlet.io?
* linkist.org
* move user-topic to container layer
* extract and move goal-node to container layer
* add https://github.com/iVis-at-Bilkent/cytoscape.js-autopan-on-drag
* add https://github.com/cytoscape/cytoscape.js-panzoom

## wishlist
* save as png
* tagging and filtering in the map
* connecting separate maps to each other (deep referencing?)

## future
* people search page
  - given an email address
