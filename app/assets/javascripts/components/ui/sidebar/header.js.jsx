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
  },

  _signOut: function () {

  },

  render: function () {
    var username =  /Guest.{16}/.exec(this.state.currentUser.username) ?
                        "Guest" : this.state.currentUser.username;
    var settings
    if (this.state.settings) {
      settings = (
        <ul>
          <li className="settings">Profile Settings</li>
          <li className="settings" onClick={this._signOut}>Sign Out</li>
        </ul>
      );
    }
    return (
          <div className="articles-header group">
            <div className="focus-header">
              {"Welcome, " + username}
            </div>
            <div className="profile-settings" onclick={this._profileSettings}>
              <i className="fa fa-cog"></i>
            </div>
            {settings}
          </div>
          );
  }
});
