
import { randomChoice, shuffle } from "./script.js"
const dropContainers = document.querySelector(".drop-containers")

const dragItems = document.querySelector(".drag-items")
const containersAmount= 3
let dragged
let containersFilled = 0

const colorFile = {
    blue: ["1.jpeg", "2.webp", "3.jpeg", "5.webp", "6.webp"],
    green: ["1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg", "5.jpeg", "6.jpeg", "7.jpeg", "8.jpeg"],
    red: ["1.jpeg", "2.jpeg", "3.jpeg", "4.webp", "5.jpeg", "6.jpeg", "7.jpeg", "8.jpeg"],
    yellow: ["1.jpeg", "2.jpeg", "3.webp", "4.png", "5.jpeg", "6.jpeg", "7.jpeg", "8.jpeg", "9.webp"],
}
const images = getImages(colorFile)

function getImages(colorFile) {
    let images = {}

    let choices = Object.keys(colorFile)
    let i = 0
    while (i != containersAmount) {

        const [folder, index] = randomChoice(choices)
        choices.splice(index, 1)
        images[folder] = []
        i++
    }
    for (let i = 0; i < containersAmount; i++) {
    }

    for (const folder of Object.keys(images)) {
        for (const file of colorFile[folder]) {
            const src = `./../img/${folder}/${file}`
            images[folder].push(src)
        }
    }
    return images
}


for (const color of Object.keys(images)) {
    const container = document.createElement("div")

    container.classList.add("drop-container", "drop-container_color", "drop-zone")
    container.dataset.color = color
    container.style.backgroundColor = color

    dropContainers.appendChild(container)
}



let dragItemsArr = []
for (const [color, imagesSrc] of Object.entries(images)) {
    for (const image of imagesSrc) {
        const dragItem = document.createElement("img")

        dragItem.classList.add("drag-item", "drag-img")
        dragItem.setAttribute("draggable", true)
        dragItem.src = image
        dragItem.dataset.color = color


        dragItem.ondragstart = (event) => {
            dragged = dragItem;
            dragItem.classList.add("dragging");
        };

        dragItem.ondragend = (event) => {
            dragItem.classList.remove("dragging");
        }
        dragItemsArr.push(dragItem)
    }

}
for (const item of shuffle(dragItemsArr)) {
    dragItems.appendChild(item)
}


dropContainers.querySelectorAll(".drop-container").forEach((container) => {
    container.ondragover = (event) => {
        event.preventDefault();
    };


    container.ondrop = (event) => {

        event.preventDefault()

        if (!event.target.classList.contains("drop-zone"))
            return
        let destColor = event.target.dataset.color
        if (destColor != dragged.dataset.color) {
            alert("Not true color")
            return
        }

        event.target.classList.remove("dragover");
        dragged.parentNode.removeChild(dragged);
        event.target.appendChild(dragged);
        console.log(event.target.children.length, images[destColor].length)
        if (event.target.children.length == images[destColor].length) {
            event.target.style.borderColor = "green"
            event.target.classList.remove("drop-zone")

            Array.from(event.target.children).forEach((element) => {
                element.setAttribute("draggable", false)
            })

            containersFilled++

            if (containersFilled === container)
                alert("Amazing!")
        }
    }
})

