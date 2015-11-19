var WebsiteListItem = React.createClass({
  mixins: [ReactRouter.History],

  onClick: function (event) {
    debugger
    ApiActions.setSidebarClicked(this.props.website.id);
    this.history.pushState(null, '/website/' + this.props.website.id, {});
  },

  deleteWebsite: function (event) {
    ApiActions.deleteWebsite(this.props.website.id);
  },

  render: function () {

    return(
            <li onClick={this.onClick} className="website-list-item">
              <p>{this.props.website.name}</p>
              <div className="delete-website" onClick={this.deleteWebsite}>X</div>
            </li>
          );
  }
});
