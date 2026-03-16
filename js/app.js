document.addEventListener('DOMContentLoaded', (event) => {
    preventHrefSharp();
    tabsFunc();
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

let tabsFunc = () => {
    let objTabs = document.getElementById('property-tabs');

    if (!objTabs) {
        return;
    }

    let tabLabels = objTabs.querySelectorAll('.js-tab-label');
    let tabContents = objTabs.querySelectorAll('.js-tab-content');

    tabLabels.forEach((ele) => {
        ele.addEventListener('click', (e) => {
            if (!e.currentTarget.classList.contains('actived')) {
                const tabIndex = e.currentTarget.getAttribute('data-tab-index');

                tabLabels.forEach((ele) => {
                    ele.classList.remove('actived');
                });
                tabContents.forEach((ele) => {
                    ele.classList.remove('actived');
                });

                if (tabIndex) {
                    tabLabels[tabIndex].classList.add('actived');
                    tabContents[tabIndex].classList.add('actived');
                }
            }
        });
    });
}