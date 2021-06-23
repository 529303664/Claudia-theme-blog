find . -type f -size +800M  -print0 | xargs -0 du -h | sort -n
