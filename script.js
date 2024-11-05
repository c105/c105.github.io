const cD = [
    "darkModeToggle",
    "dark",
    "DOMContentLoaded",
    "click",
    "https://iptv-org.github.io/api/",
    "statusMessage"
];

function toggleDarkMode() {
    const isDarkMode = document.body.classList.toggle(cD[1]);
    localStorage.setItem(cD[1], isDarkMode);

    const icon = document.getElementById(cD[0]).querySelector('i');
    icon.classList.toggle('fa-sun', isDarkMode);
    icon.classList.toggle('fa-moon', !isDarkMode);
}

document.getElementById(cD[0]).addEventListener(cD[3], toggleDarkMode);

window.addEventListener(cD[2], () => {
    const savedMenuState = localStorage.getItem('menuActive') === 'true';
    const savedDarkMode = localStorage.getItem(cD[1]) === 'true';

    if (savedDarkMode) {
        toggleDarkMode();
    }

    // Update menu state based on saved state
    const menu = document.getElementById('menu');
    menu.classList.toggle('active', savedMenuState);
});

const menuButton = document.getElementById('toggleMenuButton');
const menu = document.getElementById('menu');

menuButton.addEventListener(cD[3], () => {
    const isActive = menu.classList.toggle('active');
    localStorage.setItem('menuActive', isActive);
});

function setMetaTags(channelName, description, url, imageUrl) {
    const metaTags = [
        { name: "description", content: description },
        { name: "keywords", content: `${channelName}, Filipino entertainment, live TV, IPTV, movies, shows, c105.github.com` },
        { property: "og:title", content: `Watch ${channelName} Live` },
        { property: "og:description", content: description },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
        { property: "og:image", content: imageUrl }
    ];

    metaTags.forEach(tagInfo => {
        let meta = tagInfo.name 
            ? document.querySelector(`meta[name="${tagInfo.name}"]`)
            : document.querySelector(`meta[property="${tagInfo.property}"]`);

        if (meta) {
            meta.setAttribute("content", tagInfo.content);
        } else {
            meta = document.createElement("meta");
            if (tagInfo.name) meta.setAttribute("name", tagInfo.name);
            if (tagInfo.property) meta.setAttribute("property", tagInfo.property);
            meta.setAttribute("content", tagInfo.content);
            document.head.appendChild(meta);
        }
    });
}

async function checkM3U8Status(url) {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        const statusText = response.statusText;

        // Update the status message based on the response
        document.getElementById(cD[5]).innerHTML = 
            `<i class="fas fa-circle" style="font-size: 10px; color: ${response.ok ? '#39FF14' : '#FF3D00'}"></i> ${response.ok ? 'Online' : 'Offline'}`;
    } catch (error) {
        document.getElementById(cD[5]).innerHTML =
            `<i class="fas fa-circle" style="font-size: 10px; color: #FF3D00"></i> Offline`;
    }
}
