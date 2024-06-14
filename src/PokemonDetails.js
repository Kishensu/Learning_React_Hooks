import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const PokemonDetail = () => {
    const { id } = useParams(); 
    const [pokemon, setPokemon] = useState(null);

    console.log('PokemonDetail component rendered'); 

    // 1. useEffect with no dependency array
    useEffect(() => {
        console.log('useEffect with no dependency array called');
    });

    // 2. useEffect with an empty dependency array
    useEffect(() => {
        console.log('useEffect with empty dependency array called');
        const fetchPokemon = async () => {
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
                setPokemon(response.data);
            } catch (error) {
                console.error('Error fetching Pokémon data:', error);
            }
        };

        fetchPokemon();
    }, []);

    // 3. useEffect with dependencies (id)
    useEffect(() => {
        console.log('useEffect with [id] dependency array called');
        const fetchPokemon = async () => {
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
                setPokemon(response.data);
            } catch (error) {
                console.error('Error fetching Pokémon data:', error);
            }
        };

        fetchPokemon();
    }, [id]);

    if (!pokemon) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{pokemon.name}</h1>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <p>Height: {pokemon.height}</p>
            <p>Weight: {pokemon.weight}</p>
            <p>Base Experience: {pokemon.base_experience}</p>
            <div>
                <h2>Other Pokémon</h2>
                <ul>
                    {Array.from({ length: 151 }, (_, i) => (
                        <li key={i}>
                            <Link to={`/pokemon/${i + 1}`}>Pokémon {i + 1}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PokemonDetail;
