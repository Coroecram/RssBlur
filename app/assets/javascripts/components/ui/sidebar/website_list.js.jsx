var WebsiteList = React.createClass({

  getInitialState: function () {
    return {websites: WebsiteStore.all()};
  },

  _onChange: function () {
    this.setState({websites: WebsiteStore.all()});
  },

  componentDidMount: function () {
    WebsiteStore.addChangeListener(this._onChange);
  },

  compomentWillUnmount: function () {
    WebsiteStore.removeChangeListener(this._onChange);
  },

  render: function () {
    var websites;
    if (this.state.websites) {
      websites = this.state.websites.map(function (website) {
          return <li key={website.id} url={website.url}>{website.name}</li>;
        });
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
