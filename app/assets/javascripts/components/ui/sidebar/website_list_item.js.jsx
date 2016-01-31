var WebsiteListItem = React.createClass({
  mixins: [ReactRouter.History],

  onClick: function (event) {
    SidebarActions.setSidebarClicked(this.props.website);
    this.history.pushState(null, '/websites/' + this.props.website.id, {});
  },

  deleteWebsite: function (event) {
    event.stopPropagation();
    UserWebsiteApiUtil.deleteAssociation(this.props.website.id, this.deleteSuccess);
  },

  deleteSuccess: function () {
    WebsiteApiActions.deleteWebsite(this.props.website.id);
    this.history.pushState(null, '/all_feeds', {});
  },

  render: function () {
    websiteName = this.props.website.name;
    if (websiteName.length > 20) {
      websiteName = websiteName.slice(0,20) + "...";
    }
    return(
            <li onClick={ this.onClick } className="website-list-item group">
              <UnreadCount website={ this.props.website }/>
              <p>{websiteName}</p>
              <div className="delete-website" onClick={ this.deleteWebsite }>X</div>
            </li>
          );
  }
});
