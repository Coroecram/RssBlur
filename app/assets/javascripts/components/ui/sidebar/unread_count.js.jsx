var UnreadCount = React.createClass({

  getInitialState: function () {
    return ({unreadCount: ""});
  },

  componentDidMount: function () {
    ArticleStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    SidebarClickedStore.removeChangeListener(this._onSidebarChange);
    ArticleStore.removeChangeListener(this._onArticlesChange);
  },

  _onChange: function () {
    debugger
    ArticleApiUtil.fetchUnreadCount(this.props.website.id, this.setUnreadCount);
  },

  setUnreadCount: function (count) {
    this.setState({unreadCount: count});
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
