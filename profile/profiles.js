import { getProfile, getUser, signOut, updateProfile, uploadAvatar } from '../services/auth-service.js';
import { protectPage } from '../utils.js';
import createUser from '../components/User.js';
import createUpsertProfile from '../components/upsertProfiles.js';

// State
let user = null;
import state from '../state.js';

// Action Handlers
async function handlePageLoad() {
    user = getUser();
    protectPage(user);

    state.profiles = await getProfile();

    display();
}

async function handleSignOut() {
    signOut();
}

async function handleUpsertProfile({ username, avatar }) {
    let url = '';
    if (avatar.size) {
        url = await uploadAvatar(user.id, avatar);
    }

    const update = {
        user_id: user.id,
        name: username,
    };

    if (url) update.avatar = url;

    state.profiles = await updateProfile(update);

    location.assign('/');
}

// Components 
const User = createUser(
    document.querySelector('#user'),
    { handleSignOut }
);

const UpsertProfile = createUpsertProfile(document.querySelector('.profile-form'), handleUpsertProfile);

function display() {
    User({ user });
    UpsertProfile({ profiles: state.profiles });
}

handlePageLoad();
