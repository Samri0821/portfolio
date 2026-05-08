import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { MapPin, Mail, Github, Linkedin, Twitter, Phone, Download, User, Sparkles, MousePointer2, ArrowDown, Code, Award, Target, Zap, Briefcase, Calendar, ExternalLink, Star, Send, CheckCircle, Shield, Clock, Users, Smartphone, Database, Lock, Mail as MailIcon, Globe, Map as MapIcon } from 'lucide-react'
import { useTheme } from '../App'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// Static data for deployment
const staticProfile = {
  name: "Samrawit Yirga",
  title: "Full Stack Developer",
  bio: "Hi, I'm Samrawit Yirga, a third-year Computer Science student and passionate Full Stack Developer. I specialize in building modern web applications using React and Node.js, focusing on clean code, performance, and scalability. I enjoy turning ideas into real-world products and solving practical problems through technology. I am continuously learning new tools, frameworks, and best practices to improve my development skills and stay updated in the fast-evolving tech industry. My goal is to become a highly skilled developer who builds impactful and scalable applications.",
  image: "/images/profile.jpg",
  email: "samrawityirga08@gmail.com",
  phone: "+251 908 218 688",
  location: "Ethiopia",
  socialLinks: {
    github: "https://github.com/samri0821",
    linkedin: "https://www.linkedin.com/in/samrawit-yirga-05ab353a9",
    twitter: ""
  }
}

const staticProjects = [
  {
    id: "saferoute-001",
    title: "SafeRoute Emergency System",
    description: "SafeRoute is a full-stack emergency safety platform that monitors users in real time during travel and automatically triggers emergency alerts when danger is detected. It ensures fast response through GPS tracking, SMS alerts, and a central monitoring system.",
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Socket.io", "Tailwind CSS", "Google Maps API", "Twilio SMS API"],
    githubUrl: "https://github.com/samri0821/saferoute",
    status: "In Progress",
    icon: "🚨",
    features: [
      { name: "Real-Time GPS Tracking", icon: MapIcon, description: "Live location updates every 3-5 seconds with Google Maps visualization" },
      { name: "Emergency Detection", icon: Shield, description: "SOS button activation and automatic accident detection" },
      { name: "Safety Confirmation", icon: Clock, description: "5-minute safety confirmation system" },
      { name: "Emergency Alerts", icon: MailIcon, description: "Instant SMS notifications to police, family, and emergency contacts" },
      { name: "Monitoring Dashboard", icon: Users, description: "Live tracking with status updates (Pending, Responding, Resolved)" },
      { name: "Offline Support", icon: Smartphone, description: "Works without internet using SMS and mobile network" },
      { name: "Subscription System", icon: Database, description: "Daily/Weekly/Monthly plans with access control" }
    ],
    systemIdea: "SafeRoute acts as a centralized safety system connecting Users, Police, Family members, and Emergency services"
  },
  {
    id: "portfolio-builder-003",
    title: "Dynamic Portfolio Builder",
    description: "A full-stack web application that allows users to create interactive personal portfolio websites in real time. Users enter their personal details, skills, experience, and projects, and the system automatically generates a unique portfolio page with a shareable link.",
    technologies: ["Node.js", "Express.js", "HTML5", "CSS3", "JavaScript", "File System (JSON Storage)"],
    githubUrl: "https://github.com/samri0821/portfolio-builder",
    status: "Planning",
    icon: "🚀",
    features: [
      { name: "Profile Creation System", icon: MailIcon, description: "Users can create personal portfolio profiles with name, bio, skills, experience, and services" },
      { name: "Dynamic Project Management", icon: Database, description: "Users can add multiple projects with title, description, and featured display in interactive card layout" },
      { name: "Dynamic Portfolio Generation", icon: Globe, description: "Each user gets a unique portfolio link: /portfolio/:id with pages generated automatically from backend data" },
      { name: "File-Based Database System", icon: Lock, description: "All user data stored as JSON files with lightweight backend storage system and unique ID generation" },
      { name: "Interactive UI Design", icon: Users, description: "Clean card-based layout with responsive design and organized sections for profile, projects, skills, contact" },
      { name: "Shareable Portfolio Links", icon: Send, description: "Each user can share their portfolio link publicly like http://localhost:3000/portfolio/123456789" }
    ]
  }
]

