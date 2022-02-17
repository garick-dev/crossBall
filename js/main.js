document.addEventListener("DOMContentLoaded", (ev) =>{
    const getSort = ({ target }) => {
        const order = (target.dataset.order = -(target.dataset.order || -1));
        const index = [...target.parentNode.cells].indexOf(target);
        const collator = new Intl.Collator(['en', 'ru'], { numeric: true });
        const comparator = (index, order) => (a, b) => order * collator.compare(
            a.children[index].innerHTML,
            b.children[index].innerHTML
        );

        for(const tBody of target.closest('table').tBodies)
            tBody.append(...[...tBody.rows].sort(comparator(index, order)));

        for(const cell of target.parentNode.cells)
            cell.classList.toggle('sorted', cell === target);
    };

    document.querySelectorAll('.table thead').forEach(tableTH => tableTH.addEventListener('click', () => getSort(event)));

    const tab = function () {
        const tabRow = document.querySelectorAll('.side-menu__row');
        const tabContent = document.querySelectorAll('.side-menu__column');
        const arrowEl = document.querySelectorAll('.side-menu__icon_arrow');
        let tabName;
        const tabContentEl = document.querySelector(".side-menu__content");

        tabRow.forEach(item => {
            item.addEventListener('click', selectTabRow);
        });

        function selectTabRow() {
            tabRow.forEach(item => {
                item.classList.remove("active-row");
                item.classList.remove('is-active');

            });

            this.classList.toggle("active-row");
            this.classList.add('is-active');
            tabName = this.getAttribute('data-tab-name');
            selectTabContent(tabName);
            rotateArrow(tabName);
        }

        function selectTabContent(tabName) {
            tabContent.forEach(item => {
                if (item.classList.contains(tabName)) {
                    item.classList.toggle('is-active');
                    if (item.classList.contains("is-active")){
                        tabContentEl.style.position = "static";
                    }
                    else {
                        tabContentEl.style.position = "relative";
                    }
                }
                else {
                    item.classList.remove('is-active');
                    tabContentEl.style.position = "relative";
                }
            })
        }
        function rotateArrow (tabName) {
            arrowEl.forEach(item => {
                item.classList.contains(tabName) ? item.classList.toggle("rotate") : item.classList.remove("rotate");
            })
        }

    };

    tab();

    const burgerEl = document.querySelector(".burger");
    const showMobileMenu = () => {
        document.addEventListener("click", (ev) => {
            const menuEl = document.querySelector(".menu_header");

            if (ev.target && ev.target.classList.contains("burger") || ev.target && ev.target.classList.contains("burger__line") || ev.target && ev.target.classList.contains("menu__link_mobile")) {
                menuEl.classList.toggle("open");
            }
        })
    }
    showMobileMenu();

    const disabledCheckBox = () => {
        document.addEventListener("click", (ev) => {
            if ( ev.target && ev.target.classList.contains("menu__link_mobile")) {
                document.getElementById("burger__checkbox").checked = false;
                // add overflow if open burger menu
                document.body.style.overflow = "auto";
                // change burger position
                burgerEl.style.position = "absolute";
            }
        })

    }
    disabledCheckBox();

    const changeBurgerPosition = () => {
        document.addEventListener("change", (ev) =>{
            const checkboxEl =  document.getElementById("burger__checkbox").checked;
            if (checkboxEl === true) {
                document.body.style.overflow = "hidden";
            }
            else {
                document.body.style.overflow = "auto";
            }
        })
    }
    changeBurgerPosition();

})
