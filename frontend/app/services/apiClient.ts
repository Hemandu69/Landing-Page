import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

// Request Interceptor: Attach Bearer Access Token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const accessToken = localStorage.getItem("access_token");
      if (accessToken && config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle 401 & Automatic Refresh Token Rotation
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else if (token) {
      promise.resolve(token);
    }
  });
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      // Avoid infinite refresh loop for refresh/logout requests
      if (originalRequest.url?.includes("/api/auth/refresh") || originalRequest.url?.includes("/api/auth/logout")) {
        if (typeof window !== "undefined") {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
        }
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
              }
              resolve(apiClient(originalRequest));
            },
            reject: (err: any) => {
              reject(err);
            },
          });
        });
      }

      isRefreshing = true;

      try {
        const storedRefreshToken = typeof window !== "undefined" ? localStorage.getItem("refresh_token") : null;

        if (!storedRefreshToken) {
          throw new Error("No refresh token available");
        }

        const response = await axios.post(
          `${API_BASE_URL}/api/auth/refresh`,
          { refresh_token: storedRefreshToken },
          { headers: { "Content-Type": "application/json" } }
        );

        const { access_token, refresh_token: new_refresh_token } = response.data;

        if (typeof window !== "undefined") {
          localStorage.setItem("access_token", access_token);
          if (new_refresh_token) {
            localStorage.setItem("refresh_token", new_refresh_token);
          }
        }

        apiClient.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
        }

        processQueue(null, access_token);
        return apiClient(originalRequest);
      } catch (refreshErr) {
        processQueue(refreshErr, null);
        if (typeof window !== "undefined") {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          // Signal auth state reset
          window.dispatchEvent(new Event("auth:unauthorized"));
        }
        return Promise.reject(refreshErr);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
