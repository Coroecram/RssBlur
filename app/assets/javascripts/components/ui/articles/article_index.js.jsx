var ArticleIndex = React.createClass({

   mixins: [TimerMixin],


  getInitialState: function () {
    return {sidebar: SidebarClickedStore.fetch(),
            articles: ArticleStore.all(),
            listIdx: 0,
            detailIdx: 0,
            scrolling: false};
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
                               articleListScroll[i-1].totalHeight : 0)
        var detailScrollHeight = articleDetailChildren[i].scrollHeight +
                             (articleDetailScroll[i-1] ?
                              articleDetailScroll[i-1].totalHeight : 0)
        articleListScroll[i] = {totalHeight: listScrollHeight,
                                elementHeight: articleListChildren[i].scrollHeight};
        articleDetailScroll[i] = {totalHeight: detailScrollHeight,
                                  elementHeight: articleDetailChildren[i].scrollHeight};
      };
      this.setState({articleListScroll: articleListScroll, articleDetailScroll: articleDetailScroll, heightSet: true})
    }
  },

  _onSidebarChange: function () {
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

  listScroll: function() {
    var articleListUL = $('.article-list');
    var articleDetailUL = $('.detail-article-list');
    var bottomCutoff = this.state.articleListScroll[this.state.listIdx].totalHeight -
                       (this.state.articleListScroll[this.state.listIdx].elementHeight/2);
    var topCutoff = this.state.listIdx === 0 ? 0 :
                    this.state.articleListScroll[this.state.listIdx-1].totalHeight -
                    (this.state.articleListScroll[this.state.listIdx-1].elementHeight/2);
    if (!this.state.scrolling) {
      if (articleListUL.scrollTop() > bottomCutoff) {
        articleDetailUL.scrollTo(articleDetailUL.children()[this.state.listIdx+1])
        this.setTimeout(this.clearScrolling, 250);
        this.setState({listIdx: this.state.listIdx + 1,
                       detailIdx: this.state.listIdx + 1,
                       scrolling: true});
      } else if (articleListUL.scrollTop() < topCutoff) {
          articleDetailUL.scrollTo(articleDetailUL.children()[this.state.listIdx-1])
          this.setTimeout(this.clearScrolling, 250);
          this.setState({listIdx: this.state.listIdx - 1,
                         detailIdx: this.state.listIdx - 1,
                         scrolling: true});
        }
      }
  },

  detailScroll: function() {
  },

  clearScrolling: function () {
    this.setState({scrolling: false});
  },

  render: function () {
    var articles;
    return (
            <div className="article-index group">
              <ul className="article-list" onScroll={this.listScroll}>
                  {this.state.articles &&
                    this.state.articles.map(function (article) {
                              return <ArticleListItem key={article.id} article={article} />
                             })
                  }
              </ul>
              <ul className="detail-article-list" onScroll={this.detailScroll} >
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
