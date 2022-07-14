export default function createUpsertProfile(form, handleUpsertProfile) {



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

    return () => {

    };
}