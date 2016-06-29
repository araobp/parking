var sw = require('./sw.js');

sw.init();
sw.watch(listener);
//sw.end();

function listener() {
  console.log('tactile switch pressed');
}

