var WebsiteList = React.createClass({

  getInitialState: function () {
    return {websites: WebsiteStore.all()}
  },

  _onChange: function () {
    this.setState({ websites: WebsiteStore.all() });
  },

  componentDidMount: function () {
    WebsiteStore.addChangeListener(this._onChange);
  },

  compomentWillUnmount: function () {
    WebsiteStore.removeChangeListener(this._onChange);
  },

  _onChange: function () {
    this.setState({websites: WebsiteStore.all()})
  },

  render: function () {
    return (
            <div className="website-list">
            </div>
          );
  }
});
