import { createBrowserRouter } from 'react-router';

import MainLayout from '@/layouts/MainLayout';

import HomPage from '@/pages/HomePage';
import EventDetailsPage from '@/pages/EventDetailsPage';
import SignInPage from '@/pages/SignInPage';
import SignUpPage from '@/pages/SignUpPage';
import UserPage from '@/pages/UserPage';
import EventEditorPage from '@/pages/EventEditorPage';
import NotFoundPage from '@/pages/NotFoundPage';

import ProtectedRoute from '@/components/router/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomPage />,
      },
      {
        path: 'events/:id',
        element: <EventDetailsPage />,
      },
      {
        path: 'sign-in',
        element: <SignInPage />,
      },
      {
        path: 'sign-up',
        element: <SignUpPage />,
      },
      {
        path: 'user',
        element: (
          <ProtectedRoute>
            <UserPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'user',
        element: (
          <ProtectedRoute>
            <EventEditorPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
