import { User } from '../types/user';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

export async function register(user: User) {
    const res = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
    });
    return res.json();
}

export async function login(user: User) {
    const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
    });
    return res.json();
}
