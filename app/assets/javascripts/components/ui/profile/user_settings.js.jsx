var UserSettings = React.createClass({
  mixins: [ReactRouter.History, React.addons.LinkedStateMixin],

  getInitialState: function () {
    return {password: "", passwordConfirmation: ""};
  },

render: function () {
  return (
          <div className="user-settings">
            <h1>User Settings</h1>
            <div className="profile-pic">
              <img className="large-thumb" />
              <p>Current Avatar</p>
              <input id="uploadBtn" type="file" class="upload" />
            </div>
            <h2>Change Password</h2>
            <form className="update-form" onSubmit={ this._changePassword }>
              <label>Change Password
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
            </form>
          </div>
        );
}
});
