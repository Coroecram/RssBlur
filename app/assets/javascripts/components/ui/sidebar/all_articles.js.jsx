var AllArticles = React.createClass({
  mixins: [ReactRouter.History],

  getInitialState: function () {
    return ({totalUnreadCount: 0});
  },

  componentDidMount: function () {
    ArticleStore.addChangeListener(this._onChange);
  },

  componentWillMount: function () {
    ArticleStore.removeChangeListener(this._onChange);
  },

  onClick: function (event) {
    WebsiteApiActions.setSidebarClicked("all");
    this.history.pushState(null, '/all_feeds/', {});
  },

  deleteWebsite: function (event) {
    event.stopPropagation();
    WebsiteApiActions.deleteWebsite(this.props.website.id);
  },

  _onChange: function () {
    unreadCounters = $('.unread-count');
    var total = 0;
    for (var i = 1; i < unreadCounters.length; i++) {
      toAdd = parseInt($(unreadCounters[i]).text());
      total += (toAdd !== toAdd ? 0 : toAdd);
      this.setState({totalUnreadCount: total});
    }
  },

  render: function () {
    return(
            <li onClick={this.onClick} className="website-list-item group">
              <p>All Articles</p>
            </li>
          );
  }
});
