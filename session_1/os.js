var btn = document.getElementById('btn')
btn.addEventListener('click',getOS)

function getOS(){
    var  sel = document.getElementById('os')
    var input = sel.value
    var req = new XMLHttpRequest();
    var url ='http://localhost:8080/'
    req.open('GET',url+"codenames/"+input)
    req.send()
    var temp = req.response
    req.onload = function(){
        var temp = req.response
        temp = JSON.parse(temp)
        if(req.status == 200){
            console.log(temp)
        }
        else{
            console.log("Error Code is:"+temp)
        }

        var body = document.querySelector('body')
        var table = document.createElement('table')
        table.setAttribute('id','table')
        body.appendChild(table)
        tr = document.createElement('tr')
        table.appendChild(tr)
        td1 = document.createElement('td')
        td2 = document.createElement('td')
        td1.textContent = "VERSION"
        td2.textContent = "NAME"
        tr.append(td1,td2)
        for(var i =0 ;i<temp.codenames.length;i++){
            tr = document.createElement('tr')
            table.appendChild(tr)
            td1 = document.createElement('td')
            td2 = document.createElement('td')
            td1.textContent = temp.codenames[i].version
            td2.textContent = temp.codenames[i].name
            tr.append(td1,td2)
        }
        body.appendChild(table)
       
    }
    table.remove()
}


