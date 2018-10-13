## Goal-d

# proposed routes
```
/user/:user
  -> about
  -> interests
  -> (network?)
  /map/:topic
      -> topic network
      -> model
      -> goal timeline
      -> show selector
  /model
    -> CRUD models
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

* sign in page
    - remove user id from url


## wishlist
* save as png
* tagging and filtering in the map
* connecting separate maps to each other (deep referencing?)


## future
* people search page
  - given an email address
* use the ddb exclusively
