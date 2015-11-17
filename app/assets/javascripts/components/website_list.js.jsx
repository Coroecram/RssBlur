var UserHome = React.createClass({

  getInitialState: function () {

  },

  _onChange: function () {
    this.setState({ pokemons: PokemonStore.all() });
  },

  componentDidMount: function () {
    PokemonStore.addPokemonsIndexChangeListener(this._onChange);
    PokemonStore.addPokemonDetailChangeListener(this._onChange);
    ApiUtil.fetchAllPokemons();
  },

  compomentWillUnmount: function () {
    PokemonStore.removePokemonsIndexChangeListener(this._onChange);
    PokemonStore.removePokemonDetailChangeListener(this._onChange);
  },


  render: function () {
    return (
            <div className="sidebar">
              <WebsiteList />
            </div>
          );
  }
});
