var AllArticles = React.createClass({
  mixins: [ReactRouter.History],

  getInitialState: function () {
    return ({totalUnreadCount: 0});
  },

  componentDidMount: function () {
    UnreadActions.resetUnreads();
    ArticleStore.addChangeListener(this.onArticleChange);
    UnreadStore.addChangeListener(this.onUnreadChange);
  },

  componentWillUnmount: function () {
    UnreadActions.resetUnreads();
    SidebarClickedStore.removeChangeListener(this.onSidebarChange);
    UnreadStore.removeChangeListener(this.onUnreadChange);
    this.setState({totalUnreadCount: 0});
  },

  onClick: function (event) {
    WebsiteApiActions.setSidebarClicked("all");
    this.history.pushState(null, '/all_feeds/', {});
  },

  onArticleChange: function () {
    UnreadActions.resetUnreads();
  },

  onUnreadChange: function () {
    this.setState({totalUnreadCount: UnreadStore.fetch()});
  },

  render: function () {
    return(
            <li onClick={this.onClick} className="website-list-item group">
              <p className={"unread-count"}>{this.state.totalUnreadCount}</p>
              <p>All Articles</p>
            </li>
          );
  }
});
