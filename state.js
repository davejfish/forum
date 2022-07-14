const state = [];

function initialize() {
    state.profiles = [];
    state.users = [];
    state.posts = [];
    state.page = 1;
    state.pageSize = 5;
    state.totalPages = 0;
}

initialize();

export default state;

