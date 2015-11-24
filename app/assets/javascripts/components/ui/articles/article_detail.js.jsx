var ArticleDetail = React.createClass({
  render: function () {
    var articleDate = new Date(this.props.article.created_date);
    var detailDate = DateFormat.format.date(articleDate, "h:mm p MMMM d, yyyy");
    return (
            <li className="detail-article group">
              <img className="detail-image" src={this.props.article.image} />
              <p className="detail-title"><strong>{this.props.article.title}</strong></p>
              <p className="article-date">{detailDate}</p>
              <p className="detail-author">{this.props.article.author}</p>
              <p className="article-summary">{this.props.article.summary}</p>
            </li>
          );
  }
});
