var Header = React.createClass({
  getInitialState: function () {
    return {currentUser: CurrentUserStore.fetch(),
            settings: false};
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
    this.setState({settings: !this.state.settings});
  },

  render: function () {
    var username =  /Guest.{16}/.exec(this.state.currentUser.username) ?
                        "Guest" : this.state.currentUser.username;
    var settingsMenu
    if (this.state.settings) {
      settingsMenu = <Menu />
    }
    return (
          <div className="articles-header group">
            <div className="focus-header">
              {"Welcome, " + username}
            </div>
            <div className="profile-settings" onClick={this._profileSettings}>
              <i className="fa fa-cog"></i>
              {settingsMenu}
            </div>
          </div>
          );
  }
});
