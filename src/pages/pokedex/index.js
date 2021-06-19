
import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import PokemonCard from '../../components/PokemonCard/PokemonCard';
import Search  from '../../components/Search/Search';
import Pagination from '../../components/Pagination/Pagination';
import Loading from '../../components/Loading/Loading';
import store from '../../assets/js/store';
import Header from '../../components/Header/Header';

import './index.css';



const Pokedex = () => {


    const [pokemons, setPokemons] = useState([])
    const [showPokemons, setShowPokemons] = useState([])
    const [loading, setLoading] = useState(true)
    const [start, setStart] = useState(store.getStart())
    const [end, setEnd] = useState(store.getEnd())


    
   async function getData() {
       const pokemonData =  await api.get('?limit=880').then(response => response.data.results);
       setPokemons(pokemonData); 
       setShowPokemons(pokemonData.slice(start, end))
   }


   function page(start, end) {
      
        setStart(start)
        setEnd(end);  
        setShowPokemons(pokemons.slice(start, end))
        load(1000)
   }

   function search(data){

        setShowPokemons(data)
        load(1000);
   }


   function load(time) {
       setLoading(false)
       window.scrollTo(0, 120)

       setTimeout(() => {
           setLoading(true)
       }, time);
   }


    useEffect(() => {
        getData(); 

    }, [])
   


    return(  

        <>
            <Header name ='Pokédex'/>
            <div className='logo'></div>
            <Search search={search} pokemons={pokemons} />
            <Pagination length={pokemons.length} page={page}/>

            {loading ? (
                <div className='grid'>
                {showPokemons.map((pokemon, index) => {
                    return(
                        <div className='row'>
                            <PokemonCard name={pokemon.name} key={index} />
                            
                        </div>    
                    )
                })}
            </div> 
            
            ) : (
               
                <Loading />
                    
            )}            

             
        </>
       
    );

}


export default Pokedex;
