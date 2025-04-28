import MaxWidthWrapper from '@/components/max-width-wrapper';
import Navbar from '@/components/navbar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart2, ChevronRight, CircleHelp, FileText, TrendingUp, User, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {

    const navigate = useNavigate();

    return (
        <>
            <Navbar />
            <MaxWidthWrapper>
                <div className="flex flex-col w-full  mx-auto p-4  h-screen pt-20">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center">
                            <Avatar className="h-12 w-12 mr-3">
                                <AvatarImage src="/api/placeholder/40/40" alt="User avatar" />
                                <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="text-xs text-blue-500">My superior: 234509</p>
                                <h2 className="font-bold">Account: 3004242424</h2>
                                <p className="text-sm">Invitation code: 8456279</p>
                            </div>
                        </div>
                    </div>

                    {/* Balance Section */}
                    <div className="flex items-center mb-4">
                        <div className="flex items-center bg-gray-100 p-2 rounded-lg mr-2 flex-1">
                            <div className="bg-gray-700 p-1 rounded mr-2">
                                <BarChart2 size={16} className="text-white" />
                            </div>
                            <span>Balance</span>
                            <span className="ml-2 font-semibold">0Rs</span>
                        </div>
                        <Button className="bg-teal-500 text-white rounded-lg" size="sm" onClick={() => navigate('/profile/wallet')} >My wallet</Button>
                    </div>

                    {/* Earnings Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                        <Card className="bg-gray-100 shadow-none">
                            <CardContent className="p-3">
                                <p className="text-xs text-center mb-2">Today's earnings(Rs)</p>
                                <p className="text-lg text-center text-teal-500 font-semibold">0.00</p>
                            </CardContent>
                        </Card>

                        <Card className="bg-gray-100 shadow-none">
                            <CardContent className="p-3">
                                <p className="text-xs text-center mb-2">This month's earnings(Rs)</p>
                                <p className="text-lg text-center text-teal-500 font-semibold">0.00</p>
                            </CardContent>
                        </Card>

                        <Card className="bg-gray-100 shadow-none">
                            <CardContent className="p-3">
                                <p className="text-xs text-center mb-2">Last month's earnings(Rs)</p>
                                <p className="text-lg text-center text-teal-500 font-semibold">0.00</p>
                            </CardContent>
                        </Card>

                        <Card className="bg-gray-100 shadow-none">
                            <CardContent className="p-3">
                                <p className="text-xs text-center mb-2">Total revenue(Rs)</p>
                                <p className="text-lg text-center text-teal-500 font-semibold">0.00</p>
                            </CardContent>
                        </Card>

                        <Card className="bg-gray-100 shadow-none">
                            <CardContent className="p-3">
                                <p className="text-xs text-center mb-2">Complete the remaining tasks today(PCL)</p>
                                <p className="text-lg text-center text-teal-500 font-semibold">0</p>
                            </CardContent>
                        </Card>

                        <Card className="bg-gray-100 shadow-none">
                            <CardContent className="p-3">
                                <p className="text-xs text-center mb-2">Today's tasks(PCL)</p>
                                <p className="text-lg text-center text-teal-500 font-semibold">0</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Menu Items */}
                    <div className="flex flex-col space-y-2 ">
                        <Button variant="ghost" className="flex justify-between items-center w-full py-6 bg-white">
                            <div className="flex items-center">
                                <div className="bg-green-100 p-2 rounded mr-3">
                                    <User size={18} className="text-green-600" />
                                </div>
                                <span>Personal information</span>
                            </div>
                            <ChevronRight size={18} />
                        </Button>

                        <Button variant="ghost" className="flex justify-between items-center w-full py-6 bg-white">
                            <div className="flex items-center">
                                <div className="bg-orange-100 p-2 rounded mr-3">
                                    <BarChart2 size={18} className="text-orange-600" />
                                </div>
                                <span>Daily statement</span>
                            </div>
                            <ChevronRight size={18} />
                        </Button>

                        <Button variant="ghost" className="flex justify-between items-center w-full py-6 bg-white">
                            <div className="flex items-center">
                                <div className="bg-blue-100 p-2 rounded mr-3">
                                    <TrendingUp size={18} className="text-blue-600" />
                                </div>
                                <span>Accounting records</span>
                            </div>
                            <ChevronRight size={18} />
                        </Button>

                        <Button variant="ghost" className="flex justify-between items-center w-full py-6 bg-white">
                            <div className="flex items-center">
                                <div className="bg-pink-100 p-2 rounded mr-3">
                                    <Users size={18} className="text-pink-600" />
                                </div>
                                <span>Invite Friends</span>
                            </div>
                            <ChevronRight size={18} />
                        </Button>

                        <Button variant="ghost" className="flex justify-between items-center w-full py-6 bg-white">
                            <div className="flex items-center">
                                <div className="bg-purple-200 p-2 rounded mr-3">
                                    <FileText size={18} className="text-purple-600" />
                                </div>
                                <span>Team Reports</span>
                            </div>
                            <ChevronRight size={18} />
                        </Button>

                        <Button variant="ghost" className="flex justify-between items-center w-full py-6 bg-white">
                            <div className="flex items-center">
                                <div className="bg-yellow-200/80 p-2 rounded mr-3">
                                    <CircleHelp size={18} className="text-yellow-600/80" />
                                </div>
                                <span>Help Book</span>
                            </div>
                            <ChevronRight size={18} />
                        </Button>

                    </div>
                </div>
            </MaxWidthWrapper>
        </>
    );
}