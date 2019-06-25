export interface User {
    user_id: string;
    name: string; // name of the user
    email: string; // email address of the user
    is_anonymous: boolean; // true if user has not yet signed up (guest)
    picture?: string; // url of profile picture
}
