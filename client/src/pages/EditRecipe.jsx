import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api/api'
import RecipeForm from '../components/RecipeForm'

function EditRecipe() {
  const { id } = useParams()
  const navigate = useNavigate()

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

  const handleSubmit = async (formData) => {
    try {
      await api.put(`/recipes/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      navigate(`/recipes/${id}`)
    } catch (err) {
      console.error(err)
      alert(err.response?.data?.message || 'Failed to update recipe')
    }
  }

  if (loading) return <div>Loading recipe...</div>
  if (error) return <div style={{ color: '#c62828' }}>{error}</div>
  if (!recipe) return <div>Recipe not found</div>

  return (
    <RecipeForm
      initialData={recipe}
      onSubmit={handleSubmit}
      buttonText="Update Recipe"
    />
  )
}

export default EditRecipe