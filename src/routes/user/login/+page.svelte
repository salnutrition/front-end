<script lang="ts">
    import { goto } from '$app/navigation';
    import { preventDefault, formDataToJson, getPath} from '$lib/util/dom';

    var successMessage = $state('');
    var errorMessage = $state('');

    async function loginUser(e: SubmitEvent) {
        const action:string = (e.currentTarget as HTMLFormElement).getAttribute('action')??'';
        const formData = new FormData(e.currentTarget as HTMLFormElement);

        try {
            const response = await fetch(action, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formDataToJson(formData)),
            });

            if (response.ok) {
                const data = await response.json();
                const token = data.token; 
                
                sessionStorage.setItem('authToken', token);

                successMessage = 'Logged in...';
                errorMessage = '';
                setTimeout(() => goto('/user'), 200); // Redirect to home page
            } else {
                const data = await response.json();
                errorMessage = data.error || 'Login failed.';
                successMessage = '';
            }
        } catch (error) {
            errorMessage = 'An error occurred. Please try again.';
            successMessage = '';
        }
    }
</script>
<form onsubmit={preventDefault(loginUser)} action={getPath("api/users/login/")} class="items-center flex flex-col w-full">
    <fieldset class="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
        <legend class="fieldset-legend">Login</legend>
        {#if errorMessage}
            <div class="alert alert-error">
                <span>{errorMessage}</span>
            </div>
        {/if}
        {#if successMessage}
            <div class="alert alert-success">
                <span>{successMessage}</span>
            </div>
        {/if} 
        
        <label class="label" for="username">
            <span class="label-text">Username</span>
        </label>
        <input type="text" id="username" name="username" class="input input-bordered" required />
        
        <label class="label" for="password">
            <span class="label-text">Password</span>
        </label>
        <input type="password" id="password" name="password" class="input input-bordered" required />
        
        <button type="submit" class="btn btn-primary mt-4">Login</button> 

        <!-- Separator and Register Link -->
        <hr class="my-4 w-full border-base-300" />
        <p class="text-sm text-center">
            Don't have an account? <a href="/user/register" class="link link-primary">Register here</a>
        </p>
    
    </fieldset>
</form>