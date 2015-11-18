var WebsiteForm = React.createClass({

  getInitialState: function () {
    return {url: "", error: false};
  },

  addWebsite: function () {
    ApiUtil.createWebsite(this.state.url, this.receivedSite, this.receivedError);
  },

  updateURL: function (event) {
    this.setState({url: event.currentTarget.value});
  },

  receivedError: function () {
    this.setState({error: true});
  },

  receivedSite: function () {
    this.setState({error: false});
  },

  render: function () {
    var error;
    if (this.state.error) {
      error = <div className="error">This address does not point to an RSS feed or a website with an RSS feed.</div>;
    }
    return (
          <div className="website-form">
            <div className="website-input">
            <label>Website URL</label>
              <br/>
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
