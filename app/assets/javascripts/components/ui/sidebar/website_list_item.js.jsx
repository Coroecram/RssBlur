var WebsiteListItem = React.createClass({
  mixins: [ReactRouter.History],

  onClick: function (event) {
    WebsiteApiActions.setSidebarClicked(this.props.website);
    this.history.pushState(null, '/website/' + this.props.website.id, {});
  },

  deleteWebsite: function (event) {
    event.stopPropagation();
    // WebsiteApiActions.deleteWebsite(this.props.website.id);
  },

  render: function () {
    websiteName = this.props.website.name;
    if (websiteName.length > 20) {
      websiteName = websiteName.slice(0,20) + "...";
    }
    return(
            <li onClick={this.onClick} className="website-list-item">
              <p>{websiteName}</p>
              <div className="delete-website" onClick={this.deleteWebsite}>X</div>
            </li>
          );
  }
});
