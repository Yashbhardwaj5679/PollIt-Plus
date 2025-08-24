import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import CreatePollForm from '../components/polls/CreatePollForm';
import Button from '../components/common/Button';

export default function CreatePollPage() {
  const navigate = useNavigate();

  const handleSuccess = (poll: any) => {
    navigate(`/polls/${poll.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>

        {/* Create Poll Form */}
        <CreatePollForm onSuccess={handleSuccess} />
      </div>
    </div>
  );
}