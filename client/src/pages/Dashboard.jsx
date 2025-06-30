import { useEffect, useState } from "react";
import API from "../Services/api";
import TaskCard from "../components/TaskCard";
import TaskDialog from "../components/TaskDialog";
import Navbar from "../components/Navbar";
import { toast } from "sonner";

//import { toast } from "@/components/ui/sonner"; 

export default function Dashboard(){
    const [tasks, setTasks] = useState([]);

    const load = async () => {
        const res = await API.get("/tasks/me");
        setTasks(res.data);
    };

    useEffect(() => { load(); }, []);

    const creatTask = async (payload) => {
        const res = await API.post("/tasks", payload);
        setTasks(prev => [res.data, ...prev]);
        toast("Task created");
    };

    const toggleTask = async (id) => {
        const task = tasks.find(t => t._id === id);
        const res = await API.put(`/tasks/${id}`, { completed: !task.completed});
        setTasks(prev => prev.map(t => (t._id === id ? res.data : t)));
    };

    const deleteTask = async (id) => {
        await API.delete(`/tasks/${id}`);
        setTasks(prev => prev.filter(t => t._id !== id));
        toast( "Task deleted");
    };

    return (
        <>
        
        <Navbar />
        <main className="max-w-5xl mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">My Tasks</h1>
                <TaskDialog onSubmit={creatTask} />

            </div>

            <section
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
            >

                {tasks.map(t => (
                    <TaskCard

                    key={t._id}
                    task={t}
                    onToggle={toggleTask}
                    onDelete={deleteTask}


                    />
                ))}

            </section>

        </main>
        
        </>
    );
}
