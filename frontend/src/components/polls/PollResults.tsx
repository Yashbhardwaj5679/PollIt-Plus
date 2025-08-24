import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { Poll } from '../../types';
import { formatNumber } from '../../utils/helpers';
import Card from '../common/Card';

interface PollResultsProps {
  poll: Poll;
}

const COLORS = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#6B7280'];

export default function PollResults({ poll }: PollResultsProps) {
  const chartData = poll.options.map((option, index) => ({
    name: option.text.length > 20 ? option.text.substring(0, 20) + '...' : option.text,
    votes: option.votes,
    percentage: poll.totalVotes > 0 ? Math.round((option.votes / poll.totalVotes) * 100) : 0,
    color: COLORS[index % COLORS.length],
  }));

  const maxVotes = Math.max(...poll.options.map(opt => opt.votes));

  return (
    <Card>
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Poll Results
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Total votes: {formatNumber(poll.totalVotes)}
        </p>
      </div>

      {/* Bar Chart */}
      <div className="mb-8">
        <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Vote Distribution
        </h4>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }}
                className="text-gray-600 dark:text-gray-400"
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                className="text-gray-600 dark:text-gray-400"
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
                formatter={(value: number) => [value, 'Votes']}
              />
              <Bar dataKey="votes" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Results */}
      <div>
        <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Detailed Results
        </h4>
        <div className="space-y-4">
          {poll.options.map((option, index) => {
            const percentage = poll.totalVotes > 0 
              ? Math.round((option.votes / poll.totalVotes) * 100)
              : 0;
            const isWinning = option.votes === maxVotes && maxVotes > 0;

            return (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg border ${
                  isWinning 
                    ? 'border-yellow-300 bg-yellow-50 dark:border-yellow-600 dark:bg-yellow-900/20'
                    : 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <h5 className={`font-medium ${
                      isWinning 
                        ? 'text-yellow-900 dark:text-yellow-100' 
                        : 'text-gray-900 dark:text-white'
                    }`}>
                      {option.text}
                      {isWinning && (
                        <span className="ml-2 text-xs font-bold text-yellow-600 dark:text-yellow-400">
                          LEADING
                        </span>
                      )}
                    </h5>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-semibold ${
                      isWinning 
                        ? 'text-yellow-900 dark:text-yellow-100' 
                        : 'text-gray-900 dark:text-white'
                    }`}>
                      {percentage}%
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {formatNumber(option.votes)} votes
                    </p>
                  </div>
                </div>

                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {poll.totalVotes === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">
            No votes yet. Be the first to vote!
          </p>
        </div>
      )}
    </Card>
  );
}