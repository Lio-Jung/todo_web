/*
TODO : if darkmode -> edit or x uesr -> reloaded with class popups userblock(must be, popups userblock dark_mode)
TODO : language ko-en-ko    
*/

let openUser = true; 
let isBtnBlock = true;


const userclose = document.createElement('input');
userclose.id = 'userclose';
userclose.type = 'button';
userclose.value = 'x';   
userclose.addEventListener('click', function(){
    changeUserPopup.classList.toggle('show_grid');
})

const newUser = document.createElement('input');
newUser.type = 'button';
newUser.style.width = "290px";
newUser.style.height = "40px";
newUser.addEventListener('click', function() {
    addUser();
})

const addUserBoxPopup = document.createElement('div'); //ing
addUserBoxPopup.id = "addUserBoxPopupPopup";
addUserBoxPopup.className = "popups";
document.body.appendChild(addUserBoxPopup);


    



const addUserName0 = document.createElement('SPAN');
addUserName0.style.position = "absolute";
addUserName0.style.fontSize = "15px";
addUserName0.style.transform ="translate(10%, 200%)";

const addUserName = document.createElement('input');
addUserName.style.position = "absolute";
addUserName.id = "addUserName";
addUserName.type = 'text';
addUserName.style.width = "150px";
addUserName.style.height = "15px";
addUserName.style.transform = "translate(60%, 210%)";
addUserName.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("addUserOk").click();
        }
    });
//shadow. limit input-length with px
const aUNShadow = document.createElement('span'); 
aUNShadow.style.visibility = 'hidden';
aUNShadow.style.whiteSpace = 'pre';
let aUNlastValue = '';
addUserName.addEventListener('input', () => {
    aUNShadow.textContent = addUserName.value;
    if (aUNShadow.offsetWidth > 100) {
        addUserName.value = aUNlastValue;
    } else {
        aUNlastValue = addUserName.value;
    }
});

const addUserOk = document.createElement('input');
addUserOk.id = "addUserOk";
addUserOk.type = "button";
addUserOk.style.position = "absolute";
addUserOk.value = 'confirm';
addUserOk.style.width = "100px";
addUserOk.style.height = "35px";
addUserOk.style.transform = "translate(40%, 250%)";
addUserOk.addEventListener('click', function() {
    if (addUserName.value.trim()) {
        if (userMeta.users.includes(addUserName.value.trim())) {
            addUserName.value = '';
            alert(lang("same_name"));
        } else {
            confirmUser();
        }
    } else {
        addUserName.value = '';
        alert("please write something");
    }
})

const addUserX = document.createElement('input');
addUserX.type = 'button';
addUserX.style.position = "absolute";
addUserX.value = 'cancel';
addUserX.style.width = "100px";
addUserX.style.height = "35px";
addUserX.style.transform = "translate(160%, 250%)";
addUserX.addEventListener('click', function() {
    closeAddUser();
    addUserName.value = '';
})

const changeUserPopup = document.createElement('div');
changeUserPopup.id = "changeUserGrid";
changeUserPopup.className = "div_popups";
//document.body.appendChild(changeUserPopup);
//grid 1,2,3
const cugrid1 = document.createElement('div');
const cugrid2 = document.createElement('div');
const cugrid3 = document.createElement('div');
cugrid1.style.textAlign = 'right';
cugrid2.style.textAlign = 'center';
cugrid3.id = 'changeUserPopupBelow';

        changeUserPopup.appendChild(cugrid1);
        changeUserPopup.appendChild(cugrid2);
        cugrid1.appendChild(userclose);
        cugrid2.appendChild(newUser);
        changeUserPopup.appendChild(cugrid3);

renderUser();

function changeUser() {  //TODO : delete later
    changeUserPopup.classList.toggle('show_grid');

    openUser = !openUser;
     if (false) {
        if (changeUserPopup) {
            //changeUserPopup.style.display = "none";
            
            addUserBoxPopup.style.display = "none";
        } 
    } else {
       
    }
}

function addUser() {
    addUserBoxPopup.style.display = 'block';
    addUserBoxPopup.appendChild(addUserName0);
    addUserBoxPopup.appendChild(addUserName);
    document.body.appendChild(aUNShadow);
    addUserBoxPopup.appendChild(addUserOk);
    addUserBoxPopup.appendChild(addUserX);    
    document.getElementById("addUserName").focus();
    
}

