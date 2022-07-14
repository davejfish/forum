export default function createPosts(div) {
    return ({ posts }) => {
        div.innerHTML = '';

        for (const post of posts) {
            const item = Post({ post });
            div.append(item);
        }
    };
}

function Post({ post }) {
    const div = document.createElement('div');
    div.classList.add('posts');

    const profilePic = document.createElement('img');
    profilePic.classList.add('image');
    profilePic.src = post.profiles.avatar;
    profilePic.alt = post.profiles.name;

    const userName = document.createElement('span');
    userName.classList.add('username');
    userName.textContent = post.profiles.name;

    const date = document.createElement('span');
    date.classList.add('date');
    date.textContent = post.String(post.created_at);

    const postContent = document.createElement('p');
    postContent.classList.add('post');
    postContent.textContent = post.content;

    div.append(profilePic, userName, date, postContent);

    return div;
}