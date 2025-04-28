import MaxWidthWrapper from '@/components/max-width-wrapper';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Clock, Download, Upload } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function WalletPage() {
    const navigate = useNavigate();
    const [balance, setBalance] = useState('0.00Rs');
    const [transactions, setTransactions] = useState([
        {
            id: 'OUT_250410920071803',
            amount: '28800',
            date: '2025-04-14 09:20:07',
            status: 'Unpaid',
            type: 'withdrawal'
        }
    ]);

    // New withdrawal form state
    const [withdrawalMethod, setWithdrawalMethod] = useState('jazzcash');
    const [cardDetails, setCardDetails] = useState('03**-*******');
    const [withdrawpin, setWithdrawPin] = useState('');
    const [withdrawalAmount, setWithdrawalAmount] = useState('');
    const [error, setError] = useState('');

    const handleWithdrawalSubmit = (e: any) => {
        e.preventDefault();
        // Add validation logic here if needed
        console.log('Withdrawal submitted:', { withdrawalMethod, cardDetails, withdrawpin, withdrawalAmount });

        // Add logic to create a new transaction and update state
        const newTransaction = {
            id: `OUT_${Date.now()}`,
            amount: withdrawalAmount,
            date: new Date().toISOString().replace('T', ' ').substring(0, 19),
            status: 'Unpaid',
            type: 'withdrawal'
        };

        setTransactions([newTransaction, ...transactions]);
        // Here you would also handle the API call to process the withdrawal
    };

    return (
        <MaxWidthWrapper>
            <div className="flex flex-col h-screen w-full mx-auto">
                {/* Header */}
                <div className="p-4 flex items-center" >
                    <div className="flex items-center cursor-pointer" onClick={() => navigate("/profile")}>
                        <ArrowLeft className="h-5 w-5 mr-3" />
                        <h1 className="text-lg font-medium">My wallet</h1>
                    </div>
                </div>

                {/* Balance Card */}
                <Card className="bg-blue-400 text-white shadow-sm w-full lg:w-[70%] lg:mx-auto">
                    <CardContent className="p-6">
                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-semibold">{balance}</h2>
                        </div>

                        <div className="flex justify-between">
                            <div className="flex flex-col items-center justify-center w-full">
                                <Button variant="ghost" className="rounded-full p-3 bg-white/10 hover:bg-white/20">
                                    <Upload className="h-6 w-6 text-white" />
                                </Button>
                                <span className="text-sm mt-1">Recharge</span>
                            </div>

                            <div className="border-r border-white/20"></div>

                            <div className="flex flex-col items-center justify-center w-full">
                                <Drawer>
                                    <DrawerTrigger className='flex flex-col items-center justify-center w-full'>
                                        <Button variant="ghost" className="rounded-full p-3 bg-white/10 hover:bg-white/20">
                                            <Download className="h-6 w-6 text-white" />
                                        </Button>
                                        <span className="text-sm mt-1">Withdrawal</span>
                                    </DrawerTrigger>
                                    <DrawerContent className='w-full lg:max-w-4xl mx-auto'>
                                        <DrawerHeader>
                                            <DrawerTitle>Withdraw</DrawerTitle>
                                            <DrawerDescription>Complete the form below to request a withdrawal.</DrawerDescription>
                                        </DrawerHeader>

                                        {/* Withdrawal Form */}
                                        <div className="px-4">
                                            <form onSubmit={handleWithdrawalSubmit} className="space-y-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="withdrawalMethod" className="text-sm text-gray-500">
                                                        Withdrawal method
                                                    </Label>
                                                    <Select
                                                        value={withdrawalMethod}
                                                        onValueChange={setWithdrawalMethod}
                                                    >
                                                        <SelectTrigger className="w-full bg-white">
                                                            <SelectValue placeholder="Select method" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="jazzcash">jazzcash</SelectItem>
                                                            <SelectItem value="easypaisa">easypaisa</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="cardDetails" className="text-sm text-gray-500">
                                                        Account Number
                                                    </Label>
                                                    <Input
                                                        id="cardDetails"
                                                        value={cardDetails}
                                                        placeholder='03**-*******'
                                                        onChange={(e) => setCardDetails(e.target.value)}
                                                        className="bg-white"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="cardDetails" className="text-sm text-gray-500">
                                                        Withdraw Pin
                                                    </Label>
                                                    <Input
                                                        id="cardDetails"
                                                        value={withdrawpin}
                                                        placeholder='******'
                                                        onChange={(e) => setWithdrawPin(e.target.value)}
                                                        className="bg-white"
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="withdrawalAmount" className="text-sm text-gray-500">
                                                        Withdrawal amount
                                                    </Label>
                                                    <Input
                                                        id="withdrawalAmount"
                                                        value={withdrawalAmount}
                                                        placeholder='xxxx'
                                                        onChange={(e) => setWithdrawalAmount(e.target.value)}
                                                        className="bg-white"
                                                    />
                                                </div>

                                                {error && (
                                                    <div className="text-sm text-red-500">
                                                        {error}
                                                    </div>
                                                )}
                                            </form>
                                        </div>

                                        <DrawerFooter>
                                            <Button
                                                type="button"
                                                onClick={handleWithdrawalSubmit}
                                                className="bg-blue-500 hover:bg-blue-600 text-white"
                                            >
                                                Submit
                                            </Button>
                                            <DrawerClose>
                                                <Button variant="outline" className='w-full'>Cancel</Button>
                                            </DrawerClose>
                                        </DrawerFooter>
                                    </DrawerContent>
                                </Drawer>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Transaction History */}
                <div className="mt-6 lg:w-[70%] lg:mx-auto">
                    <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-500 font-medium">Recharge record</span>
                        <span className="text-emerald-500 font-medium">Withdrawal record</span>
                    </div>

                    {/* Transaction List */}
                    <div className="mt-4">
                        {transactions.map((tx) => (
                            <div key={tx.id} className="mb-4">
                                <div className="flex justify-between items-start mb-1">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                                            <Clock className="h-4 w-4 text-red-500" />
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-500">{tx.id}</div>
                                            <div className="font-semibold">{tx.amount}</div>
                                        </div>
                                    </div>
                                    <Badge variant={tx.status === 'Unpaid' ? 'outline' : 'default'} className="text-xs border border-red-500 text-red-500 font-semibold">
                                        {tx.status}
                                    </Badge>
                                </div>
                                <div className="text-xs text-gray-500 ml-11">{tx.date}</div>
                            </div>
                        ))}

                        {transactions.length === 0 && (
                            <div className="text-center text-gray-400 text-sm mt-6">
                                No more data
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </MaxWidthWrapper>
    );
}