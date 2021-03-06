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

async function inProfiles(user_id) {
    const response = await client
        .from('profiles')
        .select('user_id');

    for (let i of response.body) {
        if (i.user_id === user_id) {
            return true;
        }
    }
    return false;
}

//allow users to update their own profile data
export async function updateProfile(profile) {

    const result = await inProfiles(profile.user_id);

    if (result) {
        const response = await client.from('profiles').update(profile).eq('user_id', profile.user_id).single();
        return checkResponse(response);
    }

    const response2 = await client.from('profiles').insert(profile).single();
    return checkResponse(response2);

}

export async function getPosts({ start, end }) {
    let response = client
        .from('posts')
        .select(`
        *, 
        profiles (*)`,
        { count: 'exact' })
        .limit(5)
        .order('created_at', { ascending: false });

    response = response.range(start, end);

    const query = await response;
    return query;
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

    const { data, error } = await client.from('profiles').select('*').eq('id', id).single();

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
        const user = await getProfileById(post.profile_id);
        post.profiles = user;
        listener(post);
    }).subscribe();
}