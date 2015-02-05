/** @jsx React.DOM */

var React = require('react'),
    TestUtils = React.addons.TestUtils;

var Router = require('react-router'),
    Route = Router.Route,
    TestLocation = require('react-router/modules/locations/TestLocation');



// polyfill
if(!Object.assign) {
  Object.assign = React.__spread;
}


// Hack to get around react-router's issues with testing. Taken from here:
// https://github.com/rackt/react-router/issues/437
function getRouterComponent (routes, props) {
  Router.run(routes, function (Handler, state) {
    // Use React.render to output to DOM. Otherwise use TestUtils.renderIntoDocument 
    var mainComponent = React.render(<Handler params={state.params} query={state.query} {...props} />, document.body);
    component = TestUtils.findRenderedComponentWithType(mainComponent, Handler);
  });

  return component;
};


module.exports = {
  
  // Hack to stub react components
  // http://substantial.com/blog/2014/11/11/test-driven-react-how-to-manually-mock-components/
  stubRequiredModules: function (rewiredModule, varValues) {
    var rewiredReverts = [];

    beforeEach(function() {
      var key, value, revert;
      for (key in varValues) {
        if (varValues.hasOwnProperty(key)) {
          value = varValues[key];
          revert = rewiredModule.__set__(key, value);
          rewiredReverts.push(revert);
        }
      }
    });

    afterEach(function() {
      rewiredReverts.forEach(function(revert) {
        revert();
      });
    });

    return rewiredModule;
  },


  renderComponentWithRoute: function (Component, path, state, props) {
    var historyPath = path;

    if(state && state.params) {
      for (var key in state.params) {
        historyPath = historyPath.replace(':'+key, state.params[key]);
      };
    }

    TestLocation.history = [historyPath];
    var route = <Route path={path} handler={Component}/>;

    var componentWithRoute = getRouterComponent(route, props);
    // return the actual component without the Route wrapper
    return TestUtils.findRenderedComponentWithType(componentWithRoute, Component);
  },


  find: function (selector, component) {
    if(selector.indexOf('.') === 0) {
      return TestUtils.findRenderedDOMComponentWithClass(component, selector.replace('.',''));
    } else {
      return TestUtils.findRenderedDOMComponentWithTag(component, selector);
    }
  },


  findAll: function (selector, component) {
    if(selector.indexOf('.') === 0) {
      return TestUtils.scryRenderedDOMComponentsWithClass(component, selector.replace('.',''))
    } else {
      return TestUtils.scryRenderedDOMComponentsWithTag(component, selector);
    }
  },

  // Suggested mode by react-router (but not woking)
  // stubRouterContext: (Component, props, stubs) => {
  //   return React.createClass({
  //     childContextTypes: {
  //       makePath: React.PropTypes.func,
  //       makeHref: React.PropTypes.func,
  //       transitionTo: React.PropTypes.func,
  //       replaceWith: React.PropTypes.func,
  //       goBack: React.PropTypes.func,
  //       getCurrentPath: React.PropTypes.func,
  //       getCurrentRoutes: React.PropTypes.func,
  //       getCurrentPathname: React.PropTypes.func,
  //       getCurrentParams: React.PropTypes.func,
  //       getCurrentQuery: React.PropTypes.func,
  //       getRouteAtDepth: React.PropTypes.func,
  //       // getRouteComponents: React.PropTypes.func,
  //       isActive: React.PropTypes.func,
  //       // routeHandlers: React.PropTypes.array,
  //     },

  //     getChildContext () {
  //       return Object.assign({
  //         makePath () {},
  //         makeHref () {},
  //         transitionTo () {},
  //         replaceWith () {},
  //         goBack () {},
  //         getCurrentPath () {},
  //         getCurrentRoutes () {},
  //         getCurrentPathname () {},
  //         getCurrentParams () {},
  //         getCurrentQuery () {},
  //         getRouteAtDepth () {},
  //         // getRouteComponents () {},
  //         isActive () {},
  //         // routeHandlers: [],
  //       }, stubs || {});
  //     },

  //     render () {
  //       return <Component {...props} />
  //     }
  //   });
  // },

}