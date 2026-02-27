import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabase = createClient('https://orubrzeqypettqotxapg.supabase.co', 'sb_publishable_zuBdsJK3o0wkp4qBXjdQ5g_w9LB6Xgv');

const selectQuery = async (selectColumns, tableName) => {
    const { data, error } = await supabase
        .from(tableName)
        .select(selectColumns);

    if (error) {
        throw new Error(error.Error);
    }

    return data;
};

const selectPropertiesQuery = async (locationId, listingTypeId, propertyTypeId, offset, limit) => {
    let query = supabase
        .from('property')
        .select('*')
        .eq('actived', true);

    if (locationId > 0) {
        query = query.eq('location_id', locationId);
    }

    if (listingTypeId > 0) {
        query = query.eq('listing_type_id', listingTypeId);
    }

    if (propertyTypeId > 0) {
        query = query.eq('property_type_id', propertyTypeId);
    }

    query = query
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

    const { data, error } = await query;

    if (error) {
        throw new Error(error.Error);
    }

    return data;
};

// bind data dropdown
const loadDropDown = async (name, hasIcon = false) => {
    const dropdown = document.getElementById('search-' + name);
    const cols = hasIcon ? 'id, name, icon' : 'id, name';
    const promise = selectQuery(cols, name);
    
    if (dropdown) {
        promise.then((data) => {
            dropdown.remove(0);
            for (let item of data) {
                let optionHtml = '<option value="' + item.id + '">' 
                + (hasIcon ? '<i class="fa fa-' + item.icon + '"></i>' : '') 
                + '<span>' + item.name + '</span>' 
                + '</option>';
                dropdown.insertAdjacentHTML('beforeend', optionHtml);
            }

            if (dropdown.getAttribute('fetch-on-change')) {
                dropdown.addEventListener('change', (event) => {
                    const locationId = document.querySelector('[name="search-location"]').value;
                    const listingId = document.querySelector('[name="search-listingType"]').value;
                    const typeId = document.querySelector('[name="search-propertyType"]').value;

                    fetchPaginationProperties(locationId, listingId, typeId, 1, 6);
                });
            }

            if (dropdown.getAttribute('bind-value')) {
                const urlParams = new URLSearchParams(window.location.search);
                const value = urlParams.get('search-' + name);
                if (value) {
                    dropdown.value = value;
                }
            }
        }).catch((err) => {
            console.error(err);
        });
    }
};

loadDropDown('location');
loadDropDown('listingType');
loadDropDown('propertyType', true);

//bind data property types
const listTypes = document.getElementById('list-types');
const promiseTypes = selectQuery('id, name, icon', 'propertyType');
promiseTypes.then((data) => {
    for (let item of data) {
        const eleATag = document.createElement('a');
        const eleLiTag = document.createElement('li');

        eleATag.href = '#' + item.name.toLowerCase().replaceAll(' ', '-');
        eleATag.textContent = item.name;
        eleATag.setAttribute('data-type-id', item.id);
        eleLiTag.appendChild(eleATag);
        listTypes.appendChild(eleLiTag);
    }

    if (listTypes.getAttribute('bind-value')) {
        const urlParams = new URLSearchParams(window.location.search);
        const value = urlParams.get('search-propertyType');
        if (value) {
            listTypes.querySelectorAll('li').forEach((ele) => {
                ele.classList.remove('actived');
            });
            listTypes.querySelector('[data-type-id="' + value + '"]').parentNode.classList.add('actived');
        }
    }
}).catch((err) => {
    console.error(err);
});
//-----------------------

//bind data latest properties
const latestProperties = document.getElementById('latest-properties');
if (latestProperties) {
    const promiseLatestProperties = selectPropertiesQuery(0, 0, 0, 0, 4);
    promiseLatestProperties.then((data) => {
        latestProperties.innerHTML = '';
        if ('content' in document.createElement('template')) {
            const template = document.getElementById('latest-property-template');
            
            for (let item of data) {
                const eleLiTag = document.createElement('li');
                const clone = document.importNode(template.content, true);
                clone.querySelector('.js-latest-item-image').src = item.image;
                clone.querySelector('.js-latest-item-image').alt = item.title;
                clone.querySelector('.js-latest-item-title-h3').textContent = item.title;
                clone.querySelector('.js-latest-item-title-h4').textContent = item.title;
                clone.querySelector('.js-latest-item-description').textContent = item.description;
                clone.querySelector('.js-latest-item-address').textContent = item.address;

                clone.querySelector('.js-latest-item-bed').textContent = item.bed;
                clone.querySelector('.js-latest-item-bath').textContent = item.bath;
                clone.querySelector('.js-latest-item-park').textContent = item.park;
                clone.querySelector('.js-latest-item-square').textContent = item.square;
                clone.querySelector('.js-latest-item-median-price').textContent = priceFormat(item.median_price);
                clone.querySelector('.js-latest-item-median-rent').textContent = priceFormat(item.median_rent);
                clone.querySelector('.js-latest-item-created').textContent = '30'; //item.created_at;

                //add events
                clone.querySelector('.js-btn-info').addEventListener('click', clickInfoProperty);
                clone.querySelector('.js-btn-details').addEventListener('click', clickDetailsProperty);
                
                eleLiTag.append(clone);
                latestProperties.appendChild(eleLiTag);
            }
        }
    }).catch((err) => {
        console.error(err);
    });
}
//-----------------------

