function clickInfoProperty(event) {
    event.preventDefault();

    let latestItem = event.target.closest('.js-latest-item');
    if (latestItem.classList.contains('pin')) {
        latestItem.classList.remove('pin');
    } else {
        latestItem.classList.add('pin');
    }
}

function clickDetailsProperty(event) {
    event.preventDefault();

    let latestItem = event.target.closest('.js-latest-item');
    if (latestItem.classList.contains('pin')) {
        latestItem.classList.remove('pin');
    } else {
        latestItem.classList.add('pin');
    }
}


function priceFormat(number) {
    return '$' + (new Intl.NumberFormat().format(number));
}

function initPagination(curPage, perPage) {
    const elePagination = document.getElementById('pagination');
    const totalPage = Math.ceil(1000 / perPage);

    elePagination.innerHTML = '';
    elePagination.appendChild(createBtnPaging('Prev', curPage > 1 ? curPage - 1 : 1, curPage));

    for (let i = 1; i <= totalPage; i++) {
        if (totalPage > 9) {
            if (totalPage - curPage > 3) {
                if (i < curPage - 2 || i >= 7 - 2 + curPage && i < totalPage - 1) {
                    if (i == 7 - 2 + curPage) {
                        elePagination.appendChild(createBtnPaging('...', '-1', curPage));
                    }
                    continue;
                }
            } else {
                if (i >= 3 && totalPage - i > 3) {
                    if (i == 3) {
                        elePagination.appendChild(createBtnPaging('...', '-1', curPage));
                    }
                    continue;
                }
            }
        }
        elePagination.appendChild(createBtnPaging(i, i, curPage));
    }
    
    elePagination.appendChild(createBtnPaging('Next', curPage < totalPage ? curPage + 1 : totalPage, curPage));
}

function createBtnPaging(name, number, curPage) {
    const eleATag = document.createElement('a');
    const eleLiTag = document.createElement('li');

    eleATag.textContent = name;
    if (parseInt(number) > 0) {
        eleATag.setAttribute('data-page-number', parseInt(number));
    }

    if (number == curPage) {
        eleATag.classList.add('actived');
    }

    eleLiTag.appendChild(eleATag);

    return eleLiTag;
}