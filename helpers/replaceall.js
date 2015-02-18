/**
 * Created by matthias on 2/18/15.
 */
// implement replaceAll function
module.exports = function replaceAll(str, search, replace) {
    return str.replace(new RegExp(search, 'g'), replace);
}