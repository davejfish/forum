import { addPost, getPosts, getProfile, getUser, signOut, targetPosts } from './services/auth-service.js';
import { enforceProfile, protectPage } from './utils.js';
import createUser from './components/User.js';
import createPosts from './components/postObject.js';
import createPost from './components/createPost.js';

// State
let user = null;
import state from './state.js';

// Action Handlers
async function handlePageLoad() {
    user = getUser();
    protectPage(user);

    state.profiles = await getProfile();
    enforceProfile(state.profiles);

    state.posts = await getPosts();
    targetPosts(post => {
        state.posts.unshift(post);
        display();
    });

    display();
}

async function handleSignOut() {
    signOut();
}

async function handleAddPost(content) {
    const postToAdd = {
        content,
        profile_id: state.profiles.id
    };

    await addPost(postToAdd);

    display();
}

// Components 
const User = createUser(
    document.querySelector('#user'),
    { handleSignOut }
);

const PostObject = createPosts(document.querySelector('.auto-grid'));
const CreatePost = createPost(document.querySelector('.form-post'), handleAddPost);

function display() {
    User({ user });
    CreatePost();
    PostObject({ posts: state.posts });

}

handlePageLoad();
