import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import { useState, useEffect, createContext, useContext } from 'react'
import { Code2, Menu, X, User, Briefcase, Zap, Mail, Sun, Moon, X as CloseIcon, CheckCircle, AlertCircle, Info } from 'lucide-react'
import axios from 'axios'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Skills from './pages/Skills'
import Experience from './pages/Experience'
import Contact from './pages/Contact'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// Theme Context for Dark Mode
const ThemeContext = createContext()

export const useTheme = () => useContext(ThemeContext)

// Toast Context for Notifications
const ToastContext = createContext()

export const useToast = () => useContext(ToastContext)

// Toast Provider Component
function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = (message, type = 'info', duration = 3000) => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type, duration }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, duration)
  }

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }

  const toastIcons = {
    success: <CheckCircle className="h-5 w-5 text-green-500" />,
    error: <AlertCircle className="h-5 w-5 text-red-500" />,
    info: <Info className="h-5 w-5 text-blue-500" />
  }

  const toastStyles = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800'
  }

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {/* Toast Container */}
      <div className="fixed top-20 right-4 z-50 space-y-2">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`flex items-center space-x-2 px-4 py-3 rounded-lg shadow-lg border animate-slide-in-right ${toastStyles[toast.type]}`}
          >
            {toastIcons[toast.type]}
            <span className="font-medium text-sm">{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-2 text-gray-400 hover:text-gray-600"
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])
  return null
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [profile, setProfile] = useState(null)
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage or system preference, default to dark mode
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode')
      if (saved !== null) return JSON.parse(saved)
      return true
    }
    return true
  })
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    fetchProfile()
    
    // Apply dark mode class to body
    if (darkMode) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
    
    // Scroll listener for navbar
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [darkMode])

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${API_URL}/profile`)
      setProfile(response.data)
    } catch (error) {
      console.error('Error fetching profile:', error)
    }
  }

  const toggleDarkMode = () => setDarkMode(!darkMode)

  const navLinks = [
    { path: '/', label: 'Home', icon: User },
    { path: '/projects', label: 'Projects', icon: Briefcase },
    { path: '/skills', label: 'Skills', icon: Zap },
    { path: '/experience', label: 'Experience', icon: Code2 },
    { path: '/contact', label: 'Contact', icon: Mail },
  ]

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <ToastProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen bg-black text-white transition-colors duration-300">
            {/* Navigation */}
            <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'glass shadow-md' : 'bg-black shadow-sm'}`}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                  <div className="flex items-center">
                    <Link to="/" className="flex items-center space-x-2 group">
                      <Code2 className="h-8 w-8 text-primary-600 transform group-hover:rotate-12 transition-transform duration-300" />
                      <span className="font-bold text-xl text-gray-900 dark:text-white">
                        {profile?.name?.split(' ')[0] || 'Portfolio'}
                      </span>
                    </Link>
                  </div>

                  {/* Desktop Navigation */}
                  <div className="hidden md:flex items-center space-x-1">
                    {navLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-200 hover:text-primary-400 hover:bg-gray-800 transition-all duration-200"
                      >
                        <link.icon className="h-4 w-4" />
                        <span>{link.label}</span>
                      </Link>
                    ))}
                    
                    {/* Dark Mode Toggle */}
                    <button
                      onClick={toggleDarkMode}
                      className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
                      title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                    >
                      {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    </button>
                  </div>

                  {/* Mobile menu button */}
                  <div className="flex items-center space-x-2 md:hidden">
                    <button
                      onClick={toggleDarkMode}
                      className="p-2 rounded-md text-gray-200 hover:text-primary-400"
                    >
                      {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    </button>
                    <button
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                      className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Mobile Navigation */}
              {isMenuOpen && (
                <div className="md:hidden bg-black border-t border-gray-700 animate-fade-in">
                  <div className="px-2 pt-2 pb-3 space-y-1">
                    {navLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:text-primary-400 hover:bg-gray-800 transition-all duration-200"
                      >
                        <link.icon className="h-5 w-5" />
                        <span>{link.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

            {/* Footer */}
            <footer className="bg-black border-t border-gray-700 mt-auto">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    © {new Date().getFullYear()} {profile?.name || 'Portfolio'}. All rights reserved.
                  </p>
                  <div className="flex space-x-4 mt-4 md:mt-0">
                    {profile?.socialLinks?.github && (
                      <a href={profile.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                        GitHub
                      </a>
                    )}
                    {profile?.socialLinks?.linkedin && (
                      <a href={profile.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                        LinkedIn
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </Router>
      </ToastProvider>
    </ThemeContext.Provider>
  )
}

export default App
