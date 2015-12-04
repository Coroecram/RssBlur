var UnreadCount = React.createClass({

  getInitialState: function () {
    return ({unreadCount: undefined});
  },

  componentDidMount: function () {
    ArticleStore.addChangeListener(this._onArticleChange);
    ArticleApiUtil.fetchUnreadCount(this.props.website.id, this.setUnreadState);
  },

  componentWillUnmount: function () {
    ArticleStore.removeChangeListener(this._onArticleChange);
  },

  _onArticleChange: function () {
    ArticleApiUtil.fetchUnreadCount(this.props.website.id, this.setUnreadState);
  },

  setUnreadState: function (count) {
    this.setState({unreadCount: count});
    UnreadActions.passUnreads(this.state.unreadCount);
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
