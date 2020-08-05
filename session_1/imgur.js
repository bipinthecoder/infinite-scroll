let counter = 0; 
var dataArr = []
var input_box = document.getElementById('input-box').value
let url = "https://api.imgur.com/3/gallery/hot/viral/0.json";
var params = {Authorization: "Client-ID f12cb9244a77eab"};

const getData = async function(){
    console.log("loading", counter++)
    await fetch(url+`${input_box}`, {
        headers:{
            Authorization: "Client-ID f12cb9244a77eab"
        }
    })
    .then(res=>res.json())
    .then(result=>{
        console.log("result", result)
        dataArr = result.data
    })
    console.log(dataArr)
    displayData(dataArr)
}

let display = document.getElementById("root")

function displayData(arr){
    if(arr){
        console.log("loaded")
    
        for(var i=0;i<arr.length;i++){
            url1 = `https://api.imgur.com/3/image/${arr[i].images[0].id}`
            fetch(url1, {
                headers:{
                    Authorization: "Client-ID f12cb9244a77eab"
                }
            })
            .then(res=>res.json())
            .then(result=>{
                console.log("result", result)
                images = result.data
            })
            console.log(images)
            let img = document.createElement('img')
            img.setAttribute('src',images.link)
            console.log(arr[i].images[0].link)
            img.setAttribute('alt',"image"+i)
            display.append(img)
        }
    }
    else{
        console.log("loading")
    }
}




const debounce = function(fn, time){
    let timer; 
    return function(){
        clearTimeout(timer)
        timer = setTimeout(()=>{
            fn.apply(this, arguments)
        }, time)
    }
}
let debouncing = debounce(getData, 1000)