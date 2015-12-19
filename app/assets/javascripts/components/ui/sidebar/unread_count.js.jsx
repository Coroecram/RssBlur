var UnreadCount = React.createClass({

  getInitialState: function () {
    return ({unreadCount: 0, sentUnread: false});
  },

  componentDidMount: function () {
    ArticleStore.addChangeListener(this.onArticleChange);
    ArticleApiUtil.fetchUnreadCount(this.props.website.id, this.setUnreadState);
  },

  componentWillUnmount: function () {
    ArticleStore.removeChangeListener(this.onArticleChange);
  },

  onArticleChange: function () {
    if (ArticleStore.all().length != 0) {
      ArticleApiUtil.fetchUnreadCount(this.props.website.id, this.setUnreadState);
      this.setState({sentUnread: false})
    }
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
