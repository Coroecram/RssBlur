(function (root) {
  var _articles = [];
  var CHANGE_EVENT = 'changed';
  var searchQuery = "";
  var searchFilter = "";
  var sortOrder = false;
  var sortBy = "pubdate";
  var articleSet = [];

  var setArticles = function (articles) {
    uniqueArticles = [];
    var uniqueIds = setUniques();
    for (var i = 0; i < articles.length; i++) {
      if (!uniqueIds[articles[i].id]) {
        uniqueIds[articles[i].id] = true;
        uniqueArticles.push(articles[i]);
      }
    }

    _articles = _articles.concat(uniqueArticles);
  };

  var setUniques = function () {
    var uniqueIds = {};
    for (var i = 0; i < _articles.length; i++) {
      uniqueIds[_articles[i].id] = true;
    }
    return uniqueIds;
  };

  var resetArticles = function () {
    _articles = [];
  };

  var addArticles = function (articles) {
    _articles.concat(articles);
  };

  var setQuery = function (searchParams) {
    searchQuery = searchParams[0];
    searchFilter = searchParams[1];
  };

  var setSortParams = function (sortParams) {
    sortOrder = sortParams[0];
    sortBy    = sortParams[1];
  };

  var deleteWebsiteArticles = function (website_id) {
    for (var i = 0; i < _articles.length; i++){
      if (_articles[i].website_id === website_id) {
        _articles.splice(i, 1);
        i--
      }
    };
  };

  var ArticleStore = root.ArticleStore = $.extend({}, EventEmitter.prototype, {

    all: function () {
      return (searchQuery === "") ? this.sort(_articles.slice(0))
                                    : this.sort(this.searchResults());
    },

    searchResults: function () {
      articleSet = [];
        var query = new RegExp(searchQuery, 'i')
        for (var i = 0; i < _articles.length; i++) {
          var n = articleSet.length
          if (searchFilter === "all") {
              this.searchTitle(_articles[i], query, n);
              this.searchSummary(_articles[i], query, n);
              this.searchAuthor(_articles[i], query, n);
            } else if (searchFilter === "title") {
              this.searchTitle(_articles[i], query, n);
            } else if (searchFilter === "summary") {
              this.searchSummary(_articles[i], query, n);
            } else if (searchFilter === "author") {
              this.searchAuthor(_articles[i], query, n);
            }
        }
      return articleSet;
    },

    searchTitle: function (article, query, length) {
      if  (article.title.search(query) != -1 &&
           length === articleSet.length) {
        articleSet.push(article);
      }
    },

    searchSummary: function (article, query, length) {
      if  (article.summary.search(query) != -1 &&
           length === articleSet.length) {
        articleSet.push(article);
      }
    },

    searchAuthor: function(article, query, length) {
      if  (article.author.search(query) != -1 &&
           length === articleSet.length) {
        articleSet.push(article);
      }
    },

    sort: function (articles) {
      sortOrder
      // for (x in articles) {
      //   console.log(articles[x]);
      // }

      switch(sortBy){
        case "pubdate":
          articles.sort(function(a, b){
            var pubdateA = new Date(a.created_date);
            var pubdateB = new Date(b.created_date);
            if (pubdateA < pubdateB) {
              return 1;
            } else if (pubdateA > pubdateB) {
              return -1;
            }

            return 0;
          });
          break;
        case "website":
        articles.sort(function(a, b){
          var urlA = a.url.toUpperCase();
          var urlB = b.url.toUpperCase();
          if (urlA < urlB) {
            return -1;
          } else if (urlA > urlB) {
            return 1;
          }

          return 0;
        });
          break;
        case "title":
        articles.sort(function(a, b){
            var titleA = a.title.toUpperCase();
            var titleB = b.title.toUpperCase();
            if (titleA < titleB) {
              return -1;
            } else if (titleA > titleB) {
              return 1;
            }

            return 0;
          });
          break;
        case "author":
          articles.sort(function(a, b){
              var authorA = a.author.toUpperCase();
              var authorB = b.author.toUpperCase();
              if (authorA < authorB) {
                return -1;
              } else if (authorA > authorB) {
                return 1;
              }

              return 0;
            });
          break;
        }

        return sortOrder ? articles.reverse() : articles;
    },

    reset: function () {
      _articles = [];
    },

    find: function(id) {
      for (var i = 0; i < _articles.length; i++){
        if (id === _articles[i].id) {
          return _articles[i];
        }
      }
      return null;
    },

    addChangeListener: function (callback) {
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
      this.removeListener(CHANGE_EVENT, callback);
    },

    emitChange: function () {
      this.emit(CHANGE_EVENT);
    },

    dispatchToken: ArticleDispatcher.register(function (payload) {
      switch (payload.actionType) {
      case (ArticleConstants.ARTICLES_RECEIVED):
        setArticles(payload.articles);
        ArticleStore.emitChange();
        break;
      case (ArticleConstants.RESET_ARTICLES):
        ArticleStore.reset();
        ArticleStore.emitChange();
        break;
      case (ArticleConstants.SEARCH):
        setQuery(payload.searchParams);
        ArticleStore.emitChange();
        break;
      case (ArticleConstants.SORT):
        setSortParams(payload.sortParams);
        ArticleStore.emitChange();
        break;
      case (ArticleConstants.MARKED_READ):
        ArticleStore.emitChange();
        break;
      case (ArticleConstants.WEBSITE_DELETED):
        deleteWebsiteArticles(payload.id);
        ArticleStore.emitChange();
        break;
      }
    })
  });
})(this);
