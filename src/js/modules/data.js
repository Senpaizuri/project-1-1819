const
    get = (url,headings)=>{
        var head = new Headers(headings)
        return new Promise(resolve =>{
            fetch(url,{headers:head})
            .then(res => res.json())
            .then(response => resolve(response))
            .catch(err => resolve(err))
        })
    },
    getWiki = (query)=>{
        const dataUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${query.replace(" ","%20")}&utf8=&format=json&origin=*`
        let data = get(dataUrl)
        return data
    },
    matching = (data,id)=>{
        let arr=[]
        data.forEach(el => {
            arr.push(el)
        })
        return arr.filter(el => el.ppn == id)
    },
    lyrics = async(data)=>{
        let
            artist = data.artists[0].replace(" ","%20"),
            songs = data.preview.titles
        const
            header  = {"X-RapidAPI-Key":"3fc1b095e5msh4c0774f13406874p192ddbjsn4cfeaa51142a"}

        let arr = songs.map(async(song)=>{
            let
                dataUrl = `https://musixmatchcom-musixmatch.p.rapidapi.com/wsr/1.1/matcher.lyrics.get?q_artist=${artist}&q_track=${song}`,
                lyric = await get(dataUrl,header)
                if(JSON.stringify(lyric).length <= 2 && !lyric.lyrics_body){
                    lyric = {lyrics_body:"no lyrics found"}
                }
                return lyric
        })
        let result = await Promise.all(arr).then((res)=>{return res})
        return result

    }


export {get,getWiki,matching,lyrics}
