var ArticleHeader = React.createClass({

  componentDidMount: function () {
    WebsiteClickedStore.addChangeListener(this._onChange);
  },

  _onChange: function () {
    this.setState({articles: ArticleStore.all()});
  },

  render: function () {
    return (
          <div className="articles-header">
            <div className="header-focus">{this.props.focus.name}</div>
          </div>
          );
  }
});
