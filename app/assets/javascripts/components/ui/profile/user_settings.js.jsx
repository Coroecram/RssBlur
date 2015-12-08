var UserSettings = React.createClass({
  mixins: [ReactRouter.History, React.addons.LinkedStateMixin],

  getInitialState: function () {
    return {password: "", passwordConfirmation: ""};
  },

  _changePassword: function (event) {
    debugger
    var credentials = {user: $(event.currentTarget).serializeJSON()};
    UserApiUtil.updateUser(credentials)
  },

render: function () {
  return (
          <div className="user-settings">
            <h1>User Settings</h1>
            <form className="update-form" onSubmit={ this._changePassword }>
            <div className="profile-pic subform group">
                <h2>Current Avatar</h2>
              <img className="large-thumb">
              </img>
              <input id="uploadBtn" type="file" className="upload" />
              <div className="upload-button">Update Avatar</div>
            </div>
            <div className="subform">
              <h2>Change Password</h2>
                <label>New Password
                <br/>
                  <input type="password"
                         name="password"
                         maxLength="35"
                         valueLink={this.linkState('password')} />
                  </label>
                  <br/>
                <label>Confirm Password
                <br/>
                  <input type="password"
                         name="password_confirmation"
                         maxLength="35"
                         valueLink={this.linkState('passwordConfirmation')} />
                  </label>
                  <br/>
                <input type="submit" value="Change Password" />
              </div>
            </form>
          </div>
        );
}
});
