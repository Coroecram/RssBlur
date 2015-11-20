var UserHome = React.createClass({

  mixins: [ReactRouter.History],

  componentWillMount: function () {
    if (!CurrentUserStore.isLoggedIn()) {
      this.history.pushState(null, "/sign_in");
    }
  },

  componentDidMount: function () {
    WebsiteApiUtil.fetchWebsites();
  },

  render: function () {
    return (
            <div className="user-home">
              <Sidebar />
            </div>
          );
  }
});
