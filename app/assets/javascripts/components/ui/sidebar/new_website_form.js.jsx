var WebsiteForm = React.createClass({

  getInitialState: function () {
    return {url: "", error: false};
  },

  addWebsite: function () {
    WebsiteApiUtil.createWebsite(this.state.url, this.receivedSite, this.receivedError);
  },

  updateURL: function (event) {
    this.setState({url: event.currentTarget.value});
  },

  receivedError: function (data) {
    if (data.statusText === 'timeout') {
      this.setState({error: "The connection timed out. Please Try Again"});
    } else {
      this.setState({error: "This address does not point to an RSS feed or a website with an RSS feed."})
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
          <div className="website-form">
            <div className="website-input">
            <label>Website URL</label>
              <input type="text" value={this.state.url} onChange={this.updateURL} />
              <br/>
              <input type="submit" value="Add" onClick={this.addWebsite}/>
              {error}
            </div>
            <div className="website-form-triangle" />
          </div>
          );
  }
});
