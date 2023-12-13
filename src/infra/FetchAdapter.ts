import router from "@/router";
import HttpClient from "./HttpClient";
import { RouteRecordName } from "vue-router";

export default class FetchAdapater implements HttpClient {
    
    async get(url: string): Promise<any> {
        const req = await fetch(url);
        const response = await req.json();        
        return response
    }
    async post(url: string, body: any): Promise<any> {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        return response
    }
    async put(url: string, body: any): Promise<any> {
        const response = await fetch(url, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        return response
    }
    async delete(url: string): Promise<any> {
        const response = await fetch(url, {
            method: "DELETE",
        });
        return response
    }    
}