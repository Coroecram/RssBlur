var UnreadCount = React.createClass({

  getInitialState: function () {
    return ({unreadCount: ""});
  },

  componentDidMount: function () {
    ArticleStore.addChangeListener(this._onChange);
    ArticleApiUtil.fetchUnread(this.props.website.id, this.setUnreadCount);
  },

  componentWillUnmount: function () {
    SidebarClickedStore.removeChangeListener(this._onSidebarChange);
    ArticleStore.removeChangeListener(this._onArticlesChange);
  },

  _onChange: function () {
    ArticleApiUtil.fetchUnread(this.props.website.id, this.setUnreadCount);
  },

  setUnreadCount: function (unread) {
    this.setState({unreadCount: unread.length});
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
