(()=>{
    const
        app = {
            init:async()=>{
                if (navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === 'function') {
                    Quagga.init({
                        inputStream : {
                            name : "Live",
                            type : "LiveStream",
                            target: document.querySelector('#finder')    // Or '#yourElement' (optional)
                          },
                          decoder : {
                            readers : ["ean_reader"]
                          }
                        }, function(err) {
                            if (err) {
                                console.log(err);
                                return
                            }
                            console.log("Initialization finished. Ready to start");
                            Quagga.start();
                    })
                }
                data.get(`https://api.cdr.nl/engine/version`)

                let xhr = new XMLHttpRequest()
                xhr.onload = (e)=>{
                    console.log(e.responseText)
                }
                xhr.open("GET","https://api.cdr.nl/engine/version")
                xhr.setRequestHeader("Authorization","Basic ODgwNjk0NjktNGRmYy00NWY0LWIwNTMtYzhiMjAxODlhZDk1OldCTFJRM1cx")
                xhr.send()

            }
        },
        data = {
            get:(url)=>{
                console.log(url)
                return new Promise(resolve => {
                    let a = new Headers({
                        "Authorization":"Basic ODgwNjk0NjktNGRmYy00NWY0LWIwNTMtYzhiMjAxODlhZDk1OldCTFJRM1cx"
                    })
                    
                    fetch(url,{
                        method:"get",
                        headers: a,
                        credentials:"same-origin"
                        
                    })
                })
            }
        }
    app.init()

    document.querySelector("[data-stop]").addEventListener("click",()=>{
        Quagga.stop()
    })
    document.querySelector("[data-start]").addEventListener("click",()=>{
        app.init()
    })

    Quagga.onDetected((data)=>{
        document.querySelector('#code').innerHTML = `code: ${data.codeResult.code}`
    })
})()
