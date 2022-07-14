import { getUser, signOut } from '../services/auth-service.js';
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

    display();
}

async function handleSignOut() {
    signOut();
}

async function handleUpsertProfile(username, avatar) {
    // eslint-disable-next-line no-console
    console.log(`update or insert ${username} with avatar: ${avatar}`);
}

// Components 
const User = createUser(
    document.querySelector('#user'),
    { handleSignOut }
);

const UpsertProfile = createUpsertProfile(document.querySelector('.profile-form'), handleUpsertProfile);

function display() {
    User({ user });
    UpsertProfile({ profile: state.profiles });
}

handlePageLoad();
