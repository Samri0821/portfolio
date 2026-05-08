import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { Code, Globe, Database, Lock, Mail as MailIcon, Award, Target, Zap, Star, TrendingUp, Users, Shield, Clock, Smartphone, Map as MapIcon, Cloud, Brain } from 'lucide-react'
import { useTheme } from '../App'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// Static data for deployment
const staticSkills = {
  "Programming Languages": [
    { name: "HTML", level: 95, color: "bg-orange-500", description: "Semantic HTML5 markup for accessible web structures" },
    { name: "CSS", level: 90, color: "bg-blue-500", description: "Modern CSS3 with animations, flexbox, and grid layouts" },
    { name: "JavaScript", level: 90, color: "bg-yellow-500", description: "ES6+ features, async programming, and DOM manipulation" },
    { name: "C++", level: 75, color: "bg-blue-600", description: "Object-oriented programming and system-level development" },
    { name: "JavaFX", level: 70, color: "bg-red-600", description: "Desktop application development with rich UI components" }
  ],
  "Frontend": [
    { name: "React.js", level: 90, color: "bg-cyan-500", description: "Component-based architecture, hooks, and state management" },
    { name: "Tailwind CSS", level: 85, color: "bg-teal-500", description: "Utility-first CSS framework for rapid UI development" }
  ],
  "Backend": [
    { name: "Node.js", level: 85, color: "bg-green-500", description: "Server-side JavaScript runtime for scalable applications" },
    { name: "Express.js", level: 85, color: "bg-gray-600", description: "Minimalist web framework for robust API development" }
  ],
  "Database": [
    { name: "MongoDB", level: 75, color: "bg-green-600", description: "NoSQL database for flexible data modeling" },
    { name: "Mongoose", level: 75, color: "bg-green-700", description: "ODM for MongoDB with schema validation and middleware" }
  ],
  "Authentication & Security": [
    { name: "JWT Authentication", level: 80, color: "bg-purple-500", description: "JSON Web Tokens for secure API authentication" },
    { name: "bcrypt.js", level: 75, color: "bg-indigo-500", description: "Password hashing and security best practices" }
  ],
  "Communication & APIs": [
    { name: "REST API", level: 85, color: "bg-blue-500", description: "RESTful API design principles and implementation" },
    { name: "Nodemailer", level: 80, color: "bg-red-500", description: "Email sending service for notifications and communications" },
    { name: "Socket.io", level: 70, color: "bg-gray-500", description: "Real-time bidirectional communication for web applications" },
    { name: "Google Maps API", level: 75, color: "bg-green-400", description: "Location services and mapping functionality" },
    { name: "Geolocation API", level: 75, color: "bg-blue-400", description: "Browser-based location tracking and GPS services" }
  ],
  "Tools": [
    { name: "VS Code", level: 95, color: "bg-blue-600", description: "Professional code editor with extensions and debugging" },
    { name: "Windsurf", level: 85, color: "bg-purple-600", description: "AI-powered development environment for enhanced productivity" },
    { name: "Antigravity", level: 80, color: "bg-gray-700", description: "Advanced development tools and frameworks" },
    { name: "Git & GitHub", level: 85, color: "bg-gray-900", description: "Version control and collaborative development platform" }
  ]
}

// Scroll Reveal Hook
function useScrollReveal() {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return { ref, isVisible }
}

