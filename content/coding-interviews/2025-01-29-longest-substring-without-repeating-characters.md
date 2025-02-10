---
title: "Longest Substring Without Repeating Characters"
date: "2025-01-29"
authors:
  - "jathurchan"
featuredVideo: "https://youtu.be/xaSQtUdJWkQ"
projects:
  - "52"
---

```python
class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        # if len(s) = 0 -> 0 / len(s) = 1 -> 1
        # s = "abcabcbb" {a, b, c}
        # `set` to keep track of the characters we currenly looking into
        # `start` and `end` two pointers (substring)
        # start = 0, end = 2 -> len(substring) = end-start+1 = 3
        # - increment end when s[end+1] exists and s[end+1] not in `set`
        # and add it to the set and update the long_substr_len
        # - increment start when left < right
        # and s[end+1] exists and s[end+1] still in `set`
        # return `long_substr_len`

        # ex 2:
        # s = "bbbbb"
        # 

        if len(s) <= 1:
            return len(s)
        
        curr_chars = {s[0]}
        left, right = 0, 1

        long_substr_len = 1

        while right < len(s): # s[right] exists?
            while left < right and s[right] in curr_chars: # repeating character?
                curr_chars.remove(s[left])
                left += 1
            
            curr_chars.add(s[right])
            long_substr_len = max(long_substr_len, right-left+1)

            right += 1
        
        return long_substr_len

        # example 3
        # s = "pwwkew"
        # {p} l,r = 0, 1 res=1
        # {p, w} l,r = 0, 2 res = 2
        # {w} l,r = 2, 3 res = 2
        # {k, e, w} res = 3

        # Space: O(n)
        # Time: O(n)
```
