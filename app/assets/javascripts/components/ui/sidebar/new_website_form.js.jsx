var WebsiteForm = React.createClass({

  mixins: [React.addons.LinkedStateMixin],

  getInitialState: function () {
    return {url: "", error: false};
  },

  submit: function (event) {
    event.preventDefault();
    var credentials = $(event.currentTarget).serializeJSON();
    WebsiteApiUtil.createWebsite(credentials, this.receivedSite, this.receivedError);
  },

  blankState: function () {
    this.setState({url: "", error: false});
  },

  componentWillReceiveProps: function () {
    this.blankState();
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
                            <br/>
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
