import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { ExternalLink, Github, Calendar, Star, Award, Target, Zap, Code, Globe, Database, Lock, Mail, Users, User, Shield, Clock, Smartphone, Map as MapIcon, Rocket, Brain, MessageSquare, ShoppingCart, MapPin, AlertTriangle, Briefcase } from 'lucide-react'
import { useTheme } from '../App'

const API_URL =
  import.meta.env.VITE_API_URL || 'https://portfolio-backend-v4b1.onrender.com/api'

// Static data for deployment
const staticProjects = [
  {
    id: "saferoute-001",
    title: "SafeRoute Emergency System",
    description: "SafeRoute is a full-stack emergency safety platform that monitors users in real time during travel and automatically triggers emergency alerts when danger is detected. It ensures fast response through GPS tracking, SMS alerts, and a central monitoring system.",
    longDescription: "SafeRoute acts as a centralized safety system connecting Users, Police, Family members, and Emergency services. The platform provides comprehensive safety monitoring with real-time tracking, automatic emergency detection, and instant alert systems.",
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Socket.io", "Tailwind CSS", "Google Maps API", "Twilio SMS API"],
    githubUrl: "https://github.com/samri0821/saferoute",
    demoUrl: "",
    status: "In Progress",
    icon: "🚨",
    category: "Emergency Safety",
    startDate: "2024-01",
    features: [
      { name: "Real-Time GPS Tracking", icon: MapIcon, description: "Live location updates every 3-5 seconds with Google Maps visualization and location history tracking" },
      { name: "Emergency Detection", icon: Shield, description: "SOS button activation and automatic accident detection with smart algorithms" },
      { name: "Safety Confirmation", icon: Clock, description: "5-minute safety confirmation system to ensure user well-being" },
      { name: "Emergency Alerts", icon: Mail, description: "Instant SMS notifications to police dashboard, family members, and emergency contacts" },
      { name: "Monitoring Dashboard", icon: Users, description: "Live tracking of users with emergency status updates: Pending, Responding, Resolved" },
      { name: "Offline Support", icon: Smartphone, description: "Works without internet using SMS and mobile network-based emergency system" },
      { name: "Subscription System", icon: Database, description: "Daily/Weekly/Monthly plans with access control based on subscription level" }
    ],
    challenges: [
      "Implementing real-time GPS tracking with minimal battery consumption",
      "Creating reliable emergency detection algorithms",
      "Building scalable SMS notification system",
      "Designing intuitive monitoring dashboard for emergency responders"
    ],
    achievements: [
      "Successfully implemented real-time location tracking",
      "Created emergency alert system with SMS integration",
      "Built responsive monitoring dashboard",
      "Implemented subscription-based access control"
    ]
  },
  {
    id: "portfolio-builder-003",
    title: "Dynamic Portfolio Builder",
    description: "A full-stack web application that allows users to create interactive personal portfolio websites in real time. Users enter their personal details, skills, experience, and projects, and the system automatically generates a unique portfolio page with a shareable link.",
    longDescription: "The Dynamic Portfolio Builder is a full-stack application that demonstrates backend development, dynamic routing, and file-based data storage. Each user gets a unique portfolio link (/portfolio/:id) where pages are generated automatically from backend data. The system acts as a mini portfolio generator platform similar to Wix Portfolio Builder, GitHub Pages, and LinkedIn Profile System.",
    technologies: ["Node.js", "Express.js", "HTML5", "CSS3", "JavaScript", "File System (JSON Storage)"],
    githubUrl: "https://github.com/samri0821/portfolio-builder",
    demoUrl: "",
    status: "Planning",
    icon: "🚀",
    category: "Web Development",
    startDate: "2024-05",
    features: [
      { name: "Profile Creation System", icon: User, description: "Users can create personal portfolio profiles with name, bio, skills, experience, and services" },
      { name: "Dynamic Project Management", icon: Briefcase, description: "Users can add multiple projects with title, description, and featured display in interactive card layout" },
      { name: "Dynamic Portfolio Generation", icon: Globe, description: "Each user gets a unique portfolio link: /portfolio/:id with pages generated automatically from backend data" },
      { name: "File-Based Database System", icon: Database, description: "All user data stored as JSON files with lightweight backend storage system and unique ID generation using timestamp" },
      { name: "Interactive UI Design", icon: Star, description: "Clean card-based layout with responsive design and organized sections for profile, projects, skills, contact" },
      { name: "Shareable Portfolio Links", icon: ExternalLink, description: "Each user can share their portfolio link publicly like http://localhost:3000/portfolio/123456789" }
    ],
    challenges: [
      "Implementing dynamic routing for portfolio generation",
      "Creating efficient file-based database system",
      "Building scalable JSON storage structure",
      "Designing responsive portfolio templates"
    ],
    achievements: [
      "Planned comprehensive portfolio generation system",
      "Designed file-based database architecture",
      "Created unique ID generation mechanism",
      "Planned shareable portfolio links feature"
    ]
  }
]

