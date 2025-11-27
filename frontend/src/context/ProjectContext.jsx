import React, { createContext, useState, useContext } from 'react';
import api from '../api/axios';

const ProjectContext = createContext();

export const useProject = () => useContext(ProjectContext);

export const ProjectProvider = ({ children }) => {
    const [projects, setProjects] = useState([]);
    const [currentProject, setCurrentProject] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const res = await api.get('/projects');
            setProjects(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const createProject = async (title, description) => {
        const res = await api.post('/projects', { title, description });
        setProjects([...projects, res.data]);
        return res.data;
    };

    const fetchProjectById = async (id) => {
        setLoading(true);
        try {
            const res = await api.get(`/projects/${id}`);
            setCurrentProject(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ProjectContext.Provider value={{ projects, currentProject, loading, fetchProjects, createProject, fetchProjectById }}>
            {children}
        </ProjectContext.Provider>
    );
};
