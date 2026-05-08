import { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Settings, User, Briefcase, Zap, Award, Mail, Plus, Edit2, Trash2, X, Check,
  FolderGit2, MessageSquare, Save, Image, Link, Calendar, AlertCircle, 
  CheckCircle, Info, Loader2, Database, RefreshCw, Sparkles, LayoutDashboard,
  TrendingUp, Users, Code2, Layers, ChevronRight, MoreHorizontal, Filter, Search,
  MapPin, Github, Linkedin, Twitter
} from 'lucide-react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// Toast notification component
function Toast({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  const icons = {
    success: <CheckCircle className="h-5 w-5 text-green-500" />,
    error: <AlertCircle className="h-5 w-5 text-red-500" />,
    info: <Info className="h-5 w-5 text-blue-500" />
  }

  const styles = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800'
  }

  return (
    <div className={`fixed top-20 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border animate-slide-in-right ${styles[type]}`}>
      {icons[type]}
      <span className="font-medium text-sm">{message}</span>
      <button onClick={onClose} className="ml-2 text-gray-400 hover:text-gray-600">
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}

// Stats Card Component
function StatCard({ icon: Icon, label, value, color, trend }) {
  return (
    <div className="card p-6 flex items-center space-x-4 hover:scale-105 transition-transform duration-300">
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div className="flex-1">
        <p className="text-sm text-gray-500">{label}</p>
        <div className="flex items-center gap-2">
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {trend && (
            <span className="text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
              +{trend}%
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

function Admin() {
  const [activeTab, setActiveTab] = useState('profile')
  const [profile, setProfile] = useState(null)
  const [projects, setProjects] = useState([])
  const [skills, setSkills] = useState([])
  const [experiences, setExperiences] = useState([])
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState(null)
  const [dbConnected, setDbConnected] = useState(true)

  useEffect(() => {
    fetchAllData()
  }, [])

  const showToast = (message, type = 'info') => {
    setToast({ message, type })
  }

  const fetchAllData = async () => {
    setLoading(true)
    try {
      const [profileRes, projectsRes, skillsRes, expRes, msgRes] = await Promise.all([
        axios.get(`${API_URL}/profile`),
        axios.get(`${API_URL}/projects`),
        axios.get(`${API_URL}/skills`),
        axios.get(`${API_URL}/experience`),
        axios.get(`${API_URL}/messages`)
      ])
      setProfile(profileRes.data)
      setProjects(projectsRes.data)
      setSkills(skillsRes.data)
      setExperiences(expRes.data)
      setMessages(msgRes.data)
      setDbConnected(true)
    } catch (error) {
      console.error('Error fetching data:', error)
      setDbConnected(false)
      showToast('Failed to connect to database. Please check if the server is running.', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (saveFunction) => {
    setSaving(true)
    try {
      await saveFunction()
      await fetchAllData() // Refresh all data after save
      showToast('Changes saved successfully!', 'success')
    } catch (error) {
      console.error('Save error:', error)
      showToast('Failed to save changes. Please try again.', 'error')
    } finally {
      setSaving(false)
    }
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'skills', label: 'Skills', icon: Zap },
    { id: 'experience', label: 'Experience', icon: Award },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
  ]

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        <p className="text-gray-500 animate-pulse">Loading dashboard...</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Toast Notification */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Header with Stats */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl shadow-lg">
              <LayoutDashboard className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
              <p className="text-gray-500 dark:text-gray-400 flex items-center gap-2">
                Manage your portfolio content
                {!dbConnected && (
                  <span className="text-red-500 text-xs bg-red-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    Database disconnected
                  </span>
                )}
              </p>
            </div>
          </div>
          
          <button 
            onClick={fetchAllData}
            disabled={saving}
            className="btn-secondary flex items-center space-x-2"
          >
            <RefreshCw className={`h-4 w-4 ${saving ? 'animate-spin' : ''}`} />
            <span>Refresh Data</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard 
            icon={FolderGit2} 
            label="Projects" 
            value={projects.length} 
            color="bg-blue-500" 
          />
          <StatCard 
            icon={Zap} 
            label="Skills" 
            value={skills.length} 
            color="bg-green-500" 
          />
          <StatCard 
            icon={Award} 
            label="Experience" 
            value={experiences.length} 
            color="bg-purple-500" 
          />
          <StatCard 
            icon={Mail} 
            label="Messages" 
            value={messages.length} 
            color="bg-orange-500" 
          />
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm mb-6 overflow-hidden">
        <div className="flex flex-wrap border-b dark:border-gray-700">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-4 font-medium text-sm transition-all duration-200 ${
                activeTab === tab.id
                  ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'profile' && (
            <ProfileManager 
              profile={profile} 
              onUpdate={() => handleSave(async () => {})} 
              showToast={showToast}
            />
          )}
          {activeTab === 'projects' && (
            <ProjectsManager 
              projects={projects} 
              onUpdate={fetchAllData}
              showToast={showToast}
            />
          )}
          {activeTab === 'skills' && (
            <SkillsManager 
              skills={skills} 
              onUpdate={fetchAllData}
              showToast={showToast}
            />
          )}
          {activeTab === 'experience' && (
            <ExperienceManager 
              experiences={experiences} 
              onUpdate={fetchAllData}
              showToast={showToast}
            />
          )}
          {activeTab === 'messages' && (
            <MessagesManager 
              messages={messages} 
              onUpdate={fetchAllData}
              showToast={showToast}
            />
          )}
        </div>
      </div>

      {/* Database Connection Status */}
      <div className={`flex items-center justify-center gap-2 text-sm ${dbConnected ? 'text-green-600' : 'text-red-600'}`}>
        <Database className="h-4 w-4" />
        <span>{dbConnected ? 'Database Connected' : 'Database Disconnected'}</span>
      </div>
    </div>
  )
}

// ============ PROFILE MANAGER ============
function ProfileManager({ profile, onUpdate, showToast }) {
  const [formData, setFormData] = useState(profile || {})
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name.startsWith('socialLinks.')) {
      const socialKey = name.split('.')[1]
      setFormData({
        ...formData,
        socialLinks: { ...formData.socialLinks, [socialKey]: value }
      })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSaving(true)
    try {
      await axios.put(`${API_URL}/profile`, formData)
      showToast('Profile updated successfully!', 'success')
      setIsEditing(false)
      onUpdate()
    } catch (error) {
      showToast('Failed to update profile. Please try again.', 'error')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg">
            <User className="h-5 w-5 text-primary-600 dark:text-primary-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Profile Information</h2>
            <p className="text-sm text-gray-500">Manage your personal details</p>
          </div>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="btn-secondary flex items-center space-x-2"
          disabled={isSaving}
        >
          {isEditing ? <X className="h-4 w-4" /> : <Edit2 className="h-4 w-4" />}
          <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
        </button>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                <User className="h-4 w-4 inline mr-1" />
                Full Name
              </label>
              <input 
                type="text" 
                name="name" 
                value={formData.name || ''} 
                onChange={handleChange} 
                className="input w-full" 
                placeholder="Your full name"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                <Briefcase className="h-4 w-4 inline mr-1" />
                Professional Title
              </label>
              <input 
                type="text" 
                name="title" 
                value={formData.title || ''} 
                onChange={handleChange} 
                className="input w-full" 
                placeholder="e.g., Full Stack Developer"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                <Mail className="h-4 w-4 inline mr-1" />
                Email Address
              </label>
              <input 
                type="email" 
                name="email" 
                value={formData.email || ''} 
                onChange={handleChange} 
                className="input w-full" 
                placeholder="your@email.com"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                <MapPin className="h-4 w-4 inline mr-1" />
                Location
              </label>
              <input 
                type="text" 
                name="location" 
                value={formData.location || ''} 
                onChange={handleChange} 
                className="input w-full" 
                placeholder="City, Country"
              />
            </div>
          </div>

          {/* Image URL */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              <Image className="h-4 w-4 inline mr-1" />
              Profile Image URL
            </label>
            <input 
              type="url" 
              name="image" 
              value={formData.image || ''} 
              onChange={handleChange} 
              className="input w-full" 
              placeholder="https://example.com/your-photo.jpg"
            />
            <p className="text-sm text-gray-500">Leave empty to use default placeholder</p>
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Bio</label>
            <textarea 
              name="bio" 
              value={formData.bio || ''} 
              onChange={handleChange} 
              rows={4} 
              className="textarea w-full" 
              placeholder="Write a short bio about yourself..."
            />
          </div>

          {/* Social Links */}
          <div className="border-t dark:border-gray-700 pt-6">
            <h3 className="font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Link className="h-4 w-4" />
              Social Links
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">GitHub</label>
                <input 
                  type="url" 
                  name="socialLinks.github" 
                  value={formData.socialLinks?.github || ''} 
                  onChange={handleChange} 
                  className="input w-full" 
                  placeholder="https://github.com/username"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">LinkedIn</label>
                <input 
                  type="url" 
                  name="socialLinks.linkedin" 
                  value={formData.socialLinks?.linkedin || ''} 
                  onChange={handleChange} 
                  className="input w-full" 
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Twitter</label>
                <input 
                  type="url" 
                  name="socialLinks.twitter" 
                  value={formData.socialLinks?.twitter || ''} 
                  onChange={handleChange} 
                  className="input w-full" 
                  placeholder="https://twitter.com/username"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            <button 
              type="submit" 
              className="btn-primary flex items-center space-x-2"
              disabled={isSaving}
            >
              {isSaving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
            </button>
            <button 
              type="button"
              onClick={() => setIsEditing(false)}
              className="btn-secondary"
              disabled={isSaving}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        /* View Mode */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Preview Card */}
          <div className="lg:col-span-1">
            <div className="card p-6 text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900 dark:to-primary-800 flex items-center justify-center overflow-hidden">
                {profile?.image ? (
                  <img src={profile.image} alt={profile.name} className="w-full h-full object-cover" />
                ) : (
                  <User className="h-16 w-16 text-primary-400" />
                )}
              </div>
              <h3 className="font-bold text-xl text-gray-900 dark:text-white">{profile?.name || 'Not set'}</h3>
              <p className="text-primary-600 dark:text-primary-400">{profile?.title || 'Not set'}</p>
              <div className="mt-4 pt-4 border-t dark:border-gray-700 text-sm text-gray-500">
                <p className="flex items-center justify-center gap-1">
                  <Mail className="h-4 w-4" />
                  {profile?.email || 'No email'}
                </p>
                <p className="flex items-center justify-center gap-1 mt-1">
                  <MapPin className="h-4 w-4" />
                  {profile?.location || 'No location'}
                </p>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-2 space-y-4">
            <div className="card p-6">
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">About</h4>
              <p className="text-gray-600 dark:text-gray-400">{profile?.bio || 'No bio added yet.'}</p>
            </div>
            
            <div className="card p-6">
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">Social Links</h4>
              <div className="flex flex-wrap gap-3">
                {profile?.socialLinks?.github && (
                  <a href={profile.socialLinks.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    <Github className="h-4 w-4" />
                    <span className="text-sm">GitHub</span>
                  </a>
                )}
                {profile?.socialLinks?.linkedin && (
                  <a href={profile.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors">
                    <Linkedin className="h-4 w-4" />
                    <span className="text-sm">LinkedIn</span>
                  </a>
                )}
                {profile?.socialLinks?.twitter && (
                  <a href={profile.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300 rounded-lg hover:bg-sky-200 dark:hover:bg-sky-800 transition-colors">
                    <Twitter className="h-4 w-4" />
                    <span className="text-sm">Twitter</span>
                  </a>
                )}
                {!profile?.socialLinks?.github && !profile?.socialLinks?.linkedin && !profile?.socialLinks?.twitter && (
                  <p className="text-gray-500 text-sm">No social links added yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ============ PROJECTS MANAGER ============
function ProjectsManager({ projects, onUpdate, showToast }) {
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    demoUrl: '',
    githubUrl: '',
    image: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSaving(true)
    const data = {
      ...formData,
      technologies: formData.technologies.split(',').map(t => t.trim()).filter(t => t)
    }
    
    try {
      if (editingId) {
        await axios.put(`${API_URL}/projects/${editingId}`, data)
        showToast('Project updated successfully!', 'success')
      } else {
        await axios.post(`${API_URL}/projects`, data)
        showToast('Project added successfully!', 'success')
      }
      onUpdate()
      setIsAdding(false)
      setEditingId(null)
      setFormData({ title: '', description: '', technologies: '', demoUrl: '', githubUrl: '', image: '' })
    } catch (error) {
      showToast('Failed to save project. Please try again.', 'error')
    } finally {
      setIsSaving(false)
    }
  }

  const handleEdit = (project) => {
    setFormData({
      ...project,
      technologies: project.technologies?.join(', ') || ''
    })
    setEditingId(project.id)
    setIsAdding(true)
  }

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await axios.delete(`${API_URL}/projects/${id}`)
        showToast('Project deleted successfully!', 'success')
        onUpdate()
      } catch (error) {
        showToast('Failed to delete project.', 'error')
      }
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Projects ({projects.length})</h2>
        <button
          onClick={() => {
            setIsAdding(!isAdding)
            setEditingId(null)
            setFormData({ title: '', description: '', technologies: '', demoUrl: '', githubUrl: '', image: '' })
          }}
          className="btn-primary flex items-center space-x-2"
        >
          {isAdding ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          <span>{isAdding ? 'Cancel' : 'Add Project'}</span>
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg mb-6 space-y-4">
          <h3 className="font-medium text-gray-900">{editingId ? 'Edit Project' : 'New Project'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Project Title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="input" required />
            <input type="text" placeholder="Image URL" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} className="input" />
          </div>
          <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="textarea" rows={3} required />
          <input type="text" placeholder="Technologies (comma separated: React, Node.js, etc.)" value={formData.technologies} onChange={(e) => setFormData({...formData, technologies: e.target.value})} className="input" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="url" placeholder="Demo URL" value={formData.demoUrl} onChange={(e) => setFormData({...formData, demoUrl: e.target.value})} className="input" />
            <input type="url" placeholder="GitHub URL" value={formData.githubUrl} onChange={(e) => setFormData({...formData, githubUrl: e.target.value})} className="input" />
          </div>
          <button type="submit" className="btn-primary">{editingId ? 'Update' : 'Add'} Project</button>
        </form>
      )}

      <div className="space-y-3">
        {projects.map((project) => (
          <div key={project.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">{project.title}</h3>
              <p className="text-sm text-gray-500 line-clamp-1">{project.description}</p>
              {project.technologies?.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="px-2 py-0.5 bg-primary-100 text-primary-700 text-xs rounded">{tech}</span>
                  ))}
                </div>
              )}
            </div>
            <div className="flex space-x-2 ml-4">
              <button onClick={() => handleEdit(project)} className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                <Edit2 className="h-4 w-4" />
              </button>
              <button onClick={() => handleDelete(project.id)} className="p-2 text-red-600 hover:bg-red-50 rounded">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
        {projects.length === 0 && <p className="text-gray-500 text-center py-8">No projects yet. Add your first project!</p>}
      </div>
    </div>
  )
}

// ============ SKILLS MANAGER ============
function SkillsManager({ skills, onUpdate, showToast }) {
  const [isAdding, setIsAdding] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({ name: '', category: 'Frontend', proficiency: 'Intermediate' })

  const categories = ['Frontend', 'Backend', 'Database', 'Tools', 'Other']
  const levels = ['Beginner', 'Intermediate', 'Advanced', 'Expert']

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSaving(true)
    try {
      await axios.post(`${API_URL}/skills`, formData)
      showToast('Skill added successfully!', 'success')
      onUpdate()
      setIsAdding(false)
      setFormData({ name: '', category: 'Frontend', proficiency: 'Intermediate' })
    } catch (error) {
      showToast('Failed to add skill. Please try again.', 'error')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (confirm('Delete this skill?')) {
      try {
        await axios.delete(`${API_URL}/skills/${id}`)
        showToast('Skill deleted successfully!', 'success')
        onUpdate()
      } catch (error) {
        showToast('Failed to delete skill.', 'error')
      }
    }
  }

  // Group by category
  const grouped = skills.reduce((acc, skill) => {
    const cat = skill.category || 'Other'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(skill)
    return acc
  }, {})

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Skills ({skills.length})</h2>
        <button onClick={() => setIsAdding(!isAdding)} className="btn-primary flex items-center space-x-2">
          {isAdding ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          <span>{isAdding ? 'Cancel' : 'Add Skill'}</span>
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg mb-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input type="text" placeholder="Skill Name (e.g., React, Python)" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="input" required />
            <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="input">
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={formData.proficiency} onChange={(e) => setFormData({...formData, proficiency: e.target.value})} className="input">
              {levels.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          <button type="submit" className="btn-primary">Add Skill</button>
        </form>
      )}

      <div className="space-y-4">
        {Object.entries(grouped).map(([category, catSkills]) => (
          <div key={category} className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-3">{category} ({catSkills.length})</h3>
            <div className="flex flex-wrap gap-2">
              {catSkills.map((skill) => (
                <div key={skill.id} className="flex items-center bg-white px-3 py-2 rounded-lg shadow-sm">
                  <span className="font-medium">{skill.name}</span>
                  <span className="ml-2 text-xs text-gray-500">({skill.proficiency})</span>
                  <button onClick={() => handleDelete(skill.id)} className="ml-2 text-red-500 hover:text-red-700">
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
        {skills.length === 0 && <p className="text-gray-500 text-center py-8">No skills yet. Add your first skill!</p>}
      </div>
    </div>
  )
}

// ============ EXPERIENCE MANAGER ============
function ExperienceManager({ experiences, onUpdate, showToast }) {
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    title: '', company: '', location: '', type: 'Full-time',
    startDate: '', endDate: '', description: '', achievements: ''
  })

  const types = ['Full-time', 'Part-time', 'Internship', 'Freelance', 'Contract']

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSaving(true)
    const data = {
      ...formData,
      achievements: formData.achievements.split('\n').map(a => a.trim()).filter(a => a)
    }
    
    try {
      if (editingId) {
        await axios.put(`${API_URL}/experience/${editingId}`, data)
        showToast('Experience updated successfully!', 'success')
      } else {
        await axios.post(`${API_URL}/experience`, data)
        showToast('Experience added successfully!', 'success')
      }
      onUpdate()
      setIsAdding(false)
      setEditingId(null)
      setFormData({ title: '', company: '', location: '', type: 'Full-time', startDate: '', endDate: '', description: '', achievements: '' })
    } catch (error) {
      showToast('Failed to save experience. Please try again.', 'error')
    } finally {
      setIsSaving(false)
    }
  }

  const handleEdit = (exp) => {
    setFormData({
      ...exp,
      achievements: exp.achievements?.join('\n') || ''
    })
    setEditingId(exp.id)
    setIsAdding(true)
  }

  const handleDelete = async (id) => {
    if (confirm('Delete this experience?')) {
      try {
        await axios.delete(`${API_URL}/experience/${id}`)
        showToast('Experience deleted successfully!', 'success')
        onUpdate()
      } catch (error) {
        showToast('Failed to delete experience.', 'error')
      }
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Experience ({experiences.length})</h2>
        <button onClick={() => { setIsAdding(!isAdding); setEditingId(null); }} className="btn-primary flex items-center space-x-2">
          {isAdding ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          <span>{isAdding ? 'Cancel' : 'Add Experience'}</span>
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg mb-6 space-y-4">
          <h3 className="font-medium text-gray-900">{editingId ? 'Edit Experience' : 'New Experience'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Job Title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="input" required />
            <input type="text" placeholder="Company" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} className="input" required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input type="text" placeholder="Location" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} className="input" />
            <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} className="input">
              {types.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="month" placeholder="Start Date" value={formData.startDate} onChange={(e) => setFormData({...formData, startDate: e.target.value})} className="input" />
            <input type="month" placeholder="End Date (leave empty if current)" value={formData.endDate} onChange={(e) => setFormData({...formData, endDate: e.target.value})} className="input" />
          </div>
          <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="textarea" rows={3} />
          <textarea placeholder="Key Achievements (one per line)" value={formData.achievements} onChange={(e) => setFormData({...formData, achievements: e.target.value})} className="textarea" rows={3} />
          <button type="submit" className="btn-primary">{editingId ? 'Update' : 'Add'} Experience</button>
        </form>
      )}

      <div className="space-y-3">
        {experiences.map((exp) => (
          <div key={exp.id} className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900">{exp.title}</h3>
                <p className="text-sm text-primary-600">{exp.company}</p>
                <p className="text-xs text-gray-500 mt-1">{exp.type} • {exp.location}</p>
                <p className="text-xs text-gray-400">{exp.startDate} - {exp.endDate || 'Present'}</p>
              </div>
              <div className="flex space-x-2">
                <button onClick={() => handleEdit(exp)} className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                  <Edit2 className="h-4 w-4" />
                </button>
                <button onClick={() => handleDelete(exp.id)} className="p-2 text-red-600 hover:bg-red-50 rounded">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {experiences.length === 0 && <p className="text-gray-500 text-center py-8">No experience yet. Add your first entry!</p>}
      </div>
    </div>
  )
}

// ============ MESSAGES MANAGER ============
function MessagesManager({ messages, onUpdate, showToast }) {
  const handleDelete = async (id) => {
    if (confirm('Delete this message?')) {
      try {
        await axios.delete(`${API_URL}/messages/${id}`)
        showToast('Message deleted successfully!', 'success')
        onUpdate()
      } catch (error) {
        showToast('Failed to delete message.', 'error')
      }
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Messages ({messages.length})</h2>
      </div>

      <div className="space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium text-gray-900">{msg.name}</h3>
                <a href={`mailto:${msg.email}`} className="text-sm text-primary-600 hover:underline">{msg.email}</a>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-400">{new Date(msg.createdAt).toLocaleString()}</span>
                <button onClick={() => handleDelete(msg.id)} className="p-1 text-red-600 hover:bg-red-50 rounded">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <p className="font-medium text-gray-700 text-sm mb-1">{msg.subject}</p>
            <p className="text-gray-600 text-sm">{msg.message}</p>
          </div>
        ))}
        {messages.length === 0 && <p className="text-gray-500 text-center py-8">No messages yet.</p>}
      </div>
    </div>
  )
}

export default Admin
