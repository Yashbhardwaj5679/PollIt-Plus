import { Middleware } from '@reduxjs/toolkit';
import { socketService } from '../../utils/socket';
import { setSocketConnected, addNotification } from '../slices/uiSlice';
import { updatePollRealtime, addPollRealtime, removePollRealtime } from '../slices/pollSlice';
import { SOCKET_EVENTS } from '../../utils/constants';

export const socketMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);
  const { auth } = store.getState();

  // Connect socket when user logs in
  if (action.type === 'auth/login/fulfilled' && auth.token) {
    const socket = socketService.connect();
    
    socket.on('connect', () => {
      store.dispatch(setSocketConnected(true));
      store.dispatch(addNotification({
        type: 'success',
        title: 'Connected',
        message: 'Real-time updates enabled',
      }));
    });

    socket.on('disconnect', () => {
      store.dispatch(setSocketConnected(false));
    });

    socket.on(SOCKET_EVENTS.POLL_UPDATE, (poll) => {
      store.dispatch(updatePollRealtime(poll));
    });

    socket.on(SOCKET_EVENTS.POLL_CREATED, (poll) => {
      store.dispatch(addPollRealtime(poll));
      store.dispatch(addNotification({
        type: 'info',
        title: 'New Poll',
        message: `"${poll.title}" was created`,
      }));
    });

    socket.on(SOCKET_EVENTS.POLL_DELETED, ({ pollId }) => {
      store.dispatch(removePollRealtime(pollId));
    });

    socket.on(SOCKET_EVENTS.VOTE_CAST, ({ poll, user }) => {
      store.dispatch(updatePollRealtime(poll));
      if (user !== auth.user?.id) {
        store.dispatch(addNotification({
          type: 'info',
          title: 'Vote Cast',
          message: 'Someone voted on your poll',
        }));
      }
    });
  }

  // Disconnect socket when user logs out
  if (action.type === 'auth/logout/fulfilled') {
    socketService.disconnect();
    store.dispatch(setSocketConnected(false));
  }

  return result;
};