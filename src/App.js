import './App.css';
import { useEffect, useState} from 'react';
import ShowData from './ShowData';


function App() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonChoose, setPokemonChoose] = useState(false);
  const [pokemonInformation, setPokemonInformation] = useState({
    name: "", 
    species:"", 
    img: "", 
    hp: "",
    attack: "",
    deffense: "",
    type: "",
  });
  const [allPokemonName, setAllPokemonName] = useState([]);

  const getData = async ()=> {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const value = await res.json();
    const {species, sprites, stats, types} = value;
    const {name} = species;
    const {front_default} = sprites;
    setPokemonInformation({
      name: pokemonName, 
      species:name, 
      img: front_default, 
      hp: stats[0].base_stat,
      attack: stats[1].base_stat,
      deffense: stats[2].base_stat,
      type: types[0].type.name,
    });
    setPokemonChoose(true);
  }
  
  const getAllName = async () => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/`);
    const value = await res.json();
    const data = value.results.map( data => {
      return {
        nama : data.name
      }
    })
    setAllPokemonName(data);
  }
  
  useEffect(()=> {
    getAllName();
  }, [])

  return (
    <div className='app'>
      <div className='titleSection'>
        <h1>Pokemon Information</h1>
        <input 
          type="text"
          onChange={(e)=>{
            setPokemonName(e.target.value);
          }}
        />
        <button onClick={getData}>Search Pokemon</button>
      </div>
      <div className='displaySection'>
        {!pokemonChoose ? (
          <>
            <h3>Please choose pokemon!!!</h3>
            <ShowData data={allPokemonName}  />
          </>
          ) : (
            <>
              <h1>{pokemonInformation.name}</h1>
              <img src={pokemonInformation.img} alt={pokemonInformation.name}/>
              <h3>Species: {pokemonInformation.species}</h3>
              <h3>Type: {pokemonInformation.type}</h3>
              <h4>Hp: {pokemonInformation.hp}</h4>
              <h4>Attack: {pokemonInformation.attack}</h4>
              <h4>Defense: {pokemonInformation.deffense}</h4>
              <br />
            </>
          )}
      </div>
    </div>
  );
}

export default App;
