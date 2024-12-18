export async function fetchApi<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.error || 'API request failed');
  }

  return data.data;
}

export const api = {
  features: {
    list: (projectId?: string) => fetchApi(`/api/features${projectId ? `?projectId=${projectId}` : ''}`),
    create: (data: any) => fetchApi('/api/features', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    update: (id: string, data: any) => fetchApi(`/api/features/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
    delete: (id: string) => fetchApi(`/api/features/${id}`, {
      method: 'DELETE',
    }),
  },
  projects: {
    list: () => fetchApi('/api/projects'),
    create: (data: any) => fetchApi('/api/projects', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    update: (id: string, data: any) => fetchApi(`/api/projects/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
    delete: (id: string) => fetchApi(`/api/projects/${id}`, {
      method: 'DELETE',
    }),
  },
  effortConfigs: {
    list: () => fetchApi('/api/effort-configs'),
    create: (data: any) => fetchApi('/api/effort-configs', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    update: (id: string, data: any) => fetchApi(`/api/effort-configs/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
    delete: (id: string) => fetchApi(`/api/effort-configs/${id}`, {
      method: 'DELETE',
    }),
  },
};