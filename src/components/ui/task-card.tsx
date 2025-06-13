import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Task } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { 
  Clock, 
  DollarSign, 
  User, 
  Tag,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  Upload
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  task: Task;
  onAction?: (action: string, task: Task) => void;
  showActions?: boolean;
  actionType?: 'admin' | 'user' | 'uploader';
}

const statusConfig = {
  pending: { color: 'bg-yellow-100 text-yellow-800', icon: AlertCircle },
  approved: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
  in_progress: { color: 'bg-blue-100 text-blue-800', icon: Clock },
  submitted: { color: 'bg-purple-100 text-purple-800', icon: Upload },
  auditing: { color: 'bg-orange-100 text-orange-800', icon: Eye },
  completed: { color: 'bg-emerald-100 text-emerald-800', icon: CheckCircle },
  rejected: { color: 'bg-red-100 text-red-800', icon: XCircle },
};

export function TaskCard({ task, onAction, showActions = false, actionType }: TaskCardProps) {
  const statusInfo = statusConfig[task.status];
  const StatusIcon = statusInfo.icon;

  const getActionButtons = () => {
    if (!showActions || !onAction) return null;

    switch (actionType) {
      case 'admin':
        if (task.status === 'pending') {
          return (
            <div className="flex gap-2">
              <Button size="sm" onClick={() => onAction('approve', task)}>
                <CheckCircle className="w-4 h-4 mr-1" />
                Approve
              </Button>
              <Button size="sm" variant="destructive" onClick={() => onAction('reject', task)}>
                <XCircle className="w-4 h-4 mr-1" />
                Reject
              </Button>
            </div>
          );
        }
        break;
      case 'user':
        if (task.status === 'approved') {
          return (
            <Button size="sm" onClick={() => onAction('start', task)}>
              <Upload className="w-4 h-4 mr-1" />
              Start Task
            </Button>
          );
        }
        break;
      case 'uploader':
        if (task.status === 'submitted') {
          return (
            <Button size="sm" onClick={() => onAction('audit', task)}>
              <Eye className="w-4 h-4 mr-1" />
              Review Submission
            </Button>
          );
        }
        break;
    }
    return null;
  };

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold">{task.title}</CardTitle>
            <CardDescription className="text-sm text-gray-600">
              {task.description}
            </CardDescription>
          </div>
          <Badge className={cn("text-xs font-medium", statusInfo.color)}>
            <StatusIcon className="w-3 h-3 mr-1" />
            {task.status.replace('_', ' ')}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-gray-600">
            <User className="w-4 h-4 mr-1" />
            <span>by {task.uploaderName}</span>
          </div>
          <div className="flex items-center font-medium text-green-600">
            <DollarSign className="w-4 h-4 mr-1" />
            <span>${task.reward}</span>
          </div>
        </div>

        <div className="flex items-center text-sm text-gray-500">
          <Clock className="w-4 h-4 mr-1" />
          <span>{formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}</span>
        </div>

        <div className="flex items-center">
          <Tag className="w-4 h-4 mr-2 text-gray-400" />
          <Badge variant="outline" className="text-xs">
            {task.category}
          </Badge>
        </div>

        {task.tags && task.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {task.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {task.requirements && task.requirements.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700">Requirements:</h4>
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
      </CardContent>

      {showActions && (
        <CardFooter className="pt-4">
          {getActionButtons()}
        </CardFooter>
      )}
    </Card>
  );
}