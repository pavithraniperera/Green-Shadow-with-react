import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const TaskCalendar = () => {
    const [date, setDate] = useState(new Date());
    const [tasks, setTasks] = useState([
        { date: '2025-01-15', type: 'Planting', description: 'Plant tomatoes in Field A.' },
        { date: '2025-01-20', type: 'Harvesting', description: 'Harvest rice in Field B.' },
        { date: '2025-01-25', type: 'Maintenance', description: 'Maintain tractor.' },
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTask, setNewTask] = useState({ type: '', description: '' });

    //in here categorize all the tasks by date , create a object that include list of task that have same date
    const formattedTasks = tasks.reduce((acc, task) => {
        acc[task.date] = acc[task.date] || [];
        acc[task.date].push(task);
        return acc;
    }, {});


    const handleDateClick = (value) => {
        setDate(value);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setNewTask({ type: '', description: '' });
    };

    const handleAddTask = () => {
        if (newTask.type && newTask.description) {
            const formattedDate = date.toISOString().split('T')[0];
            setTasks([...tasks, { date: formattedDate, ...newTask }]);
            handleCloseModal();
        }
    };

    const selectedDateTasks = formattedTasks[date.toISOString().split('T')[0]] || [];

    return (
        <div className="p-6 bg-white/30  rounded-lg shadow-lg md:max-w-3xl md:mt-0 mt-6 md:w-full w-3/4 border-2  backdrop-blur-lg">
            <h2 className="text-3xl font-bold text-center mb-6 text-green-800 font-itim">
                <i className="fa-solid fa-list-check text-2xl text-green-800 mr-5 "></i> Task Calendar
            </h2>
            <div className="md:grid md:grid-cols-2 md:gap-8">
                {/* Calendar Section */}
                <div className="relative">
                    <Calendar
                        className="bg-amber-50 rounded-lg "
                        value={date}
                        onChange={handleDateClick}
                        tileContent={({ date }) => {
                            const dateString = date.toISOString().split('T')[0];
                            return formattedTasks[dateString] ? (
                                <div className="bg-amber-200 text-green-500 rounded-full px-2 text-xs text-center">
                                    {formattedTasks[dateString].length}
                                </div>
                            ) : null;
                        }}
                        tileClassName={({ date }) => {
                            const isSelected = date.toISOString().split('T')[0] === date.toISOString().split('T')[0];
                            return isSelected ? 'bg-orange-200 rounded-full' : '';
                        }}
                    />
                </div>

                {/* Task Details Section */}
                <div className="bg-white p-4 rounded-lg shadow-md mt-6 md:mt-0">
                    <h3 className="text-lg font-semibold text-green-700">
                        🌟 Tasks for {date.toDateString()}:
                    </h3>
                    {selectedDateTasks.length > 0 ? (
                        <ul className="mt-4 space-y-2">
                            {selectedDateTasks.map((task, index) => (
                                <li
                                    key={index}
                                    className="flex items-center gap-3 p-3 bg-green-100 rounded-lg shadow"
                                >
                                <span className="bg-green-600 text-white text-sm px-2 py-1 rounded-full">
                                    {task.type}
                                </span>
                                    <p className="text-sm text-gray-700">{task.description}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="mt-4 text-gray-600">No tasks for this day.</p>
                    )}
                    <button
                        onClick={handleOpenModal}
                        className="mt-6 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                    >
                        ➕ Add Task
                    </button>
                </div>
            </div>

            {/* Add Task Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-semibold mb-4 text-green-700">Add Task</h2>
                        <label className="block mb-4">
                            <span className="text-gray-700">Task Type</span>
                            <input
                                type="text"
                                value={newTask.type}
                                onChange={(e) =>
                                    setNewTask({ ...newTask, type: e.target.value })
                                }
                                className="w-full mt-2 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                                placeholder="e.g., Planting"
                            />
                        </label>
                        <label className="block mb-4">
                            <span className="text-gray-700">Description</span>
                            <textarea
                                value={newTask.description}
                                onChange={(e) =>
                                    setNewTask({ ...newTask, description: e.target.value })
                                }
                                className="w-full mt-2 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                                placeholder="e.g., Plant tomatoes in Field A"
                            ></textarea>
                        </label>
                        <div className="flex justify-end">
                            <button
                                onClick={handleCloseModal}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddTask}
                                className="ml-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 shadow-2xl backdrop-blur-lg"
                            >
                                Add Task
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

};

export default TaskCalendar;
