const API_URL = 'http://localhost:5001/api/v1/activity-logs';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export const getActivityLogs = async ({ page = 1, limit = 20, search = '', entityType = 'All', dateRange = 'All' } = {}) => {
  try {
    const queryParams = new URLSearchParams({
      page,
      limit,
      ...(search && { search }),
      ...(entityType && entityType !== 'All' && { entityType: entityType.toLowerCase() }),
      ...(dateRange && dateRange !== 'All' && { dateRange }),
    });

    const response = await fetch(`${API_URL}?${queryParams}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch activity logs');
    }
    return data;
  } catch (error) {
    throw error;
  }
};
