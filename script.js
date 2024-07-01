window.onload = async function() {
    updateClock();
    setInterval(updateClock, 1000);
}

function updateClock() {
    var minutes = new Date().getMinutes();
    var hours = new Date().getHours();
    document.getElementById("minutes").innerHTML = (minutes < 10 ? '0' : '') + minutes;
    document.getElementById("hours").innerHTML = (hours < 10 ? '0' : '') + hours;
}
let currentData = {};
function deleteWebsite(siteName) {
    if (confirm(`Вы уверены, что хотите удалить сайт "${siteName}"?`)) {
        delete currentData[siteName];
        renderWebsiteList(currentData);
        updateJSONFile(jsonFile, currentData);
    }
}

function exportIcon() {
    const input = document.getElementById('icon-file-input');
    const file = input.files[0];
    const reader = new FileReader();

    reader.onloadend = function() {
        console.log('Иконка успешно экспортирована:', reader.result);
    }
    if (file) {
        reader.readAsDataURL(file);
    } else {
        console.error('Ошибка экспорта иконки: файл не найден');
    }
}
document.addEventListener("DOMContentLoaded", function() {
    var jsonFile = "data/site.json";
    
    function renderWebsiteList(data) {
        var container = document.getElementById("content");
        container.innerHTML = "";
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                var item = data[key];
                var div = document.createElement("div");
                div.classList.add("Frame3");
                var imgLink = document.createElement("a");
                imgLink.href = item.url;
                div.appendChild(imgLink);
                var img = document.createElement("img");
                img.src = "Image/icon/" + item.img;
                imgLink.classList.add("Frame23");
                img.classList.add("icon");
                imgLink.appendChild(img);
                //var textLink = document.createElement("a");
                //textLink.href = item.url;
                //textLink.classList.add("namesite");
                //textLink.textContent = key;
                //div.appendChild(textLink);
                container.appendChild(div);
            }
        }
    }

    fetch(jsonFile)
    .then(response => response.json())
    .then(data => {
        currentData = data;
        renderWebsiteList(data);
    })
    .catch(error => console.error("Error loading JSON file:", error));

    document.getElementById("add-site-btn").addEventListener("click", function() {
        var siteNameInput = document.getElementById("site-name-input").value.trim();
        var siteUrlInput = document.getElementById("site-url-input").value.trim();
        if (siteNameInput !== "" && siteUrlInput !== "") {
            currentData[siteNameInput] = {"img": "default.jpg", "url": siteUrlInput};
            renderWebsiteList(currentData);
            updateJSONFile(jsonFile, currentData);
        } else {
            alert("Пожалуйста, введите имя и URL сайта.");
        }
    });

    function updateJSONFile(file, data) {
        fetch(file, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update JSON file');
            }
        })
        .catch(error => console.error("Error updating JSON file:", error));
    }

    function setRandomBackgroundFromAPI(element, theme) {
        fetch(`https://source.unsplash.com/${width}x${height}/?${theme}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch image');
                }
                return response.url;
            })
            .then(imageUrl => {
                element.style.backgroundImage = `url('${imageUrl}')`;
            })
            .catch(error => console.error('Failed to fetch random image:', error));
    }
    
    const element = document.querySelector('.insection');
    const theme = '3D';
    const width = 1920; 
    const height = 1080; 
    setRandomBackgroundFromAPI(element, theme);
});
