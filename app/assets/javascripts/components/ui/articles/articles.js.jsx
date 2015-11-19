var Articles = React.createClass({

  getInitialState: function () {
    // return {articles: null};
    return null;
  },

  componentDidMount: function () {
    debugger
    // ArticleStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    // ArticleStore.removeChangeListener(this._onChange);
  },

  articleClicked: function (event) {
    // ApiActions.setArticleClicked(parseInt(event.currentTarget.id));
  },

  _onChange: function () {
    // this.setState({articles: ArticleStore.all()});
  },

  render: function () {
    var articles;
    // if (this.state.articles) {
    //   articles = this.state.articles.map(function (article) {
    //       return (
    //               <li key={article.id} id={article.id} url={article.url} onClick={this.articleClicked}>{article.name}</li>
    //             );
    //     }.bind(this));
    // }
    return (
            <div className="articles">
              <ul className="article-list">
                {articles}
              </ul>
            </div>
          );
  }
});
