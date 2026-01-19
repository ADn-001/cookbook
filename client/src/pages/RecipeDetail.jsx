import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../api/api'

function RecipeDetail() {
  const { id } = useParams()
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await api.get(`/recipes/${id}`)
        setRecipe(res.data)
      } catch (err) {
        setError('Could not load recipe')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchRecipe()
  }, [id])

  if (loading) return <div>Loading...</div>
  if (error) return <div style={{ color: '#c62828', textAlign: 'center', padding: '3rem' }}>{error}</div>
  if (!recipe) return <div style={{ textAlign: 'center', padding: '3rem' }}>Recipe not found</div>

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto' }}>
      <Link to="/dashboard" style={{ display: 'inline-block', marginBottom: '1.5rem' }}>
        ← Back to Cookbook
      </Link>

      <div className="card">
        <img
          src={recipe.image}
          alt={recipe.name}
          style={{
            width: '100%',
            maxHeight: '500px',
            objectFit: 'cover',
            borderRadius: '12px 12px 0 0'
          }}
          onError={(e) => { e.target.src = '/images/default.jpg' }}
        />

        <div style={{ padding: '2rem' }}>
          <h1 style={{ margin: '0 0 1rem 0' }}>{recipe.name}</h1>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--olive)' }}>Ingredients</h2>
            <div style={{ whiteSpace: 'pre-line', background: '#fafafa', padding: '1.2rem', borderRadius: '8px' }}>
              {recipe.ingredients}
            </div>
          </section>

          <section>
            <h2 style={{ marginBottom: '1rem', color: 'var(--olive)' }}>Instructions</h2>
            <div style={{ whiteSpace: 'pre-line', lineHeight: '1.7' }}>
              {recipe.instructions}
            </div>
          </section>

          <div style={{ marginTop: '2.5rem', fontSize: '0.9rem', color: '#666', textAlign: 'right' }}>
            Last updated: {new Date(recipe.updatedAt).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecipeDetail