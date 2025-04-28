import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ArrowLeft, SquareChartGantt } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import youtube from "@/assets/img/youtube.png"

// Dummy tasks
const tasks = [
    { id: 1, remaining: 5, status: "Doing", amount: 2000, request: "Complete survey" },
    { id: 2, remaining: 3, status: "Doing", amount: 1500, request: "Watch video" },
    { id: 3, remaining: 2, status: "Audits", amount: 1800, request: "Verify documents" },
    { id: 4, remaining: 0, status: "Completed", amount: 2200, request: "App installation" },
    { id: 5, remaining: 1, status: "Failed", amount: 1000, request: "Invalid submission" },
    { id: 6, remaining: 10, status: "Get-Task", amount: 3000, request: "New task available" },
    { id: 7, remaining: 8, status: "Get-Task", amount: 2500, request: "Special offer task" },
];


const tabs = [
    { id: "Get-Task", label: "Get-Task" },
    { id: "Doing", label: "Doing" },
    { id: "Audits", label: "Audits" },
    { id: "Completed", label: "Completed" },
    { id: "Failed", label: "Failed" },
];

interface TaskCardProps {
    id: number;
    remaining: number;
    status: string;
    amount: number;
    request: string;
    onReceive: (id: number) => void;
}

const TaskCard = ({ id, remaining, status, amount, request, onReceive }: TaskCardProps) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/task-page');
    };


    const getBadgeProps = () => {
        switch (status) {
            case "Get-Task":
                return { text: "Receive", color: "text-green-700", border: "border-green-500" };
            case "Doing":
                return { text: "Received", color: "text-green-700", border: "border-green-500" };
            case "Audits":
                return { text: "Auditing", color: "text-blue-700", border: "border-blue-500" };
            case "Completed":
                return { text: "Completed", color: "text-gray-700", border: "border-gray-500" };
            case "Failed":
                return { text: "Failed", color: "text-red-700", border: "border-red-500" };
            default:
                return { text: "Unknown", color: "text-gray-700", border: "border-gray-500" };
        }
    };

    const { text, color, border } = getBadgeProps();

    return (
        <Card className="w-full shadow-md rounded-2xl p-4 space-y-3 mt-20">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
                        alt="YouTube"
                        className="h-6"
                    />
                    <div className="text-sm font-semibold">Demand side: *****941811</div>
                </div>
                <div className="flex flex-col items-end space-y-1">
                    <span className={`font-semibold ${status === "Failed" ? "text-red-600" : "text-green-600"}`}>
                        {status}
                    </span>
                    <span className="text-primary font-semibold">Rs {amount}</span>
                </div>
            </div>

            <CardContent className="p-0 flex flex-col space-y-2">
                <div className="text-sm text-gray-600">
                    Remaining: <span className="font-semibold">{remaining}</span>
                </div>
                <div className="text-sm">Request: {request}</div>
                <div className="flex justify-end">
                    {status === "Get-Task" ? (
                        <button
                            onClick={() => onReceive(id)}
                            className={`px-4 py-1 rounded-md border ${color} ${border} font-semibold transition hover:opacity-80`}
                        >
                            {text}
                        </button>
                    ) : (
                        <button
                            onClick={handleClick}
                            className="text-sm text-blue-500 font-semibold mr-2"
                        >
                            <Badge>View Details</Badge>
                        </button>
                    )}
                    {status !== "Get-Task" && (
                        <Badge variant="outline" className={`${color} ${border}`}>
                            {text}
                        </Badge>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};


const Dashboard = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeTab, setActiveTab] = useState<string>("Doing");
    const [taskList, setTaskList] = useState(tasks);

    const navigate = useNavigate();

    const handleScroll = () => {
        if (window.scrollY > 10) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleReceiveTask = (id: number) => {
        setTaskList((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, status: "Doing" } : task
            )
        );
        setActiveTab("Doing");
    };

    const filteredTasks = taskList.filter((task) => task.status === activeTab);

    return (
        <>
            {/* Navbar */}
            <div className={`fixed z-40 w-full transition-all duration-300 ${isScrolled ? "bg-[#0B294B]" : "bg-[#0B294B]"}`}>
                <MaxWidthWrapper className="flex h-16 items-center justify-between">
                    <div className="z-30 flex items-center font-semibold cursor-pointer" onClick={() => navigate('/')}>
                        <img
                            src={youtube}
                            alt="Logo"
                            className="h-10 w-24 rounded-sm"
                        />
                    </div>

                    <div className="hidden h-full items-center gap-6 lg:flex">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`cursor-pointer rounded-md p-2 font-semibold backdrop-blur-lg transition-colors hover:bg-blue-500/20 text-gray-100 lg:text-lg`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="lg:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <SquareChartGantt className="size-6 cursor-pointer" />
                            </SheetTrigger>
                            <SheetContent side="left" className="w-64 p-5">
                                <nav className="flex flex-col gap-4 text-lg font-medium">
                                    {tabs.map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className="text-left cursor-pointer transition-colors hover:text-blue-600"
                                        >
                                            {tab.label}
                                        </button>
                                    ))}
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>
                </MaxWidthWrapper>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
                <MaxWidthWrapper className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredTasks.length > 0 ? (
                        filteredTasks.map((task) => (
                            <TaskCard
                                key={task.id}
                                id={task.id}
                                remaining={task.remaining}
                                status={task.status}
                                amount={task.amount}
                                request={task.request}
                                onReceive={handleReceiveTask}
                            />
                        ))
                    ) : (
                        <div className="text-center col-span-full text-gray-500">
                            No tasks found.
                        </div>
                    )}
                </MaxWidthWrapper>
            </div>
        </>
    );
};

export default Dashboard;

