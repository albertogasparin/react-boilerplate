var React = require("react");
var Router = require("react-router");

// require("react-tap-event-plugin")();


// polyfill
if(!Object.assign) {
  Object.assign = React.__spread;
}


var routes = (
  <Router.Route name="app" path="/" handler={require("./Application")}>
  </Router.Route>
);


// export routes
// module.exports = routes;

document.addEventListener("DOMContentLoaded", function(event) {
  Router.run(routes, Router.HistoryLocation, function (Handler, state) {
    window.App = React.render(<Handler />, document.body);
  });
});



// We create a function that will lazy load modules based on the current hash
// var resolveRoute = function () {
  
//   // If no hash or hash is '#' we lazy load the Home component
//   if (!location.hash || location.hash.length === 1) {
//     require.ensure([], function () {
//       var Home = require('./Home.js');
//       React.render(Home(), document.getElementById('app'));
//     });
    
//   // Or if route is #admin we lazy load that
//   } else if (location.hash === '#admin') {
//     require.ensure([], function () {
//       var Admin = require('./Admin.js');
//       React.render(Admin(), document.getElementById('app'));
//     });
//   }

// };

// // Resolve route on hash change
// window.onhashchange = resolveRoute;

// // Resolve current route
// resolveRoute();