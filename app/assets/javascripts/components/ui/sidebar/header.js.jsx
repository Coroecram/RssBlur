var Header = React.createClass({
    mixins: [ReactRouter.History],

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

  _profileSettings: function () {
  },

  render: function () {
    var username =  /Guest.{16}/.exec(this.state.currentUser.username) ?
                        "Guest" : this.state.currentUser.username;
    return (
          <div className="articles-header group">
            <div className="focus-header">
              {"Welcome, " + username}
            </div>
            <div className="profile-settings"><i className="fa fa-cog">???</i></div>
          </div>
          );
  }
});
