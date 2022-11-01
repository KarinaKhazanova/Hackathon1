import { getRandomColor, getRandomInt } from './script.js'

const dropContainers = document.querySelector(".drop-containers")
const dragItems = document.querySelector(".drag-items")

const containersAmount = 3

const minContainerAmount = 2
const maxContainerAmount = 6

const maxItems = containersAmount * maxContainerAmount

let currentItemsAmount = 0
let containersFilled = 0

const amounts = []

for (let i = containersAmount; i > 0; i--) {
    const amount = getRandomInt(minContainerAmount, maxContainerAmount)
    amounts.push(amount)
    currentItemsAmount += amount
}

const containers = {}
let dragged

amounts.forEach((item) => {
    const container = document.createElement('div')
    container.classList.add("drop-container", "drop-container_number", "drop-zone")
    container.dataset.amount = item
    container.textContent = item
    dropContainers.appendChild(container)
})

for (let i = currentItemsAmount; i > 0; i--) {
    const dragItem = document.createElement("div")

    dragItem.classList.add("drag-item")
    dragItem.setAttribute("draggable", true)
    dragItem.style.backgroundColor = getRandomColor()

    dragItem.ondragstart = (event) => {
        dragged = dragItem;
        dragItem.classList.add("dragging");
    };

    dragItem.ondragend = (event) => {
        dragItem.classList.remove("dragging");
    }
    dragItems.appendChild(dragItem)

}


dropContainers.querySelectorAll(".drop-container").forEach((container) => {
    container.ondragover = (event) => {
        event.preventDefault();
    };


    container.ondrop = (event) => {
        event.preventDefault();

        console.log("drop")
        if (!event.target.classList.contains("drop-zone"))
            return

        event.target.classList.remove("dragover");
        dragged.parentNode.removeChild(dragged);
        event.target.appendChild(dragged);

        const amount = Number(event.target.dataset.amount)

        if (event.target.children.length == amount) {
            event.target.style.borderColor = "green"
            event.target.classList.remove("drop-zone")
            Array.from(event.target.children).forEach((element) => {
                element.setAttribute("draggable", false)
            })
            containersFilled++
            if (containersFilled === containersAmount)
                alert("Great job!")

        }
    }
})
