/**
 * This is an implementation of the CART (Clock with Adaptive Replacement
 * with Temporal Filtering) Cache.
 * @see [CAR: Clock with Adaptive Replacement](http://www-cs.stanford.edu/~sbansal/pubs/fast04.pdf)
 * @type {Array}
 */

var
    /**
     * `T1 ` is the CLOCK style list that represents all fo the "recent" or
     *  "short-term utility items within the cache.
     *  @type {Array}
     */
    T1  = [],
    /**
     * `T2 ` is the CLOCK style list that represents all of the "frequent" or
     * "long-term" utility items within the cache.
     * @type {Array}
     */
    T2  = [],
    /**
     * `B1` is the LRU style list that represents all of the items that have been
     * recently demoted from the `T1` list. (history)
     * @type {Array}
     */
    B1  = [],
    /**
     * `B2` is the LRU style list that represents all of the items that have been
     * recently demoted from the `T2` list.  (history)
     * @type {Array}
     */
    B2  = [],
    /**
     * This is the cache object that stores all items and their associated keys.
     * @type {Object}
     */
    p     = 0,
    q     = 0,
    nS    = 0,
    nL    = 0,
    cache = null
;

module.exports  = function (cache) {

};

function search(list, key) {
  return list.find(function (el) {
    if(el.key === key) return el;
  });
  return list.find(key);
}


function get(key, done) {
  if (search(T1, key) > 0 || search(T2, key) > 0) {
    /* cache hit */
    return cache.get(key, function (err, value) {
      if (err) {
        return done(err);
      }
      value.ref = 1;
      return done(null, value);
    });
    /* Cache miss */
  } else {
    /* cache full, replace a page from the cache */
    if(cache.full()) {
      replace();
      /* cache directory placement */
//      if(search(B1, key) < 1 && search(B2 < ))
    }
  }
}

function replace() {

}