var Spinner = React.createClass({
  render: function () {
    return (
          <div className="spinner">
            <img className="spinner-image"
               src={this.props.source}
            />
            <br/>
            <p>Your articles are coming into focus...</p>
          </div>
          );
  }
});
