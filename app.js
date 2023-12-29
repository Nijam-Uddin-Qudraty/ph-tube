let default_id = 1000;
const loadData = async () => {
    const response = await fetch(
        "https://openapi.programming-hero.com/api/videos/categories"
    );
    const data = await response.json();
    //   console.log(data.data);
    category(data.data);
};

const category = (data) => {
    const catagory_section = document.getElementById("category");
    data.forEach((element) => {
        // console.log(element);
        const category_card = document.createElement("div");

        category_card.innerHTML = `
            <button onclick="tab(${element.category_id})" id="${element.category_id}" class="category-button btn rounded-1 bg-secondary-subtle">
                ${element.category}
            </button>
            `;
        catagory_section.appendChild(category_card);
    });
};

const tab = async (categoryId = 1000, sortByViews = "") => {
    // fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    //     .then((res) => res.json())
    //     .then((data) => tab_id(data.data))
    default_id = categoryId;
    const response = await fetch(
        `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
    );
    const data = await response.json();

    let viewsData = data.data;
    if (sortByViews) {
        viewsData.sort((a, b) => {
            return (
                parseInt(b.others.views.replace("K", "")) -
                parseInt(a.others.views.replace("K", ""))
            );
        });
    }
    tab_id(data.data);
};

const contents = document.getElementById("contents");
const tab_id = (data) => {
    // console.log(data);

    data.length ? data_found(data) : data_not_found();
};

const data_found = (data) => {
    contents.innerHTML = "";

    data.forEach((item) => {
        // console.log(item);
        const bluebadge = item.authors[0].verified
            ? ` <img src="./p_icon.svg" alt="">`
            : "";
        const time = timer(item.others.posted_date);

        contents.innerHTML += `
            <div class="" style="width: 18rem;">
                <div class="position-relative">
                <img src="${item.thumbnail}" class="card-img rounded-2 " alt="..." height="200px" width="100%">

                <p class="card- position-absolute bottom-0 end-0 me-2 bg-secondary rounded-1 p-1 " style="font-size: 10px;">${time} ago</p>
                </div>
                <div>
                    <div class="card-body d-flex gap-2 mt-2">
                        <div class="">
                            <img src="${item.authors[0].profile_picture}" alt="" width="40px">
                        </div>
                        <div>
                            <p class="card-text fw-bold">${item.title}</p>
                        </div>
                    </div>
                    <div class="card-body ms-5">
                        <p> ${item.authors[0].profile_name} <span>
                            ${bluebadge}
                        </span></p>
                        <p>${item.others.views} Views</p>
                    </div>
                </div>
            </div>


        
        `;
        // contents.appendChild(contents_card);
    });
};
const data_not_found = () => {
    contents.innerHTML = "";
    contents.innerHTML += `
 <div class=" text-center">
            <img src="./PHero-Tube-main/PHero-Tube-main/Icon.png" alt="">
            <h1> Oops!! Sorry, There is no content here </h1>
        </div>
        `;
};

const timer = (timeInSeconds) => {
    const years = Math.floor(timeInSeconds / (60 * 60 * 24 * 365));
    const months = Math.floor(
        (timeInSeconds % (60 * 60 * 24 * 365)) / (60 * 60 * 24 * 30)
    );
    const weeks = Math.floor(
        (timeInSeconds % (60 * 60 * 24 * 30)) / (60 * 60 * 24 * 7)
    );
    const days = Math.floor(
        (timeInSeconds % (60 * 60 * 24 * 7)) / (60 * 60 * 24)
    );
    const hours = Math.floor((timeInSeconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((timeInSeconds % (60 * 60)) / 60);

    let timeString = "";

    if (years > 0) {
        timeString += `${years}y `;
    }
    if (months > 0) {
        timeString += `${months}mo `;
    }
    if (weeks > 0) {
        timeString += `${weeks}w `;
    }
    if (days > 0) {
        timeString += `${days}d `;
    }
    if (hours > 0) {
        timeString += `${hours}h `;
    }
    if (minutes > 0) {
        timeString += `${minutes}m`;
    }

    // Remove the last space, if any
    return timeString;
};

const sortDataByViews = () => {
    tab(default_id, default_id);
};

loadData();
tab(1000);
