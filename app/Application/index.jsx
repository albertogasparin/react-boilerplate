var React = require("react"),
    Reflux = require("reflux"),
    RouteHandler = require("react-router").RouteHandler;

var Actions = require("../actions"),
    GameList = require("../GameList");

require("./application.scss");

var Application = React.createClass({
  mixins: [],

  componentDidMount: function() {
  },

  render: function() {
    return (
      <div className="Application">
        <h1>react-starter</h1>
        <RouteHandler {...this.props}/>
      </div>
    );
  },
});

module.exports = Application;