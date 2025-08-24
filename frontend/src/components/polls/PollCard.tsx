import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Share2, MoreVertical, Trash2, Eye } from 'lucide-react';
import { Poll } from '../../types';
import { formatDate, formatNumber } from '../../utils/helpers';
import Card from '../common/Card';
import Button from '../common/Button';

interface PollCardProps {
  poll: Poll;
  onView?: (poll: Poll) => void;
  onShare?: (poll: Poll) => void;
  onDelete?: (poll: Poll) => void;
  showActions?: boolean;
}

export default function PollCard({
  poll,
  onView,
  onShare,
  onDelete,
  showActions = true,
}: PollCardProps) {
  const [showMenu, setShowMenu] = React.useState(false);

  const topOption = poll.options.reduce((prev, current) =>
    prev.votes > current.votes ? prev : current
  );

  const votePercentage = poll.totalVotes > 0 
    ? Math.round((topOption.votes / poll.totalVotes) * 100)
    : 0;

  return (
    <Card hover className="relative">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
            {poll.title}
          </h3>
          {poll.description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
              {poll.description}
            </p>
          )}
        </div>
        
        {showActions && (
          <div className="relative ml-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowMenu(!showMenu)}
              className="p-1"
            >
              <MoreVertical className="w-4 h-4" />
            </Button>
            
            {showMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-10"
              >
                <button
                  onClick={() => {
                    onView?.(poll);
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>View</span>
                </button>
                <button
                  onClick={() => {
                    onShare?.(poll);
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
                <button
                  onClick={() => {
                    onDelete?.(poll);
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              </motion.div>
            )}
          </div>
        )}
      </div>

      {/* Poll Preview */}
      <div className="space-y-3 mb-4">
        {poll.options.slice(0, 3).map((option) => {
          const percentage = poll.totalVotes > 0 
            ? Math.round((option.votes / poll.totalVotes) * 100)
            : 0;
            
          return (
            <div key={option.id} className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-700 dark:text-gray-300 truncate">
                  {option.text}
                </span>
                <span className="text-gray-500 dark:text-gray-400 font-medium">
                  {percentage}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                />
              </div>
            </div>
          );
        })}
        
        {poll.options.length > 3 && (
          <p className="text-xs text-gray-500 dark:text-gray-400">
            +{poll.options.length - 3} more options
          </p>
        )}
      </div>

      {/* Poll Stats */}
      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>{formatNumber(poll.totalVotes)} votes</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(poll.createdAt)}</span>
          </div>
        </div>
        
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
          poll.isActive
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
        }`}>
          {poll.isActive ? 'Active' : 'Closed'}
        </div>
      </div>
    </Card>
  );
}