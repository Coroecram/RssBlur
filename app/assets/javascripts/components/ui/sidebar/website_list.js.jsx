var WebsiteList = React.createClass({

  getInitialState: function () {
    return {websites: WebsiteStore.all()};
  },

  componentDidMount: function () {
    WebsiteStore.addChangeListener(this._onChange);
  },

  compomentWillUnmount: function () {
    WebsiteStore.removeChangeListener(this._onChange);
  },

  websiteClicked: function (event) {
    ApiActions.setWebsiteClicked(parseInt(event.currentTarget.id));
  },

  deleteWebsite: function (event) {
    ApiActions.deleteWebsite(parseInt(event.currentTarget.id));
  },

  _onChange: function () {
    this.setState({websites: WebsiteStore.all()});
  },

  render: function () {
    var websites;
    if (this.state.websites) {
      websites = this.state.websites.map(function (website) {
          return (
                  <div key={website.id}>
                    <li><div id={website.id} url={website.url} onClick={this.websiteClicked}>{website.name}</div>
                    <div className="delete-website" id={website.id} onClick={this.deleteWebsite}>X</div>
                    </li>
                  </div>
                );
        }.bind(this));
    }
    return (
            <div className="websites">
              <ul className="website-list">
                {websites}
              </ul>
            </div>
          );
  }
});
