var Spinner = React.createClass({
  render: function () {
    return (
          <div className="spinner">
            <div className="sign-out" onClick={this.props.clickHandler}> Sign Out </div>
          </div>
          );
  }
});
