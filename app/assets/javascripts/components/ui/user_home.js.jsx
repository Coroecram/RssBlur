var UserHome = React.createClass({

  mixins: [ReactRouter.History],

  componentWillMount: function () {
    if (!CurrentUserStore.isLoggedIn()) {
      this._onChange();
    }
  },

  componentDidMount: function () {
    CurrentUserStore.addChangeListener(this._onChange);
    WebsiteApiUtil.fetchWebsites();
  },

  _onChange: function () {
    this.history.pushState(null, "/sign_in");
  },

  signOut: function () {
    SessionApiUtil.logout();
  },

  render: function () {
    return (
            <div className="user-home group">
              <Header key={"header"}clickHandler={this.signOut} />
              <Sidebar key={"sidebar"} />
              {this.props.children}
            </div>
          );
  }
});
