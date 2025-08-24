import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../store';
import RegisterForm from '../../components/auth/RegisterForm';

export default function RegisterPage() {
  const { user } = useAppSelector(state => state.auth);

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <RegisterForm />;
}