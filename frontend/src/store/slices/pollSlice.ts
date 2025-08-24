import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Poll, PollState, CreatePollData, VoteData } from '../../types';
import api from '../../utils/api';
import { API_ENDPOINTS } from '../../utils/constants';

const initialState: PollState = {
  polls: [],
  currentPoll: null,
  isLoading: false,
  error: null,
};

export const fetchUserPolls = createAsyncThunk(
  'polls/fetchUserPolls',
  async () => {
    const response = await api.get(API_ENDPOINTS.POLLS.USER);
    return response.data;
  }
);

export const fetchPoll = createAsyncThunk(
  'polls/fetchPoll',
  async (pollId: string) => {
    const response = await api.get(`${API_ENDPOINTS.POLLS.BASE}/${pollId}`);
    return response.data;
  }
);

export const createPoll = createAsyncThunk(
  'polls/createPoll',
  async (pollData: CreatePollData) => {
    const response = await api.post(API_ENDPOINTS.POLLS.BASE, pollData);
    return response.data;
  }
);

export const votePoll = createAsyncThunk(
  'polls/votePoll',
  async ({ pollId, optionIds }: VoteData) => {
    const response = await api.post(API_ENDPOINTS.POLLS.VOTE(pollId), {
      optionIds,
    });
    return response.data;
  }
);

export const deletePoll = createAsyncThunk(
  'polls/deletePoll',
  async (pollId: string) => {
    await api.delete(API_ENDPOINTS.POLLS.DELETE(pollId));
    return pollId;
  }
);

const pollSlice = createSlice({
  name: 'polls',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updatePollRealtime: (state, action: PayloadAction<Poll>) => {
      const updatedPoll = action.payload;
      const index = state.polls.findIndex(poll => poll.id === updatedPoll.id);
      
      if (index !== -1) {
        state.polls[index] = updatedPoll;
      }
      
      if (state.currentPoll?.id === updatedPoll.id) {
        state.currentPoll = updatedPoll;
      }
    },
    addPollRealtime: (state, action: PayloadAction<Poll>) => {
      state.polls.unshift(action.payload);
    },
    removePollRealtime: (state, action: PayloadAction<string>) => {
      state.polls = state.polls.filter(poll => poll.id !== action.payload);
      if (state.currentPoll?.id === action.payload) {
        state.currentPoll = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserPolls.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserPolls.fulfilled, (state, action) => {
        state.isLoading = false;
        state.polls = action.payload;
        state.error = null;
      })
      .addCase(fetchUserPolls.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch polls';
      })
      .addCase(fetchPoll.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPoll.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentPoll = action.payload;
        state.error = null;
      })
      .addCase(fetchPoll.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch poll';
      })
      .addCase(createPoll.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createPoll.fulfilled, (state, action) => {
        state.isLoading = false;
        state.polls.unshift(action.payload);
        state.error = null;
      })
      .addCase(createPoll.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to create poll';
      })
      .addCase(votePoll.fulfilled, (state, action) => {
        const updatedPoll = action.payload;
        const index = state.polls.findIndex(poll => poll.id === updatedPoll.id);
        
        if (index !== -1) {
          state.polls[index] = updatedPoll;
        }
        
        if (state.currentPoll?.id === updatedPoll.id) {
          state.currentPoll = updatedPoll;
        }
      })
      .addCase(deletePoll.fulfilled, (state, action) => {
        state.polls = state.polls.filter(poll => poll.id !== action.payload);
        if (state.currentPoll?.id === action.payload) {
          state.currentPoll = null;
        }
      });
  },
});

export const { clearError, updatePollRealtime, addPollRealtime, removePollRealtime } = pollSlice.actions;
export default pollSlice.reducer;