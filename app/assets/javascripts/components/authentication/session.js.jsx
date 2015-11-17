var Session = React.createClass({

  render: function () {
    return (
            <div className="authentication">
              <h1>RSS Blur</h1>
              <form className="session signin">
                <label>Username or Email</label>
                <br/>
                  <input type="text" />
                <br/>
                <label>Password</label>
                <br/>
                  <input type="password" />
                  <br/>
                <input type="submit" value="Sign In"/>
              </form>
            </div>
          );
  }
});
