var AllArticles = React.createClass({
  mixins: [ReactRouter.History],

  getInitialState: function () {
    return ({totalUnreadCount: 0});
  },

  componentDidMount: function () {
    WebsiteApiActions.setSidebarClicked("all");
    ArticleStore.addChangeListener(this.onArticleChange);
    UnreadStore.addChangeListener(this.onUnreadChange);
  },

  componentWillUnmount: function () {
    UnreadActions.subtractUnreads(this.state.totalUnreadCount)
    ArticleStore.removeChangeListener(this.onArticleChange);
    UnreadStore.removeChangeListener(this.onUnreadChange);
  },

  onClick: function (event) {
    WebsiteApiActions.setSidebarClicked("all");
    this.history.pushState(null, '/all_feeds/', {});
  },

  onArticleChange: function () {
    UnreadActions.subtractUnreads(this.state.totalUnreadCount)
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
