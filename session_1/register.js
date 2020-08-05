var btn = document.getElementById('btn')
btn.addEventListener('click',postDetails)


function postDetails(){
    event.preventDefault()
    var inputs = document.querySelectorAll('input')
    postObj = {
        name : inputs[0].value,
        email : inputs[1].value,
        password : inputs[2].value,
        username : inputs[3].value,
        mobile : inputs[4].value,
        description : inputs[5].value
    }
    var flag = true
    for(key in postObj){
        if(key.value == ""){flag = false}
    }
    if(flag == false){
        console.log("Please enter Valid Information")
    }
    else{
        var post = new XMLHttpRequest()
        var postJSON = JSON.stringify(postObj)
        var url = 'http://localhost:8080/auth/register'
        post.open("POST",url)
        post.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        post.send(postJSON)

        post.addEventListener('load',function(){
            if(post.status <=400){
                console.log(post.response)
                console.log(post.status)
            }
            else{
                console.log("An error has occured:" + post.status);
            }
        })
        for(var i = 0;i<inputs.length;i++){
            inputs[i].value = ""
        }
    }
}
