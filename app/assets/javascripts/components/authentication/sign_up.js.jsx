var SignUp = React.createClass({

  render: function () {
    return (
            <div className="authentication">
              <h1>RSS Blur</h1>
              <form className="session signup">
                <label>Email</label>
                <br/>
                  <input type="email" />
                  <br/>
                <label>Username</label>
                <br/>
                  <input type="text" />
                  <br/>
                <label>Password</label>
                <br/>
                  <input type="password" />
                  <br/>
                <label>Confirm Password</label>
                <br/>
                  <input type="password" />
                  <br/>
                <input type="submit" value="Sign Up"/>
              </form>
              <span>Already a Member?</span><button className="sign-in-button">Sign In</button>
              <button className="guest-button">Sign In as Guest</button>
            </div>
          );
  }
});
