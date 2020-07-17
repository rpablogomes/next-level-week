function populateUFs() {
    var stateSelect
    var ufSelect = document.querySelector("select[id=uf]")
    // var stateSelect = 



    // var stateSelect = document.querySelector("select[name=])


    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json())
        .then(states => {

            for (let state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
            // for(let statename of states){
            //     id =  ufSelect = statename.nome
            //     console.log(ufSelect)

        })

}



populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=states]")
    // const stateInput2 = document.querySelector("[name=states].value")
    // console.log(stateInput)

    // console.log(event)

    const ufValue = event.target.value

    // console.log()

    const indexOfSelectedState = event.target.selectedIndex
    // console.log(stateInput)
    stateInput.value = event.target.options[indexOfSelectedState].text


    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = ""
    citySelect.disabled = false

    fetch(url)
        .then(res => res.json())
        .then(cities => {

            for (const city of cities) {

                citySelect.innerHTML += `<option value ="${city.nome}">${city.nome}</option>`
            }

            citySelect.disabled = false
        })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

//Ítens de coleta
const ItemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of ItemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("Input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target

    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemId
        return itemFound
    })

    if (alreadySelected >= 0) {
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })
        selectedItems = filteredItems
    }
    else {
        selectedItems.push(itemId)
    }

    collectedItems.value = selectedItems
}

// function Submit (){
//     stateSelect=states.value
//     console.log(stateSelect)
// }