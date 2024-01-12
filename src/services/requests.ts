import axios, { AxiosInstance } from "axios";
import AuthService from "./security/auth-service";

export class RequestHelper {
  private baseURL = "";
  apiClient: AxiosInstance;

  constructor(baseUrl: string) {
    this.baseURL = baseUrl;
    this.apiClient = axios.create({
      baseURL: this.baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.apiClient.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");

        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  newAbortSignal(timeoutMs: number) {
    const abortController = new AbortController();
    setTimeout(() => abortController.abort, timeoutMs || 0);

    return abortController.signal;
  }

  get = async (url: string): Promise<any> => {
    return this.apiClient
      .get<any>(this.baseURL + url, {
        signal: this.newAbortSignal(5000),
      })
      .then((res) => res.data);
  };

  post = (url: string, body: any) => {
    const cancelToken = axios.CancelToken.source();

    return this.apiClient
      .post<any>(this.baseURL + url, body, {
        signal: this.newAbortSignal(5000),
      })
      .then((res) => res.data)
      .catch((err) => {
        if (axios.isCancel(err)) {
          return;
        }
        return err;
      });
  };
}
