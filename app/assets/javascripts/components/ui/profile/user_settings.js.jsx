var UserSettings = React.createClass({
  mixins: [ReactRouter.History, React.addons.LinkedStateMixin],

  getInitialState: function () {
    return {fileUploader: true,
            password: "",
            passwordConfirmation: "",
            imageUrl: "",
            imageFile: null};
  },

  _backHome: function () {
    this.history.pushState(null, '/home')
  },

  _changePassword: function (event) {
    event.preventDefault();
    var formData = new FormData();
    var credentials = $(event.currentTarget).serializeJSON();
    var password = credentials.password;
    var confirmation = credentials.password_confirmation;

    formData.append("user[password]", password);
    formData.append("user[password_confirmation]", confirmation);
    UserApiUtil.updateUser(formData, this.resetForm);
  },

  _changeFile: function(event) {
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

  _changeAvatar: function(event) {
    event.preventDefault();
    if (this.state.imageFile) {
      var file = this.state.imageFile;

      var formData = new FormData();
      debugger
        this.setState({ fileUploader: false });
        formData.append("user[avatar]", file);

        UserApiUtil.updateUser(formData, this.resetForm, this.showFileUploader);
      }
    },

  resetForm: function() {
    debugger
    this.setState({ fileUploader: true, imageUrl: "", imageFile: null });
  },

  showFileUploader: function () {
    this.setState({ fileUploader: true } );
  },

render: function () {
  var fileUploader = (this.state.fileUploader ? <input id="uploadBtn"
                                                     type="file"
                                                     onChange={this._changeFile}
                                                /> :
                                                     <div className="upload" />);
  return (
          <div className="user-settings">
            <h1>
              User Settings
              <i onClick={ this._backHome }
              className="fa fa-home"></i>
            </h1>
            <div className="update">
            <form className="update-avatar" onSubmit={ this._changeAvatar }>
              <div className="profile-pic subform group">
                  <h2>Change Avatar</h2>
                <img className="large-thumb">
                </img>
                {fileUploader}
                <input type="submit" value="Update Avatar" />
                <img className="preview" src={this.state.imageUrl} />
                <p>New</p><p>Avatar</p>
              </div>
            </form>
            <form className="update-password" onSubmit={ this._changePassword }>
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
              </form>
            </div>
          </div>
        );
}
});
