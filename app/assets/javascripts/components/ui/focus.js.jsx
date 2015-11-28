var UserHome = React.createClass({

  mixins: [ReactRouter.History],

  componentDidMount: function () {
    SidebarClickedStore.addChangeListener(this._onChange);
    if (typeof this.state.sidebar === 'undefined') {
      WebsiteApiUtil.fetchClickedWebsite(this.props.params.id);
    } else {
      this._onChange();
    }
  },

  componentWillUnmount: function () {
    SidebarClickedStore.removeChangeListener(this._onSidebarChange);
    ArticleStore.removeChangeListener(this._onArticlesChange);
  },

  _onChange: function () {
    clickedItem = SidebarClickedStore.fetch();
    if (clickedItem.is_feed) {
      this.history.pushState(null, "/website/focus/" + clickedItem.id)
    } else {
      WebsiteApiUtil.fetchWebsite(clickedItem);
    }
    this.setState({sidebar: clickedItem});
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
