import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    FileText,
    CheckCircle,
    Star,
    Users,
    Shield,
    Zap,
    ArrowRight,
    Target,
    DollarSign,
    Clock,
    Award,
    Infinity,
    Crown,
    Sparkles
} from 'lucide-react';

const features = [
    {
        icon: Target,
        title: 'Task Marketplace',
        description: 'Connect task creators with skilled workers in a secure environment'
    },
    {
        icon: Shield,
        title: 'Escrow Protection',
        description: 'Your funds are safely held until tasks are completed to satisfaction'
    },
    {
        icon: DollarSign,
        title: 'Instant Payments',
        description: 'Get paid immediately upon task approval with our automated system'
    },
    {
        icon: Clock,
        title: 'Real-time Tracking',
        description: 'Monitor task progress and submissions with live status updates'
    },
    {
        icon: Users,
        title: 'Quality Community',
        description: 'Join thousands of verified users and trusted task creators'
    },
    {
        icon: Award,
        title: 'Performance Analytics',
        description: 'Track your success rate and earnings with detailed insights'
    }
];

const plans = [
    {
        name: 'Free',
        price: 0,
        period: 'forever',
        description: 'Perfect for getting started',
        badge: null,
        features: [
            '5 tasks per month (Users)',
            '3 task uploads per month (Uploaders)',
            'Basic support',
            'Standard processing time',
            'Community access'
        ],
        limits: {
            userTasks: 5,
            uploaderTasks: 3
        },
        buttonText: 'Get Started Free',
        buttonVariant: 'outline' as const,
        popular: false
    },
    {
        name: 'Starter',
        price: 29,
        period: 'month',
        description: 'Great for regular users',
        badge: 'Most Popular',
        features: [
            '50 tasks per month (Users)',
            '25 task uploads per month (Uploaders)',
            'Priority support',
            'Faster processing',
            'Advanced analytics',
            'Custom categories'
        ],
        limits: {
            userTasks: 50,
            uploaderTasks: 25
        },
        buttonText: 'Start Free Trial',
        buttonVariant: 'default' as const,
        popular: true
    },
    {
        name: 'Pro',
        price: 99,
        period: 'month',
        description: 'For power users and businesses',
        badge: 'Best Value',
        features: [
            'Unlimited tasks (Users)',
            'Unlimited uploads (Uploaders)',
            '24/7 premium support',
            'Instant processing',
            'Advanced analytics & insights',
            'Custom branding',
            'API access',
            'Dedicated account manager'
        ],
        limits: {
            userTasks: -1, // -1 means unlimited
            uploaderTasks: -1
        },
        buttonText: 'Go Pro',
        buttonVariant: 'default' as const,
        popular: false
    }
];

const testimonials = [
    {
        name: 'Sarah Johnson',
        role: 'Freelance Designer',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
        content: 'TaskFlow has revolutionized how I find and complete design tasks. The payment system is incredibly reliable!'
    },
    {
        name: 'Michael Chen',
        role: 'Marketing Manager',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
        content: 'As a task creator, I love how easy it is to find quality workers. The escrow system gives me peace of mind.'
    },
    {
        name: 'Emily Rodriguez',
        role: 'Content Creator',
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100',
        content: 'The Pro plan has been a game-changer for my business. Unlimited tasks and premium support are worth every penny.'
    }
];

const stats = [
    { label: 'Active Users', value: '50K+' },
    { label: 'Tasks Completed', value: '1M+' },
    { label: 'Total Earnings', value: '$5M+' },
    { label: 'Success Rate', value: '98%' }
];

