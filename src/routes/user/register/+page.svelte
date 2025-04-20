<script lang="ts">
    import { goto } from '$app/navigation';
    import { _User } from '$lib/models/user';
    import { preventDefault } from '$lib/util/dom';

    var successMessage = $state('');
    var errorMessage = $state('');

    async function registerUser(e: SubmitEvent) {
        debugger
        const action:string = (e.currentTarget as HTMLFormElement).getAttribute('action')??'';
        const formData = new FormData(e.currentTarget as HTMLFormElement);

        const password = formData.get('password')?.toString() ?? '';
        const confirmPassword = formData.get('confirm_password')?.toString() ?? '';

        if (password !== confirmPassword) {
            errorMessage = 'Passwords do not match.';
            successMessage = '';
            return;
        }

        var user:_User = {
            username: formData.get('username')?.toString() ?? '',
            first_name: formData.get('first_name')?.toString() ?? '',
            last_name: formData.get('last_name')?.toString() ?? '',
            email: formData.get('email')?.toString() ?? '',
            password: password
        };

        try {
            const response = await fetch(action, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            if (response.ok) {
                successMessage = 'Registration successful! Redirecting to login...';
                errorMessage = '';
                setTimeout(() => goto('/user/login'), 200); // Redirect to login page
            } else {
                const data = await response.json();
                errorMessage = data.error || 'Registration failed.';
                successMessage = '';
            }
        } catch (error) {
            errorMessage = 'An error occurred. Please try again.';
            successMessage = '';
        }
    }
</script>
<form onsubmit={preventDefault(registerUser)} action="http://localhost:8000/api/users/register/" class="items-center flex flex-col w-full">
    <fieldset class="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
        <legend class="fieldset-legend">Register</legend>
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
        
        <label class="label" for="first_name">
            <span class="label-text">First Name</span>
        </label>
        <input type="text" id="first_name" name="first_name" class="input input-bordered" required />
        
        <label class="label" for="last_name">
            <span class="label-text">Last Name</span>
        </label>
        <input type="text" id="last_name" name="last_name" class="input input-bordered" required />
        
        <label class="label" for="email">
            <span class="label-text">Email</span>
        </label>
        <input type="email" id="email" name="email" class="input input-bordered" required />
        
        <label class="label" for="password">
            <span class="label-text">Password</span>
        </label>
        <input type="password" id="password" name="password" class="input input-bordered" required />
        
        <label class="label" for="confirm_password">
            <span class="label-text">Confirm Password</span>
        </label>
        <input type="password" id="confirm_password" name="confirm_password" class="input input-bordered" required />
        
        <button type="submit" class="btn btn-primary mt-4">Register</button> 
    
    </fieldset>
</form>