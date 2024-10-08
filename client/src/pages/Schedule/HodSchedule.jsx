import React, { useState } from "react";
import { format, startOfWeek, addDays } from "date-fns";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSchedule, addSchedule, downloadSchedule } from "../../api/Hod";
import { listUsers } from "../../api/User";
import { useAuth } from "../../context/AuthContext";
import Loader from "../../Components/Loader/Loader";

const getCurrentWeek = (from) => {
    let start;
    if(from) {
        start = startOfWeek(new Date(from), { weekStartsOn: 0 });
    }
    else {
        start = startOfWeek(new Date(), { weekStartsOn: 0 });
    }
    return Array.from({ length: 7 }, (_, i) => format(addDays(start, i), "yyyy-MM-dd"));
};

const extractTime = (isoDateStr) => {
    // Create a Date object from the ISO string
    const date = new Date(isoDateStr);
    
    // Get hours and minutes
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    
    // Return formatted time
    return `${hours}:${minutes}`;
}


const ScheduleComponent = () => {
    const queryClient = useQueryClient();
    const { authData } = useAuth();
    const [from, setFrom] = useState(format(startOfWeek(new Date(), { weekStartsOn: 0 }), "yyyy-MM-dd"));
    const [to, setTo] = useState(format(addDays(startOfWeek(new Date(), { weekStartsOn: 0 }), 6), "yyyy-MM-dd"));
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [currentEdit, setCurrentEdit] = useState({ userId: "", date: "", clockIn: "", clockOut: "" });
    const [currentWeek, setCurrentWeek] = useState(getCurrentWeek());
    const [errorMessage, setErrorMessage] = useState('');

    const { data: schedules = [], isLoading, isError } = useQuery({
        queryKey: ['schedule', { from, to }],
        queryFn: () => getSchedule({ from, to }),
    });

    const { data: users = [], isLoading: usersLoading, isError: usersError } = useQuery({
        queryKey: 'users',
        queryFn: listUsers,
    });

    const addScheduleMutation = useMutation({
        mutationFn: addSchedule,
        onSuccess: () => {
            queryClient.invalidateQueries('schedule');
            setIsPopupOpen(false);
        }
    });

    const downloadMutation = useMutation({
        mutationFn: downloadSchedule,
        onSuccess: (data) => {
            setErrorMessage('');
            const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `schedule.xlsx`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        },
        onError: (error) => {
            setErrorMessage("No schedule found for the selected date range.");
            console.log(error);
        }
    });

    const getScheduleForDay = (userId, date) => {
        const schedule = schedules.find(
            (s) => s.user._id === userId && format(new Date(s.clockIn), "yyyy-MM-dd") === date
        );

        if(schedule) {
            return `${extractTime(schedule.clockIn)} - ${extractTime(schedule.clockOut)}`;
        }
        return "OFF";
    };
    
    const handleCellClick = (userId, date) => {
        const schedule = schedules.find(
            (s) => s.user === userId && format(new Date(s.clockIn), "yyyy-MM-dd") === date
        );
        setCurrentEdit({
            userId,
            date,
            clockIn: schedule ? format(new Date(schedule.clockIn), "HH:mm") : "09:00",
            clockOut: schedule ? format(new Date(schedule.clockOut), "HH:mm") : "18:00",
        });
        setIsPopupOpen(true);
    };

    const handleInputChange = (e) => {
        setCurrentEdit({ ...currentEdit, [e.target.name]: e.target.value });
    };

    const handleUpdate = (setOff) => {
        // Convert times to UTC
        const clockInUTC = new Date(`${currentEdit.date}T${currentEdit.clockIn}:00Z`).toISOString();
        const clockOutUTC = new Date(`${currentEdit.date}T${currentEdit.clockOut}:00Z`).toISOString();
    
        const addScheduleObject = {
            user: currentEdit.userId,
            company: authData.company,
            clockIn: setOff=="OFF"? setOff: clockInUTC,
            clockOut: setOff=="OFF"? setOff: clockOutUTC,
            date: currentEdit.date,
        };
    
        addScheduleMutation.mutate(addScheduleObject);
    };
    const downloadExcel = async () => {
        // const data = await downloadDataMutation.mutateAsync({ from, to });
        downloadMutation.mutate({ from, to });
    }

    if (isLoading || usersLoading) return <Loader />;
        
    return (
        <div className="p-4">
            <div className='flex justify-between'>
                <h1 className="text-2xl font-bold mb-6">Schedule</h1>
                <div>
                    <input
                        type="date"
                        value={from}
                        onChange={(e) => {
                            setFrom(format(addDays(startOfWeek(new Date(e.target.value), { weekStartsOn: 0 }), 0), "yyyy-MM-dd"));
                            setTo(format(addDays(startOfWeek(new Date(e.target.value), { weekStartsOn: 0 }), 6), "yyyy-MM-dd"));
                            setCurrentWeek(getCurrentWeek(e.target.value));
                        }}
                        className="border p-2 rounded-md mr-5"
                    />
                    <input
                        type="date"
                        value={to}
                        className="border p-2 rounded-md"
                        disabled
                    />
                </div>
                <div>
                <button className="bg-blue-900 text-white py-2 px-4 rounded shadow" onClick={downloadExcel} disabled={downloadMutation?.isPending}>
                    {downloadMutation?.isPending ? 'Downloading...' : 'Download Excel'}
                </button>
                {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
                </div>
            </div>

            <div className="overflow-x-auto">
                <div className="min-w-[1000px] grid grid-cols-8 gap-2 text-center text-sm md:text-base">
                    <div></div>
                    {currentWeek.map((date, idx) => (
                        <div key={idx} className="font-semibold border p-2">
                            {format(new Date(date), "EEE dd/MM")}
                        </div>
                    ))}
                    {users.map((user) => (
                        <React.Fragment key={user._id}>
                            <div className="font-medium border p-2 flex flex-col items-center">
                                <span className="truncate text-xs md:text-sm">{user.firstName} {user.lastName}</span>
                                <span className="truncate text-xs text-gray-600">{user.email}</span>
                            </div>
                            {currentWeek.map((date, idx) => (
                                <div
                                    key={idx}
                                    className={`p-2 border rounded-md cursor-pointer ${
                                        getScheduleForDay(user._id, date) === "OFF" ? "text-red-500 border-red-500" : "text-gray-800 border-gray-300"
                                    }`}
                                    onClick={() => handleCellClick(user._id, date)}
                                >
                                    {getScheduleForDay(user._id, date)}
                                </div>
                            ))}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {isPopupOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-md w-full max-w-lg">
                        <h3 className="text-lg font-bold mb-4">Edit Schedule</h3>
                        <div className="mb-4">
                            <label className="block text-gray-700">Clock In</label>
                            <input
                                type="time"
                                name="clockIn"
                                value={currentEdit.clockIn}
                                onChange={handleInputChange}
                                className="w-full mt-1 p-2 border rounded-md"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Clock Out</label>
                            <input
                                type="time"
                                name="clockOut"
                                value={currentEdit.clockOut}
                                onChange={handleInputChange}
                                className="w-full mt-1 p-2 border rounded-md"
                            />
                        </div>
                        <div className="flex justify-between space-x-2">

                            <button 
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600" 
                                onClick={() => handleUpdate('OFF')}>
                                    Set OFF
                            </button>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setIsPopupOpen(false)}
                                    className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleUpdate}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                >
                                    Update
                                </button>
                            </div>
                            
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ScheduleComponent;
