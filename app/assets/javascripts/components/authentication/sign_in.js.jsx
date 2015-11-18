var SignIn = React.createClass({

  getInitialState: function () {
    return {handle: "", password: ""};
  },

  updateHandle: function (event) {
    this.setState({handle: event.currentTarget.value});
  },

  updatePassword: function (event) {
    this.setState({password: event.currentTarget.value});
  },

  render: function () {
    return (
            <div className="authentication">
              <h1>RSS Blur</h1>
              <form className="session signin">
                <label>Username or Email</label>
                <br/>
                  <input type="text"
                         value={this.state.handle}
                         onChange={this.updateHandle} />
                <br/>
                <label>Password</label>
                <br/>
                  <input type="password"
                         value={this.state.password}
                         onChange={this.updatePassword} />
                  <br/>
                <input type="submit" value="Sign In" />
              </form>
            </div>
          );
  }
});