export function Landing() {
    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                                <FileText className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-xl font-bold">TaskFlow</span>
                        </div>

                        <div className="hidden md:flex items-center space-x-8">
                            <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
                            <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
                            <a href="#testimonials" className="text-gray-600 hover:text-gray-900 transition-colors">Reviews</a>
                            <Link to="/login">
                                <Button variant="outline">Sign In</Button>
                            </Link>
                            <Link to="/signup">
                                <Button>Get Started</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center space-y-8">
                        <div className="space-y-4">
                            <Badge className="bg-blue-100 text-blue-800 px-4 py-2">
                                <Sparkles className="w-4 h-4 mr-2" />
                                Trusted by 50,000+ users worldwide
                            </Badge>
                            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                                The Future of
                                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Task Management</span>
                            </h1>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                                Connect with skilled professionals, complete meaningful tasks, and earn money in a secure,
                                transparent marketplace designed for the modern workforce.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/signup">
                                <Button size="lg" className="px-8 py-4 text-lg">
                                    Start Earning Today
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>
                            </Link>
                            <Button size="lg" variant="outline" className="px-8 py-4 text-lg">
                                Watch Demo
                            </Button>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16">
                            {stats.map((stat) => (
                                <div key={stat.label} className="text-center">
                                    <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                                    <div className="text-gray-600">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center space-y-4 mb-16">
                        <h2 className="text-4xl font-bold text-gray-900">Why Choose TaskFlow?</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Experience the most advanced task marketplace with features designed for your success
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature) => (
                            <Card key={feature.title} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <CardHeader className="text-center pb-4">
                                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <feature.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600 text-center">{feature.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center space-y-4 mb-16">
                        <h2 className="text-4xl font-bold text-gray-900">Choose Your Plan</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Start free and scale as you grow. All plans include our core features and security.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {plans.map((plan) => (
                            <Card key={plan.name} className={`relative ${plan.popular ? 'border-2 border-blue-500 shadow-xl scale-105' : 'border shadow-lg'} hover:shadow-xl transition-all duration-300`}>
                                {plan.badge && (
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                        <Badge className="bg-blue-500 text-white px-4 py-1">
                                            {plan.badge}
                                        </Badge>
                                    </div>
                                )}

                                <CardHeader className="text-center pb-8 pt-8">
                                    <div className="space-y-2">
                                        <CardTitle className="text-2xl flex items-center justify-center">
                                            {plan.name === 'Pro' && <Crown className="w-6 h-6 text-yellow-500 mr-2" />}
                                            {plan.name}
                                        </CardTitle>
                                        <div className="flex items-baseline justify-center">
                                            <span className="text-4xl font-bold">${plan.price}</span>
                                            <span className="text-gray-600 ml-1">/{plan.period}</span>
                                        </div>
                                        <CardDescription className="text-base">{plan.description}</CardDescription>
                                    </div>
                                </CardHeader>

                                <CardContent className="space-y-6">
                                    <ul className="space-y-3">
                                        {plan.features.map((feature) => (
                                            <li key={feature} className="flex items-start">
                                                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                                <span className="text-gray-700">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Link to="/signup" className="block">
                                        <Button
                                            variant={plan.buttonVariant}
                                            className="w-full py-3 text-lg"
                                            size="lg"
                                        >
                                            {plan.buttonText}
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <p className="text-gray-600">
                            All plans include a 14-day free trial. No credit card required.
                            <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-medium ml-1">
                                Start your free trial →
                            </Link>
                        </p>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center space-y-4 mb-16">
                        <h2 className="text-4xl font-bold text-gray-900">Loved by Thousands</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            See what our community has to say about their TaskFlow experience
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial) => (
                            <Card key={testimonial.name} className="border-0 shadow-lg">
                                <CardContent className="p-8">
                                    <div className="flex items-center mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                        ))}
                                    </div>
                                    <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                                    <div className="flex items-center">
                                        <img
                                            src={testimonial.avatar}
                                            alt={testimonial.name}
                                            className="w-12 h-12 rounded-full mr-4"
                                        />
                                        <div>
                                            <div className="font-semibold text-gray-900">{testimonial.name}</div>
                                            <div className="text-gray-600 text-sm">{testimonial.role}</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <div className="space-y-8">
                        <h2 className="text-4xl font-bold text-white">
                            Ready to Transform Your Workflow?
                        </h2>
                        <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                            Join thousands of professionals who are already earning and creating with TaskFlow.
                            Start your journey today with our free plan.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/signup">
                                <Button size="lg" variant="secondary" className="px-8 py-4 text-lg">
                                    Start Free Trial
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>
                            </Link>
                            <Button size="lg" variant="outline" className="px-8 py-4 text-lg border-white text-white hover:bg-white hover:text-blue-600">
                                Contact Sales
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                                    <FileText className="w-4 h-4 text-white" />
                                </div>
                                <span className="text-xl font-bold">TaskFlow</span>
                            </div>
                            <p className="text-gray-400">
                                The modern task marketplace connecting creators with skilled professionals worldwide.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-4">Product</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-4">Company</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-4">Support</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                        <p>&copy; 2024 TaskFlow. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}