// Future Projects Data
const futureProjects = [
  {
    id: "future-001",
    title: "Women's Work Finder Platform",
    description: "A full-stack web platform designed to help women find job opportunities, freelance work, and local employment in a safe, accessible, and supportive environment.",
    objective: "To empower women by connecting them with verified employers and flexible job opportunities, especially within local communities.",
    icon: "👩‍💼",
    category: "Future Projects",
    status: "Planned",
    plannedTechnologies: ["React.js", "Tailwind CSS", "Node.js & Express.js", "MongoDB & Mongoose", "JWT Authentication", "Optional: Email/SMS notifications"],
    keyFeatures: [
      "Job listings (full-time, part-time, freelance, remote)",
      "Location-based job search",
      "User profiles for job seekers",
      "Employer dashboard for posting jobs",
      "Job application tracking system",
      "Secure authentication and user verification",
      "Mobile-friendly and accessible UI"
    ]
  },
  {
    id: "future-002",
    title: "AI-Powered Safety Prediction System",
    description: "An intelligent extension of SafeRoute system that uses data analysis and machine learning to predict high-risk areas and potential safety threats.",
    objective: "To proactively enhance user safety by identifying patterns and predicting possible danger before it occurs.",
    icon: "🧠",
    category: "Future Projects",
    status: "Planned",
    plannedTechnologies: ["React.js", "Node.js & Express.js", "MongoDB", "Python (Machine Learning integration)", "TensorFlow / Scikit-learn (optional)"],
    keyFeatures: [
      "Risk zone prediction based on historical data",
      "Smart alerts for dangerous areas",
      "Data visualization dashboard",
      "Integration with SafeRoute system",
      "Real-time data processing"
    ]
  },
  {
    id: "future-003",
    title: "Real-Time Chat Application",
    description: "A full-stack real-time messaging application that enables instant communication between users.",
    objective: "To demonstrate real-time system design and WebSocket-based communication.",
    icon: "💬",
    category: "Future Projects",
    status: "Planned",
    plannedTechnologies: ["React.js", "Node.js & Express.js", "Socket.io", "MongoDB"],
    keyFeatures: [
      "One-to-one messaging",
      "Group chat functionality",
      "Real-time notifications",
      "Online/offline user status",
      "Message timestamps and history"
    ]
  },
  {
    id: "future-004",
    title: "Task & Project Management System",
    description: "A productivity web application designed to help users manage tasks, organize projects, and track progress efficiently.",
    objective: "To build a scalable system that demonstrates CRUD operations, user management, and dashboard design.",
    icon: "🧾",
    category: "Future Projects",
    status: "Planned",
    plannedTechnologies: ["React.js", "Tailwind CSS", "Node.js & Express.js", "MongoDB"],
    keyFeatures: [
      "Create, update, and delete tasks",
      "Project organization system",
      "Task prioritization and deadlines",
      "Progress tracking dashboard",
      "User authentication"
    ]
  },
  {
    id: "future-005",
    title: "E-Commerce Web Application",
    description: "A scalable online shopping platform that supports product browsing, purchasing, and user account management.",
    objective: "To demonstrate full-stack development with payment integration and scalable architecture.",
    icon: "🛒",
    category: "Future Projects",
    status: "Planned",
    plannedTechnologies: ["React.js", "Node.js & Express.js", "MongoDB", "Payment API (Stripe or similar)"],
    keyFeatures: [
      "Product listing and categories",
      "Shopping cart system",
      "User authentication and profiles",
      "Order management",
      "Payment integration"
    ]
  },
  {
    id: "future-006",
    title: "Community Incident Reporting Platform",
    description: "A web platform that allows users to report real-time incidents such as accidents, unsafe areas, or road issues.",
    objective: "To improve community awareness and safety through real-time information sharing.",
    icon: "🌍",
    category: "Future Projects",
    status: "Planned",
    plannedTechnologies: ["React.js", "Node.js & Express.js", "MongoDB", "Google Maps API", "Socket.io"],
    keyFeatures: [
      "Incident reporting system",
      "Location-based map visualization",
      "Real-time updates",
      "Notification system",
      "User interaction and feedback"
    ]
  },
  {
    id: "future-007",
    title: "Progressive Web App (PWA) for SafeRoute",
    description: "A mobile-optimized version of SafeRoute system that works offline and can be installed like a native app.",
    objective: "To improve accessibility and usability on mobile devices, especially in low-network environments.",
    icon: "📱",
    category: "Future Projects",
    status: "Planned",
    plannedTechnologies: ["React.js", "Service Workers", "Web App Manifest", "Node.js backend integration"],
    keyFeatures: [
      "Offline functionality",
      "Installable web app",
      "Push notifications",
      "Fast performance",
      "Mobile-first design"
    ]
  }
]

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

