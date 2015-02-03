// vendor modules require
var React = require("react/addons"),
    Reflux = require("reflux"),
    Router = require("react-router");

// app modules require
var Actions = require("../actions"),
    GameListStore = require("../stores/gameList");

// shorthands
var { Route, DefaultRoute, RouteHandler, Link } = Router;



require("./gameitem.scss");


var GameItemDetails = React.createClass({
  render: function () {
    var cx = React.addons.classSet,
        item = this.props.item,
        content;

    var classes = cx({
      'GameItemDetails': true,
      'is-loading': !item.loaded
    });

    return (
      <div className={classes}>
        <h1 className="GameItemDetails-title">{item.id}</h1>
        <p className="GameItemDetails-desc">{item.description}</p>
      </div>
    );
  }
});



var GameItem = React.createClass({

  mixins: [Router.Navigation, Reflux.listenTo(GameListStore,"onGameListChange")],

  statics: {
    willTransitionTo: function (transition, params) {
      Actions.fetchItem(params.id);
    },
    willTransitionFrom: function (transition, self) {
      // reset state in order to show loading if going to another item
      self.replaceState( self.getInitialState() );
    }
  },
  
  getInitialState: function () {
    return { item: {} };
  },

  onGameListChange: function (list, action) {
    var item = GameListStore.findItemById(this.props.params.id);

    if(!item) { // if deleted
      this.replaceWith("/");
      return;
    }

    this.setState({ item: item });
  },

  render: function () {
    var item = this.state.item;
    
    return (
      <div className="GameItem g-column g-md66">
        <GameItemDetails item={item} key={item.id} />
      </div>
    );
  }
});



module.exports = GameItem;