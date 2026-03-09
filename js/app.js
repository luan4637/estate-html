document.addEventListener('DOMContentLoaded', (event) => {
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
