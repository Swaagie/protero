'use strict';

import register from 'babel/register';
import path from 'path';

const {
  extensions = [ 'js', 'jsx' ],
  modules = []
} = require(
  require.main.paths.find(path => !module(path)) + '/package'
).protero || {};

/**
 * Check if the file is part of the whitelisted modules.
 *
 * @param {String} file
 * @returns {Boolean} transpile file or not.
 * @api private
 */
function each(file) {
  return modules.some(function contains(base) {
    let i = file.indexOf(base);

    //
    // Check if the module is the outer most leaf of the module tree.
    //
    return i && file.lastIndexOf('node_modules') < i;
  });
}

/**
 * Check if the file is part of a module.
 *
 * @param {String} file
 * @returns {Boolean} transpile file or not.
 * @api private
 */
function module(file) {
  return ~file.indexOf('node_modules');
}

/**
 * Is extension whitelisted.
 *
 * @param {String} file
 * @returns {Boolean} transpile file or not.
 * @api private
 */
function extname(file) {
  return !!~extensions.indexOf(path.extname(file).substr(1));
}

/**
 * Check if the filename should be transpiled.
 *
 *  Is extension allowed
 *  && Is module allowed
 *  || File is not part of module
 *
 * @param {String} file
 * @returns {Boolean} transpile file or not
 * @api public
 */
function check(file) {
  return extname(file) && each(file) || extname(file) && !module(file);
}

//
// Provide the only check to the babel/register hook.
//
register({ only: check });

export default check;