import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";


// Random strings generator
const renderItems = (topics) => {
    const topicList = document.getElementById('question_text'); 
    topicList.innerHTML = ""; 

    
    topics.sort(() => Math.random() - 0.5);

    
    let listItem = `<h6>${topics[0].topics}</h6>`;
    topicList.insertAdjacentHTML('beforeend', listItem); 
}


const renderItems2 = (actions) => {
    const actionList = document.getElementById('action_text'); 
    actionList.innerHTML = ""; 

    
    actions.sort(() => Math.random() - 0.5);

    
    let listItem = `<h5>${actions[0].actions}</h5>`;
    actionList.insertAdjacentHTML('beforeend', listItem); 
}

// Import text JSON file
fetch('topics.json')
    .then(response => response.json())
    .then(topics => {
        console.log(topics)
        renderItems(topics)
    })


fetch('actions.json')
    .then(response => response.json())
    .then(actions => {
        console.log(actions)
        renderItems2(actions)
    })

/////////////////////////////////////////////////////////////////

// Clock

const body = d3.select('#container');

// create a contrainer 
const clockContainer = body.insert('section', '#content')
    .attr('id', 'clock-container')
    .style('z-index', '999');
    

// Create a viewport for the clock
const clockViewport = clockContainer.append('div')
    .attr('id', 'clock-viewport')
    .style('width', '100%')
    .style('height', '400px')
    .style('position', 'sticky')
    .style('position', '-webkit-sticky')
    .style('top', '0')
    .style('z-index', '999');


// Create horizontal line
const horizontalLine = clockViewport.append('div')
    .style('position', 'absolute')
    .style('top', '50%')
    .style('left', '0')
    .style('width', '100%')
    .style('height', '1px')
    .style('opacity', '0.3')
    .style('background-color', 'white');

// Initial positions and sizes
let circleRadius = 100;
let centerY = horizontalLine.node().offsetTop + 0.5;
let initialX = 60;
let finalX = window.innerWidth / 2;

// First circle
const svg1 = clockViewport.append('svg')
    .attr('id', 'svg1')
    .style('position', 'absolute')
    .style('top', '0')
    .style('left', '0')
    .attr('preserveAspectRatio', 'xMidYMid meet')
    .attr('viewBox', `0 0 ${window.innerWidth} 500`);

//A gradient for the first circle
const blueGradient = svg1.append('linearGradient')
    .attr('id', 'blueGradient')
    .attr('x1', '0%')
    .attr('x2', '100%')
    .attr('y1', '0%')
    .attr('y2', '100%');

// Add gradient stops
blueGradient.append('stop')
    .attr('offset', '0%')
    .attr('stop-color', '#5E649F');

blueGradient.append('stop')
    .attr('offset', '100%')
    .attr('stop-color', '#030029');

// Create the first circle and apply gradient fill
const circle1 = svg1.append('circle')
    .attr('cx', initialX)
    .attr('cy', centerY)
    .attr('r', circleRadius)
    .style('fill', 'url(#blueGradient)')
    .style('opacity', 1)
    .classed('rotate', true); 



// Create a after triggered gradient for the first circle
const afterblueGradient = svg1.append('linearGradient')
    .attr('id', 'afterblueGradient')
    .attr('x1', '0%')
    .attr('x2', '100%')
    .attr('y1', '0%')
    .attr('y2', '100%');

// Add gradient stops
afterblueGradient.append('stop')
    .attr('offset', '0%')
    .attr('stop-color', '#FF64B8');

afterblueGradient.append('stop')
    .attr('offset', '100%')
    .attr('stop-color', '#FF367E');



// Create text for the first circle's time
const newYorkTimeText = clockViewport.append('h5')
    .classed('text', true)
    .style('position', 'absolute')
    .style('top', `${centerY - circleRadius - 80}px`)
    .style('font-size', '14px')
    .style('color', 'white')
    .style('text-align', 'center')
    .style('width', '80px')
    .style('left', `${initialX - 50 + circleRadius}px`);


