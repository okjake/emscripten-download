const fs = require('fs');
const tar = require('tar-fs');
const request = require('request');
const package = require('../package.json');
const gunzip = require('gunzip-maybe');

function throwIfNotSuccessful(response) {
  if (response.statusCode !== 200) {
    throw new Error('Request failed');
  }
}

function throwError(err) {
  throw err;
}

function downloadAndExtract(cb) {
  var req = request(package.emsdk.url)
    .on('response', throwIfNotSuccessful)
    .on('error', throwError)
    .pipe(gunzip())
    .pipe(tar.extract('bin'));

  if (cb) {
    req.on('end', cb);
  }
}

downloadAndExtract();

module.exports = { downloadAndExtract: downloadAndExtract };