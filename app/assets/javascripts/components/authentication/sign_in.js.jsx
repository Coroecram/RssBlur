var SignIn = React.createClass({
  mixins: [ReactRouter.History, React.addons.LinkedStateMixin],

  getInitialState: function () {
    return {handle: "", password: ""};
  },

  componentDidMount: function () {

  },

  updateHandle: function (event) {
    this.setState({handle: event.currentTarget.value});
  },

  updatePassword: function (event) {
    this.setState({password: event.currentTarget.value});
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

  guestLogin: function () {
    guestUser = {
                  handle: "7evEUIpk1O1ajjK9lhihQ@belieber.com",
                  password: "AqXPos8Nz04DPBiBd0BIjQ"
                };
    SessionApiUtil.login(guestUser, this.success, this.error);
  },

  render: function () {
    return (
            <div className="authentication">
              <h1>RSS Blur - Sign In</h1>
              <form className="session signin" onSubmit={ this.submit }>
                <label>Username or Email
                <br/>
                  <input type="text"
                         name="handle"
                         value={this.state.handle}
                         onChange={this.updateHandle} />
                </label>
                <br/>
                <label>Password
                <br/>
                  <input type="password"
                         name="password"
                         value={this.state.password}
                         onChange={this.updatePassword} />
                  </label>
                  <br/>
                <input type="submit" value="Sign In" />
              <ul className="routes group" >
                <li onClick={this.signUp}>Sign Up</li>
                <li className="guest" onClick={this.guestLogin}>Guest</li>
              </ul>
              </form>
            </div>
          );
  }
});
