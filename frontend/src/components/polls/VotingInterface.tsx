import React from 'react';
import { motion } from 'framer-motion';
import { Check, Users, Calendar } from 'lucide-react';
import { Poll } from '../../types';
import { useAppDispatch, useAppSelector } from '../../store';
import { votePoll } from '../../store/slices/pollSlice';
import Button from '../common/Button';
import Card from '../common/Card';
import { formatDate, formatNumber } from '../../utils/helpers';
import toast from 'react-hot-toast';

interface VotingInterfaceProps {
  poll: Poll;
  onVoteSuccess?: () => void;
}

export default function VotingInterface({ poll, onVoteSuccess }: VotingInterfaceProps) {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const hasVoted = Boolean(poll.userVote && poll.userVote.length > 0);

  const handleOptionSelect = (optionId: string) => {
    if (hasVoted) return;

    if (poll.allowMultiple) {
      setSelectedOptions(prev => 
        prev.includes(optionId)
          ? prev.filter(id => id !== optionId)
          : [...prev, optionId]
      );
    } else {
      setSelectedOptions([optionId]);
    }
  };

  const handleSubmitVote = async () => {
    if (!user) {
      toast.error('Please log in to vote');
      return;
    }

    if (selectedOptions.length === 0) {
      toast.error('Please select at least one option');
      return;
    }

    setIsSubmitting(true);
    
    try {
      await dispatch(votePoll({
        pollId: poll.id,
        optionIds: selectedOptions,
      })).unwrap();
      
      toast.success('Vote submitted successfully!');
      setSelectedOptions([]);
      onVoteSuccess?.();
    } catch (error) {
      toast.error('Failed to submit vote');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {poll.title}
        </h1>
        {poll.description && (
          <p className="text-gray-600 dark:text-gray-400">
            {poll.description}
          </p>
        )}
        
        <div className="flex items-center space-x-4 mt-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>{formatNumber(poll.totalVotes)} votes</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>Created {formatDate(poll.createdAt)}</span>
          </div>
          {poll.allowMultiple && (
            <div className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs font-medium">
              Multiple choice
            </div>
          )}
        </div>
      </div>

      {!poll.isActive && (
        <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg">
          <p className="text-yellow-800 dark:text-yellow-200 font-medium">
            This poll is no longer accepting votes.
          </p>
        </div>
      )}

      {hasVoted && (
        <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg">
          <p className="text-green-800 dark:text-green-200 font-medium">
            Thank you for voting! Your vote has been recorded.
          </p>
        </div>
      )}

      <div className="space-y-3">
        {poll.options.map((option, index) => {
          const isSelected = selectedOptions.includes(option.id);
          const isUserVote = poll.userVote?.includes(option.id);
          const percentage = poll.totalVotes > 0 
            ? Math.round((option.votes / poll.totalVotes) * 100)
            : 0;

          return (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative overflow-hidden cursor-pointer transition-all duration-200 rounded-lg border-2 ${
                hasVoted
                  ? isUserVote
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                    : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800'
                  : isSelected
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-300 dark:hover:border-blue-600'
              }`}
              onClick={() => poll.isActive && handleOptionSelect(option.id)}
            >
              {/* Progress Bar Background */}
              {hasVoted && (
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 transition-all duration-1000"
                  style={{ 
                    width: `${percentage}%`,
                    opacity: 0.3
                  }}
                />
              )}

              <div className="relative p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    hasVoted
                      ? isUserVote
                        ? 'border-green-500 bg-green-500'
                        : 'border-gray-300 dark:border-gray-600'
                      : isSelected
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300 dark:border-gray-600'
                  }`}>
                    {((hasVoted && isUserVote) || (!hasVoted && isSelected)) && (
                      <Check className="w-3 h-3 text-white" />
                    )}
                  </div>
                  
                  <span className={`font-medium ${
                    hasVoted
                      ? isUserVote
                        ? 'text-green-900 dark:text-green-100'
                        : 'text-gray-700 dark:text-gray-300'
                      : 'text-gray-900 dark:text-white'
                  }`}>
                    {option.text}
                  </span>
                </div>

                {hasVoted && (
                  <div className="text-right">
                    <div className="text-lg font-semibold text-gray-900 dark:text-white">
                      {percentage}%
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {formatNumber(option.votes)} votes
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {!hasVoted && poll.isActive && user && (
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {selectedOptions.length > 0 
                ? poll.allowMultiple
                  ? `${selectedOptions.length} option${selectedOptions.length > 1 ? 's' : ''} selected`
                  : '1 option selected'
                : 'Select an option to vote'
              }
            </p>
            <Button
              onClick={handleSubmitVote}
              variant="primary"
              isLoading={isSubmitting}
              disabled={selectedOptions.length === 0}
            >
              Submit Vote
            </Button>
          </div>
        </div>
      )}

      {!user && (
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            You need to sign in to vote on this poll
          </p>
          <div className="space-x-2">
            <Button
              onClick={() => window.location.href = '/auth/login'}
              variant="primary"
            >
              Sign In
            </Button>
            <Button
              onClick={() => window.location.href = '/auth/register'}
              variant="outline"
            >
              Create Account
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}