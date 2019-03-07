import * as router from "../js/modules/router.js"
(()=>{
    'use strict'
    const
        app = {
            init:()=>{
                router.init()
            }
        }
    app.init()

    String.prototype.replaceAll = function(search, replacement) {
        var target = this;
        return target.replace(new RegExp(search, 'g'), replacement);
    };

})()
