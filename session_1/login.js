var btn = document.getElementById('btn')
btn.addEventListener('click',loginDetails)

function loginDetails(){
    event.preventDefault()
    inputs = document.querySelectorAll('input')
    loginObj = {
        password : inputs[1].value,
        username : inputs[0].value
    }
    console.log(inputs[1].value,inputs[0].value)
    var flag = true
    for(key in loginObj){
        if(key.value == ""){flag = false}
    }
    if(flag == false){
        console.log("Please enter username and password")
    }
    else{
        var login = new XMLHttpRequest()
        // var loginJSON = 
        var url = 'http://localhost:8080/auth/login'
        login.open("POST",url)
        login.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        login.send(JSON.stringify(loginObj))

        login.addEventListener('load',function(){
            console.log(login.response)
            obj = JSON.parse(login.response)
            token = obj.token
            console.log(token)
            if(login.status === 200){
                // var body = document.querySelector('body')
                
                var body = document.querySelector('body')
                var p = document.createElement('p')
                var div = document.createElement('div')
                body.appendChild(div)
                var output = new XMLHttpRequest()
                output.open('GET','http://localhost:8080/user/'+loginObj.username)
                output.setRequestHeader('Authorization' ,'Bearer ' + token);
                output.send()
                output.addEventListener('load',function(){
                    console.log(output.response)
                    p.textContent = output.response
                    // var body = document.querySelector('body')
                    body.appendChild(p)
                    div.remove('#frm')
                }) 
             //   body.appendChild(p)
              //  body.remove('form')
            }
            else{
                console.log("An error has occured:" + login.status);
            }
            
        })
        
        for(var i = 0;i<inputs.length;i++){
            inputs[i].value = ""
        }
    }
}