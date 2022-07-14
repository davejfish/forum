export default function createPost(form, handleAddPost) {

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formdata = new FormData(form);

        await handleAddPost(formdata.get('content'));
        form.reset();
    });

    return () => {

    };
}