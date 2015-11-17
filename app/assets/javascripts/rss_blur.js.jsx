$(document).ready(function (){
  var root = document.getElementById('content');
  var Route = ReactRouter.Route;
  var Router = ReactRouter.Router;
  var IndexRoute = ReactRouter.IndexRoute;

  var App = React.createClass({

  componentDidMount: function () {
    BenchStore.addChangeListener(this._onBenchChange);
  },

  _onBenchChange: function () {
    this.forceUpdate();
  },

  render: function () {
     return (
         <div>
           <header><h1>Budnick BnB</h1></header>
           {this.props.children}
         </div>
     );
   }
  });

  var routes = (
    <Route path="/" component={App}>
      <IndexRoute component={Search} />
      <Route path="benches/:id" component={Show} />
      <Route path="benches/new" component={BenchForm} />
    </Route>
  );

  React.render(<Router>{routes}</Router>, root);
});
