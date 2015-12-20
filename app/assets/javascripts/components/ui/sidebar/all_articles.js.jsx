var AllArticles = React.createClass({
  mixins: [ReactRouter.History],

  getInitialState: function () {
    return ({totalUnreadCount: 0});
  },

  componentDidMount: function () {
    UnreadActions.resetUnreads();
    WebsiteStore.addChangeListener(this.onWebsiteChange);
    ArticleStore.addChangeListener(this.onArticleChange);
    UnreadStore.addChangeListener(this.onUnreadChange);
  },

  componentWillUnmount: function () {
    UnreadActions.resetUnreads();
    WebsiteStore.addChangeListener(this.onWebsiteChange);
    ArticleStore.removeChangeListener(this.onArticleChange);
    UnreadStore.removeChangeListener(this.onUnreadChange);
    this.setState({totalUnreadCount: 0});
  },

  onClick: function (event) {
    WebsiteApiActions.setSidebarClicked("all");
    this.history.pushState(null, '/all_feeds', {});
  },

  onWebsiteChange: function () {
    if (ArticleStore.all().length === 0) {
      this.history.pushState(null, '/all_feeds', {});
    }
    this.setState({totalUnreadCount: UnreadStore.fetch()});
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
