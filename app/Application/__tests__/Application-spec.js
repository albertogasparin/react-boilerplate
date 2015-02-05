/** @jsx React.DOM */

var rewire = require("rewire");
    React = require('react/addons'),
    Router = require('react-router'),
    Route = Router.Route,
    TestUtils = React.addons.TestUtils,
    TestHelpers = require('../../__tests__/test_helpers.jsx');

// shorthands
var { stubRequiredModules, renderComponentWithRoute, find, findAll } = TestHelpers;


describe('Application: ', function () {
  
  var component,
      Component = rewire('../index.jsx');

  // Replace the required modules with stubs
  stubRequiredModules(Component, {
    "GameList": React.createClass({
      render: function() { return <div />; }
    })
  });


  beforeEach(function() {
    component = renderComponentWithRoute(Component, '/');
  });

  it("renders", function () {
    var element = find('.Application', component);
    expect(element).toBeDefined();
  });

  it("has title link", function () {
    var element = find('.Application-title-link', component);
    expect(element).toBeDefined();
    expect(element.tagName).toBe('A');
  })

  it("has two list items", function () {
    expect(component.state.list.length).toBe(2);
  })
  
});