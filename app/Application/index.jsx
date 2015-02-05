// vendor modules require
var React = require("react/addons"),
    Reflux = require("reflux"),
    Router = require("react-router");

// app modules require
var Actions = require("app/actions"),
    GameList = require("app/GameList"),
    GameListStore = require("app/stores/gameList");

// shorthands
var { Route, DefaultRoute, RouteHandler, Link } = Router;
var { CSSTransitionGroup } = React.addons;

// style
require("./index.scss");


var Application = React.createClass({
  // Reflux connect will automatically set/update this.state.list
  mixins: [Reflux.connect(GameListStore, "list")],

  render: function() {
    return (
      <div className="Application g-clearfix">
        <h1 className="Application-title g-column">
          <Link className="Application-title-link" to="/">React Games ({this.state.list.length})</Link>
        </h1>
        <RouteHandler {...this.props}/>
      </div>
    );
  },
});

module.exports = Application;