import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useTask } from '@/context/TaskContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import {
    // User,
    Mail,
    Upload,
    Edit,
    Save,
    X,
    Camera,
    FileText,
    DollarSign,
    Calendar,
    MapPin,
    Phone,
    Globe,
    Lock,
    Star,
    Crown,
    CheckCircle,
    Plus,
    // Trash2
} from 'lucide-react';

export function UploaderProfile() {
    const { user } = useAuth();
    const { tasks, getUserBalance } = useTask();
    const [isEditing, setIsEditing] = useState(false);
    const [showPasswordDialog, setShowPasswordDialog] = useState(false);
    const [newSpecialty, setNewSpecialty] = useState('');
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        bio: 'Experienced task creator focused on quality content and social media projects.',
        company: 'Digital Marketing Agency',
        location: 'New York, NY',
        phone: '+1 (555) 987-6543',
        website: 'https://myagency.com',
        joinedDate: '2024-01-15',
        specialties: ['Content Creation', 'Social Media', 'Marketing'],
    });
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    if (!user) return null;

    const myTasks = tasks.filter(task => task.uploaderId === user.id);
    const completedTasks = myTasks.filter(task => task.status === 'completed');
    const userBalance = getUserBalance(user.id);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleAddSpecialty = () => {
        if (newSpecialty.trim() && !formData.specialties.includes(newSpecialty.trim())) {
            setFormData(prev => ({
                ...prev,
                specialties: [...prev.specialties, newSpecialty.trim()]
            }));
            setNewSpecialty('');
            toast({
                title: "Specialty added!",
                description: `${newSpecialty.trim()} has been added to your specialties.`,
            });
        } else if (formData.specialties.includes(newSpecialty.trim())) {
            toast({
                title: "Specialty already exists",
                description: "This specialty is already in your list.",
                variant: "destructive",
            });
        }
    };

    const handleRemoveSpecialty = (specialtyToRemove: string) => {
        setFormData(prev => ({
            ...prev,
            specialties: prev.specialties.filter(specialty => specialty !== specialtyToRemove)
        }));
        toast({
            title: "Specialty removed!",
            description: `${specialtyToRemove} has been removed from your specialties.`,
        });
    };

    const handleSave = () => {
        toast({
            title: "Profile updated!",
            description: "Your profile information has been saved successfully.",
        });
        setIsEditing(false);
    };

    const handlePasswordChange = () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast({
                title: "Password mismatch",
                description: "New password and confirmation don't match.",
                variant: "destructive",
            });
            return;
        }

        toast({
            title: "Password updated!",
            description: "Your password has been changed successfully.",
        });
        setShowPasswordDialog(false);
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    };

    const getPlanIcon = () => {
        switch (user.subscriptionPlan) {
            case 'pro':
                return <Crown className="w-4 h-4" />;
            case 'starter':
                return <Star className="w-4 h-4" />;
            default:
                return <CheckCircle className="w-4 h-4" />;
        }
    };

    const getPlanColor = () => {
        switch (user.subscriptionPlan) {
            case 'pro':
                return 'bg-purple-100 text-purple-800';
            case 'starter':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const stats = [
        { label: 'Total Tasks', value: myTasks.length, icon: FileText },
        { label: 'Completed', value: completedTasks.length, icon: CheckCircle },
        { label: 'Success Rate', value: `${myTasks.length > 0 ? Math.round((completedTasks.length / myTasks.length) * 100) : 0}%`, icon: Star },
        { label: 'Wallet Balance', value: `$${userBalance}`, icon: DollarSign },
    ];

    return (
        <div className="p-6 max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold">My Profile</h1>
                    <p className="text-gray-600">Manage your task creator account settings</p>
                </div>
                <Button
                    onClick={() => setIsEditing(!isEditing)}
                    variant={isEditing ? "outline" : "default"}
                >
                    {isEditing ? (
                        <>
                            <X className="w-4 h-4 mr-2" />
                            Cancel
                        </>
                    ) : (
                        <>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Profile
                        </>
                    )}
                </Button>
            </div>

            {/* Profile Card */}
            <Card>
                <CardHeader>
                    <div className="flex items-start space-x-4">
                        <div className="relative">
                            <Avatar className="w-24 h-24">
                                <AvatarImage src={user.avatar} />
                                <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            {isEditing && (
                                <Button
                                    size="sm"
                                    className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                                >
                                    <Camera className="w-4 h-4" />
                                </Button>
                            )}
                        </div>
                        <div className="flex-1 space-y-2">
                            <div className="flex items-center space-x-2">
                                <Badge className="bg-blue-100 text-blue-800">
                                    <Upload className="w-3 h-3 mr-1" />
                                    Task Creator
                                </Badge>
                                <Badge className={getPlanColor()}>
                                    {getPlanIcon()}
                                    <span className="ml-1 capitalize">{user.subscriptionPlan}</span>
                                </Badge>
                                <Badge className="bg-green-100 text-green-800">Active</Badge>
                            </div>
                            {isEditing ? (
                                <div className="space-y-3">
                                    <div>
                                        <Label htmlFor="name">Full Name</Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="email">Email Address</Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-1">
                                    <h2 className="text-2xl font-bold">{formData.name}</h2>
                                    <p className="text-gray-600 flex items-center">
                                        <Mail className="w-4 h-4 mr-2" />
                                        {formData.email}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h3 className="font-semibold">Personal Information</h3>
                            <div className="space-y-3">
                                <div>
                                    <Label>Bio</Label>
                                    {isEditing ? (
                                        <Textarea
                                            name="bio"
                                            value={formData.bio}
                                            onChange={handleInputChange}
                                            className="mt-1"
                                        />
                                    ) : (
                                        <p className="text-sm text-gray-600 mt-1">{formData.bio}</p>
                                    )}
                                </div>
                                <div>
                                    <Label>Company</Label>
                                    {isEditing ? (
                                        <Input
                                            name="company"
                                            value={formData.company}
                                            onChange={handleInputChange}
                                            className="mt-1"
                                        />
                                    ) : (
                                        <p className="text-sm text-gray-600 mt-1">{formData.company}</p>
                                    )}
                                </div>
                                <div>
                                    <Label>Location</Label>
                                    {isEditing ? (
                                        <Input
                                            name="location"
                                            value={formData.location}
                                            onChange={handleInputChange}
                                            className="mt-1"
                                        />
                                    ) : (
                                        <p className="text-sm text-gray-600 mt-1 flex items-center">
                                            <MapPin className="w-4 h-4 mr-2" />
                                            {formData.location}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <Label>Phone</Label>
                                    {isEditing ? (
                                        <Input
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="mt-1"
                                        />
                                    ) : (
                                        <p className="text-sm text-gray-600 mt-1 flex items-center">
                                            <Phone className="w-4 h-4 mr-2" />
                                            {formData.phone}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <Label>Website</Label>
                                    {isEditing ? (
                                        <Input
                                            name="website"
                                            value={formData.website}
                                            onChange={handleInputChange}
                                            className="mt-1"
                                        />
                                    ) : (
                                        <p className="text-sm text-gray-600 mt-1 flex items-center">
                                            <Globe className="w-4 h-4 mr-2" />
                                            <a href={formData.website} className="text-blue-600 hover:underline">
                                                {formData.website}
                                            </a>
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-semibold">Account Details</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div>
                                        <p className="font-medium">Subscription Plan</p>
                                        <p className="text-sm text-gray-600 capitalize">{user.subscriptionPlan}</p>
                                    </div>
                                    <Badge className={getPlanColor()}>
                                        {getPlanIcon()}
                                        <span className="ml-1 capitalize">{user.subscriptionPlan}</span>
                                    </Badge>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div>
                                        <p className="font-medium">Member Since</p>
                                        <p className="text-sm text-gray-600 flex items-center">
                                            <Calendar className="w-3 h-3 mr-1" />
                                            {new Date(formData.joinedDate).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div>
                                        <p className="font-medium">Security</p>
                                        <p className="text-sm text-gray-600">Password protected</p>
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setShowPasswordDialog(true)}
                                    >
                                        <Lock className="w-3 h-3 mr-1" />
                                        Change Password
                                    </Button>
                                </div>
                            </div>

                            {/* Editable Specialties Section */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <h4 className="font-medium">Specialties</h4>
                                    {isEditing && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                                const input = document.getElementById('new-specialty-input') as HTMLInputElement;
                                                input?.focus();
                                            }}
                                        >
                                            <Plus className="w-3 h-3 mr-1" />
                                            Add Specialty
                                        </Button>
                                    )}
                                </div>

                                {isEditing && (
                                    <div className="flex gap-2">
                                        <Input
                                            id="new-specialty-input"
                                            placeholder="Enter a new specialty..."
                                            value={newSpecialty}
                                            onChange={(e) => setNewSpecialty(e.target.value)}
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    handleAddSpecialty();
                                                }
                                            }}
                                            className="flex-1"
                                        />
                                        <Button
                                            onClick={handleAddSpecialty}
                                            disabled={!newSpecialty.trim()}
                                            size="sm"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </Button>
                                    </div>
                                )}

                                <div className="flex flex-wrap gap-2">
                                    {formData.specialties.map((specialty, index) => (
                                        <div key={index} className="relative group">
                                            <Badge
                                                variant="outline"
                                                className={`${isEditing ? 'pr-8' : ''} transition-all duration-200`}
                                            >
                                                {specialty}
                                                {isEditing && (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="absolute -top-1 -right-1 h-5 w-5 p-0 bg-red-500 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                        onClick={() => handleRemoveSpecialty(specialty)}
                                                    >
                                                        <X className="w-3 h-3" />
                                                    </Button>
                                                )}
                                            </Badge>
                                        </div>
                                    ))}
                                    {formData.specialties.length === 0 && (
                                        <p className="text-sm text-gray-500 italic">
                                            {isEditing ? 'Add your first specialty above' : 'No specialties added yet'}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {isEditing && (
                        <div className="flex justify-end space-x-2 pt-4 border-t">
                            <Button variant="outline" onClick={() => setIsEditing(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleSave}>
                                <Save className="w-4 h-4 mr-2" />
                                Save Changes
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Performance Stats */}
            <Card>
                <CardHeader>
                    <CardTitle>Performance Overview</CardTitle>
                    <CardDescription>Your task creation statistics</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {stats.map((stat) => (
                            <div key={stat.label} className="text-center p-4 bg-gray-50 rounded-lg">
                                <stat.icon className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                                <p className="text-2xl font-bold">{stat.value}</p>
                                <p className="text-sm text-gray-600">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Password Change Dialog */}
            <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Change Password</DialogTitle>
                        <DialogDescription>
                            Update your account password for security
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="currentPassword">Current Password</Label>
                            <Input
                                id="currentPassword"
                                type="password"
                                value={passwordData.currentPassword}
                                onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                            />
                        </div>
                        <div>
                            <Label htmlFor="newPassword">New Password</Label>
                            <Input
                                id="newPassword"
                                type="password"
                                value={passwordData.newPassword}
                                onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                            />
                        </div>
                        <div>
                            <Label htmlFor="confirmPassword">Confirm New Password</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                value={passwordData.confirmPassword}
                                onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowPasswordDialog(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handlePasswordChange}>
                            Update Password
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}