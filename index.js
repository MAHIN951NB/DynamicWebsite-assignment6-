document.getElementById('empty_cart').addEventListener('click', function () {
    document.getElementById('calc_display').innerHTML = ""
    document.getElementById('total').innerText = 0
})

const data = async () => {

    const x = await fetch('https://openapi.programming-hero.com/api/categories')
    const y = await x.json();
    categories(y.categories);
}
data()

function display_modal(a, b, c, d, e) {
    // console.log('hello', a, b, c, d)
    const h = document.getElementById('home')
    h.innerHTML = ""
    const n = document.createElement('div')
    n.innerHTML = `<h3 class="text-lg font-bold">${b}!</h3>
                <div class="flex justify-center"><img class="mw-[500px] h-[500px] object-cover" src="${a}" alt=""></div>
                <p class="py-6">${c}</p>
                <div class="modal-action">
                    <form method="dialog">
                        <!-- if there is a button, it will close the modal -->
                        <button class="btn">EXIT</button>
                    </form>
                </div>`
    h.appendChild(n)
    const v = document.getElementById('my_modal_4')
    v.showModal()
}
const showLoading = () => {
    const v = document.getElementById('hello')
    v.style.display = 'flex'
};
const hideloading = () => {
    const v = document.getElementById('hello')
    v.style.display = 'none'
};

const selected_category = async (details) => {
    const y = document.getElementById('tree-con');
    y.classList.remove('warn')
    showLoading()
    y.innerHTML = ""
    const url = (`https://openapi.programming-hero.com/api/category/${details}`)
    const x = await fetch(url)
    const t = await x.json()
    // console.log(t.plants)
    for (const c of t.plants) {
        const y = document.getElementById('tree-con');
        const tree_div = document.createElement('div');
        tree_div.innerHTML = `
        <img class="w-full h-[180px] object-cover rounded-lg" src="${c.image}" alt="${c.name}">
        <p class='font-bold my-2' id="indv-${c.id}" onclick='display_modal(${JSON.stringify(c.image)}, ${JSON.stringify(c.name)}, ${JSON.stringify(c.description)}, ${JSON.stringify(c.category)}, ${JSON.stringify(c.price)})'>${c.name}</p>
        <p class="inter text-gray-500 w-full max-h-[100px]  line-clamp-3">${c.description}</p>
        <div class="flex justify-between items-end">
            <p class="px-2 py-1 rounded mt-3" style="background-color: var(--color2); color: var(--color); font-weight:600;">${c.category}</p>
            <p>${c.price}</p>
        </div>
        <div class="flex justify-center "><button onclick='calc(${JSON.stringify(c.name)},${JSON.stringify(c.category)},${JSON.stringify(c.price)})' class="cursor-pointer w-full rounded-xl py-1 mt-3 text-white" style="background-color: var(--color)">Add to Cart</button></div>
    `;

        y.appendChild(tree_div);
    }
    hideloading()
}

const x = document.getElementById('load_all')
x.addEventListener('click', function () {
    const del = document.getElementById('tree-con')
    del.classList.remove('warn')
    del.innerHTML = ""
    display()
})

const active = (categoryId) => {
    const y = document.getElementsByClassName('category_class');
    for (const x of y) {
        x.classList.remove('active');
    }
    const p = document.getElementById(`category-${categoryId}`);
    p.classList.add('active');
    selected_category(categoryId);
}
var sum = 0;
function calc(x, y, z) {
    sum += Number(z);
    console.log(x, y, z, sum)
    display_calc(x, y, z, sum)
}
const display_calc = (x, y, z, m) => {
    const visual = document.getElementById('calc_display')
    const newdv = document.createElement('div')
    newdv.classList.add('cart')
    newdv.innerHTML = `<div>    <p class="inter" style="font-weight: bold">Plant: ${x}</p>
                                <p class="inter">Type: ${y}</p>
                               <p class="inter text-gray-500 font-semibold">Tk${z} x1</p>
                            </div>`
    visual.appendChild(newdv)
    document.getElementById('total').innerText = m
}


const display = async () => {
    const dis = await fetch('https://openapi.programming-hero.com/api/plants');
    const contain = await dis.json();
    for (const plant of contain.plants) {
        // console.log(plant.id);
        const y = document.getElementById('tree-con');
        const tree_div = document.createElement('div');
        tree_div.innerHTML = `<img class="w-full h-[180px] object-cover rounded-lg" src="${plant.image}" alt="Mango">
                        <p class="font-bold my-2">${plant.name}</p>
                        <p class="inter text-gray-500 w-full max-h-[100px]  line-clamp-3">${plant.description}</p>
                        <div class="flex justify-between items-end">
                            <p class="px-2 py-1 rounded mt-3" style="background-color: var(--color2); color: var(--color); font-weight:600;">${plant.category}</p>
                            <p>${plant.price}</p>
                        </div>
                        <div class="flex justify-center "><button onclick='calc(${JSON.stringify(plant.name)},${JSON.stringify(plant.category)},${JSON.stringify(plant.price)})' class="cursor-pointer w-full rounded-xl py-1 mt-3 text-white" style="background-color: var(--color)">Add to Cart</button></div>`
        y.appendChild(tree_div);
    }
}
display()

const categories = (data) => {
    for (const category of data) {
        let newdiv = document.getElementById('tree-category');
        let cat_div = document.createElement('div');
        cat_div.style.marginBottom = '8px'
        cat_div.style.cursor = 'pointer'
        cat_div.innerHTML = `<div class="category_class" id="category-${category.id}" onclick="active('${category.id}')">${category.category_name}</div>`;
        newdiv.appendChild(cat_div);
    }

}


const search = document.getElementById('search');

search.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const n = search.value
        fetch('https://openapi.programming-hero.com/api/plants')
            .then(data => data.json())
            .then(response => filter(n, response.plants))
    }
});

const filter = (n, x) => {
    let count = 0;
    for (const y of x) {
        count += 1;
        // const three = n.slice(0,4)
        if (n.length > 3) {
            if (n.trim().toLowerCase().slice(0, 4) === y.name.trim().toLowerCase().slice(0, 4)) {
                const yx = document.getElementById('tree-con');
                yx.innerHTML = ""
                const tree_div = document.createElement('div');
                tree_div.innerHTML = `<img class="w-full h-[180px] object-cover rounded-lg" src="${y.image}" alt="Mango">
                        <p class="font-bold my-2">${y.name}</p>
                        <p class="inter text-gray-500 w-full max-h-[100px]  line-clamp-3">${y.description}</p>
                        <div class="flex justify-between items-end">
                            <p class="px-2 py-1 rounded mt-3" style="background-color: var(--color2); color: var(--color); font-weight:600;">${y.category}</p>
                            <p>${y.price}</p>
                        </div>
                        <div class="flex justify-center "><button onclick='calc(${JSON.stringify(y.name)},${JSON.stringify(y.category)},${JSON.stringify(y.price)})' class="cursor-pointer w-full rounded-xl py-1 mt-3 text-white" style="background-color: var(--color)">Add to Cart</button></div>`
                yx.appendChild(tree_div);
                return
            }

        }
        if (count === 30) {
            alert('Item Not Available')
            const x = document.getElementById('search')
            x.value=""
            const yx = document.getElementById('tree-con');
            yx.innerHTML = ""
            yx.classList.add('warn')
            const warn = document.createElement('div')
            warn.innerHTML=`<p class="w-fit text-center"><i class="fa-solid fa-face-frown-open"></i>Item ${n} Not Available</p>`
            yx.appendChild(warn);
            
        }

    }

}

