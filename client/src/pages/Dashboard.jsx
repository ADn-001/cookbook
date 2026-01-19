// src/pages/Dashboard.jsx
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
        console.error(err)
        setError('Could not load recipes')
      } finally {
        setLoading(false)
      }
    }
    fetchRecipes()
  }, [])

  const handleRecipeDeleted = (deletedId) => {
    setRecipes(prev => prev.filter(r => r._id !== deletedId))
  }

  if (loading) return <div style={{ textAlign: 'center', padding: '5rem 1rem' }}>Loading...</div>

  if (error) {
    return <div style={{ color: 'crimson', textAlign: 'center', padding: '4rem 1rem' }}>{error}</div>
  }

  // Empty state (welcome card)
  if (recipes.length === 0) {
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
          <h1>Your Cookbook</h1>
          <Link to="/recipes/new" className="btn btn-primary">+ Add New Recipe</Link>
        </div>

        <div style={{ maxWidth: '360px', margin: '0 auto' }}>
          <div className="card" style={{ height: '520px', overflow: 'hidden' }}>
            <img
              src="/images/default.jpg"
              alt="Welcome to Cookbook"
              style={{ width: '100%', height: '280px', objectFit: 'cover' }}
            />
            <div style={{ padding: '1.8rem 1.4rem', textAlign: 'center' }}>
              <h2 style={{ marginBottom: '1.2rem' }}>How to Get Started</h2>
              <p style={{ lineHeight: '1.7', color: '#555', marginBottom: '1.8rem' }}>
                Your personal recipe collection is ready!<br/><br/>
                • Click "+ Add New Recipe" to begin<br/>
                • Add a photo, name, ingredients & steps<br/>
                • Cards will appear here like a real cookbook
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

  // Normal state with carousel
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <h1>Your Cookbook</h1>
        <Link to="/recipes/new" className="btn btn-primary">+ Add New Recipe</Link>
      </div>

      <Carousel
        showArrows={true}                    // always try to show arrows
        showThumbs={false}
        showStatus={false}
        infiniteLoop={true}
        autoPlay={recipes.length > 4}
        interval={7000}
        transitionTime={550}
        emulateTouch={true}
        centerMode={true}
        centerSlidePercentage={75}           // adjusted for narrower cards
        swipeable={true}
        // Make arrows more visible
        renderArrowPrev={(onClickHandler, hasPrev) =>
          hasPrev && (
            <button
              type="button"
              onClick={onClickHandler}
              style={{
                position: 'absolute',
                top: '50%',
                left: '10px',
                zIndex: 2,
                background: 'rgba(111, 78, 55, 0.75)',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '48px',
                height: '48px',
                fontSize: '1.8rem',
                cursor: 'pointer',
                transform: 'translateY(-50%)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.25)'
              }}
            >
              ←
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext) =>
          hasNext && (
            <button
              type="button"
              onClick={onClickHandler}
              style={{
                position: 'absolute',
                top: '50%',
                right: '10px',
                zIndex: 2,
                background: 'rgba(111, 78, 55, 0.75)',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '48px',
                height: '48px',
                fontSize: '1.8rem',
                cursor: 'pointer',
                transform: 'translateY(-50%)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.25)'
              }}
            >
              →
            </button>
          )
        }
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