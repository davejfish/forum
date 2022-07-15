import state from '../state.js';

export default function createPaging(root, { handlePaging, handleFirstLast }) {
    const pageInfo = root.querySelector('.page-info');
    const [first, prev, next, last] = root.querySelectorAll('button');

    prev.addEventListener('click', () => {
        handlePaging(-1, 5);
    });

    next.addEventListener('click', () => {
        handlePaging(1, 5);
    });

    first.addEventListener('click', () => {
        handleFirstLast(1, 5);
    });

    last.addEventListener('click', () => {
        handleFirstLast(state.totalPages, 5);
    });

    return ({ page, totalPages }) => {

        prev.disabled = page === 1;
        next.disabled = page === totalPages;

        pageInfo.textContent = `Page ${page} of ${totalPages}`;
    };
} 