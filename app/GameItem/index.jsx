// vendor modules require
var React = require("react/addons"),
    Reflux = require("reflux"),
    Router = require("react-router");

// app modules require
var Actions = require("../actions"),
    GameListStore = require("../stores/gameList");

// shorthands
var { Route, DefaultRoute, RouteHandler, Link } = Router;
var { CSSTransitionGroup } = React.addons;


require("./gameitem.scss");


var GameItem = React.createClass({
  render: function () {
    var cx = React.addons.classSet,
        item = this.props.item,
        content;

    if (item.status == 'loading') {
      content = (
        <span className="GameItem-loader" key={item.status}></span>
      );
    }

    if (item.status == 'loaded') {
      content = (
        <div className="GameItem-content" key={item.status}>
          <h1 className="GameItem-title">{item.title}</h1>
          <p className="GameItem-desc">{item.description}</p>
        </div>
      );
    }

    return (
      <div className="GameItem">
        <CSSTransitionGroup component="div" transitionName="is">
          {content}
        </CSSTransitionGroup>
      </div>
    );
  }
});



var GameItemWrapper = React.createClass({

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
    
    if(!item.id) {
      item.id = this.props.params.id;
    }

    return (
      <CSSTransitionGroup component="div" className="GameItemWrapper g-column g-md66 g-noPad" transitionName="is">
        <GameItem item={item} key={item.id} />
      </CSSTransitionGroup>
    );
  }
});



module.exports = GameItemWrapper;