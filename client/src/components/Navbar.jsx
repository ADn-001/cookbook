import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/login')
    } catch (err) {
      console.error('Logout failed', err)
      alert('Logout failed. Please try again.')
    }
  }

  return (
    <nav style={{
      backgroundColor: '#6f4e37',
      color: 'white',
      padding: '1rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link to="/dashboard" style={{
          color: 'white',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          textDecoration: 'none'
        }}>
          Cookbook
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <span>Welcome, {user?.username || 'User'}</span>
          <button
            onClick={handleLogout}
            className="btn btn-outline"
            style={{ color: 'white', borderColor: 'white' }}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar