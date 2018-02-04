const assert = require('assert');
const package = require('../package.json');

describe('package.json', function() { 
  it('defines scripts.install correctly', function() {
    assert.strictEqual(
      package.scripts.preinstall,
      `node ./lib/download && ./bin/emsdk-portable/emsdk install sdk-${package.emsdk.version}-64bit && ./bin/emsdk-portable/emsdk activate sdk-${package.emsdk.version}-64bit`
    );
  });

  const commands = [
    'emcc',
    'em++',
    'emmake',
    'emrun'
  ];

  commands.forEach(command => {
    it(`defines bin.${command} correctly`, function() {
      assert.strictEqual(
        package.bin[command],
        `./bin/emsdk-portable/emscripten/${package.emsdk.version}/${command}`
      );
    });
  });
});