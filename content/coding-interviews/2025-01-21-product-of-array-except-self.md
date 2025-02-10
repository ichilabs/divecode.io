---
title: "Product of Array Except Self"
date: "2025-01-21"
authors:
  - "jathurchan"
featuredVideo: "https://youtu.be/47OwaHCifs0"
projects:
  - "52"
---

```python
class Solution:
    def productExceptSelf(self, nums: List[int]) -> List[int]:
        # nums = [1,2,3,4]
        # answer = [24, 12, 8, 6]

        # prefix = [1, 2, 6, 24]
        # suffix = [24, 24, 12, 4]

        # answer = 1
        # answer[i] -> answer * suffix[i+1] (i < len(nums)-1)
        # answer[i] -> answer * prefix[i-1] (i > 1)

        # space complexity: O(n)
        # time complexity: O(n)

        n = len(nums)
        suffix, prefix = [nums[-1]], [nums[0]]
        
        for i in range(1, n):
            prefix.append(prefix[-1]*nums[i])
            suffix.insert(0, suffix[0]*nums[n-1-i])
        
        answer = []

        for i in range(n):
            ans = 1
            if i > 0:
                ans *= prefix[i-1]
            if i < len(nums)-1:
                ans *= suffix[i+1]
            answer.append(ans)
        
        return answer

        # nums = [-1,1,0,-3,3]
        # prefix = [-1, 1, 0, 0, 0]
        # suffix = [0, 0, 0, 9, 3]
        # ans = [0, 0, 9, 0, 0]

        # [0, 0]
        # prefix = [0, 0]
        # suffix = [0, 0]
        # ans = []
```
