## Goal-d

# proposed routes
```
/user
  -> about
  -> interests
  -> (network)
  /map
    -> my network
    /:goal-id
      -> my metwork
        (with goal-id selected)
      -> goal timeline
/about
```

```
proposed redis
incr user-details-key
hget user-details {user-details,network,goal-network}
```

# TODO
* better views of graphs
    - when you click something, you only see its children and parents in a family tree structure
* save and refresh button
* Goal completion
    - marking tasks as {open (white), in progress (yellow), completed (green), no go (gray)}

* deep link to specific goal (see better views of graphs)
* calendar http://react-component.github.io/calendar/
* sign in page
    - remove user id from url


## wishlist
* save as png
* tagging and filtering in the map
* connecting separate maps to each other (deep referencing?)
