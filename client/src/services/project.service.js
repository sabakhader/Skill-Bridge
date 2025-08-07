import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Configure axios with auth token
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Get all projects with filters
export const getProjects = async (filters = {}) => {
  const queryParams = new URLSearchParams(filters).toString();
  const response = await axios.get(`${API_URL}/projects?${queryParams}`);
  return response.data;
};

// Get project by ID
export const getProjectById = async (projectId) => {
  const response = await axios.get(`${API_URL}/projects/${projectId}`);
  return response.data;
};

// Create new project
export const createProject = async (projectData) => {
  const response = await axios.post(`${API_URL}/projects`, projectData, {
    headers: getAuthHeader(),
  });
  return response.data;
};

// Update project
export const updateProject = async (projectId, projectData) => {
  const response = await axios.put(
    `${API_URL}/projects/${projectId}`,
    projectData,
    {
      headers: getAuthHeader(),
    }
  );
  return response.data;
};

// Apply to project
export const applyToProject = async (projectId, applicationData) => {
  const response = await axios.post(
    `${API_URL}/projects/${projectId}/apply`,
    applicationData,
    {
      headers: getAuthHeader(),
    }
  );
  return response.data;
};

// Update application status
export const updateApplicationStatus = async (projectId, applicationId, status) => {
  const response = await axios.put(
    `${API_URL}/projects/${projectId}/applications/${applicationId}`,
    { status },
    {
      headers: getAuthHeader(),
    }
  );
  return response.data;
};

// Add milestone
export const addMilestone = async (projectId, milestoneData) => {
  const response = await axios.post(
    `${API_URL}/projects/${projectId}/milestones`,
    milestoneData,
    {
      headers: getAuthHeader(),
    }
  );
  return response.data;
};

// Update milestone status
export const updateMilestoneStatus = async (projectId, milestoneId, status) => {
  const response = await axios.put(
    `${API_URL}/projects/${projectId}/milestones/${milestoneId}`,
    { status },
    {
      headers: getAuthHeader(),
    }
  );
  return response.data;
};

// Get similar projects
export const getSimilarProjects = async (projectId) => {
  const response = await axios.get(
    `${API_URL}/projects/${projectId}/similar`
  );
  return response.data;
};

const projectService = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  applyToProject,
  updateApplicationStatus,
  addMilestone,
  updateMilestoneStatus,
  getSimilarProjects,
};

export default projectService; 