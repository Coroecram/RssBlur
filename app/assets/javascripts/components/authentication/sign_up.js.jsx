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
              <form className="session signin" onSubmit={ this.submit }>
                <label>Username
                <br/>
                  <input type="text"
                         name="username"
                         maxLength="22"
                         valueLink={this.linkState('username')} />
                </label>
                <br/>
                <label>Email
                <br/>
                  <input type="text"
                         name="email"
                         maxLength="22"
                         valueLink={this.linkState('email')} />
                </label>
                <br/>
                <label>Password
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
                <input type="submit" value="Sign Up" />
                <ul className="routes group" >
                  <li onClick={this.signIn}>Sign In</li>
                  <li className="guest" onClick={""}>Guest</li>
                </ul>
              </form>
            </div>
          );
  }
});
