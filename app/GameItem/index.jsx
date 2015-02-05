// vendor modules require
var React = require("react/addons"),
    Reflux = require("reflux"),
    Router = require("react-router");

// app modules require
var Actions = require("app/actions"),
    GameListStore = require("app/stores/gameList");

// shorthands
var { Route, DefaultRoute, RouteHandler, Link } = Router;
var { CSSTransitionGroup } = React.addons;

// style
require("./index.scss");


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

    if (item.status == 'error') {
      content = (
        <strong>ERROR</strong>
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

  mixins: [Router.Navigation],

  statics: {
    willTransitionTo: function (transition, params, query) {
      Actions.fetchItem(params.id);
    },
  },
  
  // called on componentMount (so on first route access)
  getInitialState: function () {
    var item = GameListStore.findItemById(this.props.params.id);
    return { item: item };
  },

  // called each time we trigger list changes (from the parent)
  // (but not called on componentMount)
  componentWillReceiveProps: function (newProps) {
    var item = GameListStore.findItemById(newProps.params.id);
    
    if(!item) { // if deleted
      this.replaceWith("/");
      return;
    }
    this.setState({ item: item });
  },

  render: function () {
    var item = this.state.item;
    
    return (
      <CSSTransitionGroup component="div" className="GameItemWrapper g-column g-md66 g-noPad" transitionName="is">
        <GameItem item={item} key={item.id} />
      </CSSTransitionGroup>
    );
  }
});



module.exports = GameItemWrapper;