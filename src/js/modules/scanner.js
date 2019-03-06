const
    init = ()=>{
        if (navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === 'function') {
            Quagga.init({
                inputStream : {
                    name : "Live",
                    type : "LiveStream",
                    target: finder
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
        detect()
    },
    detect = ()=>{
        Quagga.onDetected((data)=>{
            let
                code = data.codeResult.code
            finder.classList.remove("active")
            document.querySelector('#code').innerHTML = `code: ${code}`
            Quagga.stop()
            window.location.hash = "album-" + code
        })
    }

(()=>{
    console.log("Quagga ready")

    let finder = document.querySelector("#finder")

    document.querySelector("[data-start]").addEventListener("click",()=>{
        finder.classList.add("active")
        init()
    })
    document.querySelector("[data-stop]").addEventListener("click",()=>{
        finder.classList.remove("active")
        Quagga.stop()
    })
})()




export {init,detect}
