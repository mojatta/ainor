/**
 * API client with credentials: 'include' for cookie-based auth
 */

const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:3001';

export interface ApiResponse<T = any> {
  ok: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

async function handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
  // Handle 401 - redirect to login
  if (response.status === 401) {
    if (window.location.pathname.startsWith('/dashboard')) {
      window.location.href = '/dashboard/login';
    } else if (window.location.pathname.startsWith('/ainor-admin')) {
      window.location.href = '/ainor-admin/login';
    }
    throw new Error('UNAUTHORIZED');
  }

  const data = await response.json();
  return data;
}

export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  return handleResponse<T>(response);
}

// Convenience methods
export const api = {
  get: <T = any>(endpoint: string) => 
    apiRequest<T>(endpoint, { method: 'GET' }),
  
  post: <T = any>(endpoint: string, body?: any) => 
    apiRequest<T>(endpoint, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    }),
  
  patch: <T = any>(endpoint: string, body?: any) => 
    apiRequest<T>(endpoint, {
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    }),
  
  delete: <T = any>(endpoint: string) => 
    apiRequest<T>(endpoint, { method: 'DELETE' }),
};

