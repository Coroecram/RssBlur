var Header = React.createClass({

  getInitialState: function () {
    return {currentUser: CurrentUserStore.fetch()};
  },

  componentDidMount: function () {
    SidebarClickedStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    SidebarClickedStore.removeChangeListener(this._onChange);
  },

  _onChange: function () {
    this.setState({articles: ArticleStore.all()});
  },

  render: function () {
    return (
          <div className="articles-header group">
            <div className="focus-header">
              {"Welcome, " + this.state.currentUser.username}
            </div>
            <div className="sign-out" onClick={this.props.clickHandler}> Sign Out </div>
          </div>
          );
  }
});
