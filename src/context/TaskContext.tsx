import React, { createContext, useContext, useState, useEffect } from 'react';
import { Task, TaskSubmission } from '@/types';

interface TaskContextType {
  tasks: Task[];
  submissions: TaskSubmission[];
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTaskStatus: (taskId: string, status: Task['status']) => void;
  submitTask: (submission: Omit<TaskSubmission, 'id' | 'submittedAt'>) => void;
  auditSubmission: (submissionId: string, status: 'approved' | 'rejected', notes?: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Mock initial data
const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Write Product Review',
    description: 'Write a detailed review of our new mobile app on the App Store',
    category: 'Content Creation',
    reward: 25,
    uploaderId: '2',
    uploaderName: 'Task Creator',
    status: 'approved',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    requirements: ['Must be authentic', 'Include screenshots', 'At least 100 words'],
    tags: ['review', 'mobile', 'app store'],
  },
  {
    id: '2',
    title: 'Social Media Post',
    description: 'Create an engaging Instagram post about productivity tips',
    category: 'Social Media',
    reward: 15,
    uploaderId: '2',
    uploaderName: 'Task Creator',
    status: 'pending',
    createdAt: '2024-01-16T14:30:00Z',
    updatedAt: '2024-01-16T14:30:00Z',
    requirements: ['Use provided hashtags', 'Include call-to-action', 'Professional image quality'],
    tags: ['instagram', 'productivity', 'social'],
  },
];

const initialSubmissions: TaskSubmission[] = [
  {
    id: '1',
    taskId: '1',
    userId: '3',
    userName: 'Task Worker',
    submissionText: 'I completed the app store review as requested. The review is live and includes screenshots.',
    screenshotUrl: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=300',
    submittedAt: '2024-01-17T09:00:00Z',
    status: 'submitted',
  },
];

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [submissions, setSubmissions] = useState<TaskSubmission[]>(initialSubmissions);

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const updateTaskStatus = (taskId: string, status: Task['status']) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, status, updatedAt: new Date().toISOString() }
        : task
    ));
  };

  const submitTask = (submissionData: Omit<TaskSubmission, 'id' | 'submittedAt'>) => {
    const newSubmission: TaskSubmission = {
      ...submissionData,
      id: Date.now().toString(),
      submittedAt: new Date().toISOString(),
    };
    setSubmissions(prev => [newSubmission, ...prev]);
    updateTaskStatus(submissionData.taskId, 'submitted');
  };

  const auditSubmission = (submissionId: string, status: 'approved' | 'rejected', notes?: string) => {
    setSubmissions(prev => prev.map(submission => 
      submission.id === submissionId 
        ? { ...submission, status, auditNotes: notes }
        : submission
    ));

    const submission = submissions.find(s => s.id === submissionId);
    if (submission) {
      updateTaskStatus(submission.taskId, status === 'approved' ? 'completed' : 'approved');
    }
  };

  return (
    <TaskContext.Provider value={{
      tasks,
      submissions,
      addTask,
      updateTaskStatus,
      submitTask,
      auditSubmission,
    }}>
      {children}
    </TaskContext.Provider>
  );
}

export const useTask = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};