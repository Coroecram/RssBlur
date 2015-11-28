var isScrolling = false;

var ArticleIndex = React.createClass({

  mixins: [ReactRouter.History],

  getInitialState: function () {
    return {sidebar: SidebarClickedStore.fetch(),
            articles: ArticleStore.all()};
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

  _onSidebarChange: function () {
    clickedItem = SidebarClickedStore.fetch();
    ArticleApiUtil.fetchArticles(clickedItem);
    this.setState({sidebar: clickedItem,
                   articles: null});
  },

  _onArticlesChange: function () {
    this.setState({articles: ArticleStore.all()});
  },

  autoScroll: function (toScroll, idx) {
    isScrolling = true;
    toScroll.scrollTo(toScroll.children()[idx],
                      {duration: 250},
                      function() {TimerMixin.setTimeout(function () {this.clearScrolling()}.bind(this), 300)}.bind(this));
  },

  clearScrolling: function () {
    isScrolling = false;
  },

  _listClick: function (e) {
    var articleListUL = $('.article-list');
    var articleDetailUL = $('.detail-article-list');
    idx = parseInt(e.currentTarget.dataset.index);
    this.autoScroll(articleListUL, idx);
    this.autoScroll(articleDetailUL, idx);
  },

  render: function () {
    return (
            <div className="article-index group">
              <ul className="article-list">
                  {this.state.articles &&
                    this.state.articles.map(function (article, idx) {
                              return <ArticleListItem key={"listed"+article.id}
                                                      index={idx}
                                                      clickHandler={this._listClick}
                                                      article={article} />
                             }.bind(this))
                  }
              </ul>
              <ul className="detail-article-list">
              {this.state.articles &&
                this.state.articles.map(function (article, idx) {
                          return <ArticleDetail key={"930xkdeetsl9"+article.id}
                                                index={idx}
                                                article={article}/>
                         })
              }
              </ul>
            </div>
          );
  }
});
