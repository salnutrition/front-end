<script lang="ts">
	import NavbarItem from '$lib/components/NavBarComponents/NavbarItem.svelte';
	import UserIcon from '$lib/images/user_icon.svelte';
	import HomeIcon from '$lib/images/salnutrition_logo.svelte';
	import type { NavbarItemData } from '$lib/models/types';
	import { user } from '$lib/stores/user';
	import { getPath } from '$lib/util/dom';

	let { items } : { items : NavbarItemData[] }= $props();
</script>

<div class="navbar bg-base-100 shadow-sm">
	
		<div class="navbar-start">
			<div class="corner w-12 h-12">
				<a href="/" class="flex items-center justify-center w-full h-full text-primary">
					<HomeIcon />
				</a>
			</div>
			{#if $user}
			<div class="dropdown">
				<div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
				</div>
				<ul  
					class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
					{#each items as navbarItem}
						<NavbarItem item={navbarItem} />
					{/each}
				</ul>
			</div>
			{/if}
		</div>
	{#if $user}
		<div class="navbar-center hidden lg:flex">
			<ul class="menu menu-horizontal px-1">
				{#each items as navbarItem}
					<NavbarItem item={navbarItem} />
				{/each}
			</ul>
		</div>
	{/if}
	<div class="navbar-end">
		<div class="corner w-12 h-12">
			{#if $user}
				<a href="/user" class="flex items-center justify-center w-full h-full text-primary">
					<img src={getPath($user.profile_picture)} alt="User profile" class="rounded-full w-8 h-8" />
				</a>
			{:else}
				<a href="/user/login" class="flex items-center justify-center w-full h-full text-primary">
					<UserIcon />
				</a>
			{/if}
		</div>
	</div>
	
	
</div>