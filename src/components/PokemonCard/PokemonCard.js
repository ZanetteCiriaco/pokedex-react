import { useEffect, useState } from 'react';
import history from '../../history';
import api from '../../services/api';

import './PokemonCard.css';
import '../../assets/css/type.css';

const PokemonCard = (props) => {

    const name = props.name;
    const [pokemon, setPokemon] = useState({});
    const [loading, setLoading] = useState(true);
    const[image, setImage] = useState(`http://play.pokemonshowdown.com/sprites/xyani/${name}.gif`)
    const[imageError, setImageError] = useState(false)

      
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

    function handleErrorImage(){
        
        if(!imageError){
            setImage( `http://play.pokemonshowdown.com/sprites/xyani/${name.split('-')[0]}.gif`); 
        }

        if(imageError) {
            setImage( `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`);  
        }

        setImageError(true)
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
            <div className='card' id={pokemon.types[0].type.name} onClick={redirect} > 
            <div className="card-title">
                <strong>{pokemon.name.split('-').join(' ')}</strong>
            </div>

            <div className="card-body">
                <div className="content">
                    {pokemon.types.map((types, index) => (
                        <div className="type-block" key={index}>
                            {types.type.name}
                        </div>
                    ))}
                </div>

                <div className="image">
                <img src={image} onError={handleErrorImage} alt=""></img>
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