function Projects() {
  const [projects, setProjects] = useState(staticProjects)
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState('all')
  const [expandedProject, setExpandedProject] = useState(null)
  const [activeTab, setActiveTab] = useState('completed')

  const { ref: projectsRef, isVisible: projectsVisible } = useScrollReveal()

  const allProjects = activeTab === 'completed' ? projects : futureProjects
  const filteredProjects = filter === 'all' 
    ? allProjects 
    : allProjects.filter(project => project.category === filter)

  const categories = ['all', ...new Set(allProjects.map(project => project.category))]

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        <p className="text-gray-500 animate-pulse">Loading projects...</p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          My Projects
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Explore my portfolio of completed projects and future plans. Each project demonstrates different aspects 
          of my technical skills and vision for solving real-world problems.
        </p>
      </div>

      {/* Tabs for Completed vs Future */}
      <div className="flex justify-center mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-1 inline-flex">
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
              activeTab === 'completed'
                ? 'bg-primary-600 text-white'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              <span>Completed Projects ({projects.length})</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('future')}
            className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
              activeTab === 'future'
                ? 'bg-primary-600 text-white'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2">
              <Rocket className="h-4 w-4" />
              <span>Future Projects ({futureProjects.length})</span>
            </div>
          </button>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-4 py-2 rounded-full transition-all duration-300 ${
              filter === category
                ? 'bg-primary-600 text-white shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div ref={projectsRef} className="space-y-8">
        {filteredProjects.map((project, index) => (
          <div
            key={project.id}
            className={`card p-8 transform transition-all duration-500 ${
              projectsVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Project Icon and Status */}
              <div className="lg:w-1/4">
                <div className="text-center">
                  <div className="text-6xl mb-4">{project.icon}</div>
                  <span className={`inline-block px-3 py-1 text-sm rounded-full ${
                    project.status === 'Completed' 
                      ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                      : project.status === 'In Progress'
                      ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                      : 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                  }`}>
                    {project.status}
                  </span>
                  {project.startDate && (
                    <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1 justify-center">
                        <Calendar className="h-4 w-4" />
                        {project.startDate} - {project.endDate || 'Present'}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Project Details */}
              <div className="lg:w-3/4">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {project.title}
                    </h2>
                    <span className="text-sm text-primary-600 dark:text-primary-400 font-medium">
                      {project.category}
                    </span>
                  </div>
                  
                  {/* Links */}
                  <div className="flex gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-primary-600 dark:hover:bg-primary-600 transition-colors"
                        title="View on GitHub"
                      >
                        <Github className="h-5 w-5" />
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                        title="View Live Demo"
                      >
                        <ExternalLink className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {project.description}
                </p>

                {/* Expand/Collapse Button */}
                <button
                  onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
                  className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium mb-4"
                >
                  {expandedProject === project.id ? 'Show Less' : 'Show More Details'}
                </button>

                {/* Expanded Content */}
                {expandedProject === project.id && (
                  <div className="space-y-6 animate-fade-in">
                    {/* Objective (for future projects) */}
                    {project.objective && (
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                          <Target className="h-5 w-5 text-orange-500" />
                          Objective
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          {project.objective}
                        </p>
                      </div>
                    )}

                    {/* Long Description */}
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Overview</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {project.longDescription || project.description}
                      </p>
                    </div>

                    {/* Features */}
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                        {project.status === 'Planned' ? 'Planned Features' : 'Key Features'}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {(project.features || project.keyFeatures || []).map((feature, i) => (
                          <div key={i} className="flex items-start gap-3 text-sm">
                            {typeof feature === 'object' && feature.icon ? (
                              <feature.icon className="h-4 w-4 text-primary-500 mt-0.5 flex-shrink-0" />
                            ) : (
                              <Star className="h-4 w-4 text-primary-500 mt-0.5 flex-shrink-0" />
                            )}
                            <div>
                              <span className="font-medium text-gray-900 dark:text-white">
                                {typeof feature === 'object' ? feature.name : feature}
                              </span>
                              {typeof feature === 'object' && feature.description && (
                                <span className="text-gray-600 dark:text-gray-400 ml-1">
                                  : {feature.description}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Planned Technologies (for future projects) */}
                    {project.plannedTechnologies && (
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Planned Technologies</h3>
                        <div className="flex flex-wrap gap-2">
                          {project.plannedTechnologies.map((tech, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-sm rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Technologies Used (for completed projects) */}
                    {project.technologies && (
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Technology Stack</h3>
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
                    )}

                    {/* Challenges */}
                    {project.challenges && (
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                          <AlertTriangle className="h-5 w-5 text-yellow-500" />
                          Challenges & Solutions
                        </h3>
                        <ul className="space-y-2">
                          {project.challenges.map((challenge, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                              <Target className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                              <span>{challenge}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Achievements */}
                    {project.achievements && (
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                          <Award className="h-5 w-5 text-green-500" />
                          Key Achievements
                        </h3>
                        <ul className="space-y-2">
                          {project.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                              <Award className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            {activeTab === 'completed' ? <Code className="h-16 w-16 mx-auto" /> : <Rocket className="h-16 w-16 mx-auto" />}
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No {activeTab === 'completed' ? 'completed' : 'future'} projects found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try selecting a different category to see more projects.
          </p>
        </div>
      )}

      {/* Call to Action */}
      <div className="mt-16 text-center">
        <div className="card p-8 bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {activeTab === 'completed' ? 'Interested in collaborating?' : 'Excited about future projects?'}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            {activeTab === 'completed' 
              ? "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions."
              : "These future projects represent my commitment to continuous learning and building impactful solutions. Stay tuned for updates!"
            }
          </p>
          <Link
            to="/contact"
            className="btn-primary inline-flex items-center gap-2"
          >
            <Mail className="h-5 w-5" />
            Get In Touch
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Projects
