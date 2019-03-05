import * as scanner from "../modules/scanner.js"
import * as data from "../modules/data.js"
import * as render from "../modules/render.js"
const init = ()=>{
    routie({
        "album-*":async(id)=>{
            if(!isNaN(id)){
                let
                    dataSet = await data.get("./src/db/db.json"),
                    dataQuery = data.matching(dataSet,id)[0]
                render.wiki(await data.getWiki(dataQuery.title))
                render.wiki(await data.getWiki(dataQuery.artists[0]))
            }else{
                window.location.hash = ""
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
