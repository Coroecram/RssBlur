var WebsiteForm = React.createClass({

  getInitialState: function () {
    return null;
  },

  componentDidMount: function () {
  },

  _onChange: function () {
  },

  render: function () {
    return (
          <div className="website-form">
            <div className="website-input">
            <label>Website URL</label>
              <br/>
              <input type="text" />
              <br/>
              <input type="submit" value="Add" onClick={this.addWebsite}/>
            </div>
            <div className="website-form-triangle" />
          </div>
          );
  }
});
