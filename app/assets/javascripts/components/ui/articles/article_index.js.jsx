var ArticleIndex = React.createClass({

  getInitialState: function () {
    return {sidebar: SidebarClickedStore.fetch(), articles: ArticleStore.all()};
  },

  componentDidMount: function () {
    ArticleStore.addChangeListener(this._onArticleChange);
    WebsiteClickedStore.addChangeListener(this._onWebsitechange);
  },

  _onWebsiteChange: function () {
    this.setState({sidebar: clickedSidebarStore.all()});
  },

  _onArticleChange: function () {
    this.setState({articles: ArticleStore.all()});
  },

  render: function () {
    var articles;
    if (this.state.articles) {
      articles = <Articles articles={this.state.articles}/>;
    }
    return (
            <div className="article-index">
              <ArticlesHeader focus={this.state.sidebar} />
              {articles}
            </div>
          );
  }
});
