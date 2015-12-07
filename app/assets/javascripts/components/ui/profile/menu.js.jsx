var Menu = React.createClass({
    mixins: [ReactRouter.History],

    _profileSettings: function () {
      this.history.pushState(null, "/user_settings");
    },

    _signOut: function () {
      SessionApiUtil.logout();
    },

    render: function () {
      return (
              <div className="settings-menu">
                <ul className="settings-menu-ul group">
                  <li className="settings-option"
                      onClick={this._profileSettings}>Profile Settings
                  </li>
                  <li className="settings-option"
                      onClick={this._signOut}>Sign Out
                  </li>
                  </ul>
              </div>
              );
    }
});
