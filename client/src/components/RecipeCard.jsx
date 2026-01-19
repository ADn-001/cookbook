import { Link, useNavigate } from 'react-router-dom'
import api from '../api/api'

function RecipeCard({ recipe, onDelete }) {
  const navigate = useNavigate()

  const handleDelete = async () => {
    if (!window.confirm(`Delete "${recipe.name}"? This cannot be undone.`)) {
      return
    }

    try {
      await api.delete(`/recipes/${recipe._id}`)
      onDelete(recipe._id) // callback to remove from list
      alert('Recipe deleted')
    } catch (err) {
      console.error(err)
      alert('Could not delete recipe. Please try again.')
    }
  }

  return (
    <div className="card" style={{ height: '420px', margin: '0 0.5rem', position: 'relative' }}>
      <Link
        to={`/recipes/${recipe._id}`}
        style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}
      >
        <img
          src={recipe.image}
          alt={recipe.name}
          style={{
            width: '100%',
            height: '280px',
            objectFit: 'cover',
            borderBottom: '1px solid #e0e0e0'
          }}
          onError={(e) => { e.target.src = '/images/default.jpg' }}
        />
        <div style={{ padding: '1.2rem' }}>
          <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.4rem' }}>{recipe.name}</h3>
          <p style={{ margin: 0, color: '#666', fontSize: '0.95rem' }}>
            Updated {new Date(recipe.updatedAt).toLocaleDateString()}
          </p>
        </div>
      </Link>

      {/* Action buttons - positioned over card */}
      <div style={{
        position: 'absolute',
        top: '12px',
        right: '12px',
        display: 'flex',
        gap: '8px'
      }}>
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            navigate(`/recipes/${recipe._id}/edit`)
          }}
          title="Edit recipe"
          style={{
            background: 'rgba(255,255,255,0.9)',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
          }}
        >
          ✏️
        </button>

        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            handleDelete()
          }}
          title="Delete recipe"
          style={{
            background: 'rgba(255,255,255,0.9)',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
          }}
        >
          🗑
        </button>
      </div>
    </div>
  )
}

export default RecipeCard