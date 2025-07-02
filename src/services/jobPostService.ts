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
export const getAllJobPosts = async (searchTerm?: string) => {
  const params = searchTerm ? { params: { search: searchTerm } } : {};
  const response = await apiClient.get("/job-posts", params);
  return response.data;
};


export const getCompanyJobPosts = async (companyId: string) => {
  const response = await apiClient.get(`/job-posts/by-companyId/${companyId}`);
  return response.data.data;
};

export const getJobPostById = (job_post_id: number) => apiClient.get(`/job-posts/by-company/${job_post_id}`);//no tocar

export const getJobPostByCompany = () => apiClient.get('/job-posts/company');

export const applyToJobPost = (job_post_id: number) => apiClient.post(`/job-posts/${job_post_id}/apply`);

export const saveJobPost = (job_post_id: number) => apiClient.post(`/job-posts/${job_post_id}/save`);