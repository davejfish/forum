export default function createUpsertProfile(form, handleUpsertProfile) {

    const nameInput = document.querySelector('#username');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formdata = new FormData(form);

        const data = {
            username: formdata.get('name'),
            avatar: formdata.get('avatar')
        };

        handleUpsertProfile(data);
        form.reset();
    });

    const fileInput = document.querySelector('#file-input');
    const previewImage = document.querySelector('.avatar-preview');

    fileInput.addEventListener('change', () => {
        const [file] = fileInput.files;
        previewImage.src = URL.createObjectURL(file);
    });

    return ({ profiles }) => {
        if (profiles) {
            const username = profiles.name;
            const avatar = profiles.avatar;
            if (username) nameInput.value = username;
            if (avatar) previewImage.src = avatar;
        }
    };
}