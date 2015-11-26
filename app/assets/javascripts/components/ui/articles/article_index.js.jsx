var ArticleIndex = React.createClass({

  getInitialState: function () {
    return {sidebar: SidebarClickedStore.fetch(), articles: ArticleStore.all()};
  },

  componentDidMount: function () {
    SidebarClickedStore.addChangeListener(this._onSidebarChange);
    ArticleStore.addChangeListener(this._onArticlesChange);
    if (typeof this.state.sidebar === 'undefined') {
      WebsiteApiUtil.fetchClickedWebsite(this.props.params.id);
    } else {
      this._onSidebarChange();
    }
  },

  componentWillUnmount: function () {
    SidebarClickedStore.removeChangeListener(this._onSidebarChange);
    ArticleStore.removeChangeListener(this._onArticlesChange);
  },

  componentDidUpdate: function() {
    var articleListUL = $('.article-list')
    var articleDetailUL = $('.detail-article-list')
    var articleListScroll = [];
    var articleDetailScroll = [];
    if (this.state.articles && !this.state.heightSet) {
      var articleListChildren = articleListUL.children();
      var articleDetailChildren = articleDetailUL.children();
      for (var i = 0; i < this.state.articles.length; i++) {
        var listScrollHeight = articleListChildren[i].scrollHeight +
                              (articleListScroll[i-1] ?
                               articleListScroll[i-1].elementHeight : 0)
        var detailScrollHeight = articleDetailChildren[i].scrollHeight +
                             (articleDetailScroll[i-1] ?
                              articleDetailScroll[i-1].elementHeight : 0)
        articleListScroll[i] = {elementHeight: listScrollHeight};
        articleDetailScroll[i] = {elementHeight: detailScrollHeight};
      };
      this.setState({articleListScroll: articleListScroll, articleDetailScroll: articleDetailScroll, heightSet: true})
    }
  },

  _onSidebarChange: function () {
    debugger
    clickedItem = SidebarClickedStore.fetch();
    if (clickedItem.is_feed) {
      ArticleApiUtil.fetchArticles(clickedItem, 0);
    } else {
      // website action set to website, maybe change path?
      // detailed store.
      // same goes for article click handler
    }
    this.setState({sidebar: clickedItem, articles: null, heightSet: false});
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
            <div className="article-index group">
              <ul className="article-list">
                  {this.state.articles &&
                    this.state.articles.map(function (article) {
                              return <ArticleListItem key={article.id} article={article} />
                             })
                  }
              </ul>
              <ul className="detail-article-list">
              {this.state.articles &&
                this.state.articles.map(function (article) {
                          return <ArticleDetail key={article.id} article={article} />
                         })
              }
              </ul>
            </div>
          );
  }
});
