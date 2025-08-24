import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../store';
import LoginForm from '../../components/auth/LoginForm';

export default function LoginPage() {
  const { user } = useAppSelector(state => state.auth);

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <LoginForm />;
}