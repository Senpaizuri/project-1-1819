(()=>{
    const
        app = {
            init:()=>{
                if (navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === 'function') {
                    Quagga.init({
                        inputStream : {
                            name : "Live",
                            type : "LiveStream",
                            target: document.querySelector('#finder')
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
            }
        },
        handleData = {
            get:(endpoint,id)=>{
                return new Promise(resolve=>{
                    let url = `./src/${endpoint}/${id}.xml`
                    fetch(url)
                    .then(res => console.log(res))
                    .catch(err => ()=>{console.log(err)})
                })
            }
        }

    app.init()

    Quagga.onDetected((data)=>{
        let code = data.codeResult.code.split("978")[1]
        document.querySelector('#code').innerHTML = `code: ${code}`
        console.log(code)
        handleData.get('db',code)
        Quagga.stop()
    })
})()
