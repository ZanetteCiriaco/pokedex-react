import {useState} from 'react';
import './Search.css';
import store from '../../assets/js/store';


const Search = (props) => {

    const [input, setInput] = useState('');
    

    function inputText (value) {

        const showPokemons = []

        setInput(value)
        

        if (value !== '') {
            props.pokemons.forEach(pokemon => { 
                if(pokemon.name.startsWith(value))
                    showPokemons.push(pokemon)
            });
    
            props.search(showPokemons);
        }

        if (value === '' || value == null) {
            props.search(props.pokemons.slice(store.getStart(), store.getEnd()))
        } 
        
    }

    

    return (
        <div className='search'>
            <input
                type='text' 
                placeholder='Buscar Pokémon...'
                onChange={(e)=> inputText(e.target.value)}
                value={input}>
            </input>   
        </div>
    );
}

export default Search;


