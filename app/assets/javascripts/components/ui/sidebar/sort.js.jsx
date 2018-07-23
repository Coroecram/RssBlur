var Sort = React.createClass({

  getInitialState: function () {
    return {orderBy: false, sortBy: "pubdate"};
  },

  componentDidMount: function(){
  },

  changeOrderBy: function (event) {
    var orderBy = !this.state.orderBy;
    this.setState({orderBy: orderBy});
    searchParams = [orderBy, this.state.sortBy];
    ArticleApiActions.sort(searchParams);
  },

  blankState: function () {
    this.setState({orderBy: false, sortBy: "pubdate"});
  },

  chooseSortBy: function (event) {
    var sortBy = event.target.textContent.toLowerCase();
    this.setState({sortBy: sortBy})
    this.changeSortBy(sortBy)
  },

  changeSortBy: function (sortBy) {
    ArticleApiActions.sort([this.state.orderBy, sortBy]);
  },

  componentWillReceiveProps: function () {
    this.blankState();
  },

  render: function () {
    var arrow = (this.state.orderBy ? "↑" : "↓");
    var pubDateActive = (this.state.sortBy === "pubdate" ? "active" : "");
    var websiteActive = (this.state.sortBy === "website" ? "active" : "");
    var titleActive = (this.state.sortBy === "title" ? "active" : "");
    var authorActive = (this.state.sortBy === "author" ? "active" : "");

      return (
              <div className="sort-form group">
                  <p>Order: <span className="sort-order" onClick={ this.changeOrderBy }>{arrow} </span>Order By:</p>
                  <div className="sort-choices" onClick={ this.chooseSortBy }>
                    <p className={pubDateActive}>PubDate</p>
                    <p className={websiteActive}>Website</p>
                    <p className={titleActive}>Title</p>
                    <p className={authorActive}>Author</p>
                </div>
              </div>
            );
    }
});
