var Article = React.createClass({

  getInitialState: function () {
    return {articles: null};
  },

  componentDidMount: function () {
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
    return (
            <li className="listed-article">
                <p>{this.props.article.title}</p>
            </li>
          );
  }
});
