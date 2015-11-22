var WebsiteForm = React.createClass({

  mixins: [React.addons.LinkedStateMixin],

  getInitialState: function () {
    return {url: "", rss: false, error: false};
  },

  submit: function (event) {
    event.preventDefault();
    var credentials = $(event.currentTarget).serializeJSON();
    if (this.state.rss) {
      this.retrieveRSS(credentials);
    } else {
      WebsiteApiUtil.createWebsite(credentials, this.receivedSite, this.receivedError);
    }
  },

  retrieveRSS: function (credentials) {
    WebsiteApiUtil.retrieveRSSURL(credentials, this.updateURL, this.receivedError);
  },

  updateURL: function (feedURL) {
    debugger
    this.setState({url: feedURL.url});
    this.setState({rss: false});
  },

  receivedError: function (data) {
    if (data.statusText === 'timeout') {
      this.setState({error: "The connection timed out. Please Try Again"});
    } else {
      this.setState({error: data.responseText});
    }
  },

  receivedSite: function () {
    this.setState({error: false});
  },

  render: function () {
    var error;
    if (this.state.error) {
      error = <div className="error">{this.state.error}</div>;
    }
    return (
          <div>
            <form className="website-form" onSubmit={ this.submit }>
              <label for="website-url">Website URL</label>
              <label className="check-label">Retrieve Feed?
                <input type="checkbox"
                       className="feed-check"
                       name="rss"
                       id="rss-checkbox"
                       checkedLink={this.linkState('rss')}>
                     </input>
                </label>
                  <input type="text"
                         name="url"
                         valueLink={this.linkState('url')}
                         id="website-url"/>
                <br/>
                <input type="submit" value="Add"/>
                {error}
            </form>
            <div className="website-form-triangle" />
          </div>
          );
  }
});
