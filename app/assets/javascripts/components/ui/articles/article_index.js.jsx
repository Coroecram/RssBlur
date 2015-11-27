var listIdx = 0;
var isScrolling = false;

var ArticleIndex = React.createClass({

   mixins: [TimerMixin],



  getInitialState: function () {
    return {sidebar: SidebarClickedStore.fetch(),
            articles: ArticleStore.all(),
            heightSet: false,
            loaded: 0};
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

  _onImageResize: function () {
    debugger
  },

  componentDidUpdate: function() {
    if (this.state.articles &&
        !this.state.heightSet) {
      var articleListUL = $('.article-list')
      var articleDetailUL = $('.detail-article-list')
      var articleListScroll = [];
      var articleDetailScroll = [];
      var articleListChildren = articleListUL.children();
      var articleDetailChildren = articleDetailUL.children();
      for (var i = 0; i < this.state.articles.length; i++) {
      // debugger
        var listScrollHeight = articleListChildren[i].scrollHeight + 1 +
                              (articleListScroll[i-1] ?
                               articleListScroll[i-1].totalHeight : 0)
        var detailScrollHeight = articleDetailChildren[i].scrollHeight + 1 +
                             (articleDetailScroll[i-1] ?
                              articleDetailScroll[i-1].totalHeight : 0)
        articleListScroll[i] = {totalHeight: listScrollHeight,
                                elementHeight: articleListChildren[i].scrollHeight+1};
        articleDetailScroll[i] = {totalHeight: detailScrollHeight,
                                  elementHeight: articleDetailChildren[i].scrollHeight};
      };
      this.setState({articleListScroll: articleListScroll, articleDetailScroll: articleDetailScroll, heightSet: true});
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

  joinScroll: function(e) {
    if (!isScrolling &&
        this.state.articleListScroll &&
        this.state.artcileDetailScroll) {
      var articleListUL = $('.article-list');
      var articleDetailUL = $('.detail-article-list');
      var toCheckHeights = (e.currentTarget.className === 'article-list' ?
                                                  this.state.articleListScroll :
                                                  this.state.articleDetailScroll);
      var toCheck = (e.currentTarget.className === 'article-list' ?
                                                  articleListUL :
                                                  articleDetailUL);
      var toScroll = (e.currentTarget.className === 'article-list' ?
                                                  articleDetailUL :
                                                  articleListUL);
      var fraction = (e.currentTarget.className === 'article-list' ? 2 : 4);
      var bottomCutoff = toCheckHeights[listIdx].totalHeight -
                         (toCheckHeights[listIdx].elementHeight/fraction);
      var topCutoff = (listIdx === 0 ? 0 :
                      toCheckHeights[listIdx-1].totalHeight -
                      (toCheckHeights[listIdx-1].elementHeight/2));
        console.log('here');
        console.log(bottomCutoff);
        console.log(toCheck.scrollTop());
      if ((toCheck.scrollTop()-40) > bottomCutoff) {
        console.log('down');
        console.log(listIdx);
        listIdx = listIdx + 1;
        isScrolling = true;
        toScroll.children()[listIdx].scrollIntoView(true);
        this.clearScrolling();
      } else if ((toCheck.scrollTop()-40) < topCutoff) {
        // debugger
          console.log('up');
          console.log(listIdx);
          listIdx = listIdx - 1;
          isScrolling = true;
          toScroll.children()[listIdx].scrollIntoView(true);
                            // function(){this.clearScrolling()}.bind(this))
        }
      }
  },

  clearScrolling: function () {
    // debugger
    console.log('clear');
    isScrolling = false;
  },

  render: function () {
    return (
            <div className="article-index group">
              <ul className="article-list" onScroll={this.joinScroll}>
                  {this.state.articles &&
                    this.state.articles.map(function (article) {
                              return <ArticleListItem key={article.id} article={article} />
                             })
                  }
              </ul>
              <ul className="detail-article-list"  >
              {this.state.articles &&
                this.state.articles.map(function (article) {
                          return <ArticleDetail key={article.id}
                                                article={article}
                                                loadHandler={this.loadedImageCounter}/>
                         }.bind(this))
              }
              </ul>
            </div>
          );
  }
});
