import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import {
    Users,
    CheckCircle,
    XCircle,
    Clock,
    DollarSign,
    Mail,
    User,
    Crown,
    Star,
    Shield
} from 'lucide-react';

// Mock pending users data
const pendingUsers = [
    {
        id: '4',
        name: 'John Smith',
        email: 'john.smith@email.com',
        role: 'user',
        subscriptionPlan: 'starter',
        registrationFee: 10,
        createdAt: '2024-01-20T10:00:00Z',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
        id: '5',
        name: 'Sarah Johnson',
        email: 'sarah.j@email.com',
        role: 'uploader',
        subscriptionPlan: 'pro',
        registrationFee: 25,
        createdAt: '2024-01-21T14:30:00Z',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
        id: '6',
        name: 'Mike Chen',
        email: 'mike.chen@email.com',
        role: 'user',
        subscriptionPlan: 'free',
        registrationFee: 0,
        createdAt: '2024-01-22T09:15:00Z',
        avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
        id: '7',
        name: 'Emily Rodriguez',
        email: 'emily.r@email.com',
        role: 'uploader',
        subscriptionPlan: 'starter',
        registrationFee: 10,
        createdAt: '2024-01-23T16:45:00Z',
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100'
    }
];

export function PendingUsers() {
    const [users, setUsers] = useState(pendingUsers);
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [showApprovalDialog, setShowApprovalDialog] = useState(false);

    const handleUserAction = (userId: string, action: 'approve' | 'reject') => {
        const user = users.find(u => u.id === userId);
        if (!user) return;

        if (action === 'approve') {
            toast({
                title: "User approved!",
                description: `${user.name} has been approved and can now access the platform.`,
            });
        } else {
            toast({
                title: "User rejected",
                description: `${user.name}'s registration has been rejected.`,
                variant: "destructive",
            });
        }

        // Remove user from pending list
        setUsers(prev => prev.filter(u => u.id !== userId));
        setShowApprovalDialog(false);
        setSelectedUser(null);
    };

    const openApprovalDialog = (user: any) => {
        setSelectedUser(user);
        setShowApprovalDialog(true);
    };

    const getPlanIcon = (plan: string) => {
        switch (plan) {
            case 'free':
                return <CheckCircle className="w-4 h-4 text-gray-600" />;
            case 'starter':
                return <Star className="w-4 h-4 text-blue-600" />;
            case 'pro':
                return <Crown className="w-4 h-4 text-purple-600" />;
            default:
                return <CheckCircle className="w-4 h-4 text-gray-600" />;
        }
    };

    const getPlanColor = (plan: string) => {
        switch (plan) {
            case 'free':
                return 'bg-gray-100 text-gray-800';
            case 'starter':
                return 'bg-blue-100 text-blue-800';
            case 'pro':
                return 'bg-purple-100 text-purple-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getRoleColor = (role: string) => {
        return role === 'uploader' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800';
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="space-y-2">
                <h1 className="text-3xl font-bold">Pending User Approvals</h1>
                <p className="text-gray-600">Review and approve new user registrations</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Pending Approvals</p>
                                <p className="text-2xl font-bold">{users.length}</p>
                            </div>
                            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                                <Clock className="w-6 h-6 text-yellow-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Fees</p>
                                <p className="text-2xl font-bold">
                                    ${users.reduce((sum, user) => sum + user.registrationFee, 0)}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <DollarSign className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Task Workers</p>
                                <p className="text-2xl font-bold">
                                    {users.filter(u => u.role === 'user').length}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <User className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Task Creators</p>
                                <p className="text-2xl font-bold">
                                    {users.filter(u => u.role === 'uploader').length}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                <Users className="w-6 h-6 text-purple-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Pending Users List */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold">Users Awaiting Approval</h2>

                {users.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {users.map((user) => (
                            <Card key={user.id} className="hover:shadow-md transition-shadow">
                                <CardHeader className="pb-3">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center space-x-3">
                                            <Avatar className="size-12 shrink-0 object-cover">
                                                <img className='w-full shrink-0' src={user.avatar} />
                                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <CardTitle className="text-lg">{user.name}</CardTitle>
                                                <CardDescription className="flex items-center">
                                                    <Mail className="w-3 h-3 mr-1" />
                                                    {user.email}
                                                </CardDescription>
                                            </div>
                                        </div>
                                        <Badge className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800">
                                            <Clock className="w-3 h-3 mr-1" />
                                            Pending
                                        </Badge>
                                    </div>
                                </CardHeader>

                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-gray-600 mb-1">Account Type</p>
                                            <Badge className={getRoleColor(user.role)}>
                                                {user.role === 'uploader' ? 'Task Creator' : 'Task Worker'}
                                            </Badge>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600 mb-1">Subscription Plan</p>
                                            <Badge className={getPlanColor(user.subscriptionPlan)}>
                                                {getPlanIcon(user.subscriptionPlan)}
                                                <span className="ml-1 capitalize">{user.subscriptionPlan}</span>
                                            </Badge>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div>
                                            <p className="text-sm font-medium">Registration Fee</p>
                                            <p className="text-xs text-gray-600">
                                                {user.registrationFee > 0 ? 'Payment required' : 'Free plan'}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-bold text-green-600">
                                                ${user.registrationFee}
                                            </p>
                                            {user.registrationFee > 0 && (
                                                <Badge className="bg-green-100 text-green-800 text-xs">
                                                    <Shield className="w-3 h-3 mr-1" />
                                                    Paid
                                                </Badge>
                                            )}
                                        </div>
                                    </div>

                                    <div className="text-xs text-gray-500">
                                        Registered: {new Date(user.createdAt).toLocaleDateString()}
                                    </div>

                                    <div className="flex gap-2 pt-2">
                                        <Button
                                            size="sm"
                                            onClick={() => openApprovalDialog(user)}
                                            className="flex-1"
                                        >
                                            <CheckCircle className="w-4 h-4 mr-1" />
                                            Review Application
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Card>
                        <CardContent className="text-center py-12">
                            <CheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">All caught up!</h3>
                            <p className="text-gray-600">
                                There are no pending user approvals at the moment.
                            </p>
                        </CardContent>
                    </Card>
                )}
            </div>

            {/* Approval Dialog */}
            <Dialog open={showApprovalDialog} onOpenChange={setShowApprovalDialog}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Review User Application</DialogTitle>
                        <DialogDescription>
                            Carefully review the user's information before making a decision
                        </DialogDescription>
                    </DialogHeader>

                    {selectedUser && (
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                                <Avatar className="w-12 h-12">
                                    <AvatarImage src={selectedUser.avatar} />
                                    <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="font-medium">{selectedUser.name}</h3>
                                    <p className="text-sm text-gray-600">{selectedUser.email}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="font-medium">Role:</span>
                                    <p className="capitalize">{selectedUser.role}</p>
                                </div>
                                <div>
                                    <span className="font-medium">Plan:</span>
                                    <p className="capitalize">{selectedUser.subscriptionPlan}</p>
                                </div>
                                <div>
                                    <span className="font-medium">Registration Fee:</span>
                                    <p>${selectedUser.registrationFee}</p>
                                </div>
                                <div>
                                    <span className="font-medium">Registered:</span>
                                    <p>{new Date(selectedUser.createdAt).toLocaleDateString()}</p>
                                </div>
                            </div>

                            <div className="p-3 bg-blue-50 rounded-lg">
                                <p className="text-sm text-blue-800">
                                    <Shield className="w-4 h-4 inline mr-1" />
                                    {selectedUser.registrationFee > 0
                                        ? 'Registration fee has been paid and verified.'
                                        : 'This is a free plan registration.'
                                    }
                                </p>
                            </div>
                        </div>
                    )}

                    <DialogFooter className="gap-2">
                        <Button
                            variant="outline"
                            onClick={() => setShowApprovalDialog(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() => handleUserAction(selectedUser?.id, 'reject')}
                        >
                            <XCircle className="w-4 h-4 mr-1" />
                            Reject
                        </Button>
                        <Button
                            onClick={() => handleUserAction(selectedUser?.id, 'approve')}
                        >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}