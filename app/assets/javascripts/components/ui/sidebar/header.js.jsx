var Header = React.createClass({
  getInitialState: function () {
    return {currentUser: CurrentUserStore.fetch(),
            settings: false};
  },

  componentDidMount: function () {
    SidebarClickedStore.addChangeListener(this.onSidebarChange);
    CurrentUserStore.addChangeListener(this.onUserChange);
  },

  componentWillUnmount: function () {
    SidebarClickedStore.removeChangeListener(this.onSidebarChange);
    CurrentUserStore.removeChangeListener(this.onUserChange);
  },

  onSidebarChange: function () {
    this.setState({articles: ArticleStore.all()});
  },

  onUserChange: function () {
    this.setState({currentUser: CurrentUserStore.fetch()})
  },

  profileSettings: function () {
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
            <img className="user-avatar" src={this.state.currentUser.thumb} />
            <div className="focus-header">
              {"Welcome, " + username}
            </div>
            <div className="profile-settings" onClick={this.profileSettings}>
              <i className="fa fa-cog"></i>
              {settingsMenu}
            </div>
            <Search />
          </div>
          );
  }
});
