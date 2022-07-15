import { addPost, getPosts, getProfile, getUser, signOut, targetPosts } from './services/auth-service.js';
import { enforceProfile, protectPage } from './utils.js';
import createUser from './components/User.js';
import createPosts from './components/postObject.js';
import createPost from './components/createPost.js';
import createPaging from './components/Paging.js';

// State
let user = null;
import state from './state.js';

// Action Handlers
async function handlePageLoad() {
    user = getUser();
    protectPage(user);
    
    state.profiles = await getProfile();
    enforceProfile(state.profiles);

    const params = new URLSearchParams(window.location.search);

    state.page = Number(params.get('page')) || 1;
    state.pageSize = Number(params.get('pageSize')) || 5;

    const start = (state.page - 1) * state.pageSize;
    const end = (state.page * state.pageSize) - 1;

    const response = await getPosts({ start, end });
    state.posts = response.data;
    state.totalPages = Math.ceil(response.count / state.pageSize);

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

//handle paging function
function handlePaging(change, size) {
    //get params
    const params = new URLSearchParams(window.location.search);

    if (Number(size) === state.pageSize) {
        state.page = Math.max(1, state.page + change);
    }
    else {
        state.page = 1;
    }

    params.set('page', state.page);
    params.set('pageSize', size);
    window.location.search = params.toString();
}

function handleFirstLast(page, size) {
    const params = new URLSearchParams(window.location.search);

    state.page = page;
    params.set('page', state.page);
    params.set('pageSize', size);

    window.location.search = params.toString();
}

// Components 
const User = createUser(
    document.querySelector('#user'),
    { handleSignOut }
);

const PostObject = createPosts(document.querySelector('.auto-grid'));
const CreatePost = createPost(document.querySelector('.form-post'), handleAddPost);

const Paging = createPaging(document.querySelector('.posts-section'), { handlePaging, handleFirstLast });

function display() {
    User({ user });
    Paging({ page: state.page, totalPages: state.totalPages });
    CreatePost();
    PostObject({ posts: state.posts });
}

handlePageLoad();
