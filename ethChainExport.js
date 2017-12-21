const hasher = require('folder-hash');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');


const now = Date.now();
const outputdir = path.resolve('output');
const chaindir = path.resolve(outputdir, 'ChainDataTest');
const hashfile = outputdir + `/hash-${+ now}.txt`;
let writeStream = fs.createWriteStream(hashfile);


const options = { algo: 'sha256' };

hasher.hashElement(chaindir, options).then(function (hash) {
    writeStream.write(hash.toString(), 'utf-8');
    writeStream.on('finish', () => {  
        console.log('wrote all data to file "' + hashfile + '".');
        console.log('Result for folder "' + chaindir + '":');
        console.log(hash.toString());
    });
    writeStream.end();  


});
