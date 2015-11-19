var ArticleIndex = React.createClass({
  getInitialState: function () {
    return {sidebar: SidebarClickedStore.fetch()};
  },

  componentDidMount: function () {
    SidebarClickedStore.addChangeListener(this._onSidebarChange);
    ArticleStore.addChangeListener(this._onArticlesChange);
    ApiUtil.fetchClickedWebsite(this.props.params.id);
  },

  componentWillUnmount: function () {
    SidebarClickedStore.addChangeListener(this._onSidebarChange);
  },

  _onSidebarChange: function () {
    clickedItem = SidebarClickedStore.fetch();
    ApiUtil.fetchArticles(clickedItem, 0);
    this.setState({sidebar: clickedItem});
  },

  _onArticlesChange: function () {
    this.setState({articles: ArticleStore.all()});
  },

  clickHandler: function () {
    // from button below
    // ApiUtil.addArticles(clickedItem.url, ArticleStore.all().length);
  },

  render: function () {
    var articles;
    // if (this.state.sidebar) {
    //   if (this.state.sidebar.articles) {
    //   debugger
    //   articles = this.state.sidebar.articles.map(function (article) {
    //               return <Article article=article />;
    //              });
    //
    //   }
    // }
    return (
            <div className="article-index">
              <ArticleHeader focus={this.state.sidebar} />
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
