export default function createPaging(root, { handlePaging }) {
    const pageInfo = root.querySelector('.page-info');
    const [first, last, prev, next] = root.querySelectorAll('button');

    prev.addEventListener('click', () => {
        handlePaging(-1, 15);
    });

    next.addEventListener('click', () => {
        handlePaging(1, 15);
    });

    first.addEventListener('click', () => {
        handlePaging();
    });

    last.addEventListener('click', () => {
        handlePaging();
    });

    return ({ page, totalPages }) => {

        prev.disabled = page === 1;
        next.disabled = page === totalPages;

        pageInfo.textContent = `Page ${page} of ${totalPages}`;
    };
} 