var Header = React.createClass({
    mixins: [ReactRouter.History],

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

  _signOut: function () {
    SessionApiUtil.logout();
  },

  render: function () {
    var username =  /Guest.{16}/.exec(this.state.currentUser.username) ?
                        "Guest" : this.state.currentUser.username;
    var settings
    if (this.state.settings) {
      settings = (
        <ul className="settings-menu group">
          <li className="settings-option">Profile Settings</li>
          <li className="settings-option" onClick={this._signOut}>Sign Out</li>
        </ul>
      );
    }
    return (
          <div className="articles-header group">
            <div className="focus-header">
              {"Welcome, " + username}
            </div>
            <div className="profile-settings" onClick={this._profileSettings}>
              <i className="fa fa-cog"></i>
              {settings}
            </div>
          </div>
          );
  }
});
