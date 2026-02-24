import type { CreateTaskRequest, Task } from "../types/task.types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8081/api/tasks";

async function parseError(response: Response): Promise<string> {
  const raw = await response.text();

  try {
    const data = JSON.parse(raw) as {
      message?: string;
      errors?: Record<string, string>;
    };

    if (data?.errors && Object.keys(data.errors).length > 0) {
      return Object.values(data.errors)[0];
    }

    return data?.message || "Ocurrió un error";
  } catch {
    return raw?.slice(0, 200) || "Ocurrió un error";
  }
}



export const taskService = {
    async getTasks(title?: string, id?: number): Promise<Task[]> {
        const url = new URL(API_URL); 
        
        if (title?.trim()) {
            url.searchParams.set("title", title.trim());
        }
        if (id) {
            url.searchParams.set("id", id.toString());
        }

        const response = await fetch(url.toString());

        if (!response.ok) {
            
            throw new Error(await parseError(response));
        }
        return response.json() as Promise<Task[]>;
    },

    async createTask(payload: CreateTaskRequest): Promise<Task> {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        if (!response.ok) {
            throw new Error(await parseError(response));
        }
        return response.json();
    },

    async deleteTask(id: number): Promise<void> {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error(await parseError(response));
        }
    },

    async updateTask(id: number, payload: CreateTaskRequest): Promise<Task> {   

        const response = await fetch(`${API_URL}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
            if (!response.ok) {
                throw new Error(await parseError(response));
            }
            return response.json();
        }
    }