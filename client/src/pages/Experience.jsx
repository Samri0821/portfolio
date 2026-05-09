import { useState, useEffect, useRef, useMemo } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Calendar, MapPin, Briefcase, Award, Target, Users, ExternalLink, Star, TrendingUp, CheckCircle } from 'lucide-react'
import { useTheme } from '../App'

const API_URL =
  import.meta.env.VITE_API_URL || 'https://portfolio-backend-v4b1.onrender.com/api'

// Static data for deployment
const staticExperience = [
  {
    id: "exp-001",
    title: "Full Stack Developer",
    company: "SafeRoute Project",
    location: "Ethiopia",
    type: "Full-time",
    startDate: "2024-01",
    endDate: "",
    current: true,
    description: "Leading development of SafeRoute Emergency System, a full-stack platform for real-time safety monitoring and emergency response coordination. This project focuses on creating a centralized safety system connecting users, police, family members, and emergency services.",
    achievements: [
      "Designed and implemented real-time GPS tracking system with Socket.io for live location updates every 3-5 seconds",
      "Built emergency alert system with SMS notifications via Twilio API for instant communication",
      "Created responsive React frontend with Google Maps integration for intuitive user experience",
      "Implemented MongoDB database for efficient user and emergency data management",
      "Developed subscription-based payment system with access control for different service tiers",
      "Built comprehensive monitoring dashboard for emergency responders with status tracking",
      "Implemented offline support using SMS and mobile network for areas without internet",
      "Created automatic emergency detection algorithms with smart safety confirmation system"
    ],
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Socket.io", "Google Maps API", "Twilio SMS API", "Tailwind CSS"],
    skills: ["Full-Stack Development", "Real-time Systems", "API Integration", "Database Design", "Emergency Systems"],
    challenges: [
      "Implementing real-time GPS tracking with minimal battery consumption",
      "Creating reliable emergency detection algorithms",
      "Building scalable SMS notification system",
      "Designing intuitive monitoring dashboard for emergency responders"
    ],
    impact: "Successfully created a comprehensive safety platform that can save lives through rapid emergency response coordination"
  },
  {
    id: "exp-002", 
    title: "Full Stack Developer",
    company: "Portfolio System Development",
    location: "Ethiopia",
    type: "Freelance",
    startDate: "2023-06",
    endDate: "2023-12",
    current: false,
    description: "Developed comprehensive portfolio management system with admin dashboard and contact functionality. This project showcases full-stack development capabilities with modern React and Node.js stack, including authentication, real-time features, and email notifications.",
    achievements: [
      "Built React frontend with Tailwind CSS for responsive design across all devices",
      "Created RESTful API with Node.js and Express.js for robust backend functionality",
      "Implemented JWT authentication and security features for admin access protection",
      "Integrated email notifications with Nodemailer for instant contact form alerts",
      "Designed MongoDB schema for efficient data storage and retrieval",
      "Created admin dashboard for content management with real-time updates",
      "Implemented contact form with validation and spam protection",
      "Added dark mode support and responsive design for optimal user experience"
    ],
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Mongoose", "JWT Authentication", "Nodemailer", "Tailwind CSS"],
    skills: ["Full-Stack Development", "Authentication Systems", "Email Integration", "Database Design", "UI/UX Design"],
    challenges: [
      "Designing responsive layout for all devices and screen sizes",
      "Implementing secure authentication system with JWT",
      "Creating efficient database schema for portfolio data",
      "Building real-time notification system for admin updates"
    ],
    impact: "Successfully deployed a professional portfolio system that demonstrates advanced full-stack development capabilities"
  },
  {
    id: "exp-003",
    title: "Women's 24 Hackathon Competition",
    company: "SafeRoute Project",
    location: "Ethiopia",
    type: "Competition",
    startDate: "2024-03",
    endDate: "2024-03",
    current: false,
    description: "Participated in a 24-hour women's hackathon competition, developing the SafeRoute emergency safety system. This intensive coding challenge tested problem-solving abilities, teamwork, and rapid development skills in building innovative safety solutions.",
    achievements: [
      "Successfully developed SafeRoute emergency system prototype within 24-hour time constraint",
      "Collaborated effectively with team members under pressure",
      "Implemented real-time GPS tracking and SMS notification features in limited time",
      "Presented project to judges and received recognition for innovation",
      "Demonstrated strong problem-solving and debugging skills",
      "Applied modern development practices and tools for emergency response system"
    ],
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Socket.io", "Google Maps API", "Twilio SMS API"],
    skills: ["Rapid Prototyping", "Team Collaboration", "Problem Solving", "Time Management", "Full-Stack Development"],
    challenges: [
      "Implementing real-time GPS tracking within 24-hour deadline",
      "Building SMS notification system under time pressure",
      "Coordinating team efforts for multiple features",
      "Presenting technical emergency system to non-technical judges"
    ],
    impact: "Received recognition for innovative SafeRoute emergency system and technical excellence"
  },
  {
    id: "exp-004",
    title: "Certified Intern",
    company: "Code Alpha",
    location: "Ethiopia",
    type: "Internship",
    startDate: "2023-08",
    endDate: "2023-10",
    current: false,
    description: "Completed internship program at Code Alpha, focusing on full-stack web development, modern JavaScript frameworks, and best practices in software engineering. Gained practical experience working on real-world projects and learning from experienced mentors.",
    achievements: [
      "Completed structured internship program in full-stack development",
      "Learned modern JavaScript frameworks and libraries including React.js",
      "Worked on real-world projects with experienced developers",
      "Mastered backend development with Node.js and Express.js",
      "Gained hands-on experience with MongoDB database design",
      "Received official certification from Code Alpha for completion of internship program",
      "Applied software engineering best practices and coding standards",
      "Developed problem-solving and collaborative skills"
    ],
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "JavaScript", "Git", "REST APIs"],
    skills: ["Full-Stack Development", "Web Development", "Database Design", "API Development", "Code Best Practices"],
    challenges: [
      "Adapting to professional development environment",
      "Learning new frameworks and technologies quickly",
      "Meeting project deadlines and requirements",
      "Collaborating with experienced developers"
    ],
    impact: "Successfully completed internship with certification and gained practical full-stack development experience"
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

function Experience() {
  const [experience, setExperience] = useState(staticExperience)
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState('all')
  const [expandedExperience, setExpandedExperience] = useState(null)

  const { ref: experienceRef, isVisible: experienceVisible } = useScrollReveal()

  // Filter experience based on type
  const filteredExperience = useMemo(() => {
    if (filter === 'all') return experience
    return experience.filter(exp => exp.type.toLowerCase() === filter.toLowerCase())
  }, [experience, filter])

  const types = ['all', ...new Set(experience.map(exp => exp.type))]

  // Calculate stats
  const totalExperience = useMemo(() => {
    return experience.reduce((total, exp) => {
      const start = new Date(exp.startDate)
      const end = exp.current ? new Date() : new Date(exp.endDate || start)
      return total + (end - start)
    }, 0)
  }, [experience])

  const yearsOfExperience = Math.floor(totalExperience / (1000 * 60 * 60 * 24 * 365))
  const monthsOfExperience = Math.floor((totalExperience % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30))

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        <p className="text-gray-500 animate-pulse">Loading experience...</p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          My Experience
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          A journey through professional development, hackathons, and freelance projects. 
          Each experience has contributed to my growth as a full-stack developer.
        </p>
      </div>

      {/* Experience Stats */}
      <div ref={experienceRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className={`card p-6 text-center transform transition-all duration-500 ${
          experienceVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
            {yearsOfExperience}+
          </div>
          <div className="text-gray-600 dark:text-gray-400">Years of Experience</div>
        </div>
        <div className={`card p-6 text-center transform transition-all duration-500 ${
          experienceVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`} style={{ transitionDelay: '100ms' }}>
          <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
            {experience.length}
          </div>
          <div className="text-gray-600 dark:text-gray-400">Positions Held</div>
        </div>
        <div className={`card p-6 text-center transform transition-all duration-500 ${
          experienceVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`} style={{ transitionDelay: '200ms' }}>
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
            {experience.reduce((acc, exp) => acc + exp.achievements.length, 0)}
          </div>
          <div className="text-gray-600 dark:text-gray-400">Key Achievements</div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-full transition-all duration-300 ${
              filter === type
                ? 'bg-primary-600 text-white shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {type === 'all' ? 'All Experience' : type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-600 transform md:-translate-x-0.5"></div>

        {/* Experience Items */}
        <div className="space-y-12">
          {filteredExperience.map((exp, index) => (
            <div
              key={exp.id}
              className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 transform transition-all duration-500 ${
                experienceVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Timeline Dot */}
              <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-primary-600 rounded-full transform -translate-x-1/2 border-4 border-white dark:border-gray-900 z-10">
                {exp.current && (
                  <div className="absolute inset-0 bg-primary-600 rounded-full animate-ping"></div>
                )}
              </div>

              {/* Experience Card */}
              <div className="ml-16 md:ml-0 md:w-1/2 card p-8 hover:shadow-xl transition-shadow cursor-pointer"
                   onClick={() => setExpandedExperience(expandedExperience === exp.id ? null : exp.id)}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {exp.title}
                    </h3>
                    <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400">
                      <Briefcase className="h-4 w-4" />
                      <span className="font-medium">{exp.company}</span>
                    </div>
                  </div>
                  {exp.current && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 text-xs rounded-full">
                      Current
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{exp.startDate} - {exp.endDate || 'Present'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{exp.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Award className="h-4 w-4" />
                    <span>{exp.type}</span>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {exp.description}
                </p>

                {/* Expand/Collapse Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setExpandedExperience(expandedExperience === exp.id ? null : exp.id)
                  }}
                  className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
                >
                  {expandedExperience === exp.id ? 'Show Less' : 'Show More Details'}
                </button>

                {/* Expanded Content */}
                {expandedExperience === exp.id && (
                  <div className="mt-6 space-y-6 animate-fade-in">
                    {/* Key Achievements */}
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <Star className="h-5 w-5 text-yellow-500" />
                        Key Achievements
                      </h4>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies Used */}
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Technologies Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-sm rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Skills Developed */}
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Skills Developed</h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Challenges */}
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <Target className="h-5 w-5 text-orange-500" />
                        Challenges & Solutions
                      </h4>
                      <ul className="space-y-2">
                        {exp.challenges.map((challenge, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <TrendingUp className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                            <span>{challenge}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Impact */}
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">Impact</h4>
                      <p className="text-blue-800 dark:text-blue-200 text-sm">{exp.impact}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {filteredExperience.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Briefcase className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No experience found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try selecting a different type to see more experience.
          </p>
        </div>
      )}

      {/* Call to Action */}
      <div className="mt-16 text-center">
        <div className="card p-8 bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Let's Work Together
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            I'm always open to discussing new opportunities, collaborations, or exciting projects. 
            Let's create something amazing together!
          </p>
          <Link
            to="/contact"
            className="btn-primary inline-flex items-center gap-2"
          >
            <Users className="h-5 w-5" />
            Get In Touch
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Experience
