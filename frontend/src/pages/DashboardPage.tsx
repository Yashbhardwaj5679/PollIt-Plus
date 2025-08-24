import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, BarChart, Users, TrendingUp } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store';
import { fetchUserPolls, deletePoll } from '../store/slices/pollSlice';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Card from '../components/common/Card';
import PollCard from '../components/polls/PollCard';
import Modal from '../components/common/Modal';
import { generateShareUrl, copyToClipboard, formatNumber } from '../utils/helpers';
import toast from 'react-hot-toast';

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { polls, isLoading } = useAppSelector(state => state.polls);
  const { user } = useAppSelector(state => state.auth);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filterActive, setFilterActive] = React.useState<'all' | 'active' | 'inactive'>('all');
  const [shareModalOpen, setShareModalOpen] = React.useState(false);
  const [selectedPoll, setSelectedPoll] = React.useState<any>(null);
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);

  React.useEffect(() => {
    if (user) {
      dispatch(fetchUserPolls());
    }
  }, [dispatch, user]);

  const filteredPolls = polls.filter(poll => {
    const matchesSearch = poll.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         poll.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterActive === 'all' || 
                         (filterActive === 'active' && poll.isActive) ||
                         (filterActive === 'inactive' && !poll.isActive);
    
    return matchesSearch && matchesFilter;
  });

  const totalVotes = polls.reduce((sum, poll) => sum + poll.totalVotes, 0);
  const activePolls = polls.filter(poll => poll.isActive).length;

  const handleViewPoll = (poll: any) => {
    navigate(`/polls/${poll.id}`);
  };

  const handleSharePoll = (poll: any) => {
    setSelectedPoll(poll);
    setShareModalOpen(true);
  };

  const handleDeletePoll = (poll: any) => {
    setSelectedPoll(poll);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedPoll) {
      try {
        await dispatch(deletePoll(selectedPoll.id)).unwrap();
        toast.success('Poll deleted successfully');
        setDeleteModalOpen(false);
        setSelectedPoll(null);
      } catch (error) {
        toast.error('Failed to delete poll');
      }
    }
  };

  const copyShareUrl = () => {
    if (selectedPoll) {
      const url = generateShareUrl(selectedPoll.id);
      copyToClipboard(url);
      toast.success('Share link copied to clipboard');
    }
  };

  if (!user) {
    navigate('/auth/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Welcome back, {user.name}!
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Manage your polls and view analytics
              </p>
            </div>

            <div className="mt-4 lg:mt-0">
              <Link to="/polls/create">
                <Button variant="primary" size="lg">
                  <Plus className="w-5 h-5 mr-2" />
                  Create New Poll
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <BarChart className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Total Polls
                  </h3>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {polls.length}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <div className="flex items-center">
                <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                  <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Total Votes
                  </h3>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {formatNumber(totalVotes)}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Active Polls
                  </h3>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {activePolls}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Filters and Search */}
        <Card className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search polls..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full lg:w-80"
              />
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Filter:</span>
              </div>
              
              <div className="flex space-x-2">
                {[
                  { key: 'all', label: 'All' },
                  { key: 'active', label: 'Active' },
                  { key: 'inactive', label: 'Inactive' },
                ].map((filter) => (
                  <Button
                    key={filter.key}
                    variant={filterActive === filter.key ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => setFilterActive(filter.key as any)}
                  >
                    {filter.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Polls Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 animate-pulse"
              >
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
              </div>
            ))}
          </div>
        ) : filteredPolls.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredPolls.map((poll, index) => (
              <motion.div
                key={poll.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <PollCard
                  poll={poll}
                  onView={handleViewPoll}
                  onShare={handleSharePoll}
                  onDelete={handleDeletePoll}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <Card className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {searchTerm || filterActive !== 'all' ? 'No polls found' : 'No polls yet'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {searchTerm || filterActive !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'Create your first poll to get started'
              }
            </p>
            {!searchTerm && filterActive === 'all' && (
              <Link to="/polls/create">
                <Button variant="primary">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Poll
                </Button>
              </Link>
            )}
          </Card>
        )}

        {/* Share Modal */}
        <Modal
          isOpen={shareModalOpen}
          onClose={() => setShareModalOpen(false)}
          title="Share Poll"
        >
          {selectedPoll && (
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                  {selectedPoll.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Share this poll with others to collect more votes
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Share Link
                </label>
                <div className="flex">
                  <input
                    type="text"
                    value={generateShareUrl(selectedPoll.id)}
                    readOnly
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <Button
                    onClick={copyShareUrl}
                    variant="primary"
                    className="rounded-l-none"
                  >
                    Copy
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Modal>

        {/* Delete Modal */}
        <Modal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          title="Delete Poll"
        >
          {selectedPoll && (
            <div className="space-y-4">
              <div>
                <p className="text-gray-900 dark:text-white">
                  Are you sure you want to delete "{selectedPoll.title}"?
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  This action cannot be undone. All votes and data will be permanently removed.
                </p>
              </div>

              <div className="flex justify-end space-x-3">
                <Button
                  variant="ghost"
                  onClick={() => setDeleteModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="danger"
                  onClick={confirmDelete}
                >
                  Delete Poll
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
}