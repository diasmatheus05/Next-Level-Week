function populateUFs() {

    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( (res) => { return res.json() } )
    .then( (states) => {

        for( state of states ) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }

    } )
}

populateUFs()

function getCities(event) {

    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = false

    fetch(url)
    .then( (res) => { return res.json() } )
    .then( (cities) => {

        for( city of cities ) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false

    } )
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

// Itens de coleta

// Pegar todos os li`s
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")
let selectedItems = []

function handleSelectedItem() {
    const itemLi = event.target

    // adicionar ou remover uma classe html com js
    itemLi.classList.toggle("selected")

    const itemId = event.target.dataset.id

    // verificar se existem items selecionados, se sim pegar os itens selecionados
    const alredySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId
        return itemFound
    } )

    // se ja estiver selecionado, adicionar ?? sele????o
    if(alredySelected >= 0) {
        // tirar da sele????o
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        } )

        selectedItems = filteredItems
    } else { // se n??o estiver selecionado, adicionar ?? sele????o
        selectedItems.push(itemId)
    }
    // atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems
}