import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContextType, User, SubscriptionPlan } from '@/types';
import { toast } from '@/hooks/use-toast';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Subscription plans configuration
const subscriptionPlans: Record<string, SubscriptionPlan> = {
  free: {
    name: 'free',
    userTasksLimit: 5,
    uploaderTasksLimit: 3,
    registrationFee: 0,
    monthlyFee: 0
  },
  starter: {
    name: 'starter',
    userTasksLimit: 50,
    uploaderTasksLimit: 25,
    registrationFee: 10,
    monthlyFee: 29
  },
  pro: {
    name: 'pro',
    userTasksLimit: -1, // unlimited
    uploaderTasksLimit: -1, // unlimited
    registrationFee: 25,
    monthlyFee: 99
  }
};

// Mock users for demo with subscription data
const mockUsers: User[] = [
  { 
    id: '1', 
    email: 'admin@taskflow.com', 
    name: 'Admin User', 
    role: 'admin', 
    walletBalance: 0,
    subscriptionPlan: 'pro',
    subscriptionStatus: 'active',
    isApproved: true,
    registrationFee: 0,
    monthlyTasksUsed: 0,
    monthlyTasksLimit: -1
  },
  { 
    id: '2', 
    email: 'uploader@taskflow.com', 
    name: 'Task Creator', 
    role: 'uploader', 
    walletBalance: 500,
    subscriptionPlan: 'starter',
    subscriptionStatus: 'active',
    isApproved: true,
    registrationFee: 10,
    monthlyTasksUsed: 5,
    monthlyTasksLimit: 25
  },
  { 
    id: '3', 
    email: 'user@taskflow.com', 
    name: 'Task Worker', 
    role: 'user', 
    walletBalance: 125,
    subscriptionPlan: 'free',
    subscriptionStatus: 'active',
    isApproved: true,
    registrationFee: 0,
    monthlyTasksUsed: 2,
    monthlyTasksLimit: 5
  },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved user session
    const savedUser = localStorage.getItem('taskflow_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Mock authentication
      const user = mockUsers.find(u => u.email === email);
      if (user && password === 'password') {
        setUser(user);
        localStorage.setItem('taskflow_user', JSON.stringify(user));
        toast({
          title: "Welcome back!",
          description: `Logged in as ${user.role}`,
        });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string, role: 'uploader' | 'user', plan: 'free' | 'starter' | 'pro') => {
    password = password
    setLoading(true);
    try {
      const selectedPlan = subscriptionPlans[plan];
      
      // Mock user creation with subscription plan
      const newUser: User = {
        id: Date.now().toString(),
        email,
        name,
        role,
        walletBalance: 0,
        subscriptionPlan: plan,
        subscriptionStatus: plan === 'free' ? 'active' : 'pending', // Free plan is immediately active
        isApproved: false, // All new users need admin approval
        registrationFee: selectedPlan.registrationFee,
        monthlyTasksUsed: 0,
        monthlyTasksLimit: role === 'user' ? selectedPlan.userTasksLimit : selectedPlan.uploaderTasksLimit
      };

      setUser(newUser);
      localStorage.setItem('taskflow_user', JSON.stringify(newUser));
      
      if (plan === 'free') {
        toast({
          title: "Account created!",
          description: `Welcome to TaskFlow! Your account is pending admin approval.`,
        });
      } else {
        toast({
          title: "Account created!",
          description: `Please pay the registration fee of $${selectedPlan.registrationFee} to activate your ${plan} plan.`,
        });
      }
    } catch (error) {
      toast({
        title: "Signup failed",
        description: "Something went wrong",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('taskflow_user');
    toast({
      title: "Logged out",
      description: "See you next time!",
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};