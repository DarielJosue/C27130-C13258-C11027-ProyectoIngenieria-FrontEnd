import apiClient from './apiClient';

export const createJobPost = async (payload: {

  title: string;
  description: string;
  requirements: string;
  salary: number;
  location: string;
}) => {
  const response = await apiClient.post('/company/create-post', payload);
  return response.data;

}
export const getAllJobPosts = async () => {
  const response = await apiClient.get("/job-posts");
  return response.data;
};


export const getCompanyJobPosts = async (companyId: string) => {
  const response = await apiClient.get(`/job-posts/by-company/${companyId}`);
  return response.data.data;
};

export const getJobPostById = (id: number) => apiClient.get(`/job-posts/${id}`);

export const applyToJobPost = (id: number) => apiClient.post(`/job-posts/${id}/apply`);

export const saveJobPost = (id: number) => apiClient.post(`/job-posts/${id}/save`);