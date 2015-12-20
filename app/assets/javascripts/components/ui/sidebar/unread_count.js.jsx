var UnreadCount = React.createClass({

  getInitialState: function () {
    return ({unreadCount: 0, sentUnread: false});
  },

  componentDidMount: function () {
    ArticleStore.addChangeListener(this.onArticleChange);
    WebsiteStore.addChangeListener(this.onWebsiteChange);
    ArticleApiUtil.fetchUnreadCount(this.props.website.id, this.setUnreadState);
  },

  componentWillUnmount: function () {
    ArticleStore.removeChangeListener(this.onArticleChange);
    WebsiteStore.removeChangeListener(this.onWebsiteChange);
  },

  onArticleChange: function () {
    if (ArticleStore.all().length != 0) {
      ArticleApiUtil.fetchUnreadCount(this.props.website.id, this.setUnreadState);
      this.setState({sentUnread: false});
    }
  },

  onWebsiteChange: function () {
    this.setState({sentUnread: false});
    ArticleApiUtil.fetchUnreadCount(this.props.website.id, this.setUnreadState);
  },

  setUnreadState: function (count) {
    if (!this.state.sentUnread) {
      this.setState({unreadCount: count, sentUnread: true});
      UnreadActions.passUnreads(this.state.unreadCount);
    }
  },

  render: function () {
    var unreadCount = this.state.unreadCount;
    return(
            <div>
              <p className={"unread-count"}>{this.state.unreadCount}</p>
            </div>
          );
  }
});
