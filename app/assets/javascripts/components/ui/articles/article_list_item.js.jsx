var ArticleListItem = React.createClass({

  render: function () {
    var articleDate = new Date(this.props.article.created_date);
    var prettyDate = DateFormat.format.prettyDate(articleDate);
    return (
            <li className="listed-article" id="{this.props.article.id}">
              <p className="small-article-title"><strong>{this.props.article.title}</strong></p>
              <p className="author">{this.props.article.author}</p>
              <p className="pretty-date">{prettyDate}</p>
            </li>
          );
  }
});
