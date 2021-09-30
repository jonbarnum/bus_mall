'use strict';

let allPictures = [];
let totalClicker = 0;

let Pic = function (name, url) {
    this.name = name;
    this.timesImagesShown = 0;
    this.clicks = 0;
    this.url = `img/${url}`;
    allPictures.push(this);
}

let leftPicEl = document.getElementById('leftPicture');
let centerPicEl = document.getElementById('centerPicture');
let rightPicEl = document.getElementById('rightPicture');

let renderPics = function () {
    let leftImageIndex = Math.floor(Math.random() * allPictures.length);
    let centerImageIndex = Math.floor(Math.random() * allPictures.length);
    let rigthtImageIndex = Math.floor(Math.random() * allPictures.length);

    while (leftImageIndex === centerImageIndex) {
        centerImageIndex = Math.floor(Math.random() * allPictures.length);
    }
    while (leftImageIndex === rigthtImageIndex) {
        rigthtImageIndex = Math.floor(Math.random() * allPictures.length);
    }
    while (centerImageIndex === rigthtImageIndex) {
        rigthtImageIndex = Math.floor(Math.random() * allPictures.length);
    }

    let left = allPictures[leftImageIndex];
    let center = allPictures[centerImageIndex];
    let right = allPictures[rigthtImageIndex];
    
    leftPicEl.src = left.url;
    leftPicEl.name = left.name;
    left.timesImagesShown ++;
    centerPicEl.src = center.url;
    centerPicEl.name = center.name;
    center.timesImagesShown ++;
    rightPicEl.src = right.url;
    rightPicEl.name = right.name;
    right.timesImagesShown ++;
}


let handleClick = function (event) {
    event.preventDefault ();
    totalClicker = totalClicker + 1;
    let imageEl = event.target;
    console.log(imageEl.name);

    for (let i = 0; i < allPictures.length; i++) {
        if (imageEl.name === allPictures[i].name) {
            allPictures[i].clicks++;
            console.log(allPictures[i]);
        }
    }
    if (totalClicker <= 25) {
        renderPics();
    }else {
        document.getElementById('pictureContainer').style.display = 'none';
    }
}

leftPicEl.addEventListener('click', handleClick);
centerPicEl.addEventListener('click', handleClick);
rightPicEl.addEventListener('click', handleClick);

if (!localStorage.getItem('allProducts')) {
    new Pic ('bag', 'bag.jpg');
    new Pic ('banana', 'banana.jpg');
    new Pic ('bathroom', 'bathroom.jpg');
    new Pic ('boots', 'boots.jpg');
    new Pic ('breakfast', 'breakfast.jpg');
    new Pic ('bubblegum', 'bubblegum.jpg');
    new Pic ('chair', 'chair.jpg');
    new Pic ('cthulhu', 'cthulhu.jpg');
    new Pic ('dog-duck', 'dog-duck.jpg');
    new Pic ('dragon', 'dragon.jpg');
    new Pic ('pen', 'pen.jpg');
    new Pic ('pet-sweep', 'pet-sweep.jpg');
    new Pic ('scissors', 'scissors.jpg');
    new Pic ('shark', 'shark.jpg');
    new Pic ('sweep', 'sweep.jpg');
    new Pic ('tauntaun', 'tauntaun.jpg');
    new Pic ('unicorn', 'unicorn.jpg');
    new Pic ('water-can', 'water-can.jpg');
    new Pic ('wine-glass', 'wine-glass.jpg');
} else {
    allPictures = JSON.parse(localStorage.getItem('allProducts'));
    console.log(allPictures)
}

renderPics();

let totalResults = function (){
    localStorage.setItem('allProducts', JSON.stringify(allPictures));
    const results = document.getElementById('results');
    const mostClicks =  allPictures.sort(function(a,b){return b.clicks - a.clicks});
    mostClicks.forEach(pic => {
        let el = document.createElement('li');
        el.innerHTML = `${pic.name} Clicks: ${pic.clicks} Shown: ${pic.timesImagesShown} Times Shown`;
        results.append(el);
    })
    let renderAllPicturesData = function () {
        let chartEl = document.getElementById('myChart');
        chartEl.innerHTML = '';
        let ctx = chartEl.getContext('2d');
        let labels = [];
        let clickData = [];
        let shownData = [];
        
        for (let i = 0; i < allPictures.length; i++){
            labels.push(allPictures[i].name);
            clickData.push(allPictures[i].clicks);
            shownData.push(allPictures[i].timesImagesShown);
        }
        let pictureChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Number Of Clicks',
                    data: clickData,
                    backgroundColor: 'red',
                    borderColor: 'pink'
                },{
                label: 'Number of Times Seen',
                data: shownData,
                backgroundColor: 'lightblue',
                borderColor: 'blue' 
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
    renderAllPicturesData();
}    

console.log(allPictures);

