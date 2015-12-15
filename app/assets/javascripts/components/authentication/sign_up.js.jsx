var SignUp = React.createClass({
  mixins: [ReactRouter.History, React.addons.LinkedStateMixin],

  getInitialState: function () {
    return {username: "", email: "", password: "", passwordConfirmation: ""};
  },

  componentDidMount: function () {
    CurrentUserStore.addChangeListener(this._signedUp);
  },

  componentWillUnmount: function () {
    CurrentUserStore.removeChangeListener(this._signedUp);
  },

  updateUsername: function (event) {
    this.setState({username: event.currentTarget.value});
  },

  updateEmail: function (event) {
    this.setState({email: event.currentTarget.value});
  },

  updatePassword: function (event) {
    this.setState({password: event.currentTarget.value});
  },

  updatePasswordConfirmation: function (event) {
    this.setState({passwordConfirmation: event.currentTarget.value});
  },

  submit: function (event) {
      event.preventDefault();
      var credentials = {user: $(event.currentTarget).serializeJSON()};
      UserApiUtil.createUser(credentials, this.success, this.error);
    },

  success: function () {
    alert("Welcome to RSSBlur!");
  },

  _signedUp: function () {
    this.history.pushState(null, "/home")
  },

  error: function (message) {
    alert(message);
    this.setState({password: "", passwordConfirmation: ""});
  },

  signIn: function () {
    this.history.pushState(null, "/sign_in");
  },

  _guestLogin: function () {
    UserApiUtil.createGuest(this.success);
  },

  render: function () {
    return (
            <div className="authentication">
              <h1>RSS Blur - Sign Up</h1>
              <form className="session signin group" onSubmit={ this.submit }>
                <label>Username
                  <input type="text"
                         name="username"
                         maxLength="20"
                         valueLink={this.linkState('username')} />
                </label>
                <label>Email
                  <input type="text"
                         name="email"
                         maxLength="20"
                         valueLink={this.linkState('email')} />
                </label>
                <label>Password
                  <input type="password"
                         name="password"
                         maxLength="42"
                         valueLink={this.linkState('password')} />
                  </label>
                <label>Confirm Password
                  <input type="password"
                         name="password_confirmation"
                         maxLength="42"
                         valueLink={this.linkState('passwordConfirmation')} />
                  </label>
                  <p onClick={this.signIn}>Sign In</p>
                  <p className="guest" onClick={this._guestLogin}>Guest?</p>
                <input type="submit" value="Sign Up" />
              </form>
            </div>
          );
  }
});
