//Add functionality

var addForm = document.getElementById('addForm');
var itemList = document.getElementById('items');

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

var firstName = document.getElementById('form-input1').value;
var lastName = document.getElementById('form-input2').value;

firstName = firstName +" "+ lastName;

var li = document.createElement('li');
li.appendChild(document.createTextNode(firstName));
li.className = 'list-group-item';

var del = document.createElement('button');
del.className = 'btn btn-danger btn-sm float-right delete';
del.appendChild(document.createTextNode('X'));

li.appendChild(del);

itemList.appendChild(li);

sessionStorage.setItem('name',firstName);

document.getElementById('form-input1').value = '';
document.getElementById('form-input2').value = '';
}

//delete functionality
function deleteItem(e){
    if(e.target.classList.contains('delete')){
        if(confirm("Are you sure?")){
            var li = e.target.parentElement;
            itemList.removeChild(li);
        }
    }
    sessionStorage.removeItem('name');
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