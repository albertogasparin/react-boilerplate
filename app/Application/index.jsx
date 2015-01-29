var React = require("react");
var RouteHandler = require("react-router").RouteHandler;

require("./style.scss");

var Application = React.createClass({
  // mixins: [StateFromStoreMixin],
  // statics: {
  //   getState: function(stores, params) {
  //     var transition = stores.Router.getItem("transition");
  //     return {
  //       loading: !!transition
  //     };
  //   },
  // },
  render: function() {
    return <div>
      <h1>react-starter</h1>
      <RouteHandler />
    </div>;
  },
  // update: function() {
  //   var { stores } = this.context;
  //   Object.keys(stores).forEach(function(key) {
  //     stores[key].update();
  //   });
  // }
});

module.exports = Application;