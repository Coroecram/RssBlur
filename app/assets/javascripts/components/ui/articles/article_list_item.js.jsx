var ArticleListItem = React.createClass({
  render: function () {
    var articles;
    return (
            <li key={this.props.article.id} className="listed-article" O>
                <p>{this.props.article.title}</p>
            </li>
          );
  }
});
