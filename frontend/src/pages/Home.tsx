import React, { useEffect, useState, useCallback } from 'react'
import api from '../api'
import { useNavigate } from 'react-router-dom';

export default function Home(){
    interface Task {
        id: string;
        title: string;
        description: string;
        created: string;
    }
    const navigate = useNavigate();
    const [task, setTask] = useState<Task[]>([]);
    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");
    const handleLogout = () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");

        navigate("/login", { replace: true });
    };

    const resetForm = () => {
        setTask([]);
        setTitle("");
        setDescription("");

    }
    
    const getTask = useCallback(() => {
    return api.get("/api/read/")
        .then((res) => {
        setTask(res.data.task || []);
        })
        .catch((error) => {
        alert(error instanceof Error ? error.message : "Failed to load tasks");
        });
    }, []);

    useEffect(() => {
    void getTask();
    }, [getTask]);

    const deleteTask = (id: string) => {
        api.delete(`/api/delete/${id}/`)
        .then((res) => {
            if(res.status === 200) alert("Task Deleted")
            else alert("Task failed to deleted")
            getTask()
        })
        .catch((error) => alert(error))
    }

    const createTask = (e: React.FormEvent) => {
        e.preventDefault()
        api.post("/api/create/",{title,description})
        .then((res) => {
            if(res.status === 201) alert("Task Created")
            else alert("Task not created")
            resetForm()
            getTask()
        }).catch((error) => alert(error))
    }

    return(<>
        <div className="mx-auto max-w-3xl px-4 py-16">
            <div>
                <h2 className="text-2xl font-semibold text-slate-900">Tasks</h2>
                <div className="mt-4 space-y-3">
                    {task.map((t) => (
                        <div key={t.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                        <h3 className="font-semibold break-words text-slate-900">{t.title}</h3>
                        <p className="mt-1 text-sm break-words whitespace-pre-wrap text-slate-600">{t.description}</p>
                        <p className="mt-2 text-xs text-slate-400">
                            {new Date(t.created).toLocaleDateString("en-IN", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                            })}
                        </p>
                        <button onClick={() => deleteTask(t.id)} className="mt-3 rounded-lg px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-50">Delete</button>
                        </div>
                    ))}
                </div>
            </div>
            <h2 className="mt-10 text-xl font-semibold text-slate-900">Create a Task</h2>
            <form onSubmit={createTask} className="mt-4 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <label htmlFor="title" className="text-sm font-medium text-slate-700">Title:</label>
                    <br className="hidden" />
                    <input type="text" name='title' required onChange={(e) => setTitle(e.target.value)} value={title} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-hidden focus:ring-2 focus:ring-indigo-200"/>
                    <label htmlFor="description" className="text-sm font-medium text-slate-700">Description:</label>
                    <br className="hidden" />
                    <textarea name="description" required value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-hidden focus:ring-2 focus:ring-indigo-200"></textarea>
                    <br className="hidden" />
                    <button type='submit' className="self-start rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white shadow-sm transition hover:bg-indigo-700 focus:outline-hidden focus:ring-2 focus:ring-indigo-300">Submit</button>
            </form>
        </div>
        <button onClick={handleLogout} className="fixed top-4 right-4 rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-100">Logout</button>
        </>
    )
}
