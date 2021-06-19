import { useEffect, useState } from 'react';
import history from '../../history';
import api from '../../services/api';

import './PokemonCard.css';
import '../../assets/css/type.css';

const PokemonCard = (props) => {

    const name = props.name;
    const [pokemon, setPokemon] = useState({});
    const [loading, setLoading] = useState(true);
    const image =  `http://play.pokemonshowdown.com/sprites/xyani/${name}.gif`

    
    
    async function getData(){
        const pokemonData = await api.get(name).then(res => res.data)
        setPokemon(pokemonData)
        
        setTimeout(() => {
            setLoading(false)
        }, 300);    
    }

    function redirect () {
        history.push(`pokemon/${pokemon.id}`)  
    }
    
    useEffect(() => {
        getData();
        
    }, [])


    if(loading){
        return (
            <div className='card' style={{backgroundColor: 'red'}}> 
                <div className="card-title">
                    <strong>Desconhecido</strong>
                </div>

                <div className='card-body'>
                    <div className='content'></div>
                    <div className='image'> </div>
                    <div className='id-icon'></div>
                </div>
            </div>)
    }

    return (
        <> 
            <div className='card' id={pokemon.types[0].type.name} onClick={redirect}> 
            <div className="card-title">
                <strong>{pokemon.name}</strong>
            </div>

            <div className="card-body">
                <div className="content">
                    {pokemon.types.map(types => (
                        <div className="type-block">
                            {types.type.name}
                        </div>
                    ))}
                </div>

                <div className="image">
                    <img src={image} alt=""></img>
                </div>

                <div className="id-icon">
                    #{pokemon.id}
                </div>

            </div>    
        </div> 
            
        </>
    );
}


export default PokemonCard;