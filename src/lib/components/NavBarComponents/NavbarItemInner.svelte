<script lang="ts">
    import { page } from '$app/state';
    import type { NavbarItemData } from '$lib/models/types';
    import { scale, slide } from 'svelte/transition'; 
    import { cubicOut } from 'svelte/easing';
    
    let { item, isAnyChildActive = false }: {item: NavbarItemData, isAnyChildActive?: boolean} = $props(); 
    let isActive = $derived(page.url.pathname===item.path || isAnyChildActive );

    function handleLinkClick(event:any) {
        if(item.path===""){
            event.preventDefault();
            event.currentTarget.parentNode?.dispatchEvent(new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                composed: true
            }));
        }
    }
</script>

<a 
    class="items-center lg:flex" 
    href={item.path} 
    onclick={handleLinkClick}>
    <span 
        class="lg:flex text-sm uppercase tracking-wide text-base-content items-center"
        class:lg:flex-col={item.isMain} 
    >
    
        <span 
            class="inline-block {!isActive? 'w-0 h-0 ishidden' : 'w-2 h-2'}  bg-primary rounded-full"
            class:lg:w-6={item.isMain}
            in:scale={{ duration: 250, easing: cubicOut }} out:scale={{ duration: 300, easing: cubicOut }}        
        ></span>
    
        <span 
            class="transition-transform duration-300 ease-out"
            style="transform: translateY({isActive && item.isMain ? '0.25rem' : '0'}) 
                              translateX({isActive && !item.isMain ? '0.25rem' : '0'})"
        >
            {item.title}
        </span>
    </span>
</a>

<style>
    .ishidden {
        visibility:hidden;
    }
</style>