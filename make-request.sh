curl localhost:4000/graphql \
  -F operations='{ "query": "mutation ($file: Upload!) { singleUpload(file: $file) { filename } }", "variables": { "file": null } }' \
  -F map='{ "0": ["variables.file"] }' \
  -F 0=@a.txt
