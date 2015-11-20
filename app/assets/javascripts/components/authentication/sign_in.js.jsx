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

  submit: function (e) {
      e.preventDefault();

      var credentials = $(e.currentTarget).serializeJSON();
      SessionApiUtil.login(credentials, this.success, this.error);
    },

    success: function () {
      this.history.pushState(null, "/home");
    },

    error: function (message) {
      alert(message);
    },

  render: function () {
    return (
            <div className="authentication">
              <h1>RSS Blur</h1>
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
              <div className="sign-up" onClick={this.signUp}>Sign Up</div>
              <div className="guest" onClick={""}>Guest</div>
              </form>
            </div>
          );
  }
});
