var fetchDolls = async () => {
    let data = await fetch("/gfl_dolls.json")
    return await data.json()
}
var fetchEquipment = async () => {
    let data = await fetch("/gfl_equipment.json")
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

            dollRow.innerText = `[${doll.type}] ${doll.name}, ${dollTimer.toISOString().substr(11, 8)} [${rarity[doll.rarity]}]`

            table.appendChild(dollRow)
        }
        div.appendChild(table)
    }
}
var program = async () => {
    let dolls = await fetchDolls()
    let equipment = await fetchEquipment()
    let productionDolls = dolls.filter(doll => doll.production_timer != null).sort((a, b) => {
        if(a.production_timer > b.production_timer) {
            return 1;
        }
        else if(b.production_timer > a.production_timer) {
            return -1;
        } else {
            return 0;
        }
    })
    productionDollsDOM(productionDolls)

}
program()