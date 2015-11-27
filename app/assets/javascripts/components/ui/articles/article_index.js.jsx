var ArticleIndex = React.createClass({

  getInitialState: function () {
    return {sidebar: SidebarClickedStore.fetch(),
            articles: ArticleStore.all(),
            scrollsSet: false,
            heightsAdjusted: false,
            loaded: 0,
            listIdx: 0,
            detailIdx: 0,
            isScrolling: false};
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
    if (this.state.articles &&
        !this.state.scrollsSet) {
      var listIdx;
      var articleListUL = $('.article-list')
      var articleDetailUL = $('.detail-article-list')
      var articleListScroll = [];
      var articleDetailScroll = [];
      var articleListChildren = articleListUL.children();
      var articleDetailChildren = articleDetailUL.children();
      for (var i = 0; i < articleListChildren.length; i++) {
        var listScrollHeight = articleListChildren[i].scrollHeight + 1 +
                              (articleListScroll[i-1] ?
                               articleListScroll[i-1].totalHeight : 0)
        var detailScrollHeight = articleDetailChildren[i].scrollHeight + 1 +
                             (articleDetailScroll[i-1] ?
                              articleDetailScroll[i-1].totalHeight : 0)
        articleListScroll[i] = {totalHeight: listScrollHeight,
                                elementHeight: articleListChildren[i].scrollHeight+1};
        articleDetailScroll[i] = {totalHeight: detailScrollHeight,
                                  elementHeight: articleDetailChildren[i].scrollHeight,
                                  heightAdjusted: false};
        if (articleListUL.scrollTop() >= articleListScroll[i].totalHeight){
          listIdx = i;
        }
      };
      this.setState({articleListScroll: articleListScroll,
                     articleDetailScroll: articleDetailScroll,
                     listIdx: listIdx,
                     scrollsSet: true});
    }
  },

  heightAdjuster: function () {
   var articleDetailUL = $('.detail-article-list');
   var articleListUL = $('.article-list');
   var idx = 0;
   if (this.state.articleDetailScroll) {
     changedCount = 0;
     for (var i = 0; i < this.state.articleDetailScroll.length; i++) {
       var currentImageHeight = $('.detail-image')[i].height;
       if (currentImageHeight > 5){
         changedCount++
         if (!this.state.articleDetailScroll[i].heightAdjusted) {
           this.state.articleDetailScroll[i].elementHeight += currentImageHeight;
           this.state.articleDetailScroll[i].totalHeight = (i === 0 ?
                                                   this.state.articleDetailScroll[i].elementHeight :
                                                   this.state.articleDetailScroll[i-1].totalHeight +
                                                   this.state.articleDetailScroll[i].elementHeight)
           this.state.articleDetailScroll[i].heightAdjusted = true;
        }
       }
       if (articleDetailUL.scrollTop() > this.state.articleDetailScroll[i].totalHeight) {
         idx = i;
       }
     }
    this.autoScroll(articleListUL, idx);
    this.setState({ heightsAdjusted: (changedCount === this.state.articleDetailScroll.length ?
                                      true : false)})
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
    this.setState({sidebar: clickedItem,
                   articles: null,
                   scrollsSet: false,
                   heightsAdjusted: false,
                   loaded: 0,
                   listIdx: 0,
                   detailIdx: 0,
                   isScrolling: false};
  },

  _onArticlesChange: function () {
    this.setState({articles: ArticleStore.all()});
  },

  joinScroll: function(e) {
    if (!this.state.heightsAdjusted) {
      this.heightAdjuster();
    }
    if (!this.state.isScrolling &&
        this.state.heightsAdjusted) {
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
      var idx = (e.currentTarget.className === 'article-list' ?
                                                    this.state.listIdx :
                                                     this.state.detailIdx);
      var fraction = (e.currentTarget.className === 'article-list' ? 2 : 4);
      var bottomCutoff = toCheckHeights[idx].totalHeight -
                         (toCheckHeights[idx].elementHeight/fraction);
      var topCutoff = (idx === 0 ? 0 :
                      toCheckHeights[idx-1].totalHeight -
                      (toCheckHeights[idx-1].elementHeight/2));
      if (toCheck.scrollTop() > bottomCutoff) {
        idx = idx + 1;
        this.autoScroll(toScroll, idx);
      } else if (toCheck.scrollTop() < topCutoff) {
          idx = idx - 1;
          this.autoScroll(toScroll, idx);
        }
      }
  },

  autoScroll: function (toScroll, idx) {
    isScrolling = true;
    toScroll.scrollTo(toScroll.children()[idx],
                      {duration: 250},
                      function() {this.clearScrolling(idx)}.bind(this));
  },

  clearScrolling: function (idx) {
    this.setState({isScrolling: false, listIdx: idx, detailIdx: idx});
  },

  render: function () {
    return (
            <div className="article-index group">
              <ul className="article-list" onScroll={this.joinScroll}>
                  {this.state.articles &&
                    this.state.articles.map(function (article) {
                              return <ArticleListItem key={45+article.id} article={article} />
                             })
                  }
              </ul>
              <ul className="detail-article-list"  onScroll={this.joinScroll}>
              {this.state.articles &&
                this.state.articles.map(function (article) {
                          return <ArticleDetail key={9999999+article.id}
                                                article={article}/>
                         })
              }
              </ul>
            </div>
          );
  }
});
