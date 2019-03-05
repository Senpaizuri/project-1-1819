import * as scanner from "../modules/scanner.js"
import * as data from "../modules/data.js"
import * as render from "../modules/render.js"
const init = ()=>{
    routie({
        "album-*":async(id)=>{
            console.log(id)
            if(id == ""){
                window.location.hash = ""
            }else{
                render.wiki(await data.getWiki("skrillex"))
            }
        },
        "*":async(str)=>{
            if(str){
                window.location.hash = ""
            }else{
                console.log("nothing to see here")
                // console.log(await data.get("../src/db/db.json"))
                scanner.init()
                scanner.detect()
            }
        }
    })
}

export {init}
// let arr = [],
//     items = document.querySelectorAll(".cat-track-title a")
// items.forEach(el => arr.push(el.innerHTML))
// console.log(arr)
