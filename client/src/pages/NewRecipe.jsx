import { useNavigate } from 'react-router-dom'
import api from '../api/api'
import RecipeForm from '../components/RecipeForm'

function NewRecipe() {
  const navigate = useNavigate()

  const handleSubmit = async (formData) => {
    try {
      await api.post('/recipes', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      navigate('/dashboard')
    } catch (err) {
      console.error(err)
      alert(err.response?.data?.message || 'Failed to create recipe')
    }
  }

  return <RecipeForm onSubmit={handleSubmit} buttonText="Create Recipe" />
}

export default NewRecipe