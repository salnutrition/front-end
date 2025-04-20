<script lang="ts">
	import Header from '$lib/components/NavBarComponents/Header.svelte';
	import '../app.css';
	import { navbarItems } from '$lib/data/navbarItems'
	import { onMount } from 'svelte';
	import { User } from '$lib/models/user';
	import { user, setUser, clearUser} from '$lib/stores/user';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';

	let { children } = $props();
	
	const themes = ['lemonade', 'forest'];
    
	let currentTheme = themes[0];
	function toggleTheme() {
        const currentIndex = themes.indexOf(currentTheme);
        currentTheme = themes[(currentIndex + 1) % themes.length]; // Cycle through themes
        document.documentElement.setAttribute('data-theme', currentTheme); // Update the theme
    }

	async function getUser() {
		const action:string = "http://localhost:8000/api/users/me/";
		const token = sessionStorage.getItem('authToken'); 

		try{
			const response = await fetch(action,{
				method: 'GET',
				headers: {
					'Authorization': `Token ${token}`,
					'Content-Type': 'application/json',
				},				
			});
			if (response.ok) {
				const data = await response.json();
				setUser(data.user);
				
			} else {
				console.error('Error fetching user data:', response.statusText); 
				clearUser();
			}
		} catch (error) {
			console.error('Error:', error);
			clearUser();
		}	
	}
	
	$effect(() => {if (page.url.pathname!='/user/login') getUser()})
	$effect(() => {if (!$user) setTimeout(() => goto('/user/login'), 200)})

	onMount(() => {
		getUser();
	});

</script>

<div class="flex flex-col min-h-screen">
	<Header items={navbarItems}/>

	<main class="flex-1 flex flex-col p-4 w-full max-w-4xl mx-auto box-border">
        {@render children()}
	</main>

	<footer class="flex flex-col justify-center items-center p-3 md:p-0">
		<p>
			<button
			type="button"
            onclick={toggleTheme}
            class="btn btn-primary self-end mb-4"
            aria-label="Toggle Theme"
        >
            Change Theme
        </button>
			visit <a href="https://svelte.dev/docs/kit" class="font-bold">svelte.dev/docs/kit</a> to learn about SvelteKit
		</p>
	</footer>
</div>

<style>
	
</style>
