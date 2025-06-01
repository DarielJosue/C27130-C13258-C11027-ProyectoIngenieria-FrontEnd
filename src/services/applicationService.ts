import apiClient from './apiClient';

export const applyToJob = async ({
    jobPostId,
    curriculumId,
    message,
}: {
    jobPostId: number;
    curriculumId: number | null;
    message: string;
}) => {
    return await apiClient.post('/job-posts/apply', {
        job_post_id: jobPostId,
        cv_id: curriculumId,
        message,
    });
};

export const getCompanyApplications = async (companyId: string) => {
    const response = await apiClient.get(`/applications/by-company/${companyId}`);
    return response.data;
};
export const updateApplicationStatus = async (application_id: string, status: string) => {
    try {
        const response = await apiClient.put(`/applications/${application_id}/status`, { status });
        return response.data;
    } catch (error: any) {
        if (error.response) {

            console.error('Error:', {
                status: error.response.status,
                data: error.response.data,
                headers: error.response.headers
            });
        } else if (error.request) {
            console.error('Sin respuesta:', error.request);
        } else {
            console.error('Error de configuración:', error.message);
        }
        throw error;
    }
};