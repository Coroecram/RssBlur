var Spinner = React.createClass({
  render: function () {
    return (
          <div className="spinner">
            <img className="spinner-image"
               src={this.props.source}
            />
          </div>
          );
  }
});