// Animated Progress Bar Component
function AnimatedProgressBar({ skill, isVisible, delay = 0 }) {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setWidth(skill.level)
      }, delay)
      return () => clearTimeout(timer)
    }
  }, [isVisible, skill.level, delay])

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="font-medium text-gray-900 dark:text-white">{skill.name}</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">{skill.level}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
        <div 
          className={`h-3 rounded-full transition-all duration-1000 ${skill.color} shadow-lg`}
          style={{ width: `${width}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400">{skill.description}</p>
    </div>
  )
}

function Skills() {
  const [skills, setSkills] = useState(staticSkills)
  const [loading, setLoading] = useState(false)
  const [expandedCategory, setExpandedCategory] = useState("Programming Languages")
  const [searchTerm, setSearchTerm] = useState("")

  const { ref: skillsRef, isVisible: skillsVisible } = useScrollReveal()

  // Filter skills based on search term
  const filteredSkills = Object.entries(skills).reduce((acc, [category, categorySkills]) => {
    const filteredCategorySkills = categorySkills.filter(skill => 
      skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    if (filteredCategorySkills.length > 0) {
      acc[category] = filteredCategorySkills
    }
    return acc
  }, {})

  const totalSkills = Object.values(filteredSkills).reduce((acc, categorySkills) => acc + categorySkills.length, 0)
  const averageLevel = Math.round(
    Object.values(filteredSkills).flat().reduce((acc, skill) => acc + skill.level, 0) / totalSkills
  )

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        <p className="text-gray-500 animate-pulse">Loading skills...</p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Technical Skills
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          A comprehensive overview of my technical expertise spanning programming languages, frameworks, 
          databases, and development tools. Each skill represents practical experience in real-world projects.
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-8 max-w-md mx-auto">
        <div className="relative">
          <input
            type="text"
            placeholder="Search skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pl-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
          />
          <Target className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Stats Overview */}
      <div ref={skillsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className={`card p-6 text-center transform transition-all duration-500 ${
          skillsVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
            {totalSkills}
          </div>
          <div className="text-gray-600 dark:text-gray-400">Total Technologies</div>
        </div>
        <div className={`card p-6 text-center transform transition-all duration-500 ${
          skillsVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`} style={{ transitionDelay: '100ms' }}>
          <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
            {averageLevel}%
          </div>
          <div className="text-gray-600 dark:text-gray-400">Average Proficiency</div>
        </div>
        <div className={`card p-6 text-center transform transition-all duration-500 ${
          skillsVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`} style={{ transitionDelay: '200ms' }}>
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
            {Object.keys(filteredSkills).length}
          </div>
          <div className="text-gray-600 dark:text-gray-400">Skill Categories</div>
        </div>
      </div>

      {/* Skill Categories */}
      <div className="space-y-8">
        {Object.entries(filteredSkills).map(([category, categorySkills], categoryIndex) => (
          <div 
            key={category} 
            className={`card p-8 transform transition-all duration-500 ${
              skillsVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
            style={{ transitionDelay: `${categoryIndex * 100}ms` }}
          >
            {/* Category Header */}
            <div 
              className="flex items-center justify-between mb-6 cursor-pointer"
              onClick={() => setExpandedCategory(expandedCategory === category ? null : category)}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg">
                  {category === "Programming Languages" && <Code className="h-6 w-6 text-primary-600 dark:text-primary-400" />}
                  {category === "Frontend" && <Globe className="h-6 w-6 text-primary-600 dark:text-primary-400" />}
                  {category === "Backend" && <Database className="h-6 w-6 text-primary-600 dark:text-primary-400" />}
                  {category === "Database" && <Database className="h-6 w-6 text-primary-600 dark:text-primary-400" />}
                  {category === "Authentication & Security" && <Lock className="h-6 w-6 text-primary-600 dark:text-primary-400" />}
                  {category === "Communication & APIs" && <MailIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" />}
                  {category === "Tools" && <Award className="h-6 w-6 text-primary-600 dark:text-primary-400" />}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{category}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{categorySkills.length} technologies</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    Avg: {Math.round(categorySkills.reduce((acc, skill) => acc + skill.level, 0) / categorySkills.length)}%
                  </div>
                </div>
                <div className={`transform transition-transform duration-300 ${
                  expandedCategory === category ? 'rotate-180' : ''
                }`}>
                  <TrendingUp className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Skills Grid */}
            {expandedCategory === category && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
                {categorySkills.map((skill, skillIndex) => (
                  <div 
                    key={skillIndex}
                    className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <AnimatedProgressBar 
                      skill={skill} 
                      isVisible={skillsVisible}
                      delay={skillIndex * 100}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {totalSkills === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Code className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No skills found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search terms to find skills you're looking for.
          </p>
        </div>
      )}

      {/* Learning Goals */}
      <div className="mt-16">
        <div className="card p-8 bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
            Continuous Learning
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-6 max-w-2xl mx-auto">
            I'm committed to continuous learning and staying updated with the latest technologies. 
            Currently focusing on advanced React patterns, cloud deployment, and AI integration.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <Zap className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Advanced React</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Performance optimization and advanced patterns</p>
            </div>
            <div className="text-center">
              <Cloud className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Cloud Services</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">AWS, Vercel, and deployment strategies</p>
            </div>
            <div className="text-center">
              <Brain className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">AI Integration</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Machine learning and AI-powered features</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Skills
