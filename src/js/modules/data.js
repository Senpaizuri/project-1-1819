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
        String.prototype.replaceAll = function(search, replacement) {
            var target = this;
            return target.replace(new RegExp(search, 'g'), replacement);
        };
        let
            artist = data.artists[0].replace(" ","%20"),
            songs = data.preview.titles,
            arr
        const
            header  = {"X-RapidAPI-Key":"a5afea7a6cmsh1c3772836574618p126520jsn977cb0af9079"}

        arr = songs.map(async(song)=>{
            let
                dataUrl = `https://musixmatchcom-musixmatch.p.rapidapi.com/wsr/1.1/matcher.lyrics.get?q_artist=${artist}&q_track=${song.replaceAll(" ","-").replaceAll("'","-").toLowerCase()}`,
                lyric = await get(dataUrl,header)

                if(JSON.stringify(lyric).length <= 2){
                    lyric = {lyrics_body:`On a cold winter morning
                    In the time before the light
                    In flames of death's eternal reign
                    We ride towards the fight
                    When the darkness has fallen down
                    And the times are tough alright
                    The sound of evil laughter falls
                    Around the world tonight`}
                }
                return lyric
        })
        let result = await Promise.all(arr).then((res)=>{return res})
        return result

    }

export {get,getWiki,matching,lyrics}
