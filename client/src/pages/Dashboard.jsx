import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import api from '../api/api'
import RecipeCard from '../components/RecipeCard'

function Dashboard() {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await api.get('/recipes')
        setRecipes(res.data || [])
      } catch (err) {
        console.error('Failed to load recipes:', err)
        setError('Could not load your recipes. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchRecipes()
  }, [])

  // Remove a recipe from local state after successful delete
  const handleRecipeDeleted = (deletedId) => {
    setRecipes(prev => prev.filter(r => r._id !== deletedId))
  }

  if (loading) {
    return <div className="container" style={{ textAlign: 'center', padding: '4rem 1rem' }}>Loading your cookbook...</div>
  }

  if (error) {
    return (
      <div style={{ color: '#c62828', textAlign: 'center', padding: '4rem 1rem' }}>
        {error}
      </div>
    )
  }

  // ──────────────────────────────────────────────
  // Empty state: show a styled "welcome / get started" card
  // ──────────────────────────────────────────────
  if (recipes.length === 0) {
    return (
      <div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <h1>Your Cookbook</h1>
          <Link to="/recipes/new" className="btn btn-primary">
            + Add New Recipe
          </Link>
        </div>

        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
          <div className="card" style={{ overflow: 'hidden' }}>
            <img
              src="/images/default.jpg"
              alt="Get Started with Cookbook"
              style={{
                width: '100%',
                height: '280px',
                objectFit: 'cover'
              }}
            />
            <div style={{ padding: '1.8rem 1.5rem', textAlign: 'center' }}>
              <h2 style={{ margin: '0 0 1rem 0', fontSize: '1.6rem' }}>
                How to Get Started
              </h2>
              <p style={{
                color: '#555',
                lineHeight: '1.7',
                marginBottom: '1.5rem'
              }}>
                Welcome to your personal Cookbook!<br /><br />
                • Click "+ Add New Recipe" above to create your first dish<br />
                • Upload a photo (optional)<br />
                • Add name, ingredients list, and step-by-step instructions<br />
                • Your recipes will appear here as beautiful cards<br /><br />
                Start building your collection today!
              </p>

              <Link to="/recipes/new" className="btn btn-primary" style={{ padding: '0.9rem 2rem' }}>
                Add Your First Recipe
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ──────────────────────────────────────────────
  // Normal state: show carousel of recipe cards
  // ──────────────────────────────────────────────
  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <h1>Your Cookbook</h1>
        <Link to="/recipes/new" className="btn btn-primary">
          + Add New Recipe
        </Link>
      </div>

      <Carousel
        showArrows={true}
        showThumbs={false}
        showStatus={false}
        infiniteLoop={recipes.length > 1}
        autoPlay={recipes.length > 3}
        interval={6500}
        transitionTime={600}
        emulateTouch={true}
        centerMode={recipes.length > 1}
        centerSlidePercentage={80}
      >
        {recipes.map(recipe => (
          <RecipeCard
            key={recipe._id}
            recipe={recipe}
            onDelete={handleRecipeDeleted}
          />
        ))}
      </Carousel>
    </div>
  )
}

export default Dashboard