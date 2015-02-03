// vendor modules require
var React = require("react"),
    Router = require("react-router");

// app modules require

// shorthands
var { Route, DefaultRoute, RouteHandler, Link } = Router;


// polyfill
if(!Object.assign) {
  Object.assign = React.__spread;
}


var routes = (
  <Route name="app" path="/" handler={require("./Application")}>
    <Route path="" handler={require("./GameList")}>
      <Route name="game" path="game/:id" handler={require("./GameItem")}/>
    </Route>
  </Route>
);


document.addEventListener("DOMContentLoaded", function(event) {
  // Router.run(routes, Router.HistoryLocation, function (Handler, state) {
  Router.run(routes, function (Handler, state) {
    React.render(<Handler params={state.params} query={state.query}/>, document.body);
  });
});


// export routes
module.exports = routes;