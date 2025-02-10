---
title: "Search in Rotated Sorted Array"
date: "2025-01-28"
authors:
  - "jathurchan"
featuredVideo: "https://youtu.be/G2djLc2YnuI"
projects:
  - "52"
---

```python
class Solution:
    def search(self, nums: List[int], target: int) -> int:
        # nums = [4,5,6,7,0,1,2], target = 0
        # 1. Find k or n-k (the number of elements before the smallest number &
        #                   the index of the smallest number in nums)
        # 2. nums[i+k % n] (n-k + k) % n => 0
        # Use binary search twice

        # n-k = 4 and n = 7 -> k = 3 (k is 0 indexed)
        # [0, 1, 2, 4, 5, 6, 7]

        n = len(nums)

        # Step 1: Find k
        left, right = 0, n-1

        if n == 1:
            return 0 if target == nums[0] else -1

        if nums[left] < nums[right]:
            k = 0

        else:
            while left < right:
                mid = (left+right) // 2

                if nums[mid] > nums[right]:
                    left = mid + 1
                else:
                    right = mid
            
            k = left

        print(k)
        
        # Step 2: Find target

        left, right = 0, n-1

        while left <= right:
            mid = (left+right) // 2
            real_mid = (mid + k) % n
            print(real_mid)
            if nums[real_mid] == target:
                return real_mid
            elif nums[real_mid] > target:
                right = mid - 1
            else:
                left = mid + 1

        return -1

        # Example 2:
        # nums = [4,5,6,7,0,1,2], target = 3
        # n = 7 | left, right = 0, 6 | n-k = 4 | k = 3
        # [0,1,2,4,5,6,7]

        # [1, 3], 3

        # [3, 5, 1]
        # k? n-k = 2
        # [1, 3, 5] n = 3 -> 1
```
