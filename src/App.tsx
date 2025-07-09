import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { TaskProvider } from '@/context/TaskContext';
import { Layout } from '@/components/layout/Layout';
import { Toaster } from '@/components/ui/toaster';

// Landing page
import { Landing } from '@/pages/Landing';

// Auth pages
import { Login } from '@/pages/auth/Login';
import { Signup } from '@/pages/auth/Signup';
import { ForgotPassword } from '@/pages/auth/ForgotPassword';
import { VerifyOTP } from '@/pages/auth/VerifyOTP';
import { ResetPassword } from '@/pages/auth/ResetPassword';

// Uploader pages
import { UploaderDashboard } from '@/pages/uploader/Dashboard';
import { AddTask } from '@/pages/uploader/AddTask';
import { MyTasks } from '@/pages/uploader/MyTasks';
import { AuditTasks } from '@/pages/uploader/AuditTasks';
import { UploaderWallet } from '@/pages/uploader/Wallet';
import { UploaderProfile } from '@/pages/uploader/Profile';

// Admin pages
import { AdminDashboard } from '@/pages/admin/Dashboard';
import { PendingTasks } from '@/pages/admin/PendingTasks';
import { PendingSubmissions } from '@/pages/admin/PendingSubmissions';
import { PendingUsers } from '@/pages/admin/PendingUsers';
import { AdminProfile } from '@/pages/admin/Profile';

// User pages
import { UserDashboard } from '@/pages/user/Dashboard';
import { AvailableTasks } from '@/pages/user/AvailableTasks';
import { UserWallet } from '@/pages/user/Wallet';
import { UserProfile } from '@/pages/user/Profile';
import { TaskSubmissions } from '@/pages/user/TaskSubmissions';

function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode; allowedRoles: string[] }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check if user is approved (except for admin)
  if (user.role !== 'admin' && !user.isApproved) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2">Account Pending Approval</h2>
            <p className="text-gray-600 mb-4">
              Your account is currently under review by our admin team. 
              {user.subscriptionPlan !== 'free' && user.registrationFee > 0 && 
                ` Please ensure you have paid the registration fee of $${user.registrationFee}.`
              }
            </p>
            <p className="text-sm text-gray-500">
              You'll receive an email notification once your account is approved.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={`/${user.role}`} replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Landing page */}
      <Route path="/" element={!user ? <Landing /> : <Navigate to={`/${user.role}`} replace />} />
      
      {/* Public routes */}
      <Route path="/login" element={!user ? <Login /> : <Navigate to={`/${user.role}`} replace />} />
      <Route path="/signup" element={!user ? <Signup /> : <Navigate to={`/${user.role}`} replace />} />
      <Route path="/forgot-password" element={!user ? <ForgotPassword /> : <Navigate to={`/${user.role}`} replace />} />
      <Route path="/verify-otp" element={!user ? <VerifyOTP /> : <Navigate to={`/${user.role}`} replace />} />
      <Route path="/reset-password" element={!user ? <ResetPassword /> : <Navigate to={`/${user.role}`} replace />} />

      {/* Protected routes */}
      <Route path="/" element={<Layout />}>
        {/* Uploader routes */}
        <Route 
          path="/uploader" 
          element={
            <ProtectedRoute allowedRoles={['uploader']}>
              <UploaderDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/uploader/add-task" 
          element={
            <ProtectedRoute allowedRoles={['uploader']}>
              <AddTask />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/uploader/my-tasks" 
          element={
            <ProtectedRoute allowedRoles={['uploader']}>
              <MyTasks />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/uploader/audit" 
          element={
            <ProtectedRoute allowedRoles={['uploader']}>
              <AuditTasks />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/uploader/completed" 
          element={
            <ProtectedRoute allowedRoles={['uploader']}>
              <MyTasks />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/uploader/wallet" 
          element={
            <ProtectedRoute allowedRoles={['uploader']}>
              <UploaderWallet />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/uploader/profile" 
          element={
            <ProtectedRoute allowedRoles={['uploader']}>
              <UploaderProfile />
            </ProtectedRoute>
          } 
        />

        {/* Admin routes */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/admin/pending" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <PendingTasks />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/submissions" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <PendingSubmissions />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/approved" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <PendingTasks />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/users" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <PendingUsers />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/profile" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminProfile />
            </ProtectedRoute>
          } 
        />

        {/* User routes */}
        <Route 
          path="/user" 
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <UserDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/user/tasks" 
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <AvailableTasks />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/user/submissions" 
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <TaskSubmissions />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/user/completed" 
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <UserDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/user/wallet" 
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <UserWallet />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/user/profile" 
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <UserProfile />
            </ProtectedRoute>
          } 
        />
      </Route>

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <Router>
          <AppRoutes />
          <Toaster />
        </Router>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;