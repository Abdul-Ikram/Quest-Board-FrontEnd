// import { useState } from 'react';
// import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useTask } from '@/context/TaskContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
// import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
// import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
// import { toast } from '@/hooks/use-toast';
import { 
  Eye, 
  // CheckCircle, 
  // XCircle, 
  ExternalLink, 
  Calendar,
  User,
  // FileText,
  DollarSign
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export function AuditTasks() {
  const { user } = useAuth();
  const { tasks, submissions } = useTask();
  // const { tasks, submissions, auditSubmission } = useTask();
  // const [selectedSubmission, setSelectedSubmission] = useState<any>(null);
  // const [auditNotes, setAuditNotes] = useState('');
  // const [showAuditDialog, setShowAuditDialog] = useState(false);

  const myTasks = tasks.filter(task => task.uploaderId === user?.id);
  const submittedTasks = myTasks.filter(task => task.status === 'submitted');
  
  const getSubmissionForTask = (taskId: string) => {
    return submissions.find(sub => sub.taskId === taskId && sub.status === 'submitted');
  };

  // const handleAuditClick = (task: any) => {
  //   const submission = getSubmissionForTask(task.id);
  //   if (submission) {
  //     setSelectedSubmission({ task, submission });
  //     setAuditNotes('');
  //     setShowAuditDialog(true);
  //   }
  // };

  // const handleAuditSubmit = (approved: boolean) => {
  //   if (selectedSubmission) {
  //     auditSubmission(
  //       selectedSubmission.submission.id,
  //       approved ? 'approved' : 'rejected',
  //       auditNotes || undefined
  //     );

  //     toast({
  //       title: approved ? "Task approved!" : "Task rejected",
  //       description: `The submission has been ${approved ? 'approved' : 'rejected'}.`,
  //     });

  //     setShowAuditDialog(false);
  //     setSelectedSubmission(null);
  //     setAuditNotes('');
  //   }
  // };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Task Status Overview</h1>
        <p className="text-gray-600">Monitor the status of your task submissions</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Submitted Tasks</p>
                <p className="text-2xl font-bold">{submittedTasks.length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Rewards</p>
                <p className="text-2xl font-bold">
                  ${submittedTasks.reduce((sum, task) => sum + task.reward, 0)}
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
                <p className="text-sm font-medium text-gray-600">Avg. Completion</p>
                <p className="text-2xl font-bold">2.3 days</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Submissions to Review */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Task Submissions Status</h2>
        
        {submittedTasks.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {submittedTasks.map((task) => {
              const submission = getSubmissionForTask(task.id);
              return (
                <Card key={task.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{task.title}</CardTitle>
                        <CardDescription>{task.description}</CardDescription>
                      </div>
                      <Badge className="bg-purple-100 text-purple-800">
                        <Eye className="w-3 h-3 mr-1" />
                        Submitted
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-gray-600">
                        <User className="w-4 h-4 mr-1" />
                        <span>by {submission?.userName}</span>
                      </div>
                      <div className="flex items-center font-medium text-green-600">
                        <DollarSign className="w-4 h-4 mr-1" />
                        <span>${task.reward}</span>
                      </div>
                    </div>

                    {submission && (
                      <div className="space-y-3">
                        <div className="text-sm text-gray-500">
                          <Calendar className="w-4 h-4 inline mr-1" />
                          Submitted {formatDistanceToNow(new Date(submission.submittedAt), { addSuffix: true })}
                        </div>

                        {submission.submissionText && (
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Submission Notes:</Label>
                            <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                              {submission.submissionText}
                            </p>
                          </div>
                        )}

                        {submission.screenshotUrl && (
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Screenshot:</Label>
                            <div className="relative">
                              <img
                                src={submission.screenshotUrl}
                                alt="Task submission"
                                className="w-full h-32 object-cover rounded-lg border"
                              />
                              <Button
                                size="sm"
                                variant="outline"
                                className="absolute top-2 right-2"
                                onClick={() => window.open(submission.screenshotUrl, '_blank')}
                              >
                                <ExternalLink className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex gap-2 pt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        disabled
                        className="flex-1"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Under Admin Review
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <Eye className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No submitted tasks</h3>
              <p className="text-gray-600">
                When workers complete your tasks, they'll appear here with their status.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Audit Dialog */}
    </div>
  );
}