export default function createUpsertProfile(form, handleUpsertProfile) {

    const formdata = new FormData(form);
    const data = {
        username: formdata.get('name'),
        avatar: formdata.get('avatar')
    };

    return () => {

    };
}