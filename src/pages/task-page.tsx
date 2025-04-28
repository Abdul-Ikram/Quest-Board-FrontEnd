import Done from "@/assets/img/1.png";
import MaxWidthWrapper from '@/components/max-width-wrapper';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ArrowLeft, Camera, Copy } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TaskDetailsPage() {

    const navigate = useNavigate();
    const [image, setImage] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (

        <MaxWidthWrapper>
            <div className="p-4 flex items-center " >
                <div className="flex items-center cursor-pointer" onClick={() => navigate("/task-list")}>
                    <ArrowLeft className="h-5 w-5 mr-3" />
                    <h1 className="text-lg font-medium">Back</h1>
                </div>
            </div>
            <div className="flex flex-col w-full max-w-md mx-auto p-4 space-y-4">
                {/* Task Card */}
                <Card className="w-full">
                    <CardContent className="pt-6">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <div className="flex items-center gap-2">
                                    <h3 className="text-sm text-gray-500">Task title:</h3>
                                    <span className="font-medium">YouTube</span>
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                    <h3 className="text-sm text-gray-500">Task benefits:</h3>
                                    <span className="font-medium text-green-600">Rs +20.00</span>
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                    <h3 className="text-sm text-gray-500">Task description:</h3>
                                    <span className="font-medium">YouTube</span>
                                </div>
                            </div>

                            <div className="relative">
                                <img src={Done} alt='Done' className='size-20' />
                                {/* <img src={Autid} alt='Audit' className='size-20'/> */}
                            </div>
                        </div>

                        <div className="mb-4">
                            <h3 className="text-sm text-gray-500 mb-1">Upload requirements:</h3>
                            <div className="border-2 border-green-500 border-dashed rounded-full size-16 flex items-center justify-center bg-green-50 mx-auto">
                                <Button variant="ghost" className="rounded-full p-2">
                                    <Camera className="h-8 w-8 text-gray-400" />
                                </Button>
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="mt-4"
                            />
                            {image && <img src={image} alt="Uploaded" className="mt-4 rounded-lg size-16 object-cover mx-auto" />}
                        </div>

                        <div className="flex items-center gap-2 mt-4">
                            <h3 className="text-sm text-gray-500">Date of audit:</h3>
                            <span className="font-medium"></span>
                        </div>
                    </CardContent>
                </Card>

                {/* User Info & Link Section */}
                <Card className="w-full">
                    <CardContent className="py-4">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-blue-100 overflow-hidden">
                                <img src="/api/placeholder/40/40" alt="User" className="h-full w-full object-cover" />
                            </div>
                            <div>
                                <p className="font-medium">Demand side</p>
                                <p className="text-sm text-gray-500">*****97242 · 2025-04-13-15:08:37 Release</p>
                            </div>
                        </div>

                        <div className="mt-4 flex items-center gap-2 p-2 bg-blue-50 rounded-md">
                            <a
                                href="https://www.youtube.com/watch?v=tG-HL-ZjhloeO"
                                className="text-blue-500 text-sm truncate flex-1"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                https://www.youtube.com/watch?v=tG-HL-ZjhloeO
                            </a>
                            <Button variant="ghost" size="sm" className="p-1 h-auto">
                                <Copy className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardContent>
                    <CardFooter className="pt-0 pb-4 px-4">
                        <Button className="w-full bg-blue-500 hover:bg-blue-600">Open</Button>
                    </CardFooter>
                </Card>

                {/* Submit Button */}
                <Button className="w-full bg-teal-500 hover:bg-teal-600" >
                    Submit completed task
                </Button>
            </div>
        </MaxWidthWrapper>
    );
}
