import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Users, 
  Zap, 
  Shield, 
  ArrowRight, 
  CheckCircle,
  Globe,
  Smartphone,
  TrendingUp
} from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

export default function HomePage() {
  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Real-time Updates',
      description: 'See poll results update instantly as votes come in with Socket.IO integration.',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Secure Voting',
      description: 'JWT authentication and secure voting ensures data integrity and user privacy.',
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: 'Beautiful Analytics',
      description: 'Interactive charts and comprehensive insights help you understand your data.',
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Easy Sharing',
      description: 'Share your polls instantly with custom links and social media integration.',
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: 'Mobile Optimized',
      description: 'Responsive design works perfectly on all devices and screen sizes.',
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Advanced Features',
      description: 'Multiple choice options, poll scheduling, and detailed voter analytics.',
    },
  ];

  const stats = [
    { number: '10K+', label: 'Active Users' },
    { number: '50K+', label: 'Polls Created' },
    { number: '500K+', label: 'Votes Cast' },
    { number: '99.9%', label: 'Uptime' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-20 sm:py-32">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1920')] opacity-5 bg-cover bg-center" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-8"
            >
              <BarChart3 className="w-8 h-8 text-white" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6"
            >
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                PollIt++
              </span>
              <br />
              Real-time Polling
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
            >
              Create engaging polls, gather instant feedback, and make data-driven decisions with our 
              production-grade polling platform featuring real-time updates and beautiful analytics.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to="/auth/register">
                <Button variant="primary" size="lg" className="min-w-48">
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              
              <Link to="/auth/login">
                <Button variant="outline" size="lg" className="min-w-48">
                  Sign In
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful Features for Modern Polling
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Everything you need to create, share, and analyze polls with professional-grade features
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="h-full">
                  <div className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                See Real-time Results in Action
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Watch votes flow in real-time with our Socket.IO integration. Beautiful charts update 
                instantly as participants cast their votes.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  'Instant vote updates',
                  'Interactive charts and graphs',
                  'Mobile-responsive design',
                  'Secure authentication',
                  'Social sharing features',
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </div>
                ))}
              </div>

              <Link to="/auth/register">
                <Button variant="primary" size="lg">
                  Try It Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="relative">
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    What's your favorite programming language?
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    12,847 votes • Multiple choice
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    { name: 'JavaScript', votes: 4521, percentage: 35 },
                    { name: 'Python', votes: 3208, percentage: 25 },
                    { name: 'TypeScript', votes: 2569, percentage: 20 },
                    { name: 'Go', votes: 1549, percentage: 12 },
                    { name: 'Rust', votes: 1000, percentage: 8 },
                  ].map((option, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                      className="space-y-2"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-900 dark:text-white">
                          {option.name}
                        </span>
                        <div className="text-right">
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {option.percentage}%
                          </span>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {option.votes.toLocaleString()} votes
                          </p>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${option.percentage}%` }}
                          transition={{ duration: 1, delay: index * 0.1 + 1 }}
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-2 text-sm text-green-600 dark:text-green-400">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span>Live updates enabled</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Create Your First Poll?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of users who trust PollIt++ for their polling needs. 
            Get started in minutes with our intuitive interface.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/auth/register">
              <Button variant="secondary" size="lg" className="min-w-48">
                Start Creating Polls
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}