import { useState, useEffect } from 'react'

function RecipeForm({ initialData = {}, onSubmit, isLoading = false, buttonText = 'Save Recipe' }) {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    ingredients: initialData.ingredients || '',
    instructions: initialData.instructions || '',
    image: null // file object
  })

  const [preview, setPreview] = useState(initialData.image || '/images/default.jpg')
  const [error, setError] = useState('')

  useEffect(() => {
    // If editing and image exists → show current image as preview
    if (initialData.image) {
      setPreview(initialData.image)
    }
  }, [initialData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Basic client-side validation
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB')
      return
    }

    setFormData(prev => ({ ...prev, image: file }))
    setPreview(URL.createObjectURL(file))
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.name.trim()) {
      setError('Recipe name is required')
      return
    }
    if (!formData.ingredients.trim()) {
      setError('Ingredients are required')
      return
    }
    if (!formData.instructions.trim()) {
      setError('Instructions are required')
      return
    }

    const submitData = new FormData()
    submitData.append('name', formData.name)
    submitData.append('ingredients', formData.ingredients)
    submitData.append('instructions', formData.instructions)
    if (formData.image) {
      submitData.append('image', formData.image)
    }

    onSubmit(submitData)
  }

  return (
    <div style={{ maxWidth: '680px', margin: '2rem auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>
        {initialData._id ? 'Edit Recipe' : 'Add New Recipe'}
      </h1>

      {error && (
        <div style={{
          background: '#ffebee',
          color: '#c62828',
          padding: '1rem',
          borderRadius: '6px',
          marginBottom: '1.5rem'
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Image upload + preview */}
        <div className="form-group">
          <label>Recipe Photo (optional)</label>
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="image-preview"
              style={{ display: 'block', margin: '0.5rem auto' }}
            />
          )}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleImageChange}
            style={{ marginTop: '0.5rem' }}
          />
          <small style={{ color: '#666', display: 'block', marginTop: '0.3rem' }}>
            Max 5MB • jpg, png, webp
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="name">Recipe Name *</label>
          <input
            id="name"
            name="name"
            type="text"
            className="form-input"
            value={formData.name}
            onChange={handleChange}
            required
            maxLength={200}
          />
        </div>

        <div className="form-group">
          <label htmlFor="ingredients">Ingredients * (one per line recommended)</label>
          <textarea
            id="ingredients"
            name="ingredients"
            className="form-textarea"
            value={formData.ingredients}
            onChange={handleChange}
            required
            placeholder="• 2 cups flour&#10;• 1 tsp salt&#10;• ..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="instructions">Instructions * (step by step)</label>
          <textarea
            id="instructions"
            name="instructions"
            className="form-textarea"
            value={formData.instructions}
            onChange={handleChange}
            required
            placeholder="1. Preheat oven to 180°C&#10;2. Mix dry ingredients...&#10;"
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : buttonText}
        </button>
      </form>
    </div>
  )
}

export default RecipeForm