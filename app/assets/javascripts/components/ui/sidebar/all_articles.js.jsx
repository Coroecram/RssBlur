var AllArticles = React.createClass({
  mixins: [ReactRouter.History],

  getInitialState: function () {
    return ({totalUnreadCount: 0});
  },

  componentDidMount: function () {
    ArticleStore.addChangeListener(this._onArticleChange);
    UnreadStore.addChangeListener(this._onUnreadChange);
    // debugger
  },

  componentWillUnmount: function () {
    UnreadActions.subtractUnreads(this.state.totalUnreadCount)
    ArticleStore.removeChangeListener(this._onArticleChange);
    UnreadStore.removeChangeListener(this._onUnreadChange);
  },

  onClick: function (event) {
    WebsiteApiActions.setSidebarClicked("all");
    this.history.pushState(null, '/all_feeds/', {});
  },

  _onArticleChange: function () {
    debugger
    UnreadActions.subtractUnreads(this.state.totalUnreadCount)
  },

  _onUnreadChange: function () {
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