// Update New York time
function updateNewYorkTime() {
    const now = new Date().toLocaleString("en-US", {timeZone: "America/New_York"});
    const dateObj = new Date(now);
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const formattedHours = hours < 10 ? '0' + hours : hours;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

    newYorkTimeText.text(`${formattedHours}:${formattedMinutes} NYC`);

    const totalMinutes = hours * 60 + minutes;
    let newX;

    if (totalMinutes >= 21 * 60 || totalMinutes < 0 * 60) {
        newX = finalX;
        circle1.style('fill', 'url(#afterblueGradient)')
            .style('opacity', 1);
    } else if (totalMinutes >= 12 * 60 && totalMinutes < 21 * 60) {
        const percentage = (totalMinutes - 12 * 60) / (21 * 60 - 12 * 60);
        newX = initialX + percentage * (finalX - initialX);
    } else {
        const percentage = (totalMinutes - 0 * 60) / (12 * 60);
        newX = finalX + percentage * (initialX - finalX);
    }

    circle1.attr('cx', newX);
    newYorkTimeText.style('left', `${newX - 50}px`);
    
}

updateNewYorkTime();
setInterval(updateNewYorkTime, 1000);

// Resize event handler for the first circle
window.addEventListener('resize', () => {
    finalX = window.innerWidth / 2;
    svg1.attr('viewBox', `0 0 ${window.innerWidth} 300`);
    updateNewYorkTime();
});



/////////////////////////////////////////////////////////////////



// Second circle and related elements
let redCircleRadius = 60;
let initialTaiwanX = window.innerWidth - 60 - redCircleRadius;

// Create SVG for the second circle
const svg2 = clockViewport.append('svg')
    .attr('id', 'svg2')
    .style('position', 'absolute')
    .style('top', '0')
    .style('left', '0')
    .attr('preserveAspectRatio', 'xMidYMid meet')
    .attr('viewBox', `0 0 ${window.innerWidth} 300`);

// Create a linear gradient for the second circle
const gradient = svg2.append('linearGradient')
    .attr('id', 'redGradient')
    .attr('x1', '0%')
    .attr('x2', '100%')
    .attr('y1', '0%')
    .attr('y2', '100%');

// Add gradient stops
gradient.append('stop')
    .attr('offset', '0%')
    .attr('stop-color', '#9F8950');

gradient.append('stop')
    .attr('offset', '100%')
    .attr('stop-color', '#030029');

// Create the second circle and apply gradient fill
const redCircle = svg2.append('circle')
    .attr('cx', initialTaiwanX)
    .attr('cy', centerY)
    .attr('r', redCircleRadius)
    .style('fill', 'url(#redGradient)')
    .style('opacity', 1);


// Create a after gradient for the second circle
const aftergradient = svg2.append('linearGradient')
    .attr('id', 'afterredGradient')
    .attr('x1', '0%')
    .attr('x2', '100%')
    .attr('y1', '0%')
    .attr('y2', '100%');

// Add gradient stops
aftergradient.append('stop')
    .attr('offset', '0%')
    .attr('stop-color', '#F64B89');

aftergradient.append('stop')
    .attr('offset', '40%')
    .attr('stop-color', '#FF1074');

    
/////////////////////////////////////////////////////////////////

// Create text the second circle and click function
const taiwanTimeText = clockViewport.append('h5')
    .classed('text', true)
    .style('position', 'absolute')
    .style('top', `${centerY + redCircleRadius + 60}px`)
    .style('font-size', '14px')
    .style('color', 'white')
    .style('text-align', 'center')
    .style('width', '80px')
    .style('left', `${initialTaiwanX - 50 + redCircleRadius}px`); 

const clickText = svg2.append('text')
    .classed('click-text', true)
    .attr('x', finalX) 
    .attr('y', centerY)
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'middle')
    .style('fill', '#ffffff')
    .style('font-size', '18px')
    .style('padding', '6px')
    .style('display', 'grid') 
    .style('opacity',0.5)
    .style('cursor','pointer')
    .style('z-index', '999')
    .text('connect');


clickText.on('click', function() {
    const contentSection = d3.select('.blur');
    const currentState = contentSection.style('display');
    if (currentState === 'none') {
        contentSection.style('display', 'flex');
    } else {
        contentSection.style('display', 'none');
    }
});


const closeMark = d3.select('#closemark');

closeMark.on('click', function() {
    const questionDiv = d3.select('.blur');
    questionDiv.style('display', 'none');
});

