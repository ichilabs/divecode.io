---
title: "House Robber"
date: "2025-02-04"
authors:
  - "jathurchan"
featuredVideo: "https://youtu.be/9W-XN5YSE5g"
projects:
  - "52"
---

```python
class Solution:
    def rob(self, nums: List[int]) -> int:
        # nums = [1,2,3,1]
        # {1, 3} -> 4
        # {2, 1} -> 3
        # [1] -> 1, [1, 2] -> 2, [1, 2, 3] -> max(1 + [3], [2 , 3]) = 4
        # if nums[i] is taken, nums[i] + rob(nums[i+2:]) else rob(nums[i+1])
        # max(nums[i] + rob(nums[i+2:]), rob(nums[i+1]))
        # base cases: when i = n-1, nums[-1] / i = n-2, max(nums[-2], nums[-1])

        n = len(nums)

        if n ==  1:
            return nums[0]
        elif n == 2:
            return max(nums[0], nums[1])
        
        currIdx = n-3

        first, second = max(nums[-1], nums[-2]), nums[-1]  # i+1, i+2

        while currIdx >= 0:
            currVal = max(nums[currIdx] + second, first)
            second, first = first, currVal
            currIdx -= 1
        
        return first

        # nums = [2,7,9,3,1]
        # n = 5
        # currIdx = 2, first = 3, second = 1
        # currIdx = 1, first = 10, second = 3
        # currIdx = 0, first = 10, second = 10
        # currIdx = -1, first = 12, second = 10
        # 12

        # Time complexity: O(n)
        # Space complexity: O(1)

        # [10,1,1,10]
        # n = 4
        # 1, 2
        # 1, 3, 1
        # 0, 
```
