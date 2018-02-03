const fs = require('fs');
const path = require('path');
const assert = require('assert');
const rimraf = require('rimraf');
const package = require('../package.json');
const download = require('../lib/download');

describe('download script', function() {
  it('downloads and extracts the sdk correctly', function() {
    const paths = [
      path.join('bin', 'emsdk-portable', 'emscripten', package.emsdk.version, 'emcc'),
      path.join('bin', 'emsdk-portable', 'emscripten', package.emsdk.version, 'em++'),
      path.join('bin', 'emsdk-portable', 'emscripten', package.emsdk.version, 'emmake'),
      path.join('bin', 'emsdk-portable', 'emscripten', package.emsdk.version, 'emrun')
    ];

    rimraf.sync('bin');

    download.downloadAndExtract(function() {
      paths.forEach(function(path) {
        assert(fs.existsSync(path));
      });
    });
  });
});