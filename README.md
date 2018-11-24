## Goal-d
fueled by http://js.cytoscape.org/

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
* use append_list?
* lock down s3 access, move index to source from lambda?
* enter on title pressed
* optimize for phone
* graph! -> name the node
* make the first name be graph to be the title
* what - why - how / where - who
* download file, share, 
* user + regular person, user explaining, 
* ui is confusing
* on topic, save (with user feedback)
* on topic, help with some kind of open symbol
* on topic, add a tutorial symbol, with tutorial
* on user page, delete topics, delete notes
* on user page, new topic should navigate to map


## wishlist
* save as png
* tagging and filtering in the map
* connecting separate maps to each other (deep referencing?)

## future
* people search page
  - given an email address
