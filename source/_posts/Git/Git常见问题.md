---
title: Git常见问题
tags: [git]
categories: [git]
version: 1
date: 2021-12-18 10:04:28
---

<!-- more -->

## git pull 和 git fetch 的区别
```BASH
git fetch 只是将远程仓库的变化下载下来，并没有和本地分支合并。

git pull 会将远程仓库的变化下载下来，并和当前分支合并。
```

## git rebase 和 git merge 的区别

```BASH
git merge 和 git rebase 都是用于分支合并，关键在 commit 记录的处理上不同。

git merge 会新建一个新的 commit 对象，然后两个分支以前的 commit 记录都指向这个新 commit 记录。这种方法会
保留之前每个分支的 commit 历史。

git rebase 会先找到两个分支的第一个共同的 commit 祖先记录，然后将提取当前分支这之后的所有 commit 记录，然后
将这个 commit 记录添加到目标分支的最新提交后面。经过这个合并后，两个分支合并后的 commit 记录就变为了线性的记
录了。
```
