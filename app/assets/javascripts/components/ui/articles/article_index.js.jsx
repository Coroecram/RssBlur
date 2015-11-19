var ArticleIndex = React.createClass({
  getInitialState: function () {
    return {sidebar: SidebarClickedStore.fetch()};
  },

  componentDidMount: function () {
    SidebarClickedStore.addChangeListener(this._onChange);
    ApiUtil.fetchClickedWebsite(this.props.params.id);
  },

  componentWillUnmount: function () {
    SidebarClickedStore.addChangeListener(this._onChange);
  },

  _onChange: function () {
    this.setState({sidebar: SidebarClickedStore.fetch()});
  },

  render: function () {
    var articles;
    if (this.state.sidebar) {
      if (this.state.sidebar.articles) {
      debugger
      articles = this.state.sidebar.articles.map(function (article) {
                  return <Article article=article />
                 });

      }
    }
    return (
            <div className="article-index">
              <ArticleHeader focus={this.state.sidebar} />
              <ul className="article-list">
                {articles}
              </ul>
            </div>
          );
  }
});
