import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useTask } from '@/context/TaskContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Plus, X, DollarSign, FileText, Tag, List } from 'lucide-react';

const categories = [
  'Content Creation',
  'Social Media',
  'Data Entry',
  'Research',
  'Testing',
  'Design',
  'Marketing',
  'Other',
];

export function AddTask() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addTask } = useTask();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    reward: '',
    requirements: [''],
    tags: [''],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRequirementChange = (index: number, value: string) => {
    const newRequirements = [...formData.requirements];
    newRequirements[index] = value;
    setFormData(prev => ({ ...prev, requirements: newRequirements }));
  };

  const addRequirement = () => {
    setFormData(prev => ({
      ...prev,
      requirements: [...prev.requirements, ''],
    }));
  };

  const removeRequirement = (index: number) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index),
    }));
  };

  const handleTagChange = (index: number, value: string) => {
    const newTags = [...formData.tags];
    newTags[index] = value;
    setFormData(prev => ({ ...prev, tags: newTags }));
  };

  const addTag = () => {
    setFormData(prev => ({
      ...prev,
      tags: [...prev.tags, ''],
    }));
  };

  const removeTag = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) return;

    const taskData = {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      reward: parseFloat(formData.reward),
      uploaderId: user.id,
      uploaderName: user.name,
      status: 'pending' as const,
      requirements: formData.requirements.filter(req => req.trim() !== ''),
      tags: formData.tags.filter(tag => tag.trim() !== ''),
    };

    addTask(taskData);

    toast({
      title: "Task created successfully!",
      description: "Your task has been submitted for admin approval.",
    });

    navigate('/uploader/my-tasks');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Create New Task</h1>
        <p className="text-gray-600">Add a new task for workers to complete</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Plus className="w-5 h-5 mr-2" />
              Task Details
            </CardTitle>
            <CardDescription>
              Provide clear and detailed information about the task
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Task Title *</Label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="title"
                    name="title"
                    placeholder="Enter a clear, descriptive title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reward">Reward ($) *</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="reward"
                    name="reward"
                    type="number"
                    placeholder="0.00"
                    value={formData.reward}
                    onChange={handleInputChange}
                    className="pl-10"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Provide a detailed description of what needs to be done..."
                value={formData.description}
                onChange={handleInputChange}
                className="min-h-[120px]"
                required
              />
            </div>

            {/* Requirements */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="flex items-center">
                  <List className="w-4 h-4 mr-2" />
                  Requirements
                </Label>
                <Button type="button" variant="outline" size="sm" onClick={addRequirement}>
                  <Plus className="w-4 h-4 mr-1" />
                  Add Requirement
                </Button>
              </div>
              {formData.requirements.map((requirement, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    placeholder="Enter a requirement..."
                    value={requirement}
                    onChange={(e) => handleRequirementChange(index, e.target.value)}
                    className="flex-1"
                  />
                  {formData.requirements.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeRequirement(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="flex items-center">
                  <Tag className="w-4 h-4 mr-2" />
                  Tags
                </Label>
                <Button type="button" variant="outline" size="sm" onClick={addTag}>
                  <Plus className="w-4 h-4 mr-1" />
                  Add Tag
                </Button>
              </div>
              {formData.tags.map((tag, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    placeholder="Enter a tag..."
                    value={tag}
                    onChange={(e) => handleTagChange(index, e.target.value)}
                    className="flex-1"
                  />
                  {formData.tags.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeTag(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {/* Preview */}
            {formData.title && (
              <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium">Preview</h3>
                <div className="space-y-2">
                  <h4 className="font-semibold">{formData.title}</h4>
                  <p className="text-sm text-gray-600">{formData.description}</p>
                  <div className="flex items-center space-x-2">
                    {formData.category && (
                      <Badge variant="outline">{formData.category}</Badge>
                    )}
                    {formData.reward && (
                      <Badge className="bg-green-100 text-green-800">
                        ${formData.reward}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-end space-x-4 mt-6">
          <Button type="button" variant="outline" onClick={() => navigate('/uploader')}>
            Cancel
          </Button>
          <Button type="submit">
            Create Task
          </Button>
        </div>
      </form>
    </div>
  );
}