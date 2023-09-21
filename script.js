
// API section
const loadHeroCatagories = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const info = await res.json();
    const hero = info.data;
    // console.log(hero);
    displayCatagories(hero);


}


const loadContents = async (id) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const info = await response.json();
    const contents = info.data;
    displayContents(contents, id);
}

// Api section end here ------------------------------------------------------


selectCatagories = (hero, isSelect) => {




    hero.forEach(he => {
        const selectedCategory = document.getElementById(`${he.category_id}`);
        // console.log(selectedCategory);
        selectedCategory.addEventListener('mouseup', () => {
            // console.log(he.category_id);
            loadContents(he.category_id);




        })


    })

}

displayContents = (contents, content_id = 'true') => {
    // console.log(contents);
    const contentContainer = document.getElementById('content-container');
    const sortByView = document.getElementById('sort-by-view');
    //const questionBox=document.getElementById('question-box');
    contentContainer.textContent = "";
    // console.log(contentContainer);

    // questionBox.addEventListener('click', () =>{

    // })
    sortByView.addEventListener('click', () => {
        contents.forEach(con => {
            contents.sort((a, b) => {
                const viewsA = parseInt(a.others.views);
                const viewsB = parseInt(b.others.views);
                return viewsB - viewsA; // Sort in descending order
            });
            //console.log(contents);

        })
        displayContents(contents);
    })

    // Replace this with your array

    if (contents.length === 0) {
        contentContainer.classList.remove(...contentContainer.classList); // Removes all classes
        emptyContent=document.createElement('div');
        emptyContent.innerHTML=`
        <figure ><img class="w-1/8 mx-auto mt-32" src="image/Icon.png" alt="Shoes" />
        <p class="w-72 text-2xl mx-auto  text-black font-bold">Ooops! Sorry, There is no content here</p></figure>
        `;

        contentContainer.appendChild(emptyContent);

    } else {
        console.log("Array is not empty");
        contents.forEach(content => {
            const contentCard = document.createElement('div');
            contentCard.classList = `card w-64 bg-base-100 rounded-none transition delay-75 hover:border-2 hover:border-red-500 shadow-xl`;

            // step01 : collecting the views
            // const totalViews = parseInt(content.others.views);
            // console.log(totalViews);

            // contents.sort((a, b) => {
            //     const viewsA = parseInt(a.others.views);
            //     const viewsB = parseInt(b.others.views);
            //     return viewsB - viewsA; // Sort in descending order
            // });
            // console.log(contents);


            // time counting 
            const totalSeconds = content.others.posted_date;

            // Calculate hours, minutes, and seconds
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;
            // Create a time string
            const timeString = `${hours}h ${minutes}m ${seconds}s`;
            // console.log(timeString);

            // console.log(contentCard);

            contentCard.innerHTML = `
        <figure ><img src="${content.thumbnail}" alt="Shoes" />
        <p class="w-16 text-xs bg-black text-gray-400 top-1 right-1 opacity-50 absolute">${timeString}</p></figure>
        <div class="card-body px-1">
            <div class="grid grid-cols-6 grid-rows-3">
                <div class="avatar ">
                    <div class="w-8 rounded-full">
                        <img src="${content.thumbnail}" />
                    </div>
                </div>
                <div class="cols col-span-5 row-span-3 ">
                    <h2 class="card-title font-bold">${content.title}</h2>
                    <p class="text-gray-400 text-sm">${content.authors[0].profile_name}
                    ${content.authors[0].verified ? '<span><i class="fa-solid fa-circle-check" style="color: #095cec;"></i></span>' : ''}
                    <p class="text-gray-400 text-sm">${content.others.views} Views</p>
                </div>

            </div>

        </div>

        `;

            contentContainer.appendChild(contentCard);

            sortByView.addEventListener('click', () => {

            })
        })
    }
    console.log(contents);



}


//In this section i have added categories of the lecture series
displayCatagories = (hero) => {
    const catagoriesButton = document.getElementById('catagories-button');

    // console.log(hero[1].category_id);


    hero.forEach(he => {
        //console.log(he.category_id);
        //loadContents(he.category_id);
        const heroCategory = document.createElement('div');
        heroCategory.classList = `bg-gray-200 btn mb-4 px-7 hover:bg-red-500 hover:text-white text-black font-bold`;
        heroCategory.setAttribute('id', `${he.category_id}`);
        heroCategory.innerText = he.category;
        catagoriesButton.appendChild(heroCategory);
    })


    //console.log(hero.category_id);
    //const selectedCategory = document.getElementById(`${hero.category_id}`);
    //console.log(selectedCategory);



    selectCatagories(hero, true);
}





loadHeroCatagories();