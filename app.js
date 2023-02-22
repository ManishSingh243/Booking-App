localStorage.clear();

//Add functionality

var addForm = document.getElementById('addForm');
var itemList = document.getElementById('items');

//const myObj = [];

//add eventlistener
addForm.addEventListener('submit', addItem);
//delete eventListener
itemList.addEventListener('click', deleteItem);
//filter eventListener
var filter = document.getElementById('filter');
filter.addEventListener('keyup', filterItem);

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

itemList.appendChild(li);

// /myObj.push(userDetail);
// /* let myObj = {
//     userName : name,
//     userEmail : email,
//     userContact : contact
// }*/

localStorage.setItem(`${name}`,userDetail);


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
    var newLi = li.removeChild(li.firstChild);
    console.log(newLi.textContent);
    var newValue = newLi.textContent;

    var myObj = Object.keys(localStorage);

    for(var i=0;i<myObj.length;i++){
        if(newValue.includes(myObj[i]))break;
    }
    var newKey = localStorage.key(i);
  //  console.log(newKey);
    localStorage.removeItem(newKey);
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