
import React,{ useEffect, useState } from 'react';
import Recipe from "./Recipe";
import "./App.css"

const App = () => {
  const APP_ID = 'fa0028dc';
  const API_KEY = '0316d19f2bfaaa5b618c7cefacdfeb29';

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState('chicken')

  useEffect(()=> {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(
      `https:api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${API_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits)
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search)
    setSearch('')
  }

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  return (
    <div className="App">
      <form onSubmit={getSearch} className='search-form'>
        <input className='search-bar' type='text' value={search} onChange={updateSearch}/>
        <button className="search-button" type="submit">
           Search
        </button>      
        </form>
        <div>
          {recipes.map(recipe => (
            <Recipe 
              key={recipe.recipe.label}
              title={recipe.recipe.label} 
              calories={recipe.recipe.calories}
              image = {recipe.recipe.image} 
              ingredients = {recipe.recipe.ingredients}
            />
          ))}
        </div>

    </div>
  );
};

export default App;
