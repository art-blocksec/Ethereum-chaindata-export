#!/bin/bash

timestamp=$(date +%s)

#sudo apt-get install ctorrent
#killall geth
killall ctorrent
#rsync -avzh /home/user/.ethereum/geth/chaindata ./output/
rm ./output/hash*
node ./ethChainExport.js
rm ./*.torrent
ctorrent -t -u "udp://tracker.opentrackr.org:1337/announce" -s ethChainExport.$timestamp.torrent ./output
git add .
git commit -am "$timestamp"
git push -f
ctorrent -d -e 9999 ethChainExport.$timestamp.torrent
geth --cache=13322