const staticSkills = {
  "Programming Languages": [
    { name: "HTML", level: 95, color: "bg-orange-500" },
    { name: "CSS", level: 90, color: "bg-blue-500" },
    { name: "JavaScript", level: 90, color: "bg-yellow-500" },
    { name: "C++", level: 75, color: "bg-blue-600" },
    { name: "JavaFX", level: 70, color: "bg-red-600" }
  ],
  "Frontend": [
    { name: "React.js", level: 90, color: "bg-cyan-500" },
    { name: "Tailwind CSS", level: 85, color: "bg-teal-500" }
  ],
  "Backend": [
    { name: "Node.js", level: 85, color: "bg-green-500" },
    { name: "Express.js", level: 85, color: "bg-gray-600" }
  ],
  "Database": [
    { name: "MongoDB", level: 75, color: "bg-green-600" },
    { name: "Mongoose", level: 75, color: "bg-green-700" }
  ],
  "Authentication & Security": [
    { name: "JWT Authentication", level: 80, color: "bg-purple-500" },
    { name: "bcrypt.js", level: 75, color: "bg-indigo-500" }
  ],
  "Communication & APIs": [
    { name: "REST API", level: 85, color: "bg-blue-500" },
    { name: "Nodemailer", level: 80, color: "bg-red-500" },
    { name: "Socket.io", level: 70, color: "bg-gray-500" },
    { name: "Google Maps API", level: 75, color: "bg-green-400" },
    { name: "Geolocation API", level: 75, color: "bg-blue-400" }
  ],
  "Tools": [
    { name: "VS Code", level: 95, color: "bg-blue-600" },
    { name: "Windsurf", level: 85, color: "bg-purple-600" },
    { name: "Antigravity", level: 80, color: "bg-gray-700" },
    { name: "Git & GitHub", level: 85, color: "bg-gray-900" }
  ]
}

// Typewriter Effect Hook
function useTypewriter(text, speed = 100, delay = 500) {
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    if (!text) return
    
    let currentIndex = 0
    let timeout
    
    const startTyping = setTimeout(() => {
      const typeChar = () => {
        if (currentIndex < text.length) {
          setDisplayText(text.slice(0, currentIndex + 1))
          currentIndex++
          timeout = setTimeout(typeChar, speed)
        } else {
          setIsTyping(false)
        }
      }
      typeChar()
    }, delay)

    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 530)

    return () => {
      clearTimeout(startTyping)
      clearTimeout(timeout)
      clearInterval(cursorInterval)
    }
  }, [text, speed, delay])

  return { displayText, isTyping, showCursor }
}

// Animated Counter Hook
function useAnimatedCounter(target, duration = 2000) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!isVisible) return

    const increment = target / (duration / 16)
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [isVisible, target, duration])

  return { count, ref: setIsVisible }
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

// Interactive Background Component
function InteractiveBackground() {
  const canvasRef = useRef(null)
  const { darkMode } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let particles = []
    let animationFrameId

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        this.opacity = Math.random() * 0.5 + 0.2
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1
      }

      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = darkMode 
          ? `rgba(99, 102, 241, ${this.opacity})` 
          : `rgba(14, 165, 233, ${this.opacity})`
        ctx.fill()
      }
    }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const init = () => {
      particles = []
      const particleCount = Math.min(50, Math.floor(canvas.width / 20))
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })

      // Draw connections
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach(b => {
          const dx = a.x - b.x
          const dy = a.y - b.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.beginPath()
            ctx.strokeStyle = darkMode
              ? `rgba(99, 102, 241, ${0.1 * (1 - distance / 150)})`
              : `rgba(14, 165, 233, ${0.1 * (1 - distance / 150)})`
            ctx.lineWidth = 1
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        })
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    resize()
    init()
    animate()

    window.addEventListener('resize', () => {
      resize()
      init()
    })

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resize)
    }
  }, [darkMode])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  )
}

