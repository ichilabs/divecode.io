---
title: "Climbing Stairs"
date: "2025-02-04"
authors:
  - "jathurchan"
featuredVideo: "https://youtu.be/-4GXUCIQCc4"
projects:
  - "52"
---

```python
class Solution:
    def climbStairs(self, n: int) -> int:
        # n = 2
        # (1) 1 + 1 (2) 2
        # n = 3
        # [ , , ]
        # if we make 1, then [ , ] -> 2
        # if we make 2, then [ ] -> 1
        # 2 + 3
        # recursion n= 2 and n = 1, given n > 2, climbStairs(n-1) + climbStairs(n-2)

        if n < 3:
            return n

        curr = 2
        curr_val, prev_val = 2, 1

        while curr < n:
            temp = curr_val
            curr_val = curr_val + prev_val
            prev_val = temp
            curr += 1
        
        return curr_val

        # time: O(n)
        # space: O(1)
```
