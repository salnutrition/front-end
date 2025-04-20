export class User {
    id: string;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    bio: string;
    profile_picture: string;

    constructor(
        id: string,
        username: string,
        email: string,
        first_name: string,
        last_name: string,
        bio: string,
        profile_picture: string,
    ) {
        this.id = id
        this.username = username 
        this.email = email
        this.first_name = first_name
        this.last_name = last_name
        this.bio = bio
        this.profile_picture = profile_picture
    }
}

export class _User {
    username: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;

    constructor(
        username: string,
        email: string,
        password: string,
        first_name: string,
        last_name: string,
    ) {
        this.username = username 
        this.email = email
        this.password = password
        this.first_name = first_name
        this.last_name = last_name
    }
}