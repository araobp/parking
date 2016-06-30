var sw = require('./sw.js');

sw.init();
sw.watch(listener);
//sw.end();

function listener(mode) {
  if (mode == sw.STIMULUS) {
    console.log('tactile switch pressed: STIMULUS');
  } else {
    console.log('tactile switch pressed: TOGGLE');
  }
}

