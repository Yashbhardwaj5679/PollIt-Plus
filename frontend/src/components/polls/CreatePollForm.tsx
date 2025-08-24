import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Plus, X, Save } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store';
import { createPoll } from '../../store/slices/pollSlice';
import { CreatePollData } from '../../types';
import Button from '../common/Button';
import Input from '../common/Input';
import Card from '../common/Card';
import toast from 'react-hot-toast';

interface CreatePollFormData {
  title: string;
  description: string;
  options: { text: string }[];
  allowMultiple: boolean;
}

interface CreatePollFormProps {
  onSuccess?: (poll: any) => void;
}

export default function CreatePollForm({ onSuccess }: CreatePollFormProps) {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(state => state.polls);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreatePollFormData>({
    defaultValues: {
      title: '',
      description: '',
      options: [{ text: '' }, { text: '' }],
      allowMultiple: false,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'options',
  });

  const onSubmit = async (data: CreatePollFormData) => {
    try {
      const pollData: CreatePollData = {
        title: data.title,
        description: data.description || undefined,
        options: data.options.map(opt => opt.text).filter(text => text.trim()),
        allowMultiple: data.allowMultiple,
      };

      if (pollData.options.length < 2) {
        toast.error('Please provide at least 2 options');
        return;
      }

      const result = await dispatch(createPoll(pollData)).unwrap();
      toast.success('Poll created successfully!');
      reset();
      onSuccess?.(result);
    } catch (error) {
      toast.error('Failed to create poll');
    }
  };

  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Create New Poll
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Create engaging polls to gather opinions and insights
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          {...register('title', {
            required: 'Poll title is required',
            minLength: {
              value: 5,
              message: 'Title must be at least 5 characters',
            },
          })}
          label="Poll Title"
          placeholder="What would you like to ask?"
          error={errors.title?.message}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description (Optional)
          </label>
          <textarea
            {...register('description')}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="Provide additional context for your poll..."
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Poll Options
            </label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append({ text: '' })}
              disabled={fields.length >= 6}
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Option
            </Button>
          </div>

          <div className="space-y-3">
            {fields.map((field, index) => (
              <motion.div
                key={field.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center space-x-3"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {index + 1}
                  </span>
                </div>
                
                <Input
                  {...register(`options.${index}.text`, {
                    required: 'Option text is required',
                  })}
                  placeholder={`Option ${index + 1}`}
                  error={errors.options?.[index]?.text?.message}
                />
                
                {fields.length > 2 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => remove(index)}
                    className="p-2 text-red-600 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </motion.div>
            ))}
          </div>

          {fields.length >= 6 && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Maximum 6 options allowed
            </p>
          )}
        </div>

        <div className="flex items-center space-x-3">
          <input
            {...register('allowMultiple')}
            id="allowMultiple"
            type="checkbox"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="allowMultiple" className="text-sm text-gray-700 dark:text-gray-300">
            Allow multiple selections
          </label>
        </div>

        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
          <Button
            type="button"
            variant="ghost"
            onClick={() => reset()}
          >
            Reset Form
          </Button>
          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
            className="min-w-32"
          >
            <Save className="w-4 h-4 mr-2" />
            Create Poll
          </Button>
        </div>
      </form>
    </Card>
  );
}