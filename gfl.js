var fetchDolls = async () => {
    let data = await fetch("https://dss285.github.io/girlsfrontline/gfl_dolls.json")
    return await data.json()
}
var fetchEquipment = async () => {
    let data = await fetch("https://dss285.github.io/girlsfrontline/gfl_equipment.json")
    return await data.json()
}
var fetchFairies = async () => {
    let data = await fetch("https://dss285.github.io/girlsfrontline/gfl_fairies.json")
    return await data.json()
}
var fetchRecipes = async () => {
    let data = await fetch("https://dss285.github.io/girlsfrontline/gfl_recipes.json")
    return await data.json()
}
function title(input) {
    return input && `${input[0].toUpperCase()}${input.slice(1)}`
}
var productionDollsDOM = (dolls) => {
    let rarity = {
        "Common" : "★★",
        "Rare" : "★★★",
        "Ultra-Rare" : "★★★★",
        "Legendary" :"★★★★★"
    }
    let divs = document.querySelectorAll(".production-dolls")
    for(let div of divs) {
        let table = document.createElement("ul")
        for(let doll of dolls) {
            let dollTimer = new Date(null)
            dollTimer.setSeconds(doll.production_timer)
            let dollRow = document.createElement("li")

            dollRow.innerText = `[${doll.type}] ${doll.name} ${dollTimer.toISOString().substr(11, 8)} [${rarity[doll.rarity]}]`

            table.appendChild(dollRow)
        }
        div.appendChild(table)
    }
}
var equipmentDOM = (equipments) => {
    let divs = document.querySelectorAll(".equipment")
    for(let div of divs) {
        let table = document.createElement("ul")
        for(let equipment of equipments) {
            let equipmentTimer = new Date(null)
            equipmentTimer.setSeconds(equipment.production_timer)
            let equipmentRow = document.createElement("li")

            equipmentRow.innerText = `[${title(equipment.type)}] 
            ${equipment.name}
            ${equipmentTimer.toISOString().substr(11, 8)}`

            table.appendChild(equipmentRow)
        }
        div.appendChild(table)
    }
}
var fairiesDOM = (fairies) => {
    let divs = document.querySelectorAll(".fairies")
    for(let div of divs) {
        let table = document.createElement("ul")
        for(let fairy of fairies) {
            let fairyTimer = new Date(null)
            fairyTimer.setSeconds(fairy.production_timer)
            let fairyRow = document.createElement("li")

            fairyRow.innerText = `${fairy.name}, ${fairyTimer.toISOString().substr(11, 8)}`

            table.appendChild(fairyRow)
        }
        div.appendChild(table)
    }
}
var recipesDOM = (recipes) => {
    let divs = document.querySelectorAll(".recipes")
    for(let div of divs) {
        let table = document.createElement("ul")
        for(let recipe of recipes) {
            let recipeRow = document.createElement("li")
            recipeRow.innerText = `${recipe.name} 
            [${recipe.manpower} MP]
            [${recipe.ammo} AMMO] 
            [${recipe.rations} RATS] 
            [${recipe.parts} PARTS]`

            table.appendChild(recipeRow)
        }
        div.appendChild(table)
    }  
}
var program = async () => {
    let sortingFunc = (a, b) => {
        if(a.production_timer > b.production_timer) {
            return 1;
        }
        else if(b.production_timer > a.production_timer) {
            return -1;
        } else {
            return 0;
        }
    }
    let dolls = await fetchDolls()
    let equipments = await fetchEquipment()
    let fairies = await fetchFairies()
    let recipes = await fetchRecipes()
    let productionDolls = dolls.filter(doll => doll.production_timer != null).sort(sortingFunc)
    let productionEquipment = equipments.filter(equipment=> equipment.production_timer != null).sort(sortingFunc)
    let productionFairies = fairies.filter(fairy => fairy.production_timer != null).sort(sortingFunc)
    productionDollsDOM(productionDolls)
    equipmentDOM(productionEquipment)
    fairiesDOM(productionFairies)
    recipesDOM(recipes)

}
program()