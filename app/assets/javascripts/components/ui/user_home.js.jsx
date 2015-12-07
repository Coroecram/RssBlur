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
