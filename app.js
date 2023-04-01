localStorage.clear();

//Add functionality

var addForm = document.getElementById('addForm');
var itemList = document.getElementById('items');

//const myObj = [];

//add eventlistener
addForm.addEventListener('submit', addItem);
//delete eventListener
itemList.addEventListener('click', deleteItem);
//edit functionality
itemList.addEventListener('click', editItem);
//filter eventListener
var filter = document.getElementById('filter');
filter.addEventListener('keyup', filterItem);

window.addEventListener("DOMContentLoaded", ()=>{
    axios.get("https://crudcrud.com/api/4add3c30cda44bd8a6e570f993c4bc65/appointmentData")
    .then(response=>console.log(response))
    .catch(error=>console.log(error))
})

//addItem function
function addItem(e){
    e.preventDefault();

 var name = document.getElementById('form-input1').value;
var email = document.getElementById('form-input2').value;
var contact = document.getElementById('form-input3').value; 

var userDetail = name +"-"+ email + "-" + contact;

var li = document.createElement('li');
li.appendChild(document.createTextNode(userDetail));
li.className = 'list-group-item';

var del = document.createElement('button');
del.className = 'btn btn-danger btn-sm float-right delete';
del.appendChild(document.createTextNode('X'));

li.appendChild(del);

var updateItem = document.createElement('button');
updateItem.className = 'btn btn-primary btn-sm float-right edit';
updateItem.appendChild(document.createTextNode('Edit'));

li.appendChild(updateItem);

itemList.appendChild(li);

// /myObj.push(userDetail);
// /* let myObj = {
//     userName : name,
//     userEmail : email,
//     userContact : contact
// }*/

//localStorage.setItem(`${name}`,userDetail);
    
    const obj = {
        name,
        email,
        contact
    }
    
    axios.post("https://crudcrud.com/api/4add3c30cda44bd8a6e570f993c4bc65/appointmentData",obj)
    .then(res=> console.log(res))
    .catch(err=> console.log(err))


document.getElementById('form-input1').value = '';
document.getElementById('form-input2').value = '';
document.getElementById('form-input3').value = '';
}

//delete functionality
function deleteItem(e){
    if(e.target.classList.contains('delete')){
        if(confirm("Are you sure?")){
            var li = e.target.parentElement;
            itemList.removeChild(li);
            
        }
    }

    var newValue = li.textContent;
    var myObj = Object.keys(localStorage);

    for(var i=0;i<myObj.length;i++){
        if(newValue.includes(myObj[i]))break;
    }

    var newKey = localStorage.key(i);
    localStorage.removeItem(newKey);
}

//edit body
function editItem(e){
    if(e.target.classList.contains('edit')){
            var li = e.target.parentElement;
            itemList.removeChild(li);
    }
    
   // console.log(newLi.textContent);
    var newValue = li.textContent;
    var myObj = Object.keys(localStorage);

    for(var i=0;i<myObj.length;i++){
        if(newValue.includes(myObj[i]))break;
    }

    var newKey = localStorage.key(i);
    var value = localStorage.getItem(newKey);

    localStorage.removeItem(newKey);

    var myArray = value.split("-");

    document.getElementById('form-input1').value = myArray[0];
    document.getElementById('form-input2').value = myArray[1];
    document.getElementById('form-input3').value = myArray[2];
}

//filter functionality
function filterItem(e){
    var text = e.target.value.toLowerCase();
    var itemText = itemList.getElementsByTagName('li');

    Array.from(itemText).forEach(function(item){
        var itemName = item.firstChild.textContent;
        if(itemName.toLowerCase().indexOf(text)!=-1){
             item.style.display = 'block';
        }
        else{
            item.style.display = 'none';
        }
    });
}
