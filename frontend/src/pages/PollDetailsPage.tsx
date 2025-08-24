import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2, BarChart, Users } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store';
import { fetchPoll } from '../store/slices/pollSlice';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import VotingInterface from '../components/polls/VotingInterface';
import PollResults from '../components/polls/PollResults';
import { generateShareUrl, copyToClipboard } from '../utils/helpers';
import toast from 'react-hot-toast';

export default function PollDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentPoll, isLoading } = useAppSelector(state => state.polls);
  const { user } = useAppSelector(state => state.auth);
  const [activeTab, setActiveTab] = React.useState<'vote' | 'results'>('vote');

  React.useEffect(() => {
    if (id) {
      dispatch(fetchPoll(id));
    }
  }, [id, dispatch]);

  const handleShare = () => {
    if (currentPoll) {
      const url = generateShareUrl(currentPoll.id);
      copyToClipboard(url);
      toast.success('Share link copied to clipboard');
    }
  };

  const handleVoteSuccess = () => {
    setActiveTab('results');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
            <Card>
              <div className="space-y-4">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                <div className="space-y-3">
                  {[...Array(4)].map((_, index) => (
                    <div key={index} className="h-12 bg-gray-200 dark:bg-gray-700 rounded" />
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (!currentPoll) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="text-center py-12">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Poll not found
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              The poll you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => navigate('/')} variant="primary">
              Go Home
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  const hasVoted = Boolean(currentPoll.userVote && currentPoll.userVote.length > 0);
  const isOwner = user?.id === currentPoll.createdBy;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="mb-4"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('vote')}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === 'vote'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <Users className="w-4 h-4 mr-2 inline" />
                Vote
              </button>
              <button
                onClick={() => setActiveTab('results')}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === 'results'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <BarChart className="w-4 h-4 mr-2 inline" />
                Results
              </button>
            </nav>
          </div>
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'vote' ? (
            <VotingInterface 
              poll={currentPoll} 
              onVoteSuccess={handleVoteSuccess}
            />
          ) : (
            <PollResults poll={currentPoll} />
          )}
        </motion.div>

        {/* Auto-switch to results after voting */}
        {hasVoted && activeTab === 'vote' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-center"
          >
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Thanks for voting! Check out the results.
            </p>
            <Button
              onClick={() => setActiveTab('results')}
              variant="outline"
            >
              <BarChart className="w-4 h-4 mr-2" />
              View Results
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}