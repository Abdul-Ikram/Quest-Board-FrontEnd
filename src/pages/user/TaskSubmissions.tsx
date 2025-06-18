import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useTask } from '@/context/TaskContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
    Search,
    Filter,
    FileText,
    Clock,
    CheckCircle,
    XCircle,
    Eye,
    Calendar,
    DollarSign,
    User,
    ExternalLink,
    Target
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export function TaskSubmissions() {
    const { user } = useAuth();
    const { tasks, submissions } = useTask();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSubmission, setSelectedSubmission] = useState<any>(null);
    const [showDetailsDialog, setShowDetailsDialog] = useState(false);

    if (!user) return null;

    const mySubmissions = submissions.filter(sub => sub.userId === user.id);

    const filterSubmissions = (status?: string) => {
        let filtered = mySubmissions;

        if (status) {
            filtered = filtered.filter(sub => sub.status === status);
        }

        if (searchQuery) {
            filtered = filtered.filter(sub => {
                const task = tasks.find(t => t.id === sub.taskId);
                return task && (
                    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    task.category.toLowerCase().includes(searchQuery.toLowerCase())
                );
            });
        }

        return filtered.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'approved':
                return 'bg-green-100 text-green-800';
            case 'rejected':
                return 'bg-red-100 text-red-800';
            case 'submitted':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'approved':
                return <CheckCircle className="w-4 h-4" />;
            case 'rejected':
                return <XCircle className="w-4 h-4" />;
            case 'submitted':
                return <Clock className="w-4 h-4" />;
            default:
                return <FileText className="w-4 h-4" />;
        }
    };

    const handleViewDetails = (submission: any) => {
        setSelectedSubmission(submission);
        setShowDetailsDialog(true);
    };

    const statusCounts = {
        all: mySubmissions.length,
        submitted: mySubmissions.filter(s => s.status === 'submitted').length,
        approved: mySubmissions.filter(s => s.status === 'approved').length,
        rejected: mySubmissions.filter(s => s.status === 'rejected').length,
    };

    const totalEarnings = mySubmissions
        .filter(s => s.status === 'approved')
        .reduce((sum, s) => sum + s.rewardAmount, 0);

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="space-y-2">
                <h1 className="text-3xl font-bold">My Task Submissions</h1>
                <p className="text-gray-600">Track your submitted tasks and their status</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Submissions</p>
                                <p className="text-2xl font-bold">{mySubmissions.length}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <FileText className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Pending Review</p>
                                <p className="text-2xl font-bold">{statusCounts.submitted}</p>
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
                                <p className="text-sm font-medium text-gray-600">Approved</p>
                                <p className="text-2xl font-bold">{statusCounts.approved}</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <CheckCircle className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Earned</p>
                                <p className="text-2xl font-bold">${totalEarnings}</p>
                            </div>
                            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                                <DollarSign className="w-6 h-6 text-emerald-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Search and Filters */}
            <div className="flex items-center space-x-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                        placeholder="Search submissions..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                </Button>
            </div>

            {/* Submissions Tabs */}
            <Tabs defaultValue="all" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="all" className="relative">
                        All
                        {statusCounts.all > 0 && (
                            <Badge className="ml-2 h-5 min-w-[20px] text-xs">
                                {statusCounts.all}
                            </Badge>
                        )}
                    </TabsTrigger>
                    <TabsTrigger value="submitted" className="relative">
                        Pending
                        {statusCounts.submitted > 0 && (
                            <Badge className="ml-2 h-5 min-w-[20px] text-xs bg-yellow-500">
                                {statusCounts.submitted}
                            </Badge>
                        )}
                    </TabsTrigger>
                    <TabsTrigger value="approved" className="relative">
                        Approved
                        {statusCounts.approved > 0 && (
                            <Badge className="ml-2 h-5 min-w-[20px] text-xs bg-green-500">
                                {statusCounts.approved}
                            </Badge>
                        )}
                    </TabsTrigger>
                    <TabsTrigger value="rejected" className="relative">
                        Rejected
                        {statusCounts.rejected > 0 && (
                            <Badge className="ml-2 h-5 min-w-[20px] text-xs bg-red-500">
                                {statusCounts.rejected}
                            </Badge>
                        )}
                    </TabsTrigger>
                </TabsList>

                {['all', 'submitted', 'approved', 'rejected'].map((status) => (
                    <TabsContent key={status} value={status} className="space-y-4">
                        <div className="space-y-4">
                            {filterSubmissions(status === 'all' ? undefined : status).length > 0 ? (
                                filterSubmissions(status === 'all' ? undefined : status).map((submission) => {
                                    const task = tasks.find(t => t.id === submission.taskId);
                                    if (!task) return null;

                                    return (
                                        <Card key={submission.id} className="hover:shadow-md transition-shadow">
                                            <CardContent className="p-6">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1 space-y-3">
                                                        <div className="flex items-start justify-between">
                                                            <div>
                                                                <h3 className="font-semibold text-lg">{task.title}</h3>
                                                                <p className="text-gray-600 text-sm">{task.description}</p>
                                                            </div>
                                                            <Badge className={getStatusColor(submission.status)}>
                                                                {getStatusIcon(submission.status)}
                                                                <span className="ml-1 capitalize">{submission.status}</span>
                                                            </Badge>
                                                        </div>

                                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                                            <div className="flex items-center text-gray-600">
                                                                <Target className="w-4 h-4 mr-2" />
                                                                <span>{task.category}</span>
                                                            </div>
                                                            <div className="flex items-center text-gray-600">
                                                                <Calendar className="w-4 h-4 mr-2" />
                                                                <span>Submitted {formatDistanceToNow(new Date(submission.submittedAt), { addSuffix: true })}</span>
                                                            </div>
                                                            <div className="flex items-center font-medium text-green-600">
                                                                <DollarSign className="w-4 h-4 mr-2" />
                                                                <span>${submission.rewardAmount}</span>
                                                            </div>
                                                        </div>

                                                        {submission.submissionText && (
                                                            <div className="bg-gray-50 p-3 rounded-lg">
                                                                <p className="text-sm text-gray-700">
                                                                    <strong>Your submission:</strong> {submission.submissionText}
                                                                </p>
                                                            </div>
                                                        )}

                                                        {submission.auditNotes && (
                                                            <div className={`p-3 rounded-lg ${submission.status === 'approved'
                                                                    ? 'bg-green-50 border border-green-200'
                                                                    : 'bg-red-50 border border-red-200'
                                                                }`}>
                                                                <p className={`text-sm ${submission.status === 'approved' ? 'text-green-700' : 'text-red-700'
                                                                    }`}>
                                                                    <strong>Feedback:</strong> {submission.auditNotes}
                                                                </p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="flex justify-end mt-4">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleViewDetails(submission)}
                                                    >
                                                        <Eye className="w-4 h-4 mr-2" />
                                                        View Details
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    );
                                })
                            ) : (
                                <Card>
                                    <CardContent className="text-center py-12">
                                        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                                            {status === 'all' ? 'No submissions yet' : `No ${status} submissions`}
                                        </h3>
                                        <p className="text-gray-600">
                                            {status === 'all'
                                                ? 'Start completing tasks to see your submissions here'
                                                : `You don't have any ${status} submissions at the moment`
                                            }
                                        </p>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </TabsContent>
                ))}
            </Tabs>

            {/* Submission Details Dialog */}
            <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Submission Details</DialogTitle>
                        <DialogDescription>
                            Complete information about your task submission
                        </DialogDescription>
                    </DialogHeader>

                    {selectedSubmission && (
                        <div className="space-y-4">
                            {(() => {
                                const task = tasks.find(t => t.id === selectedSubmission.taskId);
                                if (!task) return null;

                                return (
                                    <>
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <h3 className="font-semibold text-lg">{task.title}</h3>
                                                <Badge className={getStatusColor(selectedSubmission.status)}>
                                                    {getStatusIcon(selectedSubmission.status)}
                                                    <span className="ml-1 capitalize">{selectedSubmission.status}</span>
                                                </Badge>
                                            </div>
                                            <p className="text-gray-600">{task.description}</p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <span className="font-medium">Category:</span> {task.category}
                                            </div>
                                            <div>
                                                <span className="font-medium">Reward:</span> ${selectedSubmission.rewardAmount}
                                            </div>
                                            <div>
                                                <span className="font-medium">Submitted:</span> {new Date(selectedSubmission.submittedAt).toLocaleDateString()}
                                            </div>
                                            <div>
                                                <span className="font-medium">Task Creator:</span> {task.uploaderName}
                                            </div>
                                        </div>

                                        {task.requirements && task.requirements.length > 0 && (
                                            <div className="space-y-2">
                                                <h4 className="font-medium">Task Requirements:</h4>
                                                <ul className="text-sm text-gray-600 space-y-1">
                                                    {task.requirements.map((req, index) => (
                                                        <li key={index} className="flex items-start">
                                                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0" />
                                                            {req}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {selectedSubmission.submissionText && (
                                            <div className="space-y-2">
                                                <h4 className="font-medium">Your Submission:</h4>
                                                <div className="bg-gray-50 p-3 rounded-lg text-sm">
                                                    {selectedSubmission.submissionText}
                                                </div>
                                            </div>
                                        )}

                                        {selectedSubmission.screenshotUrl && (
                                            <div className="space-y-2">
                                                <h4 className="font-medium">Screenshot:</h4>
                                                <div className="relative">
                                                    <img
                                                        src={selectedSubmission.screenshotUrl}
                                                        alt="Submission screenshot"
                                                        className="w-full max-h-64 object-contain rounded-lg border"
                                                    />
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="absolute top-2 right-2"
                                                        onClick={() => window.open(selectedSubmission.screenshotUrl, '_blank')}
                                                    >
                                                        <ExternalLink className="w-3 h-3" />
                                                    </Button>
                                                </div>
                                            </div>
                                        )}

                                        {selectedSubmission.auditNotes && (
                                            <div className="space-y-2">
                                                <h4 className="font-medium">Feedback from Task Creator:</h4>
                                                <div className={`p-3 rounded-lg ${selectedSubmission.status === 'approved'
                                                        ? 'bg-green-50 border border-green-200'
                                                        : 'bg-red-50 border border-red-200'
                                                    }`}>
                                                    <p className={`text-sm ${selectedSubmission.status === 'approved' ? 'text-green-700' : 'text-red-700'
                                                        }`}>
                                                        {selectedSubmission.auditNotes}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                );
                            })()}
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}