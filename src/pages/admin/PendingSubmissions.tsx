import { useState } from 'react';
// import React, { useState } from 'react';
import { useTask } from '@/context/TaskContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { 
  Eye, 
  CheckCircle, 
  XCircle, 
  ExternalLink, 
  Calendar,
  User,
  FileText,
  DollarSign,
  Upload
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export function PendingSubmissions() {
  const { tasks, submissions, auditSubmission } = useTask();
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);
  const [auditNotes, setAuditNotes] = useState('');
  const [showAuditDialog, setShowAuditDialog] = useState(false);

  const pendingSubmissions = submissions.filter(sub => sub.status === 'submitted');

  const handleAuditClick = (submission: any) => {
    const task = tasks.find(t => t.id === submission.taskId);
    if (task) {
      setSelectedSubmission({ task, submission });
      setAuditNotes('');
      setShowAuditDialog(true);
    }
  };

  const handleAuditSubmit = (approved: boolean) => {
    if (selectedSubmission) {
      auditSubmission(
        selectedSubmission.submission.id,
        approved ? 'approved' : 'rejected',
        auditNotes || undefined
      );

      toast({
        title: approved ? "Submission approved!" : "Submission rejected",
        description: `The submission has been ${approved ? 'approved and payment processed' : 'rejected'}.`,
      });

      setShowAuditDialog(false);
      setSelectedSubmission(null);
      setAuditNotes('');
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Review Task Submissions</h1>
        <p className="text-gray-600">Review and approve task submissions from workers</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Review</p>
                <p className="text-2xl font-bold">{pendingSubmissions.length}</p>
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
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-2xl font-bold">
                  ${pendingSubmissions.reduce((sum, sub) => sum + sub.rewardAmount, 0)}
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
                <p className="text-sm font-medium text-gray-600">Avg. Reward</p>
                <p className="text-2xl font-bold">
                  ${pendingSubmissions.length > 0 ? 
                    Math.round(pendingSubmissions.reduce((sum, sub) => sum + sub.rewardAmount, 0) / pendingSubmissions.length) : 
                    0}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Upload className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Submissions */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Submissions Awaiting Review</h2>
        
        {pendingSubmissions.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {pendingSubmissions.map((submission) => {
              const task = tasks.find(t => t.id === submission.taskId);
              if (!task) return null;

              return (
                <Card key={submission.id} className="hover:shadow-md transition-shadow">
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
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center text-gray-600">
                        <User className="w-4 h-4 mr-1" />
                        <span>Worker: {submission.userName}</span>
                      </div>
                      <div className="flex items-center font-medium text-green-600">
                        <DollarSign className="w-4 h-4 mr-1" />
                        <span>${submission.rewardAmount}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <FileText className="w-4 h-4 mr-1" />
                        <span>Creator: {task.uploaderName}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{formatDistanceToNow(new Date(submission.submittedAt), { addSuffix: true })}</span>
                      </div>
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

                    <div className="flex gap-2 pt-2">
                      <Button
                        size="sm"
                        onClick={() => handleAuditClick(submission)}
                        className="flex-1"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Review Submission
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
              <h3 className="text-lg font-medium text-gray-900 mb-2">No submissions to review</h3>
              <p className="text-gray-600">
                When workers complete tasks, their submissions will appear here for review.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Audit Dialog */}
      <Dialog open={showAuditDialog} onOpenChange={setShowAuditDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Review Task Submission</DialogTitle>
            <DialogDescription>
              Carefully review the submission and provide feedback
            </DialogDescription>
          </DialogHeader>
          
          {selectedSubmission && (
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">{selectedSubmission.task.title}</h3>
                <p className="text-sm text-gray-600">{selectedSubmission.task.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Worker:</span> {selectedSubmission.submission.userName}
                </div>
                <div>
                  <span className="font-medium">Task Creator:</span> {selectedSubmission.task.uploaderName}
                </div>
                <div>
                  <span className="font-medium">Reward:</span> ${selectedSubmission.submission.rewardAmount}
                </div>
                <div>
                  <span className="font-medium">Category:</span> {selectedSubmission.task.category}
                </div>
              </div>

              {selectedSubmission.task.requirements && selectedSubmission.task.requirements.length > 0 && (
                <div className="space-y-2">
                  <Label className="font-medium">Task Requirements:</Label>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {selectedSubmission.task.requirements.map((req: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedSubmission.submission.submissionText && (
                <div className="space-y-2">
                  <Label className="font-medium">Submission Notes:</Label>
                  <div className="bg-gray-50 p-3 rounded-lg text-sm">
                    {selectedSubmission.submission.submissionText}
                  </div>
                </div>
              )}

              {selectedSubmission.submission.screenshotUrl && (
                <div className="space-y-2">
                  <Label className="font-medium">Screenshot:</Label>
                  <img
                    src={selectedSubmission.submission.screenshotUrl}
                    alt="Task submission"
                    className="w-full max-h-64 object-contain rounded-lg border"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="auditNotes">Admin Notes (Optional)</Label>
                <Textarea
                  id="auditNotes"
                  placeholder="Add any feedback or notes about this submission..."
                  value={auditNotes}
                  onChange={(e) => setAuditNotes(e.target.value)}
                  className="min-h-[80px]"
                />
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowAuditDialog(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => handleAuditSubmit(false)}
            >
              <XCircle className="w-4 h-4 mr-1" />
              Reject
            </Button>
            <Button onClick={() => handleAuditSubmit(true)}>
              <CheckCircle className="w-4 h-4 mr-1" />
              Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}