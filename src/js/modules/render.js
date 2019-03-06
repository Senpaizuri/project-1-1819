const
    wiki = (data,cont)=>{
        let 
            results = data.query.search,
            resultCont = document.createElement("ul"),
            container = document.querySelector(`.${cont}`)
        container.innerHTML = ""
        results.forEach(result => {
            const
                newH1 = document.createElement("h1"),
                newSpn= document.createElement("span"),
                newAn = document.createElement("a"),
                newLi = document.createElement("li")
            
            newH1.innerHTML = result.title

            newSpn.innerHTML = result.snippet

            newAn.href = "https://en.wikipedia.org/wiki/" + result.title

            newAn.appendChild(newH1)
            newAn.appendChild(newSpn)
            newLi.appendChild(newAn)
            resultCont.appendChild(newLi)
        })
        container.appendChild(resultCont)
    },
    album = (data,songs)=>{
        console.log(data,songs)
        const
            container = document.querySelector("#album"),
            newhead= document.createElement("header"),
            newImg = document.createElement("img"),
            newTtl = document.createElement("h1"),
            newSub = document.createElement("h2"),
            newUl  = document.createElement("ul"),
            newGen = document.createElement("div"),
            genres = data.genre.map(el => `<span>${el}</span>`)
                
        container.innerHTML = ""

        newImg.src = data.catalogusImg_m

        newTtl.innerHTML = data.title
        newSub.innerHTML = data.artists.join(",")

        newGen.innerHTML = genres.join()



        songs.forEach((song,i)=>{
            let
                newLi = document.createElement("li"),
                newSpn= document.createElement("span"),
                newh2 = document.createElement("h2"),
                newAn = document.createElement("a"),
                newIfr = document.createElement("iframe")

            newIfr.src = data.preview.url[i]

            newh2.innerHTML = data.preview.titles[i]

            String.prototype.replaceAll = function(search, replacement) {
                var target = this;
                return target.replace(new RegExp(search, 'g'), replacement);
            };

            newAn.href = `https://www.musixmatch.com/lyrics/${data.artists[0].replaceAll(" ","-")}/${data.preview.titles[i].replaceAll(" ","-")}`
            
            newSpn.innerHTML = song.lyrics_body.split("*******")[0]
            if(song.lyrics_body.split("*******")[1]){
                newSpn.innerHTML += "<br>" + song.lyrics_body.split("*******")[1]
            }
            
            newAn.appendChild(newh2)
            newLi.appendChild(newAn)
            newLi.appendChild(newIfr)
            newLi.appendChild(newSpn)
            newUl.appendChild(newLi)
        })

        newhead.appendChild(newImg)
        newhead.appendChild(newTtl)
        newhead.appendChild(newSub)
        newhead.appendChild(newGen)
        
        container.appendChild(newhead)        
        container.appendChild(newUl)
    }

export {wiki,album}
