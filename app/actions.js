var Reflux = require('reflux');

var Actions = Reflux.createActions([
  "addItem"
]);


// Actions.addItem.preEmit = function() { 
//   console.log(arguments);
// };


module.exports = Actions;