//bind data properties
const fetchPaginationProperties = (locationId, listingTypeId, propertyTypeId, pageNumber, pageLimit) => {
    const propertiesList = document.getElementById('properties-list');
    const itemsPerPage = propertiesList.getAttribute('data-items-per-page');
    pageLimit = itemsPerPage ? parseInt(itemsPerPage) : pageLimit;
    const promisePropertiesList = selectPropertiesQuery(locationId, listingTypeId, propertyTypeId, (pageNumber - 1) * pageLimit, pageLimit);

    propertiesList.innerHTML = '<li class="loading"><div><i class="fa fa-spinner fa-spin"></i></div></li>';
    promisePropertiesList.then((data) => {
        propertiesList.innerHTML = '';
        if ('content' in document.createElement('template')) {
            const template = document.getElementById('property-template');
            
            for (let item of data) {
                const eleLiTag = document.createElement('li');
                const clone = document.importNode(template.content, true);
                clone.querySelector('.js-property-item-image').src = item.image;
                clone.querySelector('.js-property-item-image').alt = item.title;
                clone.querySelector('.js-property-item-address').textContent = item.address;

                clone.querySelector('.js-property-item-bed').textContent = item.bed;
                clone.querySelector('.js-property-item-bath').textContent = item.bath;
                clone.querySelector('.js-property-item-park').textContent = item.park;
                clone.querySelector('.js-property-item-square').textContent = item.square;
                clone.querySelector('.js-property-item-median-price').textContent = priceFormat(item.median_price);

                eleLiTag.append(clone);
                propertiesList.appendChild(eleLiTag);
            }
        }

        initPagination(pageNumber, 6);
    }).catch((err) => {
        console.error(err);
    });
}
fetchPaginationProperties(0, 0, 0, 1, 6);
listTypes.addEventListener('click', (event) => {
    event.preventDefault();
    if (event.target.hasAttribute('data-type-id')
        && !event.target.parentNode.classList.contains('actived')
    ) {
        const locationId = document.querySelector('[name="search-location"]').value;
        const listingId = document.querySelector('[name="search-listingType"]').value;
        const propertyTypeId = parseInt(event.target.getAttribute('data-type-id'));
        event.currentTarget.querySelectorAll('li').forEach((ele) => {
            ele.classList.remove('actived');
        });
        event.target.parentNode.classList.add('actived');

        document.querySelector('[name="search-propertyType"]').value = propertyTypeId;
        fetchPaginationProperties(locationId, listingId, propertyTypeId, 1, 6);
    }
});

const pagination = document.getElementById('pagination');
pagination.addEventListener('click', (event) => {
    event.preventDefault();
    if (event.target.hasAttribute('data-page-number')
        && !event.target.classList.contains('actived')
    ) {
        const pageNumber = parseInt(event.target.getAttribute('data-page-number'));
        window.location.hash = '';
        fetchPaginationProperties(0, 0, 0, pageNumber, 6);
        window.location.hash = 'properties-filter';
    }
});
//-----------------------

// search form submit
// const searchForm = document.getElementById('search-form');
// if (searchForm) {
//     searchForm.addEventListener('submit', (event) => {
//         window.location.hash = '';
//         event.preventDefault();
//         window.location.hash = 'properties-filter';

//         const formData = new FormData(event.target);
//         const locationValue = formData.get('search-location');
//         const listingTypeValue = formData.get('search-listingType');
//         const propertyTypeValue = formData.get('search-propertyType');

//         listTypes.querySelectorAll('li').forEach((ele) => {
//             ele.classList.remove('actived');
//         });
//         listTypes.querySelector('[data-type-id="' + propertyTypeValue + '"]').parentNode.classList.add('actived');
//         fetchPaginationProperties(locationValue, listingTypeValue, propertyTypeValue, 1, 6);
//     });
// }
//-----------------------