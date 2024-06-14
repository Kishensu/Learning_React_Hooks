<!-- Learning React Hooks

This is a React application that fetches and displays a list of Pokémon from the PokéAPI. Users can click on a Pokémon to view its details, and navigate to other Pokémon from the detail page.

Features

 • Home Page:
 • Displays a list of the first 151 Pokémon fetched from the PokéAPI.
 • Each Pokémon name is a clickable link that navigates to the Pokémon’s detail page.
 • Pokémon Detail Page:
 • Displays detailed information about the selected Pokémon, including its name, image, height, weight, and base experience.
 • Provides links to other Pokémon detail pages.

Learning Objectives

This project is designed to help users learn about the following React concepts:

 • useEffect: Hook that allows you to perform side effects in function components.
 • useParams: Hook from react-router-dom that allows you to access the parameters of the current route.

Installation

1. Clone the repository:
git clone <https://github.com/Kishensu/Learning_React_Hooks.git>
cd Learning React Hooks

2. Instaall dependencies:
npm install axios react-router-dom

3. Start the development server:
npm start

Usage

 • Open your browser and navigate to <http://localhost:3000/> to view the list of Pokémon.
 • Click on any Pokémon name to view its details.
 • Use the links on the detail page to navigate to other Pokémon.

 Code Structure

src/App.js

Sets up the routing for the application using react-router-dom.

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import PokemonDetail from './PokemonDetail';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/pokemon/:id" element={<PokemonDetail />} />
            </Routes>
        </Router>
    );
};

export default App;

src/Home.js

Fetches and displays a list of the first 151 Pokémon from the PokéAPI.

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
    const [pokemonList, setPokemonList] = useState([]);

    // useEffect with an empty dependency array to fetch data on component mount
    useEffect(() => {
        const fetchPokemonList = async () => {
            try {
                const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
                setPokemonList(response.data.results);
            } catch (error) {
                console.error('Error fetching Pokémon list:', error);
            }
        };

        fetchPokemonList();
    }, []); // Empty dependency array ensures this runs only once

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

src/PokemonDetail.js

Fetches and displays detailed information about a Pokémon based on its ID in the URL.

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const PokemonDetail = () => {
    const { id } = useParams(); // Retrieve the 'id' parameter from the URL
    const [pokemon, setPokemon] = useState(null);

    console.log('PokemonDetail component rendered');

    // useEffect with no dependency array
    useEffect(() => {
        console.log('useEffect with no dependency array called');
    });

    // useEffect with an empty dependency array
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
    }, []); // Empty dependency array ensures this runs only once

    // useEffect with dependencies (id)
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
    }, [id]); // This effect runs when the 'id' parameter changes

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

Understanding useEffect and useParams

useEffect

 • Purpose: useEffect allows you to perform side effects in function components. Side effects can include data fetching, subscriptions, and manually changing the DOM.
 • Usage:
 • No Dependency Array: Runs on every render.
 • Empty Dependency Array: Runs once when the component mounts.
 • With Dependencies: Runs when the component mounts and when any of the dependencies change.

useParams

 • Purpose: useParams is a hook from react-router-dom that allows you to access the parameters of the current route.
 • Usage: const { id } = useParams();
 • This retrieves the id parameter from the URL, allowing you to use it within your component.
    Contributing

Contributions are welcome! Please open an issue or submit a pull request with your changes.

License

This project is licensed under the MIT License. -->
