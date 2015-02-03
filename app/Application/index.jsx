// vendor modules require
var React = require("react"),
    Reflux = require("reflux"),
    Router = require("react-router");

// app modules require
var Actions = require("../actions"),
    GameList = require("../GameList");

// shorthands
var { Route, DefaultRoute, RouteHandler, Link } = Router;

require("./application.scss");

var Application = React.createClass({
  mixins: [],

  render: function() {
    return (
      <div className="Application g-clearfix">
        <h1 className="Application-title g-column">
          <Link className="Application-title-link" to="/">React</Link>
        </h1>
        <RouteHandler {...this.props}/>
      </div>
    );
  },
});

module.exports = Application;