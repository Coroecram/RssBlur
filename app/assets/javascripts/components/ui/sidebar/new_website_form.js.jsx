var WebsiteForm = React.createClass({

  mixins: [React.addons.LinkedStateMixin, ReactRouter.History],

  getInitialState: function () {
    return {url: "", error: false};
  },

  submit: function (event) {
    event.preventDefault();
    var credentials = $(event.currentTarget).serializeJSON();
    this.setState({error: "Retrieving RSS Feed..."})
    WebsiteApiUtil.createWebsite(credentials, this.receivedSite, this.receivedError);
  },

  blankState: function () {
    this.setState({url: "", error: "Enter URL to an RSS feed or Website with an RSS Feed"});
  },

  componentWillReceiveProps: function () {
    this.blankState();
  },

  receivedError: function (data) {
    if (data.statusText === 'timeout') {
      this.setState({error: "The connection timed out. Please Try Again"});
    } else {
      this.setState({error: "Please try again or enter a valid website."});
    }
  },

  receivedSite: function (website) {
    this.blankState();
    WebsiteApiActions.createWebsite(website);
    SidebarActions.setSidebarClicked(website);
    this.history.pushState(null, '/websites/' + website.id, {});
  },

  render: function () {
    var error;
    if (this.state.error) {
      error = <div className="error">{this.state.error}</div>;
    }
    var websiteForm;

    if (this.props.show) {
      websiteForm = (
                      <div>
                        <form className="website-form" autoComplete="off" onSubmit={ this.submit }>
                          <label htmlFor="website-url">Website URL</label>
                              <input type="text"
                                     name="url"
                                     valueLink={this.linkState('url')}
                                     id="website-url"/>
                            <input type="submit" value="Add"/>
                            {error}
                        </form>
                        <div className="website-form-triangle" />
                      </div>
      );
    }
    return  <div>{websiteForm}</div>;
  }
});
