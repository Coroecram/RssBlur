var Search = React.createClass({

  getInitialState: function () {
    return {query: "", filter: "all"};
  },

  search: function (event) {
    ArticleApiActions.search(event.currentTarget.value);
  },

  blankState: function () {
    this.setState({query: "", filter: "all"});
  },

  chooseFilter: function (event) {
  },

  componentWillReceiveProps: function () {
    this.blankState();
  },

  render: function () {
    var allActive = (this.state.)
      return (
              <div className="search-form">
                  <label htmlFor="query" >Search for Articles:</label>
                      <input type="text"
                             name="query"
                             onChange={ this.search }
                             id="website-url"/>
                    <div className="filters">
                      <p>Search By: </p>
                      <div className="filter-choices" onClick={ this.chooseFilter }>
                        <p className={allActive}>All</p>
                        <p className={titleActive}>Title</p>
                        <p className={summaryActive}>Summary</p>
                        <p className={authorActive}>Author</p>
                      </div>
                    </div>
              </div>
            );
    }
});
