var UserHome = React.createClass({

  mixins: [ReactRouter.History],

  componentWillMount: function () {
    if (!CurrentUserStore.isLoggedIn()) {
      this.onUserChange();
    }
  },

  componentDidMount: function () {
    CurrentUserStore.addChangeListener(this.onUserChange);
    WebsiteStore.addChangeListener(this._onWebsiteChange)
    WebsiteApiUtil.fetchWebsites();
  },

  onUserChange: function () {
    if ()!CurrentUserStore.isLoggedIn()) {
      this.history.pushState(null, "/sign_in");
    }
  },

  _onWebsiteChange: function () {
    this.history.pushState(null, "all_feeds")
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
