import { writable, type Writable } from 'svelte/store';
import { browser } from '$app/environment';
import type { User } from '$lib/models/user';


const storedUser = browser ? localStorage.getItem('user') : null;
export const user: Writable<User | null> = writable(storedUser ? JSON.parse(storedUser) : null);

user.subscribe((val) => browser && localStorage.setItem("user",JSON.stringify(val)));

export function setUser(userData: User) {
    user.set( userData );
}

export function clearUser() {
    user.set( null );
}