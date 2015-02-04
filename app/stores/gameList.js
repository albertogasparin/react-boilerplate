var Reflux = require('reflux'),
    axios = require('axios');


// app modules require
var Actions = require('../actions');



// Creates a DataStore
var GameListStore = Reflux.createStore({

  listenables: [Actions],

  init: function () {
    // object collection
    this.list = [{ id: 1, title: 'First' }, { id: 2, title: 'Second' }];
  },

  // this will be called by all listening components as they register their listeners
  getInitialState: function() {
    return this.list;
  },

  findItemById: function (id) {
    for (var i = 0, j = this.list.length; i < j; i++) {
      if (this.list[i].id == id) {
        return this.list[i];
      }
    }
    return null;
  },

  updateItem: function (newData) {
    var item = this.findItemById(newData.id);

    if(!item) {
      item = newData;
    } else {
      for (var key in newData) {
        item[key] = newData[key];
      }
    }

    this.trigger(this.list, 'update', item);
  },

  onFetchItem: function(id) { 
    var item = this.findItemById(id);
    
    // axios.get(url, function(response) {
    //   if (response.ok) {
    //     makeRequest.completed(response.body);
    //   } else {
    //     makeRequest.failed(response.error);
    //   }
    // }
    
    if(item && !item.status) {

      item.status = 'loading';

      setTimeout( function () {
        var data = { id: id, description: 'Description loaded' };
        Actions.fetchItem.completed(data);
        // Actions.fetchItem.failed(data);
      }, 2000);
    }

    if(!item) {
      Actions.fetchItem.failed();
    }
    
    this.trigger(this.list);
  },

  onFetchItemCompleted: function (data) {
    data.status = 'loaded';
    this.updateItem(data);
  },
  
  onAddItem: function(title) {
    var newItem = { id: Date.now(), title: title },
        newList = this.list.concat(newItem);

    this.list = newList;
    this.trigger(this.list, 'add', newItem); // sends the updated list to all listening components
  },


  onDeleteItem: function (id) {
    this.list = this.list.filter(function (item, index) {
      return item.id != id;
    });

    this.trigger(this.list, 'delete');
  }


});




module.exports = GameListStore;



if (!Array.prototype.filter) {
  Array.prototype.filter = function(fun/*, thisArg*/) {
    'use strict';

    if (this === void 0 || this === null) {
      throw new TypeError();
    }

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== 'function') {
      throw new TypeError();
    }

    var res = [];
    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    for (var i = 0; i < len; i++) {
      if (i in t) {
        var val = t[i];

        // NOTE: Technically this should Object.defineProperty at
        //       the next index, as push can be affected by
        //       properties on Object.prototype and Array.prototype.
        //       But that method's new, and collisions should be
        //       rare, so use the more-compatible alternative.
        if (fun.call(thisArg, val, i, t)) {
          res.push(val);
        }
      }
    }

    return res;
  };
}
