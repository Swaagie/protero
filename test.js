'use strict';

import assume from 'assume';
import protero from './';

describe('Protero', () => {
  it('includes all JS files that are not part of a module', () => {
    assume(protero('/root/no_module/index.js')).to.equal(true);
  });

  it('by defaults does not enlist modules for transpilation', () => {
    assume(protero('/root/node_modules/dropdown/index.jsx')).to.equal(false);
    assume(protero('/root/node_modules/alert/index.jsx')).to.equal(false);
    assume(protero('/root/node_modules/table/index.js')).to.equal(false);
  });

  it('can be restricted by extensions', () => {
    assume(protero('/root/index.es6')).to.equal(true);
    assume(protero('/root/index.html')).to.equal(false);
  });

  it('will only enlist allowed modules', () => {
    assume(protero('/root/node_modules/test/somefile.jsx')).to.equal(true);
  });

  it('will execute the filters as RegExp', function () {
    assume(protero('/root/node_modules/@scoped/regexps/somefile.jsx')).to.equal(true);
  });
});