## Goal-d
```
# proposed routes
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
