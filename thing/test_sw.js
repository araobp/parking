var sw = require('./sw.js');

sw.init();
sw.watch(listener);
//sw.end();

function listener(mode) {
  if (mode == sw.STIMULOUS) {
    console.log('tactile switch pressed: STIMULOUS');
  } else {
    console.log('tactile switch pressed: TOGGLE');
  }
}

