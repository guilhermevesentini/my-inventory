import HttpClient from "./HttpClient";

export default class FetchAdapater implements HttpClient {
    
    async get(url: string): Promise<unknown> {
        const req = await fetch(url);
        const response = await req.json();        
        return response
    }
    async post(url: string, body: unknown): Promise<unknown> {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        return response
    }
    async put(url: string, body: unknown): Promise<unknown> {
        const response = await fetch(url, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        return response
    }
    async delete(url: string): Promise<unknown> {
        const response = await fetch(url, {
            method: "DELETE",
        });
        return response
    }    
}