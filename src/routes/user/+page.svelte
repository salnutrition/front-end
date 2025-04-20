<script lang="ts">
    import { goto } from '$app/navigation';
    import { preventDefault, getPath } from '$lib/util/dom';
    import { user, clearUser, setUser } from '$lib/stores/user';

    async function logoutUser(e: SubmitEvent) {
        const action:string = (e.currentTarget as HTMLFormElement).getAttribute('action')??'';
        const token = sessionStorage.getItem('authToken'); 

        try {
            const response = await fetch(action, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                }
            });

            if (response.ok) {
                
                sessionStorage.removeItem('authToken');
                clearUser();
                setTimeout(() => goto('/user/login'), 200); 
            }
        } catch (error) {

        }
    }

    async function uploadProfilePicture(e: SubmitEvent) {
        debugger
        const action: string = getPath("api/users/upload-profile-picture/");
        const token = sessionStorage.getItem('authToken');
        const formData = new FormData(e.currentTarget as HTMLFormElement);

        try {
            const response = await fetch(action, {
                method: 'PUT',
                headers: {
                    'Authorization': `Token ${token}`,
                },
                body: formData, // Send the file as FormData
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.message);
                setUser(data.user); // Update the user store with the new profile picture URL
                
            } else {
                console.error('Error uploading profile picture:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
</script>
<form onsubmit={preventDefault(logoutUser)} action={getPath("api/users/logout/")} class="items-center flex flex-col w-full">
    <fieldset class="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
        <legend class="fieldset-legend">Options</legend>
  
        <button type="submit" class="btn btn-primary mt-4">LogOut</button> 
    
    </fieldset>
</form>


<form onsubmit={preventDefault(uploadProfilePicture)} class="items-center flex flex-col w-full mt-4">
    <fieldset class="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
        <legend class="fieldset-legend">Upload Profile Picture</legend>
        
        <label class="label" for="profilePicture">
            <span class="label-text">Choose a profile picture</span>
        </label>
        <input type="file" id="profilePicture" name="profile_picture" class="input input-bordered" accept="image/*" required />
        
        <button type="submit" class="btn btn-primary mt-4">Upload</button>
    </fieldset>
</form>