function Home() {
  const [profile, setProfile] = useState(staticProfile)
  const [projects, setProjects] = useState(staticProjects)
  const [projectCount, setProjectCount] = useState(5)
  const [skillCount, setSkillCount] = useState(22)
  const [experienceCount, setExperienceCount] = useState(2)
  const [loading, setLoading] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [activeProject, setActiveProject] = useState(0)
  const [expandedSkill, setExpandedSkill] = useState(null)
  const heroRef = useRef(null)

  const { displayText: typewriterName } = useTypewriter(profile?.name || 'Samrawit Yirga', 80, 300)
  const { displayText: typewriterTitle } = useTypewriter(profile?.title || 'Full Stack Developer', 60, 800)

  const { ref: statsRef, isVisible: statsVisible } = useScrollReveal()
  const { count: animatedProjectCount, ref: projectCountRef } = useAnimatedCounter(projectCount)
  const { count: animatedSkillCount, ref: skillCountRef } = useAnimatedCounter(skillCount)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        setMousePos({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        <p className="text-gray-500 animate-pulse">Loading portfolio...</p>
      </div>
    )
  }

  return (
    <div className="relative">
      <InteractiveBackground />
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/90 to-blue-50/90 dark:from-gray-900/90 dark:to-blue-900/90"></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          {/* Profile Image */}
          <div className="mb-8 relative group">
            <div className="relative inline-block">
              {profile?.image ? (
                <img 
                  src={profile.image} 
                  alt={profile.name}
                  className="w-40 h-40 rounded-full border-4 border-white dark:border-gray-800 shadow-2xl group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}&background=random&size=200`
                  }}
                />
              ) : (
                <div className="w-40 h-40 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-2xl">
                  <User className="h-20 w-20 text-white" />
                </div>
              )}
              
              {/* Floating badge */}
              <div className="absolute -bottom-2 -right-2 bg-green-500 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1 shadow-lg animate-bounce">
                <CheckCircle className="h-3 w-3" />
                <span>Available for Work</span>
              </div>
            </div>
          </div>

          {/* Typewriter Text */}
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-4">
            {typewriterName}
            <span className="text-primary-600 animate-pulse">|</span>
          </h1>
          
          <p className="text-2xl md:text-3xl text-primary-600 dark:text-primary-400 mb-6 h-10">
            {typewriterTitle}
            <span className="animate-pulse">|</span>
          </p>

          {/* Bio with animation */}
          <div className="max-w-3xl mx-auto mb-8">
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed animate-fade-in-up">
              {profile?.bio}
            </p>
          </div>

          {/* Contact Info */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors">
              <Mail className="h-5 w-5" />
              <a href={`mailto:${profile?.email}`} className="hover:underline">
                {profile?.email}
              </a>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Phone className="h-5 w-5" />
              <span>{profile?.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <MapPin className="h-5 w-5" />
              <span>{profile?.location}</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-4 mb-8">
            {profile?.socialLinks?.github && (
              <a 
                href={profile.socialLinks.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full hover:bg-primary-600 dark:hover:bg-primary-600 hover:scale-110 transition-all duration-300 shadow-lg"
              >
                <Github className="h-5 w-5" />
              </a>
            )}
            {profile?.socialLinks?.linkedin && (
              <a 
                href={profile.socialLinks.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 hover:scale-110 transition-all duration-300 shadow-lg"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            )}
            {profile?.socialLinks?.twitter && (
              <a 
                href={profile.socialLinks.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-sky-500 text-white rounded-full hover:bg-sky-600 hover:scale-110 transition-all duration-300 shadow-lg"
              >
                <Twitter className="h-5 w-5" />
              </a>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/projects" 
              className="btn-primary flex items-center gap-2 group text-lg px-8 py-4"
            >
              <Briefcase className="h-5 w-5 group-hover:rotate-12 transition-transform" />
              View My Projects
            </Link>
            <Link 
              to="/contact" 
              className="btn-secondary flex items-center gap-2 group text-lg px-8 py-4"
            >
              <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              Get In Touch
            </Link>
          </div>
        </div>

        {/* Mouse follower effect */}
        <div 
          className="absolute w-6 h-6 bg-primary-400/20 rounded-full pointer-events-none transition-all duration-100"
          style={{
            left: `${mousePos.x * 100}%`,
            top: `${mousePos.y * 100}%`,
            transform: 'translate(-50%, -50%)'
          }}
        />
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 bg-black dark:bg-black">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-white dark:text-white mb-12">
            Quick Stats
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center card p-8" ref={projectCountRef}>
              <div className="text-5xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                {statsVisible ? animatedProjectCount : 0}+
              </div>
              <div className="text-gray-200 dark:text-gray-300">Projects Completed</div>
            </div>
            <div className="text-center card p-8" ref={skillCountRef}>
              <div className="text-5xl font-bold text-green-600 dark:text-green-400 mb-2">
                {statsVisible ? animatedSkillCount : 0}+
              </div>
              <div className="text-gray-200 dark:text-gray-300">Technologies</div>
            </div>
            <div className="text-center card p-8">
              <div className="text-5xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                {experienceCount}+
              </div>
              <div className="text-gray-200 dark:text-gray-300">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Featured Projects
          </h2>
          
          <div className="space-y-12">
            {projects.map((project, index) => (
              <div 
                key={project.id}
                className={`card p-8 transform transition-all duration-300 hover:scale-102 ${
                  activeProject === index ? 'ring-2 ring-primary-500 shadow-2xl' : ''
                }`}
                onClick={() => setActiveProject(index)}
                onMouseEnter={() => setActiveProject(index)}
              >
                <div className="flex items-start gap-6">
                  <div className="text-5xl mb-4">{project.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {project.title}
                      </h3>
                      <span className={`px-3 py-1 text-xs rounded-full ${
                        project.status === 'Completed' 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                          : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                      {project.description}
                    </p>
                    
                    {/* Tech Stack */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Tech Stack:</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, i) => (
                          <span 
                            key={i} 
                            className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-sm rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Key Features:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {project.features.map((feature, i) => (
                          <div key={i} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                            <feature.icon className="h-4 w-4 text-primary-500 mt-0.5 flex-shrink-0" />
                            <div>
                              <span className="font-medium text-gray-900 dark:text-white">{feature.name}:</span>
                              <span className="ml-1">{feature.description}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* System Idea for SafeRoute */}
                    {project.systemIdea && (
                      <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">System Idea:</h4>
                        <p className="text-blue-800 dark:text-blue-200">{project.systemIdea}</p>
                      </div>
                    )}

                    {/* GitHub Link */}
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors font-medium"
                      >
                        <Github className="h-5 w-5" />
                        View Source Code
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
            I'm always excited to work on new projects and bring ideas to life. 
            Let's collaborate and create something extraordinary together!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/projects" 
              className="btn-primary flex items-center gap-2 group text-lg px-8 py-4"
            >
              <Briefcase className="h-5 w-5 group-hover:rotate-12 transition-transform" />
              View My Work
            </Link>
            <Link 
              to="/contact" 
              className="btn-secondary flex items-center gap-2 group text-lg px-8 py-4"
            >
              <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              Get In Touch
            </Link>
          </div>
        </div>
      </section>

      
      {/* Services Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            What I Do
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Web Development */}
            <div className="card p-8 hover:scale-105 transition-all duration-300">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <Code className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Web Development
                </h3>
                <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-4">
                  Full-Stack Solutions
                </p>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Building modern, responsive web applications using React, Node.js, and MongoDB. Creating seamless user experiences with clean, maintainable code and optimal performance.
              </p>
              <div className="mt-6 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Custom Web Applications</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Responsive Design</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>API Development</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Database Integration</span>
                </div>
              </div>
            </div>

            {/* Frontend Design */}
            <div className="card p-8 hover:scale-105 transition-all duration-300">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <Zap className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Frontend Design
                </h3>
                <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-4">
                  UI/UX Excellence
                </p>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Creating intuitive, user-friendly interfaces with modern design principles. Focusing on user experience, accessibility, and visual appeal to deliver engaging digital experiences.
              </p>
              <div className="mt-6 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Interactive Interfaces</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Responsive Layouts</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Modern CSS/Tailwind</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Component Architecture</span>
                </div>
              </div>
            </div>

            {/* Backend Development */}
            <div className="card p-8 hover:scale-105 transition-all duration-300">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <Database className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Backend Development
                </h3>
                <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-4">
                  Robust Architecture
                </p>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Developing scalable server-side solutions with Node.js and Express.js. Building RESTful APIs, implementing authentication, and ensuring data security and optimal performance.
              </p>
              <div className="mt-6 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>RESTful APIs</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Database Design</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Authentication Systems</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Real-time Features</span>
                </div>
              </div>
            </div>

            {/* UI/UX Design */}
            <div className="card p-8 hover:scale-105 transition-all duration-300">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <Award className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  UI/UX Design
                </h3>
                <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-4">
                  User-Centered Approach
                </p>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Designing beautiful, functional interfaces with user experience in mind. Creating wireframes, prototypes, and implementing design systems that enhance usability and engagement.
              </p>
              <div className="mt-6 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>User Research</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Wireframing</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Prototyping</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Design Systems</span>
                </div>
              </div>
            </div>

            {/* Database Management */}
            <div className="card p-8 hover:scale-105 transition-all duration-300">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <Lock className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Database Management
                </h3>
                <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-4">
                  Data Organization
                </p>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Designing and managing efficient database schemas using MongoDB and Mongoose. Implementing data relationships, optimization strategies, and ensuring data integrity and security.
              </p>
              <div className="mt-6 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Schema Design</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Data Modeling</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Query Optimization</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Data Security</span>
                </div>
              </div>
            </div>

            {/* API Development */}
            <div className="card p-8 hover:scale-105 transition-all duration-300">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <Globe className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  API Development
                </h3>
                <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-4">
                  System Integration
                </p>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Creating RESTful APIs for seamless data exchange between frontend and backend. Implementing authentication, error handling, and documentation for developer-friendly integration.
              </p>
              <div className="mt-6 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>RESTful Design</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Authentication</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Rate Limiting</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Documentation</span>
                </div>
              </div>
            </div>

            {/* Real-time Features */}
            <div className="card p-8 hover:scale-105 transition-all duration-300">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <Users className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Real-time Features
                </h3>
                <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-4">
                  Live Interactions
                </p>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Implementing WebSocket connections for real-time communication, live updates, and interactive features. Building chat systems, notifications, and collaborative tools.
              </p>
              <div className="mt-6 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Socket.io Integration</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Live Notifications</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Real-time Updates</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Collaborative Tools</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
