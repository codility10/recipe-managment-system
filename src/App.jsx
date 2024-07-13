import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [currentRecipe, setCurrentRecipe] = useState({
    recipeName: "",
    ingredients: "",
    instructions: "",
  });

  const [recipeData, setRecipeData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentRecipeIndex, setCurrentRecipeIndex] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false); // Add this state
console.log(isLoaded)
  useEffect(() => {
    const savedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    console.log("after get from localStorage:", savedRecipes);
    setRecipeData(savedRecipes);
    setIsLoaded(true); // Set the loading flag to true
  }, []);

  useEffect(() => {
    if (isLoaded) { // Only update localStorage if the initial load is complete
      console.log("Setting to localStorage:", recipeData);
      localStorage.setItem("recipes", JSON.stringify(recipeData));
    }
  }, [recipeData,isLoaded]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentRecipe((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      const updatedRecipes = recipeData.map((recipe, index) =>
        index === currentRecipeIndex ? currentRecipe : recipe
      );
      setRecipeData(updatedRecipes);
      setIsEditing(false);
      setCurrentRecipeIndex(null);
    } else {
      setRecipeData((prevRecipes) => [...prevRecipes, currentRecipe]);
    }
    setCurrentRecipe({
      recipeName: "",
      ingredients: "",
      instructions: "",
    });
  };

  const handleEdit = (index) => {
    setCurrentRecipe(recipeData[index]);
    setIsEditing(true);
    setCurrentRecipeIndex(index);
  };

  const handleDelete = (index) => {
    const updatedRecipes = recipeData.filter((_, i) => i !== index);
    setRecipeData(updatedRecipes);
  };

  return (
    <>
      <div className="recipe-container">
        <div style={{ width: "100%" }}>
          <h1 className="recipe-title">Recipe Manager</h1>
        </div>
        <form onSubmit={handleFormSubmit}>
          <div>
            <input
              name="recipeName"
              type="text"
              placeholder="Recipe Name"
              value={currentRecipe.recipeName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <textarea
              name="ingredients"
              type="text"
              placeholder="Ingredients (separated by comma)"
              value={currentRecipe.ingredients}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <textarea
              name="instructions"
              type="text"
              placeholder="Instructions"
              value={currentRecipe.instructions}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="recipe-btn">
            {isEditing ? "Update Recipe" : "Add Recipe"}
          </button>
        </form>

        {recipeData.length > 0 && (
          <div className="recipe-list">
            {recipeData.map((recipe, index) => (
              <div key={index} className="recipe-details">
                <h3>{recipe.recipeName}</h3>
                <p>{recipe.ingredients}</p>
                <p>{recipe.instructions}</p>
                <div className="btn-container">
                  <button
                    type="button"
                    className="recipe-btn"
                    style={{ backgroundColor: "blue" }}
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="recipe-btn"
                    style={{ backgroundColor: "red" }}
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div style={{ width: "100%" }}>
        <p className="recipe-footer">@2024 Muhammad Amir +923030957344</p>
      </div>
    </>
  );
}

export default App;
