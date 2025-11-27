import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { useSocket } from "../../context/SocketContext";
import { Clock } from "lucide-react";

const ActivityTimeline = ({ projectId }) => {
    const socket = useSocket();
    const [activity, setActivity] = useState([]);

    useEffect(() => {
        const loadActivity = async () => {
            try {
                const res = await api.get(`/projects/${projectId}/activity`);
                setActivity(res.data);
            } catch (e) {
                console.error("Activity load error", e);
            }
        };

        loadActivity();
    }, [projectId]);

    useEffect(() => {
        if (!socket) return;

        const onNewActivity = (data) => {
            setActivity((prev) => [data, ...prev]);
        };

        socket.on("activity:new", onNewActivity);

        return () => socket.off("activity:new", onNewActivity);
    }, [socket]);

    return (
        <div className="p-4 overflow-y-auto">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
                Activity
            </h3>

            <div className="space-y-4">
                {activity.map((a, index) => (
                    <div key={index} className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-xs font-bold">
                            {a.user.username.charAt(0).toUpperCase()}
                        </div>

                        <div>
                            <p className="text-sm text-gray-800 dark:text-gray-100">
                                <span className="font-semibold">{a.user.username}</span>{" "}
                                {a.description}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                <Clock size={12} />{" "}
                                {new Date(a.timestamp).toLocaleTimeString()}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ActivityTimeline;
