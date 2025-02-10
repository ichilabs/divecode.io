---
title: "Merge Intervals"
date: "2025-02-04"
authors:
  - "jathurchan"
featuredVideo: "https://youtu.be/NxEO6xXskpY"
projects:
  - "52"
---

```python
class Solution:
    def merge(self, intervals: List[List[int]]) -> List[List[int]]:
        # intervals = [[1,3],[2,6],[8,10],[9,18]]
        # [[1, 6], [8, 10], ]
        # res = []
        # // 1. sort the intervals according to start
        # 2. res[-1][1] < start -> no overlapping
        # 3. res[-1][1] >= start -> pop and merge them by taking min 
        # for start and max for end

        #  -- - 
        #       - - -
        #          - - - 

        res = []

        intervals.sort(key=lambda interval: interval[0])

        for interval in intervals:
            start, end = interval[0], interval[1]

            if res and res[-1][1] >= start:
                prev = res.pop()
                res.append([min(start, prev[0]), max(end, prev[1])])
            else:
                res.append([start, end])
        
        return res

        # intervals = [[1,4],[4,5]]
        # res = []
        # res = [[1, 4]]
        # res =[[1, 5]]

        # Time complexity: nlog(n) where n = len(intervals)
        # Space complexity: O(1)
```
