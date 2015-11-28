var UnreadCount = React.createClass({

  getInitialState: function () {
    return {unreadCount: undefined};
  },

  componentDidMount: function () {
    SidebarClickedStore.addChangeListener(this._onSidebarChange);
    ArticleApiUtil.fetchUnreadCount(this.props.website.id, this.setUnreadCount);
  },

  componentWillUnmount: function () {
    SidebarClickedStore.removeChangeListener(this._onSidebarChange);
    ArticleStore.removeChangeListener(this._onArticlesChange);
  },

  _onSidebarChange: function () {

  },
