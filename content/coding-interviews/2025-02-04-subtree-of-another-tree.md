---
title: "Subtree of Another Tree"
date: "2025-02-04"
authors:
  - "jathurchan"
featuredVideo: "https://youtu.be/3ZYg9_bM2vo"
projects:
  - "52"
---

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def isSubtree(self, root: Optional[TreeNode], subRoot: Optional[TreeNode]) -> bool:

        # 1. isSubRoot(node: sub_node:): compares the given node with subRoot
        # and returns true if yes / else false
        # stop as soon as false

        # 2. Go through all the nodes of root and run helper method and
        # stop as soon as true

        def areEqual(node: Optional[TreeNode], sub_node: Optional[TreeNode]):
            if node is None and sub_node is None:
                return True
            if node is None or sub_node is None:    # one is None and the other is not
                return False
                
            return node.val == sub_node.val and areEqual(node.left, sub_node.left) and areEqual(node.right, sub_node.right)

        queue = [root]

        while queue:
            curr = queue.pop()

            if areEqual(curr, subRoot):
                return True

            if curr.left:
                queue.append(curr.left)
            
            if curr.right:
                queue.append(curr.right)

        return False

    # Time complexity: O(n*m) where n is the number of nodes in root and m the number of nodes in subRoot
    # Space complexity: O(h_m+h_n) where h_m and h_n are the heights of two trees (recursion stack usage)
```
