var ArticleIndex = React.createClass({
  getInitialState: function () {
    return {sidebar: SidebarClickedStore.fetch(), articles: ArticleStore.all()};
  },

  componentDidMount: function () {
    SidebarClickedStore.addChangeListener(this._onSidebarChange);
    ArticleStore.addChangeListener(this._onArticlesChange);
    WebsiteApiUtil.fetchClickedWebsite(this.props.params.id);
  },

  componentWillUnmount: function () {
    SidebarClickedStore.addChangeListener(this._onSidebarChange);
  },

  _onSidebarChange: function () {
    debugger
    clickedItem = SidebarClickedStore.fetch();
    if (clickedItem.feed) {
      ArticleApiUtil.fetchArticles(clickedItem, 0);
    } else {
      // website action set to website, maybe change path?
      // detailed store.
      // same goes for article click handler
    }
    this.setState({sidebar: clickedItem, articles: null});
  },

  _onArticlesChange: function () {
    this.setState({articles: ArticleStore.all()});
  },

  clickHandler: function () {
    // from button below
    // ApiUtil.addArticles(clickedItem.url, ArticleStore.all().length);
    // detailed store
  },

  render: function () {
    var articles;
    return (
            <div className="article-index">
              <ul className="article-list">
                  {this.state.articles &&
                    this.state.articles.map(function (article) {
                              return <ArticleListItem article={article} />
                             })
                  }
              </ul>
            </div>
          );
  }
});
