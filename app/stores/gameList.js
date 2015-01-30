var Reflux = require('reflux'),
    Actions = require('../actions');


// Creates a DataStore
var GameListStore = Reflux.createStore({

  listenables: [Actions],

  // this will be called by all listening components as they register their listeners
  getInitialState: function() {
    // object collection
    this.list = [{ id: Date.now(), title: 'Dummy' }];
    return this.list;
  },


  // called whenever we change a list. normally this would mean a database API call
  updateList: function(list){
    // localStorage.setItem(localStorageKey, JSON.stringify(list));
    // if we used a real database, we would likely do the below in a callback
    this.list = list;
    this.trigger(list); // sends the updated list to all listening components
  },


  onAddItem: function(title) {
    var newItem = { id: Date.now(), title: title },
        newList = this.list.concat(newItem);
    this.updateList(newList);
  },


});




module.exports = GameListStore;