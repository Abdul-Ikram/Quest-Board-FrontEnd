import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { FileText, Mail, Lock, User, ArrowRight, Upload, CheckCircle, Crown, Star } from 'lucide-react';

const subscriptionPlans = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    registrationFee: 0,
    description: 'Perfect for getting started',
    features: ['5 tasks/month (Users)', '3 uploads/month (Uploaders)', 'Basic support'],
    icon: CheckCircle,
    color: 'border-gray-200',
    badge: null
  },
  {
    id: 'starter',
    name: 'Starter',
    price: 29,
    registrationFee: 10,
    description: 'Great for regular users',
    features: ['50 tasks/month (Users)', '25 uploads/month (Uploaders)', 'Priority support'],
    icon: Star,
    color: 'border-blue-500',
    badge: 'Most Popular'
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 99,
    registrationFee: 25,
    description: 'For power users and businesses',
    features: ['Unlimited tasks', 'Unlimited uploads', '24/7 premium support'],
    icon: Crown,
    color: 'border-purple-500',
    badge: 'Best Value'
  }
];

export function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user' as 'user' | 'uploader',
    plan: 'free' as 'free' | 'starter' | 'pro',
  });
  const [error, setError] = useState('');
  const { signup, loading } = useAuth();
  const navigate = useNavigate();

  const selectedPlan = subscriptionPlans.find(p => p.id === formData.plan);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      await signup(formData.email, formData.password, formData.name, formData.role, formData.plan);
      navigate('/');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRoleChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      role: value as 'user' | 'uploader',
    }));
  };

  const handlePlanChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      plan: value as 'free' | 'starter' | 'pro',
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold">TaskFlow</h1>
          </div>
          <p className="text-gray-600">Create your account and choose your plan</p>
        </div>

        {/* Signup Form */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>
              Join TaskFlow and start your journey today
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Account Type */}
              <div className="space-y-3">
                <Label>Account Type</Label>
                <RadioGroup
                  value={formData.role}
                  onValueChange={handleRoleChange}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <RadioGroupItem value="user" id="user" />
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <Label htmlFor="user" className="font-medium cursor-pointer">
                          Task Worker
                        </Label>
                        <p className="text-sm text-gray-600">Complete tasks and earn rewards</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <RadioGroupItem value="uploader" id="uploader" />
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Upload className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <Label htmlFor="uploader" className="font-medium cursor-pointer">
                          Task Creator
                        </Label>
                        <p className="text-sm text-gray-600">Create and manage tasks for others</p>
                      </div>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              {/* Subscription Plans */}
              <div className="space-y-4">
                <Label>Choose Your Plan</Label>
                <RadioGroup
                  value={formData.plan}
                  onValueChange={handlePlanChange}
                  className="space-y-4"
                >
                  {subscriptionPlans.map((plan) => (
                    <div key={plan.id} className={`relative border-2 rounded-lg p-4 hover:bg-gray-50 transition-colors ${plan.color} ${formData.plan === plan.id ? 'bg-blue-50' : ''}`}>
                      {plan.badge && (
                        <div className="absolute -top-2 left-4">
                          <Badge className="bg-blue-500 text-white">
                            {plan.badge}
                          </Badge>
                        </div>
                      )}
                      
                      <div className="flex items-start space-x-3">
                        <RadioGroupItem value={plan.id} id={plan.id} className="mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <plan.icon className="w-5 h-5 text-blue-600" />
                              <Label htmlFor={plan.id} className="font-semibold cursor-pointer">
                                {plan.name}
                              </Label>
                              <div className="flex items-baseline space-x-1">
                                <span className="text-2xl font-bold">${plan.price}</span>
                                <span className="text-gray-600">/month</span>
                              </div>
                            </div>
                          </div>
                          
                          <p className="text-sm text-gray-600 mb-3">{plan.description}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <div>
                              <p className="text-sm font-medium text-gray-700 mb-1">Features:</p>
                              <ul className="text-xs text-gray-600 space-y-1">
                                {plan.features.map((feature, index) => (
                                  <li key={index} className="flex items-center">
                                    <CheckCircle className="w-3 h-3 text-green-500 mr-1" />
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            {plan.registrationFee > 0 && (
                              <div>
                                <p className="text-sm font-medium text-gray-700 mb-1">Registration Fee:</p>
                                <p className="text-lg font-bold text-red-600">${plan.registrationFee}</p>
                                <p className="text-xs text-gray-500">One-time payment required</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Plan Summary */}
              {selectedPlan && (
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-900 mb-2">Plan Summary</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Selected Plan:</span>
                      <span className="font-medium">{selectedPlan.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Monthly Fee:</span>
                      <span className="font-medium">${selectedPlan.price}/month</span>
                    </div>
                    {selectedPlan.registrationFee > 0 && (
                      <div className="flex justify-between">
                        <span>Registration Fee:</span>
                        <span className="font-medium text-red-600">${selectedPlan.registrationFee}</span>
                      </div>
                    )}
                    <div className="pt-2 border-t border-blue-200">
                      <p className="text-xs text-blue-700">
                        {selectedPlan.registrationFee > 0 
                          ? 'Your account will be pending admin approval after payment.'
                          : 'Your account will be pending admin approval after registration.'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Creating Account...' : 'Create Account'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardFooter>
          </form>
        </Card>

        {/* Sign In Link */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}