// when mouse on
clickText.on('mouseover', function() {
    d3.select(this).style('opacity',1);
});

// when mouse left
clickText.on('mouseout', function() {
    d3.select(this).style('opacity', 0.6);
});

window.addEventListener('resize', () => {
    const newWindowWidth = window.innerWidth;
    const newWindowHeight = window.innerHeight;
    
    clickText.attr('x', finalX);
    clickText.style('top', `${newWindowHeight / 2}px`);
});


// Update Taiwan time
function updateTaiwanTime() {
    const now = new Date().toLocaleString("en-US", {timeZone: "Asia/Taipei"});
    const dateObj = new Date(now);
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const totalMinutes = hours * 60 + minutes;

    const formattedHours = hours < 10 ? '0' + hours : hours;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    taiwanTimeText.text(`${formattedHours}:${formattedMinutes} TPE`);

    let newX;

    if (totalMinutes >= 0 * 60 && totalMinutes < 9 * 60) {
        const percentage = totalMinutes / (9 * 60);
        newX = initialTaiwanX + percentage * (finalX - initialTaiwanX);
        svg2.selectAll('.click-text').style('display', 'none');
    } else if (totalMinutes >= 9 * 60 && totalMinutes < 12 * 60) {
        newX = finalX;
        redCircle.style('fill', 'url(#afterredGradient)').style('opacity', 1);
        svg2.selectAll('.click-text').style('display', 'block');
    } else if (totalMinutes >= 12 * 60 && totalMinutes < 24 * 60) {
        const percentage = (totalMinutes - 12 * 60) / (12 * 60);
        newX = finalX + percentage * (initialTaiwanX - finalX);
        svg2.selectAll('.click-text').style('display', 'none');
    }

    redCircle.attr('cx', newX);
    taiwanTimeText.style('left', `${newX - 50}px`); 
}

updateTaiwanTime();
setInterval(updateTaiwanTime, 1000);

// Resize event handler for the second circle
window.addEventListener('resize', () => {
    initialTaiwanX = window.innerWidth - 60 - redCircleRadius;
    svg2.attr('viewBox', `0 0 ${window.innerWidth} 300`);
    updateTaiwanTime();
});





// header animation

window.addEventListener('scroll', function() {
    var hero = document.getElementById('hero');
    var scrollPosition = window.scrollY;

    if (scrollPosition > 50) { 
        hero.classList.add('hero-hidden');
    } else {
        hero.classList.remove('hero-hidden');
    }
});

// Meet time text animation

window.addEventListener('scroll', function() {
    var meetingTime = document.querySelector('.meetingtime');
    var positionFromTop = meetingTime.getBoundingClientRect().top;
    var screenHeight = window.innerHeight;

    var scrollDistance = screenHeight / 4;

 
    if (positionFromTop <= scrollDistance) {
        meetingTime.style.opacity = 0.5; 
    } else {
        meetingTime.style.opacity = 0.0; 
    }
});



// change string
const currentTime = new Date();
const currentHour = currentTime.getHours();


if (currentHour >= 21 || currentHour < 0) {
    
    const meetingTimeElement = document.querySelector('.meetingtime');
    if (meetingTimeElement) {
        meetingTimeElement.textContent = "Hey Dear, It's Time to Connect!";
    }
}

// pink lighting animation
var now = new Date();
var hour = now.getHours();


var ball6 = document.getElementById("pink_lighting");


if (currentHour >= 21 || currentHour < 0) {
    ball6.style.opacity = "0.4"; 
} else {
    ball6.style.opacity = "0"; 
}

// footer animation

window.addEventListener('scroll', function() {
    var footer = document.querySelector('footer');
    var footerPosition = footer.getBoundingClientRect();
    var windowHeight = window.innerHeight;

    if (footerPosition.top < windowHeight) {
        footer.style.opacity = '0.7';
    } else {
        footer.style.opacity = '0';

    }
});


// 
const contentSection = d3.select('.blur');

clickText.on('click', function() {
    const currentState = contentSection.style('display');
    if (currentState === 'none') {

        contentSection.style('display', 'flex');
        contentSection.style('filter', 'blur(10px)');
    
        setTimeout(() => {
            contentSection.style('filter', 'blur(0px)');
        }, 100); 
    } else {
        contentSection.style('display', 'none');
    }
});
