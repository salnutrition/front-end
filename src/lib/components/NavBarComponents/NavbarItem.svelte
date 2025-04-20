<script lang="ts">
    import { onMount } from 'svelte';
    import { page } from '$app/state';
    import NavbarItem from '$lib/components/NavBarComponents/NavbarItem.svelte';
    import NavbarItemInner from '$lib/components/NavBarComponents/NavbarItemInner.svelte';
    import type { NavbarItemData } from '$lib/models/types';
    let { item } : { item: NavbarItemData } = $props();
    
    let isAnyChildActive = $derived(item.subitems ? item.subitems.some(subitem => subitem.path === page.url.pathname) : false );
    
    let detailsElement: HTMLDetailsElement | null = $state(null);
    function handleClickOutside(event: MouseEvent) {
        if (detailsElement && !detailsElement.contains(event.target as Node)) {
            detailsElement.open = false;
        }
    }

    onMount(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    });

</script>

<li class="relative lg:flex">
    {#if item.subitems}
        <details bind:this={detailsElement}>
            <summary class="lg:flex">
                <NavbarItemInner item={item} isAnyChildActive={isAnyChildActive} />
            </summary>
            <ul class:margintop-active={isAnyChildActive}
                class:margintop-not-active={!isAnyChildActive}
                class="menu-horizontal-override p-2 lg:p-0 minimumwidth">
                {#each item.subitems as subitem}
                    <NavbarItem item={subitem} />
                {/each}
            </ul>
        </details>
    {:else}
        <NavbarItemInner item={item} />
    {/if}
</li>

<style>
    .minimumwidth {
        width: max-content;
    }
    .margintop-active {
        @media (min-width: 1024px) {
            margin-top: 1rem !important;
        }
    }
    .margintop-not-active {
        @media (min-width: 1024px) {
            margin-top: 1.5rem !important;
        }
    }
</style>