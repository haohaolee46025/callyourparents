import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const renderItems = (topics) => {
    const topicList = document.getElementById('question_text'); // 获取题目所在的元素
    topicList.innerHTML = ""; // 清空该元素

    // 随机排序数组
    topics.sort(() => Math.random() - 0.5);

    // 选择数组的第一个元素进行渲染
    let listItem = `<h6>${topics[0].topics}</h6>`;
    topicList.insertAdjacentHTML('beforeend', listItem); // 在题目元素中插入题目
}






const body = d3.select('body');

// 在 body 中创建时钟容器
const clockContainer = body.insert('section', '#content')
    .attr('id', 'clock-container')
    .style('height', '400px');
    

// Create a viewport for the clock elements
const clockViewport = clockContainer.append('div')
    .attr('id', 'clock-viewport')
    .style('width', '100%')
    .style('height', '400px')
    .style('position', 'sticky')
    .style('position', '-webkit-sticky')
    .style('top', '0')
    .style('z-index', '1000');


// Create horizontal line
const horizontalLine = clockViewport.append('div')
    .style('position', 'absolute')
    .style('top', '50%')
    .style('left', '0')
    .style('width', '100%')
    .style('height', '1px')
    .style('background-color', '#565656');

// Initial positions and sizes
let circleRadius = 80;
let centerY = horizontalLine.node().offsetTop + 0.5;
let initialX = 60;
let finalX = window.innerWidth / 2;

// Create SVG for the first circle
const svg1 = clockViewport.append('svg')
    .attr('id', 'svg1')
    .style('position', 'absolute')
    .style('top', '0')
    .style('left', '0')
    .attr('preserveAspectRatio', 'xMidYMid meet')
    .attr('viewBox', `0 0 ${window.innerWidth} 300`);

//Create a linear gradient for the first circle
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
    .attr('stop-color', '#140D64');

// Create the first circle and apply gradient fill
const circle1 = svg1.append('circle')
    .attr('cx', initialX)
    .attr('cy', centerY)
    .attr('r', circleRadius)
    .style('fill', 'url(#blueGradient)')
    .style('opacity', 1)
    .classed('rotate', true); // Apply rotation class here



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
    .attr('stop-color', '#FF5C00');

afterblueGradient.append('stop')
    .attr('offset', '100%')
    .attr('stop-color', '#FF3333');



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







// Second circle and related elements
let redCircleRadius = 50;
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
    .attr('stop-color', '#39311D');

// Create the second circle and apply gradient fill
const redCircle = svg2.append('circle')
    .attr('cx', initialTaiwanX)
    .attr('cy', centerY)
    .attr('r', redCircleRadius)
    .style('fill', 'url(#redGradient)')
    .style('opacity', 1);


// Create a after linear gradient for the second circle
const aftergradient = svg2.append('linearGradient')
    .attr('id', 'afterredGradient')
    .attr('x1', '0%')
    .attr('x2', '100%')
    .attr('y1', '0%')
    .attr('y2', '100%');

// Add gradient stops
aftergradient.append('stop')
    .attr('offset', '0%')
    .attr('stop-color', '#F23232');

aftergradient.append('stop')
    .attr('offset', '100%')
    .attr('stop-color', '#B20101');


// Create text for the second circle's time
const taiwanTimeText = clockViewport.append('h5')
    .classed('text', true)
    .style('position', 'absolute')
    .style('top', `${centerY + redCircleRadius + 30}px`)
    .style('font-size', '14px')
    .style('color', 'white')
    .style('text-align', 'center')
    .style('width', '80px')
    .style('left', `${initialTaiwanX - 50 + redCircleRadius}px`); // Adjusted for centering

const clickText = svg2.append('text')
    .classed('click-text', true)
    .attr('x', finalX) 
    .attr('y', centerY)
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'middle')
    .style('fill', '#FFA9A9')
    .style('font-size', '14px')
    .style('display', 'grid') // Initially hidden
    .style('opacity',0)
    .style('cursor','pointer')
    .text('click');


clickText.on('click', function() {
    const contentSection = d3.select('#question');
    const currentState = contentSection.style('display');
    if (currentState === 'none') {
        contentSection.style('display', 'flex');
    } else {
        contentSection.style('display', 'none');
    }
});


const closeMark = d3.select('#closemark');

closeMark.on('click', function() {
    const questionDiv = d3.select('#question');
    questionDiv.style('display', 'none');
});



// 添加鼠标悬停事件监听器
clickText.on('mouseover', function() {
    // 在悬停时显示文本
    d3.select(this).style('opacity',1);
});

// 添加鼠标离开事件监听器
clickText.on('mouseout', function() {
    // 在离开时隐藏文本
    d3.select(this).style('opacity', 0);
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
    taiwanTimeText.style('left', `${newX - 50}px`); // Adjusted for centering
}

updateTaiwanTime();
setInterval(updateTaiwanTime, 1000);

// Resize event handler for the second circle
window.addEventListener('resize', () => {
    initialTaiwanX = window.innerWidth - 60 - redCircleRadius;
    svg2.attr('viewBox', `0 0 ${window.innerWidth} 300`);
    updateTaiwanTime();


    
});

window.addEventListener('scroll', function() {
    var hero = document.getElementById('hero');
    var scrollPosition = window.scrollY;

    if (scrollPosition > 100) { // 当滚动位置超过100px时
        hero.classList.add('hero-hidden');
    } else {
        hero.classList.remove('hero-hidden');
    }
});

// JSON file
fetch('topics.json')
    .then(response => response.json())
    .then(topics => {
        console.log(topics)
        // 调用函数
        renderItems(topics)
    })