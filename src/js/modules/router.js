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
                
                document.body.classList.add("loading")
                render.album(dataQuery,await data.lyrics(dataQuery))
                render.wiki(await data.getWiki(dataQuery.title),"wiki-album")
                render.wiki(await data.getWiki(dataQuery.artists[0]),"wiki-artist")

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
                
            }
        }
    })
}

export {init}
// let arr = [],
//     items = document.querySelectorAll(".cat-track-title a")
// items.forEach(el => arr.push(el.innerHTML))
