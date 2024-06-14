import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
    const [pokemonList, setPokemonList] = useState([]);

    useEffect(() => {
        const fetchPokemonList = async () => {
            try {
                const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151'); // Fetch first 151 Pokémon
                setPokemonList(response.data.results);
            } catch (error) {
                console.error('Error fetching Pokémon list:', error);
            }
        };

        fetchPokemonList();
    }, []);

    return (
        <div>
            <h1>Pokémon List</h1>
            <ul>
                {pokemonList.map((pokemon, index) => (
                    <li key={index}>
                        <Link to={`/pokemon/${index + 1}`}>{pokemon.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;