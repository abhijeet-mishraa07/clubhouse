document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const clubKey = params.get("club");
    const club = clubsData[clubKey];

    if (!club) {
        document.getElementById("club-details-container").innerHTML =
            "<h1>Club not found.</h1>";
        return;
    }

    const detailsHTML = `
        <div class="club-header text-center mb-5">
            <h1 class="display-5 mb-4">${club.name}</h1>
            <img class="club-image img-fluid rounded" src="${club.image}" alt="${club.name}">
            <p class="mt-3">${club.description}</p>
        </div>
        <div class="club-info mb-5">
            <h4 class="text-primary">Mission</h4>
            <p>${club.mission}</p>
            <h4 class="text-primary">Vision</h4>
            <p>${club.vision}</p>
        </div>
        <div class="club-notifications mb-5">
            <h4 class="text-primary">Notifications</h4>
            <ul class="list-group">
                ${club.notifications.map(n => `<li class="list-group-item">${n}</li>`).join("")}
            </ul>
        </div>
        <div class="club-ambassadors mb-5">
            <h4 class="text-primary">Ambassadors</h4>
            <div class="row">
                ${club.ambassadors.map(a => `
                    <div class="col-md-4 text-center mb-4">
                        <div class="card">
                            <img class="ambassador-image card-img-top rounded-circle" src="${a.image}" alt="${a.name}">
                            <div class="card-body">
                                <h5 class="card-title">${a.name}</h5>
                                <p class="card-text">${a.role}</p>
                            </div>
                        </div>
                    </div>
                `).join("")}
            </div>
        </div>
    `;
    document.getElementById("club-details-container").innerHTML = detailsHTML;
});