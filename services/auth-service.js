import { checkResponse, client } from './client.js';

export function getUser() {
    return client.auth.user();
}

export async function signUp(email, password) {
    return await client.auth.signUp({ email, password });
}

export async function signIn(email, password) {
    return await client.auth.signIn({ email, password });
}

export async function signOut() {
    return await client.auth.signOut();
}


//find User on the profiles table
export async function getProfile() {
    const user = getUser();
    const response = await client.from('profiles').select().eq('user_id', user.id);

    const rows = checkResponse(response);
    return rows[0] || null;
}

//upload new images to the public bucket 'forum-bucket'
const BUCKET_NAME = 'forum-bucket';

export async function uploadAvatar(userId, imageFile) {
    const imageName = `${userId}/${imageFile.name}`;

    const bucket = client.storage.from(BUCKET_NAME);

    const { data, error } = await bucket.upload(imageName, imageFile, { cacheControl: '3600', upsert: true });

    if (error) {
        //eslint-disable-next-line no-console
        console.log(error);
        return null;
    }

    const url = bucket.getPublicUrl(data.Key.replace(`${BUCKET_NAME}/`, '')).publicURL;

    return url;
}

//allow users to update their own profile data
export async function updateProfile(profile) {

    const response = await client.from('profiles').upsert(profile).eq('user_id', profile.user_id).single();

    return checkResponse(response);
}

export async function getPosts() {
    const response = await client
        .from('posts')
        .select(`
        *, 
        profiles (*)`)
        .order('created_at', { ascending: false })
        .limit(15);

    return checkResponse(response);
}

export async function addPost(content) {
    const response = await client
        .from('posts')
        .insert(content)
        .single();

    return checkResponse(response);
}

const users = new Map();

export async function getProfileById(id) {
    if (users.has(id)) {
        return users.get(id);
    }

    const { data, error } = await client.from('profiles').select('*').eq('user_id', id).single();

    if (error) {
        //eslint-disable-next-line no-console
        console.log(error);
        return null;
    }

    users.set(id, data);
    return data;
}


export function targetPosts(listener) {
    client.from('posts').on('INSERT', async (payload) => {
        const post = payload.new;
        const user = await getProfileById(post.profiles.user_id);
        post.name = user;
        listener(post);
    })
        .subscribe();
}