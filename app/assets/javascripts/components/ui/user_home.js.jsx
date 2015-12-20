var UserHome = React.createClass({

  mixins: [ReactRouter.History],

  componentWillMount: function () {
    if (!CurrentUserStore.isLoggedIn()) {
      this.onUserChange();
    }
  },

  componentDidMount: function () {
    CurrentUserStore.addChangeListener(this.onUserChange);
    WebsiteApiUtil.fetchWebsites();
  },

  componentWillUnmount: function () {
    CurrentUserStore.removeChangeListener(this.onUserChange);
  },

  onUserChange: function () {
    if (!CurrentUserStore.isLoggedIn()) {
      this.history.pushState(null, "/sign_in");
    }
  },

  render: function () {
    return (
            <div className="user-home group">
              <Header key={"header"} />
              <Sidebar key={"sidebar"} />
              {this.props.children}
            </div>
          );
  }
});
