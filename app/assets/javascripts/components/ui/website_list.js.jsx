var UserHome = React.createClass({

  getInitialState: function () {

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
            <div className="sidebar">
              <WebsiteList />
            </div>
          );
  }
});
