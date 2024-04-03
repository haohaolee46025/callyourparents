
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";


const initialTime = Date.now();


const body = d3.select('body');


const clock = body.append('div')
    .attr('id', 'clock')
    .style('width', '100%')
    .style('height', '300px')
    .style('position', 'relative');


const horizontalLine = clock.append('div')
    .style('position', 'absolute')
    .style('top', '50%')
    .style('left', '0')
    .style('width', '100%')
    .style('height', '1px')
    .style('background-color', 'white');


let circleRadius = 50;
let centerY = horizontalLine.node().offsetTop + 0.5;
let initialX = 20; 
let finalX = window.innerWidth / 2; 


const svg = clock.append('svg')
    .attr('width', '100%')
    .attr('height', '100%')
    .style('position', 'absolute')
    .style('top', '0')
    .style('left', '0');


const circle = svg.append('circle')
    .attr('cx', initialX)
    .attr('cy', centerY)
    .attr('r', circleRadius)
    .style('fill', '#5E649F')
    .style('opacity',0.8);
    
    

const newYorkTimeText = clock.append('div')
    .style('position', 'absolute')
    .style('top', `${centerY - circleRadius - 30}px`) 
    .style('font-size', '14px')
    .style('color', 'white')
    .style('text-align', 'center')
    .style('width', '100px')
    .style('left', `${initialX - 50 + circleRadius}px`); 

function updateNewYorkTime() {

    const now = new Date().toLocaleString("en-US", {timeZone: "America/New_York"});
    const dateObj = new Date(now);
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const formattedHours = hours < 10 ? '0' + hours : hours; 
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes; 

    newYorkTimeText.text(`${formattedHours}:${formattedMinutes} EDT`);

const totalMinutes = hours * 60 + minutes;
let newX;

if (totalMinutes >= 21 * 60 || totalMinutes < 0 * 60) {

    newX = finalX;
    circle.style('fill', '#FF5C00')
    .style('opacity', 0.5);
} else if (totalMinutes >= 12 * 60 && totalMinutes < 21 * 60) {

    const percentage = (totalMinutes - 12 * 60) / (21 * 60 - 12 * 60);
    newX = initialX + percentage * (finalX - initialX);

} else {

    const percentage = (totalMinutes - 0 * 60) / (12 * 60);
    newX = finalX + percentage * (initialX - finalX);

}



    circle.attr('cx', newX);
    

    newYorkTimeText.style('left', `${newX - 50}px`);
    
}


updateNewYorkTime();


setInterval(updateNewYorkTime, 1000);






let redCircleRadius = circleRadius;
let initialTaiwanX = window.innerWidth - 20 - redCircleRadius; 
let finalTaiwanX = window.innerWidth / 2; 


const redSvg = clock.append('svg')
    .attr('width', '100%')
    .attr('height', '100%')
    .style('position', 'absolute')
    .style('top', '0')
    .style('left', '0');


const redCircle = redSvg.append('circle')
    .attr('cx', initialTaiwanX)
    .attr('cy', centerY)
    .attr('r', redCircleRadius)
    .attr('r', 30) 
    .style('fill', '#9F8950')
    .style('opacity',0.8);


const taiwanTimeText = clock.append('div')
    .style('position', 'absolute')
    .style('top', `${centerY + redCircleRadius + 30}px`) 
    .style('color', 'white')
    .style('text-align', 'center')
    .style('width', '100px')
    .style('left', `${initialTaiwanX - 50 + redCircleRadius}px`); 


function updateTaiwanTime() {

    const now = new Date().toLocaleString("en-US", {timeZone: "Asia/Taipei"});
    const dateObj = new Date(now);
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const totalMinutes = hours * 60 + minutes; 
 
    const formattedHours = hours < 10 ? '0' + hours : hours; 
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes; 
    taiwanTimeText.text(`${formattedHours}:${formattedMinutes} UTC`);


    let newX;

    if (totalMinutes >= 9 * 60 && totalMinutes < 12 * 60) {

        newX = finalTaiwanX;
        circle.style('fill', '#FF5C00')
        .style('opacity', 1);
    } else if (totalMinutes >= 12 * 60 && totalMinutes < 24 * 60) {

        const percentage = (totalMinutes - 12 * 60) / (12 * 60);
        newX = finalTaiwanX + percentage * (initialTaiwanX - finalTaiwanX);
    } else {

        const nextDayMinutes = totalMinutes - 24 * 60;
        const percentage = nextDayMinutes / (9 * 60);
        newX = initialTaiwanX + percentage * (finalTaiwanX - initialTaiwanX);
        

        if (newX > finalTaiwanX) {
            newX = finalTaiwanX;
        }
    }


    redCircle.attr('cx', newX);
    

    taiwanTimeText.style('left', `${newX - 50}px`);
}



updateTaiwanTime();

setInterval(updateTaiwanTime, 1000);


// 监听窗口大小变化事件
window.onresize = function() {

    finalX = window.innerWidth / 2;
    finalTaiwanX = window.innerWidth / 2;


    const totalMinutes = new Date().getHours() * 60 + new Date().getMinutes();
    let newX;

    if (totalMinutes < 12 * 60) {
        newX = initialX;
    } else if (totalMinutes < 21 * 60) {
        const percentage = (totalMinutes - 12 * 60) / (21 * 60 - 12 * 60);
        newX = initialX + percentage * (finalX - initialX);
    } else if (totalMinutes < 24 * 60) {
        newX = finalX;
    } else {
        const nextDayMinutes = totalMinutes - 24 * 60;
        const percentage = nextDayMinutes / (12 * 60);
        newX = finalX - percentage * (finalX - initialX);
    }

    // 更新圆圈的位置和文字标识的位置
    circle.attr('cx', newX);
    newYorkTimeText.style('left', `${newX - 50}px`);

    // 更新红色圆圈的位置
    let redX;

    if (totalMinutes >= 9 * 60 && totalMinutes < 12 * 60) {
        redX = finalTaiwanX;
    } else if (totalMinutes >= 12 * 60 && totalMinutes < 24 * 60) {
        const percentage = (totalMinutes - 12 * 60) / (12 * 60);
        redX = finalTaiwanX + percentage * (initialTaiwanX - finalTaiwanX);
    } else {
        const nextDayMinutes = totalMinutes - 24 * 60;
        const percentage = nextDayMinutes / (9 * 60);
        redX = initialTaiwanX + percentage * (finalTaiwanX - initialTaiwanX);

        if (redX > finalTaiwanX) {
            redX = finalTaiwanX;
        }
    }

    redCircle.attr('cx', redX);
    taiwanTimeText.style('left', `${redX - 50}px`);
};
