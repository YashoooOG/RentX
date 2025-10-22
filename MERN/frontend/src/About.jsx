import { useTheme } from './App.jsx';
import { BiRocket, BiShield, BiGroup, BiTrendingUp } from 'react-icons/bi';

const About = () => {
  const { isDarkTheme } = useTheme();

  const stats = [
    { number: '10K+', label: 'Active Users' },
    { number: '5K+', label: 'Products Listed' },
    { number: '50+', label: 'Cities' },
    { number: '95%', label: 'Satisfaction Rate' }
  ];

  const values = [
    {
      icon: <BiRocket className="text-4xl" />,
      title: 'Innovation',
      description: 'We constantly evolve our platform to provide the best rental experience for our users.'
    },
    {
      icon: <BiShield className="text-4xl" />,
      title: 'Trust & Safety',
      description: 'Your security is our priority. We verify all listings and ensure safe transactions.'
    },
    {
      icon: <BiGroup className="text-4xl" />,
      title: 'Community First',
      description: 'Building a strong community of renters and owners who help each other.'
    },
    {
      icon: <BiTrendingUp className="text-4xl" />,
      title: 'Sustainability',
      description: 'Promoting a sharing economy that reduces waste and maximizes resource utilization.'
    }
  ];

  return (
    <div 
      className="min-h-screen font-[Poppins]"
      style={isDarkTheme ? { backgroundColor: '#181a1b', color: '#e8e6e3' } : { backgroundColor: '#f0f2f5', color: '#333' }}
    >
      {/* Hero Section */}
      <div 
        className="py-16 md:py-24"
        style={isDarkTheme ? { backgroundColor: '#1e2022' } : { backgroundColor: 'white' }}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">About RentX</h1>
          <p className="text-lg md:text-xl opacity-80 max-w-3xl mx-auto leading-relaxed">
            Your trusted platform for renting anything, anywhere. We connect people who have items to share 
            with those who need them, creating a sustainable and cost-effective sharing economy.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center p-6 rounded-lg shadow-lg"
                style={isDarkTheme ? { backgroundColor: '#1e2022' } : { backgroundColor: 'white' }}
              >
                <h3 className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</h3>
                <p className="text-sm md:text-base opacity-70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div 
            className="rounded-lg shadow-lg p-6 md:p-12"
            style={isDarkTheme ? { backgroundColor: '#1e2022' } : { backgroundColor: 'white' }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Our Story</h2>
            <div className="space-y-6 text-base md:text-lg opacity-90 leading-relaxed">
              <p>
                RentX was born from a simple idea: why buy when you can rent? In today's world, we're 
                surrounded by items we rarely use - cameras gathering dust, tools sitting idle in garages, 
                and equipment taking up space. Meanwhile, others are looking to use these exact items for 
                short-term needs.
              </p>
              <p>
                Founded in 2024, we set out to bridge this gap. Our platform empowers individuals to 
                monetize their underutilized assets while providing affordable access to products for those 
                who need them temporarily. It's a win-win situation that promotes sustainability and builds 
                community connections.
              </p>
              <p>
                Today, RentX has grown into a thriving marketplace with thousands of users across multiple 
                cities. From electronics and vehicles to tools and sports equipment, we facilitate rentals 
                that save money, reduce waste, and bring people together.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className="p-6 md:p-8 rounded-lg shadow-lg"
                style={isDarkTheme ? { backgroundColor: '#1e2022' } : { backgroundColor: 'white' }}
              >
                <div 
                  className="mb-4"
                  style={isDarkTheme ? { color: '#e8e6e3' } : { color: '#000' }}
                >
                  {value.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3">{value.title}</h3>
                <p className="opacity-80 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div 
        className="py-16 md:py-24"
        style={isDarkTheme ? { backgroundColor: '#1e2022' } : { backgroundColor: 'white' }}
      >
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg md:text-xl opacity-90 leading-relaxed mb-8">
            To revolutionize the way people access products by creating a trusted, sustainable, and 
            user-friendly rental marketplace that benefits both owners and renters while reducing 
            environmental impact.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => window.location.href = '/'}
              className="px-8 py-3 font-bold border-2 transition-colors"
              style={isDarkTheme ? { 
                backgroundColor: '#f5f5f5', 
                color: '#333', 
                borderColor: '#f5f5f5' 
              } : { 
                backgroundColor: 'black', 
                color: 'white', 
                borderColor: 'black' 
              }}
            >
              Browse Products
            </button>
            <button
              onClick={() => window.location.href = '/login'}
              className="px-8 py-3 font-bold border-2 transition-colors"
              style={isDarkTheme ? { 
                backgroundColor: '#1e2022', 
                color: '#e8e6e3', 
                borderColor: '#999' 
              } : { 
                backgroundColor: 'white', 
                color: 'black', 
                borderColor: '#999' 
              }}
            >
              Join RentX
            </button>
          </div>
        </div>
      </div>

      {/* Team Section (Optional - can add later) */}
      <div className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Why Choose RentX?</h2>
          <div 
            className="rounded-lg shadow-lg p-6 md:p-8"
            style={isDarkTheme ? { backgroundColor: '#1e2022' } : { backgroundColor: 'white' }}
          >
            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              <div className="text-center">
                <div className="text-4xl mb-3">💰</div>
                <h3 className="text-xl font-bold mb-2">Save Money</h3>
                <p className="opacity-80">Rent items at a fraction of the buying cost</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">🌍</div>
                <h3 className="text-xl font-bold mb-2">Eco-Friendly</h3>
                <p className="opacity-80">Reduce waste by sharing resources</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">🤝</div>
                <h3 className="text-xl font-bold mb-2">Build Community</h3>
                <p className="opacity-80">Connect with neighbors and locals</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
