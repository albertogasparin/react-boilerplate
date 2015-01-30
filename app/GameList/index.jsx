var React = require("react"),
    Reflux = require("reflux"),
    RouteHandler = require("react-router").RouteHandler;

var Actions = require("../actions"),
    GameListStore = require("../stores/gameList");


// require("./application.scss");


var GameListItem = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    id: React.PropTypes.number.isRequired
  },
  render: function () {
    return (
      <li className="GameListItem">
        {this.props.id}
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
      <div className="GameList">
        <ul>
          { list.map( function (item) {
            return <GameListItem id={item.id} key={item.id}/>
          }) }
        </ul>
        <button onClick={this.handleAddItem}>Add new item</button>
      </div>
    );
  }
});



module.exports = GameList;