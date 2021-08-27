const up = document.querySelector('#btn_upload');
const su = document.querySelector('#btn_submit');

up.addEventListener('click', () => {
    su.classList.toggle('active');
})
