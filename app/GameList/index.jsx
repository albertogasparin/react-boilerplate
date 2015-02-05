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


require("./gamelist.scss");


var GameListItem = React.createClass({
  // propTypes: {
  //   title: React.PropTypes.string,
  //   id: React.PropTypes.number.isRequired
  // },

  handleDeleteItem: function (ev) {
    ev.preventDefault();
    Actions.deleteItem( this.props.item.id );
  },

  render: function () {
    var item = this.props.item;
    return (
      <li className="GameListItem">
        <Link className="GameListItem-link" to="game" params={{id: item.id}}>{item.id} {item.title}</Link>
        <button className="GameListItem-delete" onClick={this.handleDeleteItem}>×</button>
      </li>
    );
  }
});





var GameList = React.createClass({
  // this will cause setState({list:updatedlist}) whenever the store does trigger(updatedlist)
  mixins: [Reflux.connect(GameListStore, "list")],

  handleAddItem: function (e) {
    e.preventDefault();
    Actions.addItem();
  },

  render: function() {
    var list = this.state.list;

    return (
      <div className="game-section g-column">
        <div className="GameList g-column g-md33">
          <CSSTransitionGroup component="ul" className="GameList-items" transitionName="is">
            { list.map( function (item) {
              return <GameListItem item={item} key={item.id}/>
            }) }
          </CSSTransitionGroup>
          <button className="GameList-addItem" onClick={this.handleAddItem}>Add new item</button>
        </div>
        <RouteHandler {...this.props}/>
      </div>
    );
  }
});



module.exports = GameList;