document.addEventListener('DOMContentLoaded', (event) => {
    // let infoBtns = document.getElementsByClassName('js-btn-info');
    // let detailsBtns = document.getElementsByClassName('js-btn-details');

    // Array.from(infoBtns).forEach(element => {
    //     element.addEventListener('click', (event) => {
    //         event.preventDefault();

    //         let latestItem = element.closest('.js-latest-item');
    //         if (latestItem.classList.contains('pin')) {
    //             latestItem.classList.remove('pin');
    //         } else {
    //             latestItem.classList.add('pin');
    //         }
    //     });
    // });

    // Array.from(detailsBtns).forEach(element => {
    //     element.addEventListener('click', (event) => {
    //         event.preventDefault();

    //         let latestItem = element.closest('.js-latest-item');
    //         if (latestItem.classList.contains('pin')) {
    //             latestItem.classList.remove('pin');
    //         } else {
    //             latestItem.classList.add('pin');
    //         }
    //     });
    // });

    preventHrefSharp();
});

let preventHrefSharp = () => {
    let tags = document.getElementsByTagName('a');

    Array.from(tags).forEach(element => {
        if (element.href.slice(-1) == '#') {
            element.addEventListener('click', (event) => {
                event.preventDefault();
            } )
        }
    });
};
