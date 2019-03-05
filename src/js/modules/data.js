const
    get = (url)=>{
        return new Promise(resolve =>{
            fetch(url)
            .then(res => res.json())
            .then(response => resolve(response))
            .catch(err => console.log(err))
        })
    },
    getWiki = (query)=>{
        const
            dataUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${query.replace(" ","%20")}&utf8=&format=json&origin=*`
        let
            data = get(dataUrl)
        return data
    },
    matching = (data,id)=>{
        let arr=[]
        data.forEach(el => {
            arr.push(el)
        })
        return arr.filter(el => el.ppn == id)
    }


export {get,getWiki,matching}
