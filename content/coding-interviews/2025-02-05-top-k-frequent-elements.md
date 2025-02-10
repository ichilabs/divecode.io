---
title: "Top K Frequent Elements"
date: "2025-02-05"
authors:
  - "jathurchan"
featuredVideo: "https://youtu.be/OOi9ZLjEahY"
projects:
  - "52"
---

```python
from collections import Counter
class Solution:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
        # example 1:
        # nums = [1,1,1,2,2,3, 4, 4], k = 2
        # 1: 3, 2: 2, 3: 1, 4:2
        # sort keys according to the values (hash map)
        # Picking the first k first keys

        freq = Counter(nums)

        candidates = list(sorted(list(freq.keys()), key=lambda x:-freq[x]))
        
        return candidates[:k]

        # nums = [1, -1, -1], k = 1
        # 1: 1, -1: 2
        # -1, 1

        # Time complexity: O(nlog(n))
        # Space complexity: O(n)

        # To Improve: no sorting, heap
        # [(2,2), (3, 1)] (freq for each number is unique)
        # before inserting, check if freq of new number higher than
        # the minimum one and if len(res) == k, pop the min and push this one
        # len(res) != k, push immediately

        # Time complexity: O(nlog(k))
        # Space complexity: O(n)
```
