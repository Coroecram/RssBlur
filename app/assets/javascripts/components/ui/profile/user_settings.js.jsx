var UserSettings = React.createClass({
  mixins: [ReactRouter.History, React.addons.LinkedStateMixin],

  getInitialState: function () {
    return {password: "", passwordConfirmation: "", imageUrl: "", imageFile: null};
  },

  _backHome: function () {
    this.history.pushState(null, '/home')
  },

  _changePassword: function (event) {
    event.preventDefault();
    var credentials = $(event.currentTarget).serializeJSON();
    UserApiUtil.updateUser(credentials);
  },

  changeFile: function(event) {
    var reader = new FileReader();
    var file = event.currentTarget.files[0];
    var that = this;

    reader.onloadend = function() {
      that.setState({ imageUrl: reader.result, imageFile: file });
    }

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.setState({ imageUrl: "", imageFile: null });
    }
  },

render: function () {
  return (
          <div className="user-settings">
            <h1>
              User Settings
              <i onClick={ this._backHome }
              className="fa fa-home"></i>
            </h1>
            <form className="update-form" onSubmit={ this._changePassword }>
            <div className="profile-pic subform group">
                <h2>Current Avatar</h2>
              <img className="large-thumb">
              </img>
              <input id="uploadBtn" type="file" onChange={this.changeFile} className="upload" />
              <div className="upload-button">Update Avatar</div>
              <img className="preview" src={this.state.imageUrl} />
              <p>Image</p><p>Preview</p>
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
