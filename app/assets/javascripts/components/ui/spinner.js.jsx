var Spinner = React.createClass({
  render: function () {
    return (
          <div className="spinner">
            <img
               src={this.props.source}
            />
          </div>
          );
  }
});
