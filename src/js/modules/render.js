const
    wiki = (data,cont)=>{
        let 
            results = data.query.search,
            resultCont = document.createElement("ul"),
            container = document.querySelector(`.${cont}`)
        container.innerHTML = `<h1>Wiki's for the relevant ${cont.split("wiki-")[1]}</h1>`
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
        document.querySelector("label").classList.remove("hidden")
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
            metaCont = document.createElement("div"),
            genres = data.genre.map(el => `<span class="genre ${el}">${el}</span>`)
                
        container.innerHTML = ""
    
        newImg.src = data.catalogusImg_m

        newTtl.innerHTML = data.title
        newSub.innerHTML = data.artists.join(",")

        newGen.innerHTML = genres.join("")

        metaCont.classList.add("meta")

        songs.forEach((song,i)=>{
            let
                newLi = document.createElement("li"),
                newSpn= document.createElement("span"),
                newh2 = document.createElement("h2"),
                newAn = document.createElement("a"),
                newIfr = document.createElement("iframe"),
                ifrCont= document.createElement("div"),
                counter = document.createElement("div")

            newLi.style.setProperty("animation-delay",`${i*100}ms`)

            newIfr.src = data.preview.url[i]

            ifrCont.classList.add("iframecont")

            newh2.innerHTML = data.preview.titles[i]
            newh2.title = data.preview.titles[i]

            counter.innerHTML = (()=>{
                if(i+1 < 10){
                    return `#00${i+1}`
                } else{
                    return `#0${i+1}`
                }
            })()

            newAn.href = `https://www.musixmatch.com/lyrics/${data.artists[0].replaceAll(" ","-")}/${data.preview.titles[i].replaceAll(" ","-")}`
            newAn.classList.add("title")

            newSpn.innerHTML = song.lyrics_body.split("*******")[0]
            if(song.lyrics_body.split("*******")[1]){
                newSpn.innerHTML += "<br>" + song.lyrics_body.split("*******")[1]
            }

            if(song.lyrics_body.length >= 16){
                let
                    newAn = document.createElement("a")
                newAn.href = `https://www.musixmatch.com/lyrics/${data.artists[0].replaceAll(" ","-")}/${data.preview.titles[i].replaceAll(" ","-")}`
                newAn.classList.add("lyric")
                newAn.innerHTML = "Full Lyrics"

                newLi.appendChild(newAn)
            }
            
            newAn.appendChild(newh2)
            ifrCont.appendChild(counter)
            ifrCont.appendChild(newIfr)
            newLi.appendChild(ifrCont)
            newLi.appendChild(newAn)
            newLi.appendChild(newSpn)
            newUl.appendChild(newLi)
        })

        metaCont.appendChild(newGen)
        metaCont.appendChild(newTtl)
        metaCont.appendChild(newSub)

        newhead.appendChild(newImg)
        newhead.appendChild(metaCont)
       

        container.appendChild(newhead)        
        container.appendChild(newUl)
    }

export {wiki,album}
