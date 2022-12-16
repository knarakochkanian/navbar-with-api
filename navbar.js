let areas_arr = [];
let filtered_array = [];
let selected_item_array = [];

const loader = document.querySelector('.loader');
const dropdown_content = document.querySelector('.navigation-dropdown-content');
const dropdown_content_ul = document.querySelector('.navigation-dropdown-content__cites');

const loadAreas = async () => {
    const response = await fetch('https://studika.ru/api/areas', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
    });

    areas_arr = await response.json();
}

const fillList = () => {
    const area_item = document.querySelectorAll('.area-item');
    const selected_areas = document.querySelector('.navigation-selected-areas');


    for (let i = 0; i < area_item.length; i++) {
        area_item[i].addEventListener('click', (e) => {
            const clicked = e.target.id;
            console.log(clicked);
            const found = !filtered_array.length
                ? areas_arr.find(item => item.id === +clicked)
                : filtered_array.find(item => item.id === +clicked);

            const children = selected_areas.children;
            const children_arr = Array.from(children);

            let exists = children_arr.find(item => +item.id === found.id);

            if (exists) {
                selected_item_array = selected_item_array.filter(item => item.id !== found.id);
                selected_areas.removeChild(exists);
            } else {
                selected_item_array.push(found);
                const selected_element = document.createElement('button');

                selected_element.id = found.id;
                selected_element.innerHTML = found.name;
                selected_areas.appendChild(selected_element);
            }

            console.log(selected_item_array)
        })
    }
}

const areas = (areas_list) => {
    for (const item of areas_list) {
        const list_item = document.createElement('li');
        list_item.id = item.id;
        list_item.innerHTML = item.name;
        list_item.classList.add('area-item');
        dropdown_content_ul.appendChild(list_item);
    }
}

const onShowList = async () => {
    dropdown_content.style.display = 'block';

    const areas_exists = !!areas_arr.length;

    if (!areas_exists) {
        loader.style.display = 'block';
        await loadAreas();
        loader.style.display = 'none';

        areas(areas_arr);
    }

    fillList();
}

const onSearch = () => {
    const value = document.querySelector('.navigation-search-input').value;
    filtered_array = areas_arr.filter(item => item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1);

    const filtered_exists = !!filtered_array.length;

    if (filtered_exists) {
        while (dropdown_content_ul.firstChild) {
            dropdown_content_ul.removeChild(dropdown_content_ul.lastChild);
        }
        areas(filtered_array);
        fillList();
    }
}

const onSave = () => {
    dropdown_content.style.display = 'none';
    $(document).ready(function () {
        $.ajax({
            type: 'POST', url: '', success: function (response) {
                $(selected_item_array).html(response);
            }
        });
    });
}

const navigation_menu_btn = document.querySelector('.navigation-menu-btn');
const navigation_menu_mobile = document.querySelector('.navigation-menu-mobile')
const header_mobile = document.querySelector('.header')
navigation_menu_btn.addEventListener('click', function (){
    navigation_menu_btn.classList.toggle('active');
    navigation_menu_mobile.classList.toggle('active');
    if(navigation_menu_mobile.classList.contains('active')) {
        document.body.style.backgroundColor = "#afafaf";
        header_mobile.style.backgroundColor = "#afafaf";
    }
})