function closeAddUser() {
    addUserBoxPopup.style.display = 'none';
}

function confirmUser() {
    addUserBoxPopup.style.display = 'none';
    userMeta.users.push(addUserName.value);
    saveUser();
    renderUser();
    localStorage.setItem(`todo_${addUserName.value}`,JSON.stringify([]));
    addUserName.value = '';
}

function saveUser() {
    localStorage.setItem('userMeta', JSON.stringify(userMeta));
}

function renderUser() {
    cugrid3.innerHTML = "";
    userMeta.users.forEach(item => {
        const userBlock = document.createElement('div');
        userBlock.className = 'popups userBlock';
        if (false) { //TODO : 다른 것들이 dark_mode인지 str타입이런거로 불러온다음에 거기에 'dark_mode'가 포함되어 있으면 =true
            userBlock.className = 'popups userBlock dark_mode';
        }
        userBlock.addEventListener("mouseenter", () => {
            userBlock.classList.toggle("mouseon_user");
        });
        userBlock.addEventListener("mouseleave", () => {
            userBlock.classList.remove("mouseon_user");
        });
        userBlock.addEventListener("click", () => {
            if(isBtnBlock) {
                userMeta.currentUser = item;
                saveUser();
                document.getElementById('username').textContent = `${userMeta.currentUser}`;
                loadTodo();
                rerender();
            }
            isBtnBlock = true;
            
        });
        const userBlockLeft = document.createElement('div');
        const userBlockRight = document.createElement('div');
        const userBlockName = document.createElement('span');
        userBlockName.textContent = item;
        userBlockName.position = 'absolute';
        userBlockName.style.margin = '5%';        


        const userBlcokEdit = document.createElement('input');
        userBlcokEdit.type = 'button';
        userBlcokEdit.value = '✎';
        userBlcokEdit.style.paddingLeft = '3.8px';
        userBlcokEdit.style.paddingRight = '3.8px';
        userBlcokEdit.style.margin = '2px';
        userBlcokEdit.addEventListener('click', () => {
            isBtnBlock = false;
            let newName = prompt("new Name", `${item}`).trim();
            if (userMeta.users.includes(newName)) {
                alert('there is already a user with same name. write other name');
            } else {
                //change user & CUser
                let index = userMeta.users.indexOf(item);
                if (userMeta.currentUser === userMeta.users[index]) {
                    userMeta.currentUser = newName;
                }
                userMeta.users[index] = newName;
                //save user, copy todo, x old todo, rerender
                saveUser();
                localStorage.setItem(`todo_${newName}`, localStorage.getItem(`todo_${item}`));
                localStorage.removeItem(`todo_${item}`);
                renderUser();
                rerender();
                document.getElementById('user').textContent = `User : ${userMeta.currentUser}`;
            }
        });

        const userBlcokDelete = document.createElement('input'); 
        userBlcokDelete.type = 'button';
        userBlcokDelete.value = '✖';
        userBlcokDelete.style.paddingLeft = '5px';
        userBlcokDelete.style.paddingRight = '5px';
        userBlcokDelete.style.margin = '2px';
        userBlcokDelete.addEventListener('click', () => {
            isBtnBlock = false;
            if (item === userMeta.currentUser) {
                alert(lang("warn_other_user"));
            } else {
                if(confirm(lang("ask_x_user")) == true) {

                cugrid3.removeChild(userBlock);
                userMeta.users = userMeta.users.filter(e => e !== item);
                saveUser();
                renderUser();
                localStorage.removeItem(`todo_${item}`);            
                }
            }
        });

        cugrid3.appendChild(userBlock);
        userBlock.appendChild(userBlockLeft);
        userBlock.appendChild(userBlockRight);
        userBlockLeft.appendChild(userBlockName);
        userBlockRight.appendChild(userBlcokEdit);
        userBlockRight.appendChild(userBlcokDelete);
    });
}

function valuesCUjs() {
    newUser.value = lang("create_user");
    addUserName0.innerHTML = lang("user_name");
}