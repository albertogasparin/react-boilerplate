var React = require("react"),
    Router = require("react-router"),
    Route = Router.Route,
    DefaultRoute = Router.DefaultRoute;


// polyfill
if(!Object.assign) {
  Object.assign = React.__spread;
}


var routes = (
  <Route name="app" path="/" handler={require("./Application")}>
    <DefaultRoute handler={require("./GameList")} />
  </Route>
);


document.addEventListener("DOMContentLoaded", function(event) {
  Router.run(routes, Router.HistoryLocation, function (Handler, state) {
    var params = state.params;
    React.render(<Handler params={params}/>, document.body);
  });
});


// export routes
module.exports = routes;