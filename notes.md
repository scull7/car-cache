CART: Clock with Adaptive Replacement and Temporal Locality
===========================================================

Rules
-----

* T1 and T2 - maintain the current pages (keys) in the cache.
* B1 and B2 - maintain history about recently evicted pages
* T1 and T2 each maintain a reference bit (x.q)
* T1 (x.q = 0) ∪ B1 is the `short-term utility` or recency part of the cache.
* T1 (x.q = 1) ∪ T2 ∪ B2 is the `long-term utility` or frequency part of the cache.

Let "c" equal the cache size in number of entries.
Let "p" equal the target size for the page (key) list T1.
Let "x" equal a page (key) in the cache.
Let "x.q" equal a page (key) reference bit
Let "x.type = L" denote long term utility.
Let "x.type = S" denote short term utility.

Let "x.q = 0" denote a volatile cache item (safe to remove)
Let "x.q = 1" denote a stable cache item (not safe to remove)

1.  If x ∈ T2 ∪ B2, then x.type = L

2.  If x ∈ B1, then x.type = S

3.  If x ∈ T1, then x.type = S or L

4.  The head x ∈ T1 may only be replaced if x.type == S and x.q = 0

5.  If the head x ∈ T1 where x.type = L, then it must be moved to the tail of T2
    and then set x.q = 0
     
6.  If the head x ∈ T1 where x.type = S, then is must be moved to the tail of T1
    and then set x.q = 0
    
7.  If the head x ∈ T2 has x.q = 0, then, and only then, may it be replaced.
 
8.  If the head x ∈ T2 has x.q = 1, then it must be moved to the tail of T1 and 
    then set x.q = 0
    
9.  If x ∈ T1 ∪ B1 ∪ B2 ∪ T2, then set x.type = S

10. If x ∈ T1 and |T1| ≥ |B1| then set x.type = L

11. If x ∈ T2 ∪ B2 then leave x.type unchanged

12. If x ∈ B2 and x.type = S, then set x.type = L

New Page
--------

A new page is inserted at the tail of T1 with x.q = 0 and x.type = S 

If x ∈ B1 and x.type = S when x is hit, then promote to T1 and set x.type = L

Temporal Locality
-----------------

* The length of T1 is the temporal
* If x ∈ B1, then increase the size of T1

Miscellany
----------
* Thinking we should use `async.parallel` to search T1 ∪ B1 ∪ B2 ∪ T2

* Should we treat T1, B1, B2, T2 as separate objects?

