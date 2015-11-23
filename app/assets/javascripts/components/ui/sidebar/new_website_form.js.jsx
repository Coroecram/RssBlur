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

  blankState: function () {
    this.setState({url: "", error: false, rss: false});
  },

  componentWillReceiveProps: function () {
    this.blankState();
  },

  retrieveRSS: function (credentials) {
    WebsiteApiUtil.retrieveRSSURL(credentials, this.updateURL, this.receivedError);
  },

  updateURL: function (feedURL) {
    this.setState({rss: false, url: feedURL.url, error: ""});
  },

  receivedError: function (data) {
    if (data.statusText === 'timeout') {
      this.setState({error: "The connection timed out. Please Try Again"});
    } else {
      this.setState({error: data.responseText});
    }
  },

  receivedSite: function () {
    this.blankState();
  },

  render: function () {
    var error;
    if (this.state.error) {
      error = <div className="error">{this.state.error}</div>;
    }
    if (this.state.rss) {
      buttonValue = "Retrieve"
    } else {
      buttonValue = "Add"
    }
    var websiteForm;

    if (this.props.show) {
      websiteForm = (
                      <div>
                        <form className="website-form" autoComplete="off" onSubmit={ this.submit }>
                          <label htmlFor="website-url">Website URL</label>
                          <label className="check-label">Retrieve Feed?
                            <input type="checkbox"
                                   className="feed-check"
                                   name="rss"
                                   checkedLink={this.linkState('rss')}>
                                 </input>
                            </label>
                              <input type="text"
                                     name="url"
                                     valueLink={this.linkState('url')}
                                     id="website-url"/>
                            <br/>
                            <input type="submit" value={buttonValue}/>
                            {error}
                        </form>
                        <div className="website-form-triangle" />
                      </div>
      );
    }
    return  <div>{websiteForm}</div>;
  }
});
