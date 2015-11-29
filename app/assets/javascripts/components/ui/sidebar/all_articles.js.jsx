var AllArticles = React.createClass({
  mixins: [ReactRouter.History],

  onClick: function (event) {
    WebsiteApiActions.setAllClicked(this.props.website);
    this.history.pushState(null, '/all_feeds', {});
  },

  deleteWebsite: function (event) {
    event.stopPropagation();
    WebsiteApiActions.deleteWebsite(this.props.website.id);
  },

  render: function () {
    return(
            <li onClick={this.onClick} className="website-list-item group">
              <p>All Articles</p>
            </li>
          );
  }
});
