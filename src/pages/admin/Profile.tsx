import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
// import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import {
    User,
    Mail,
    Shield,
    Edit,
    Save,
    X,
    Camera,
    Settings,
    Crown,
    Calendar,
    MapPin,
    Phone,
    Globe,
    Lock
} from 'lucide-react';

export function AdminProfile() {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [showPasswordDialog, setShowPasswordDialog] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        bio: 'Platform administrator with full system access and management capabilities.',
        location: 'San Francisco, CA',
        phone: '+1 (555) 123-4567',
        website: 'https://taskflow.com',
        joinedDate: '2024-01-01',
    });
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    if (!user) return null;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSave = () => {
        // In a real app, this would update the user profile
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

        // In a real app, this would update the password
        toast({
            title: "Password updated!",
            description: "Your password has been changed successfully.",
        });
        setShowPasswordDialog(false);
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    };

    const stats = [
        { label: 'Total Users', value: '1,234', icon: User },
        { label: 'Active Tasks', value: '89', icon: Settings },
        { label: 'Platform Uptime', value: '99.9%', icon: Shield },
        { label: 'Revenue', value: '$45,678', icon: Crown },
    ];

    return (
        <div className="p-6 max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold">Admin Profile</h1>
                    <p className="text-gray-600">Manage your administrator account settings</p>
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
                                <Badge className="bg-purple-100 text-purple-800">
                                    <Shield className="w-3 h-3 mr-1" />
                                    Administrator
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
                                        <p className="font-medium">Account Type</p>
                                        <p className="text-sm text-gray-600">Administrator</p>
                                    </div>
                                    <Badge className="bg-purple-100 text-purple-800">
                                        <Crown className="w-3 h-3 mr-1" />
                                        Admin
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
                                        <p className="text-sm text-gray-600">Two-factor enabled</p>
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

            {/* Admin Stats */}
            <Card>
                <CardHeader>
                    <CardTitle>Platform Overview</CardTitle>
                    <CardDescription>Key metrics and statistics</CardDescription>
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