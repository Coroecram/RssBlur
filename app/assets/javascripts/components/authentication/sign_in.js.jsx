var SignIn = React.createClass({
  mixins: [ReactRouter.History, React.addons.LinkedStateMixin],

  getInitialState: function () {
    return {handle: "", password: ""};
  },

  submit: function (event) {
      event.preventDefault();

      var credentials = $(event.currentTarget).serializeJSON();
      SessionApiUtil.login(credentials, this.success, this.error);
    },

  success: function () {
    this.history.pushState(null, "/home");
  },

  error: function (message) {
    alert(message);
  },

  signUp: function () {
    this.history.pushState(null, '/create_account');
  },

  _guestLogin: function () {
    UserApiUtil.createGuest(this.success);
  },

  render: function () {
    return (
            <div className="authentication">
              <h1>RSS Blur - Sign In</h1>
              <form className="session signin group" onSubmit={ this.submit }>
                <label>Username or Email
                  <input type="text"
                         name="handle"
                         maxLength="20"
                         valueLink={this.linkState('handle')} />
                </label>
                <label>Password
                  <input type="password"
                         name="password"
                        maxLength="42"
                         valueLink={this.linkState('password')} />
                  </label>
                  <p onClick={this.signUp}>Sign Up</p>
                  <p className="guest" onClick={this._guestLogin}>Guest?</p>
                <input type="submit" value="Sign In" />
              </form>
            </div>
          );
  }
});
