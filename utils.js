
export async function protectPage(user) {
    if (!user) {
        location.replace(getAuthRedirect());
    }
}

export function getAuthRedirect() {
    const redirectUrl = encodeURIComponent(location.href);
    return `/auth/?redirectUrl=${redirectUrl.toString()}`;
}

export function enforceRedirect(profile) {
    if (!profile) {
        location.replace(`./profile/?redirectUrl=${getRedirect()}`);
    }
}

export async function enforceProfile(profile) {
    if (!profile) {
        location.replace('./profile/index.html');
    }
}

export function getRedirect() {
    const redirectUrl = encodeURIComponent(location.href);
    return `?redirectUrl=${redirectUrl.toString()}`;
}