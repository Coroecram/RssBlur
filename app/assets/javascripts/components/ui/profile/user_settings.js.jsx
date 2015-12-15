var UserSettings = React.createClass({
  mixins: [ReactRouter.History, React.addons.LinkedStateMixin],

  getInitialState: function () {
    return {currentUser: CurrentUserStore.fetch(),
            password: "",
            passwordConfirmation: "",
            imageUrl: "",
            imageFile: null};
  },

  componentDidMount: function () {
    CurrentUserStore.addChangeListener(this.onUserChange);
  },

  componentWillUnmount: function () {
    CurrentUserStore.removeChangeListener(this.onUserChange);
  },


  onUserChange: function () {
    this.setState({currentUser: CurrentUserStore.fetch()})
  },

  backHome: function () {
    this.history.pushState(null, '/home')
  },

  changePassword: function (event) {
    event.preventDefault();
    var formData = new FormData();
    var credentials = $(event.currentTarget).serializeJSON();
    var password = credentials.password;
    var confirmation = credentials.password_confirmation;

    formData.append("user[password]", password);
    formData.append("user[password_confirmation]", confirmation);
    UserApiUtil.updateUser(formData, this.resetForm);
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

  changeAvatar: function(event) {
    event.preventDefault();
    if (this.state.imageFile) {
      var file = this.state.imageFile;

      var formData = new FormData();
        formData.append("user[avatar]", file);

        UserApiUtil.updateUser(formData, this.resetForm);
      }
    },

  resetForm: function() {
    $('.update-avatar').get(0).reset()
    this.setState({ imageUrl: "", imageFile: null });
  },

render: function () {
  return (
          <div className="user-settings">
            <h1>
              User Settings
              <i onClick={ this.backHome }
              className="fa fa-home"></i>
            </h1>
            <div className="update">
            <form className="update-avatar" onSubmit={ this.changeAvatar }>
              <div className="profile-pic subform group">
                  <h2>Change Avatar</h2>
                <img className="large-thumb" src={this.state.currentUser.display}>
                </img>
                <input id="uploadBtn" type="file" onChange={this.changeFile}/>
                <input type="submit" value="Update Avatar" />
                <img className="preview" src={this.state.imageUrl} />
                <p>New</p><p>Avatar</p>
              </div>
            </form>
            <form className="update-password" onSubmit={ this.changePassword }>
              <h2>Change Password</h2>
                <label>New Password
                  <input type="password"
                         name="password"
                         maxLength="30"
                         valueLink={this.linkState('password')} />
                  </label>
                <label>Confirm Password
                  <input type="password"
                         name="password_confirmation"
                         maxLength="30"
                         valueLink={this.linkState('passwordConfirmation')} />
                  </label>
                <input type="submit" value="Change Password" />
              </form>
            </div>
          </div>
        );
}
});
