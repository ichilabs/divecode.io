---
title: "Longest Consecutive Sequence"
date: "2025-02-04"
authors:
  - "jathurchan"
featuredVideo: "https://youtu.be/kqENxeCApDE"
projects:
  - "52"
---

```python
class Solution:
    def longestConsecutive(self, nums: List[int]) -> int:
        # nums = [100,4,200,1,3,2]
        # num nums+1 and nums-1 are there?
        # start, end, and intermediate numbers: nums-1 does not exist
        # then it is the start of a sequence
        # 1. Set
        # 2. Iterate over the elements in the set
        # 3. if start of a sequence, I can loop until the end of the seq and count

        elems = set(nums)

        ans = 0

        for num in elems:
            if num-1 not in elems: # start of a sequence?
                curr = num

                while curr+1 in elems:
                    curr += 1

                ans = max(curr-num+1, ans)

        return ans

        # nums = [0,3,7,2,5,8,4,6,0,1]
        # {0, 1, 2, 3, 4, 5, 6, 7, 8}
        # 9

        # Time complexity: O(n)
        # Space complexity: O(n)
```
