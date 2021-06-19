import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import history from '../../history';
import api from '../../services/api';
import Header from '../../components/Header/Header'

import './index.css';
import '../../assets/css/type.css';




const Pokemon = () => {
    const { name } = useParams();
    const [pokemon, setPokemon] = useState([])
    const [evolution, setEvolution] = useState([])
    const [image, setImage] = useState(''); 
    const [isLoading, setIsloading] = useState(true)
    const [reload, setReload] = useState('')
   

   async function getPokemon() {
        await api.get(`/${name}`).then(pokemon => {
            
            const {
                id,
                name,
                weight,
                height,
                stats,
                types,
                abilities,
                species
                
              } = pokemon.data;

              setPokemon({
                id,
                name,
                weight: weight / 10 + 'kg',
                height: height / 10 + 'm',
                stats: {
                   hp: stats[0].base_stat,
                   attack: stats[1].base_stat,
                   defense: stats[2].base_stat,
                   especial_attack: stats[3].base_stat,
                   especial_defense: stats[4].base_stat,
                   speed: stats[5].base_stat,
                },

                type: types.map((pokemonType) => ([
                    pokemonType.type.name
                ])),

                abilities: abilities.map(ability => ([
                    ability.ability.name.split('-').join(' ')
                ])),
                species: {
                    name: species.name,
                    url: species.url
                }

              })

              setImage(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`)
              

              setTimeout(() => {
                  setIsloading(false)
              }, 200);    

              getEvolution(species.url);
        })
        
    }


   async function getEvolution(url) {

        await axios.get(url).then(response => {
                axios.get(response.data.evolution_chain.url).then(response => {
                
                    setEvolution([response.data.chain.species.name])

                    response.data.chain.evolves_to.forEach(element => {

                        setEvolution(old => [...old, element.species.name])

                        element.evolves_to.forEach(res => {
                            setEvolution(old => [...old, res.species.name])
                        })
                    });
                })  
            }) 
    }


    function redirect (param) {
        history.push(`/pokemon/${param}`)
        
        setReload(param)
        

        setIsloading(true);
        setTimeout(() => {
            setIsloading(false)
        }, 100); 
    }



    useEffect(() => {
        getPokemon();
        window.scrollTo(0, 0);
    }, [reload])



    if(isLoading){
        return(<Header withBtn = {true} name ='Detalhes'/>)
    }

    return(
        <div>
            <Header withBtn = {true} name ='Detalhes'/>
            
    
            <div className="body">

                <div className="pokemon-block">

                    <div className="pokemon-name">
                        <h1>{pokemon.name.split('-').join(' ')}</h1>
                    </div>
                    
                    <div className="pokemon-left-side-stats">
                        
                        <div className="lines-info">
                            <strong> ID </strong>
                            <div className='lines-info-value'> {pokemon.id}</div>
                        </div>

                        <div className="lines-info">
                            <strong> Peso </strong>
                            <div className='lines-info-value'> {pokemon.weight} </div>
                        </div>

                        <div className="lines-info">
                            <strong> Altura </strong>
                            <div className='lines-info-value'> {pokemon.height}</div>
                        </div>

                        <div className="lines-info">
                            <strong> Espécie </strong>
                            <div className='lines-info-value'> {pokemon.species.name}</div>
                        </div>

                        <div className="lines-info">
                            <strong> Habilidades </strong>
                            <div className='value-container'> 
                            {pokemon.abilities.map(ability => {
                                return(
                                    <div className='lines-info-value'> {ability}</div>
                                )
                            })} 
                            </div>  
                            
                        </div>

                        <div className="lines-info">
                            <strong> Tipo </strong>
                            <div className='value-container'>
                            {pokemon.type.map(type => {
                                return(
                                    <div id={type} className='lines-info-value'> {type}</div>
                                )
                            })} 
                            </div>  
                        </div>
                       
                    </div>

                    
                    <div className="pokemon-image">
                        <img src={image} alt='' loading='lazy'></img>
                    </div> 

                    
                    <div className="pokemon-right-side-stats">
                        

                        <div className="lines">
                            <div className="text">
                                <strong>
                                <span>HP</span>
                                </strong>
                            </div>

                            <div className="stats-bar"> 
                                <div className="progress-bar" id="hp" style={{backgroundColor: 'green', width: `${pokemon.stats.hp / 2}%`}}>
                                    <span>{pokemon.stats.hp}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="lines">
                            <div className="text">
                                <strong>
                                    <span>ATK</span>
                                </strong>
                            </div>
                        
                            <div className="stats-bar">
                                <div className="progress-bar" style={{backgroundColor: 'red',  width: `${pokemon.stats.attack / 2}%`}}>
                                    <span>{pokemon.stats.attack}</span>
                                </div>
                            </div>
                        </div>

                        <div className="lines">
                            <div className="text">
                                <strong>
                                    <span>DEF</span>
                                </strong>
                            </div>
                        
                            <div className="stats-bar">
                                <div className="progress-bar" style={{backgroundColor: 'blue',  width: `${pokemon.stats.defense / 2}%`}}>
                                    <span>{pokemon.stats.defense}</span>
                                </div>
                            </div>
                        </div>

                        <div className="lines">
                            <div className="text">
                                <strong>
                                    <span>Esp.ATK</span>
                                </strong>
                            </div>
                        
                            <div className="stats-bar">
                                <div className="progress-bar" style={{backgroundColor: 'darkred',  width: `${pokemon.stats.especial_attack / 2}%`}}>
                                    <span>{pokemon.stats.especial_attack}</span>
                                </div>
                            </div>
                        </div>

                        <div className="lines">
                            <div className="text">
                                <strong>
                                    <span>Esp.DEF</span>
                                </strong>
                            </div>
                        
                            <div className="stats-bar">
                                <div className="progress-bar" style={{backgroundColor: 'darkblue',  width: `${pokemon.stats.especial_defense / 2}%`}}>
                                    <span>{pokemon.stats.especial_defense}</span>
                                </div>
                            </div>
                        </div>

                        <div className="lines">
                            <div className="text">
                                <strong>
                                    <span>Speed</span>
                                </strong>
                            </div>
                        
                            <div className="stats-bar">
                                <div className="progress-bar" style={{backgroundColor: 'darkorange',  width: `${pokemon.stats.speed / 2}%`}}>
                                    <span>{pokemon.stats.speed}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='evolution-container'>
                    <p><strong>Cadeia de Evolução</strong></p>

                    <div className='evolution-chain'> 
                    {evolution.map(pokemon => {
                        return(
                            <div className='evolution' onClick={()=> redirect(pokemon)}>
                                <img src ={`https://img.pokemondb.net/sprites/bank/normal/${pokemon}.png`}></img><br></br>
                                <strong>{pokemon}</strong>
                            </div>
                        )
                    })}
                    </div>
                </div>
            </div>

            
            
        </div>
    );
}

export default Pokemon;

// Alternative link to images //
/*setImage(`https://pokeres.bastionbot.org/images/pokemon/${id}.png`)
https://assets.pokemon.com/assets/cms2/img/pokedex/full/00${value}.png


/*

evolist.push({
                        name: response.data.chain.species.name, 
                        img: `https://img.pokemondb.net/sprites/bank/normal/${response.data.chain.species.name}.png`
                    })

                    response.data.chain.evolves_to.forEach(element => {

                        evolist.push({
                            name:element.species.name,
                            img: `https://img.pokemondb.net/sprites/bank/normal/${element.species.name}.png`
                        })

                        element.evolves_to.forEach(res => {
                            evolist.push({
                                name: res.species.name,
                                img: `https://img.pokemondb.net/sprites/bank/normal/${res.species.name}.png`
                            })
*/
