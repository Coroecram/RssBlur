var UnreadCount = React.createClass({

  getInitialState: function () {
    return ({unreadCount: undefined});
  },

  componentDidMount: function () {
    ArticleStore.addChangeListener(this._onChange);
    ArticleApiUtil.fetchUnreadCount(this.props.website.id, this.setUnreadCount);
  },

  componentWillUnmount: function () {
    ArticleStore.removeChangeListener(this._onChange);
  },

  _onChange: function () {
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
