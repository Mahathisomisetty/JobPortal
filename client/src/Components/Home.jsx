import './Home.css';
import heroBg from '../assets/hero-bg.png';

/* ⭐ Your available images */
import reactDeveloper from '../assets/reactdeveloper.png';
import backendNode from '../assets/backendnode.png';
import productDesigner from '../assets/productdesigner.png';

import { 
  Calculator, 
  GraduationCap, 
  Car, 
  Briefcase, 
  Heart, 
  Monitor, 
  Wrench, 
  Scale,
  MapPin,
  Tag,
  Clock,
  FileText,
  Users,
  CheckCircle
} from 'lucide-react';

/* Categories */
const categories = [
  { icon: Calculator, name: 'Accountancy', count: 301 },
  { icon: GraduationCap, name: 'Education', count: 210 },
  { icon: Car, name: 'Automotive Jobs', count: 281 },
  { icon: Briefcase, name: 'Business', count: 122 },
  { icon: Heart, name: 'Health Care', count: 335 },
  { icon: Monitor, name: 'IT & Agency', count: 401 },
  { icon: Wrench, name: 'Engineering', count: 100 },
  { icon: Scale, name: 'Legal', count: 201 },
];

/* Jobs */
const jobs = [
  {
    id: 1,
    title: 'Post-Room Operate',
    company: 'Tourt Design LTD',
    location: 'Wellesley Rd, London',
    category: 'Accountancy',
    type: 'Full Time',
    time: '1 Hr Ago',
    color: 'hsl(262 70% 50%)',
  },
  {
    id: 2,
    title: 'Data Entry',
    company: 'Techno Inc.',
    location: 'Street 40/A, London',
    category: 'Data Entry',
    type: 'Freelance',
    time: '1 Hr Ago',
    color: 'hsl(262 60% 45%)',
  },
  {
    id: 3,
    title: 'Graphic Designer',
    company: 'Devon Design',
    location: 'West Sight, USA',
    category: 'Graphics',
    type: 'Freelance',
    time: '4 Hr Ago',
    color: 'hsl(280 70% 50%)',
  },
  {
    id: 4,
    title: 'Web Developer',
    company: 'MegaNews',
    location: 'San Francisco, California',
    category: 'Development',
    type: 'Freelance',
    time: '5 Hr Ago',
    color: 'hsl(262 80% 55%)',
  },
  {
    id: 5,
    title: 'Digital Marketer',
    company: 'AB Marketer LTD',
    location: 'Wellesley Rd, London',
    category: 'Marketing',
    type: 'Freelance',
    time: '6 Hr Ago',
    color: 'hsl(270 65% 50%)',
  },
  {
    id: 6,
    title: 'UI/UX Designer',
    company: 'Design Hunter',
    location: 'Zoo Rd, London',
    category: 'Accountancy',
    type: 'Freelance',
    time: '8 Hr Ago',
    color: 'hsl(255 70% 55%)',
  },
];

/* Steps */
const steps = [
  {
    icon: FileText,
    title: 'Create Account',
    desc: 'Register and set up your professional profile',
  },
  {
    icon: Users,
    title: 'Upload Resume',
    desc: 'Add your experience and skills to stand out',
  },
  {
    icon: CheckCircle,
    title: 'Get Job',
    desc: 'Apply and land your dream position',
  },
];

/* ⭐ Updated Latest Featured Jobs using YOUR images */
const latestJobs = [
  {
    title: "Senior React Developer",
    img: reactDeveloper,
    company: "Google Inc",
    location: "Bangalore, India"
  },
  {
    title: "Backend Node Engineer",
    img: backendNode,
    company: "Amazon",
    location: "Hyderabad, India"
  },
  {
    title: "Product Designer",
    img: productDesigner,
    company: "Meta",
    location: "Remote"
  }
];

/* Partners */
const partners = [
  "https://img.icons8.com/color/96/google-logo.png",
  "https://img.icons8.com/color/96/amazon.png",
  "https://img.icons8.com/color/96/microsoft.png",
  "https://img.icons8.com/color/96/meta.png",
  "https://img.icons8.com/color/96/ibm.png"
];

const Home = () => {
  return (
    <div className="home-container">

      {/* HERO SECTION */}
      <section 
        className="home-hero"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="home-hero-overlay"></div>

        <div className="home-hero-content">
          <p className="home-hero-subtitle">Find Jobs, Employment & Career Opportunities</p>

          <h1 className="home-hero-title">
            Drop Resume & Get<br />Your Desire Job!
          </h1>

          <p className="home-hero-keywords">
            <span>Trending Keywords:</span> Automotive, Education, Health and Care Engineering
          </p>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="home-categories">
        <div className="home-section-header">
          <h2 className="home-section-title">Choose Your Category</h2>

          <p className="home-section-desc">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        <div className="home-categories-grid">
          {categories.map((cat, index) => (
            <div key={index} className="home-category-card">
              <div className="home-category-icon">
                <cat.icon size={32} strokeWidth={1.5} />
              </div>

              <h3 className="home-category-name">{cat.name}</h3>
              <p className="home-category-count">{cat.count} open position</p>
            </div>
          ))}
        </div>
      </section>

      {/* JOBS SECTION */}
      <section className="home-jobs">
        <div className="home-section-header">
          <h2 className="home-section-title">Jobs You May Be Interested In</h2>

          <p className="home-section-desc">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        <div className="home-jobs-grid">
          {jobs.map((job) => (
            <div key={job.id} className="home-job-card">
              
              <div className="home-job-logo" style={{ background: job.color }}>
                {job.company.charAt(0)}
              </div>

              <div className="home-job-content">
                <h3 className="home-job-title">{job.title}</h3>
                <p className="home-job-company">Via {job.company}</p>

                <div className="home-job-meta">
                  <span className="home-job-meta-item">
                    <MapPin size={14} /> {job.location}
                  </span>
                  <span className="home-job-meta-item">
                    <Tag size={14} /> {job.category}
                  </span>
                </div>
              </div>

              <div className="home-job-actions">
                <span className="home-job-badge">{job.type}</span>

                <button className="home-job-favorite">
                  <Heart size={16} />
                </button>

                <span className="home-job-time">
                  <Clock size={12} /> {job.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PARTNERS SECTION */}
      <section className="home-partners">
        <h2 className="home-section-title">Top Hiring Partners</h2>

        <div className="home-partner-logos">
          {partners.map((logo, i) => (
            <img key={i} src={logo} alt="partner" className="home-partner-logo" />
          ))}
        </div>
      </section>

      {/* ⭐ LATEST JOBS (LOCAL IMAGES) */}
      <section className="home-latest-jobs">
        <h2 className="home-section-title">Latest Featured Jobs</h2>

        <div className="home-latest-grid">
          {latestJobs.map((job, i) => (
            <div key={i} className="home-latest-card">
              <img src={job.img} alt={job.title} className="home-latest-img" />

              <h3>{job.title}</h3>
              <p>{job.company}</p>
              <span>{job.location}</span>
            </div>
          ))}
        </div>
      </section>

      {/* STEPS SECTION */}
      <section className="home-steps">
        <h2 className="home-steps-title">Easiest Way To Use</h2>

        <div className="home-steps-grid">
          {steps.map((step, index) => (
            <div key={index} className="home-step-card">
              <div className="home-step-icon">
                <step.icon size={36} strokeWidth={1.5} />
              </div>

              <h3 className="home-step-title">{step.title}</h3>
              <p className="home-step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Home;
