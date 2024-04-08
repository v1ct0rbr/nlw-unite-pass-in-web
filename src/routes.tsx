import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './pages/_layouts/app'

import { ErrorPage } from './pages/ErrorPage'
import { ParticipantsList } from './pages/app/participants-list/participants-list'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <ParticipantsList /> },
      { path: '/participants-list', element: <ParticipantsList /> },
    ],
  },
 /*  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: '/sign-in', element: <SignIn /> },
      { path: '/sign-up', element: <SignUp /> },
    ],
  }, */
])
