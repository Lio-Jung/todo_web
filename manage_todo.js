let count_pri = 0;

function manageTodo() {
    const target = document.querySelector('#todo'); 
    const newTodo = target.value.trim();  //newTodo's value can change but 'const' means rightside cannot change
    if (newTodo === lang("write_todo") || newTodo === '') {
        alert(lang("empty_todo"));
        target.value = '';
    } else {
        const todoObj = { text: newTodo, completed: false };
        todoArray.push(todoObj);
        saveTodo();
        renderTodo(todoObj);   
        target.value = '';
    }
    target.focus();
}

function saveTodo() {
    localStorage.setItem(`todo_${userMeta.currentUser}`,JSON.stringify(todoArray));
}


function renderTodo(todoObj) {
    count_pri ++;
    const todoItem = document.createElement('div');
    todoItem.id = 'todoItem';
    const todoItemLeft = document.createElement('div');
    todoItemLeft.id = 'todoItemLeft';
    const todoItemLeft2 = document.createElement('div');
    const todoItemCenter = document.createElement('div');
    const todoItemRight = document.createElement('div');
    
    //priority
    const priority = document.createElement('span');
    priority.id = 'priority';
    priority.style.whiteSpace = "pre"; 
    priority.textContent = "  " + count_pri + "  " ;
    if ( count_pri == 1 ){
        priority.style.color = "gold";
        priority.style.fontSize = '150%';
        priority.textContent = "  " + count_pri + "  " ;
        //priority.textContent = " " + count_pri + " " ;
        priority.style.fontWeight = "900"; 
    } if ( count_pri == 2 ){
        priority.style.color = "silver";
        priority.style.fontSize = '140%';
        priority.textContent = "  " + count_pri + "  " ;
        //priority.textContent = " " + count_pri + " " ;
        priority.style.fontWeight = "700";
        priority.style.marginRight = '0.4%';
    } if ( count_pri == 3 ) {
        priority.style.color =  "rgba(205, 127, 50, 1)";
        priority.style.fontSize = '130%';
        priority.textContent = "  " + count_pri + "  " ;
        //priority.textContent = " " + count_pri + " " ;
        priority.style.fontWeight = "500";
        priority.style.marginRight = '0.6%';
    }

    //checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todoObj.completed;
    checkbox.addEventListener('change', function () {
        todoObj.completed = this.checked;
        textNode.style.textDecoration = this.checked ? 'line-through' : 'none';
        saveTodo(); 
    });
    
    //text
    const textNode = document.createElement('span');
    textNode.textContent = " " + todoObj.text + ' ';
    textNode.style.textDecoration = checkbox.checked ? 'line-through' : 'none';

    //up btn
    const index = todoArray.indexOf(todoObj);
    const upbtn = document.createElement('input');
    upbtn.type = 'button';
    upbtn.className = 'todobtn';
    upbtn.value = '▲'

    upbtn.style.paddingLeft = '5px';
    upbtn.style.paddingRight = '5px';
    upbtn.style.margin = '2px';
    upbtn.style.paddingTop = '3.5px';
    upbtn.addEventListener('click', () => {
        let temp = todoArray[index-1];
        if (temp) {
            todoArray[index-1] = todoObj;
            todoArray[index] = temp;
            rerender();
            saveTodo();
        }
    });
    //down btn
    const downbtn = document.createElement('input');
    downbtn.type = 'button';
    downbtn.className = 'todobtn';
    downbtn.value = '▼';

    downbtn.style.paddingLeft = '5px';
    downbtn.style.paddingRight = '5px';
    downbtn.style.margin = '2px';
    downbtn.style.paddingTop = '3.5px';
    
    downbtn.addEventListener('click', () => {
        let temp = todoArray[index+1];
        if (temp) {
            todoArray[index+1] = todoObj;
            todoArray[index] = temp;
            rerender();
            saveTodo();
        }
    });


    /* 
    edit button -> div to text + 'confirm' btn 'cancel' btn (child 'cancel' + xchild 'delete')
    -> 'text' value changable 
    -> 1,2,3,4 at  the same time
    1. enter in text -> confirm change          (event fnc -> click 'confirm' btn)
    2. click 'confirm' btn -> confirm change        -> 'new text' value to 'div' value
    3. ESC -> reject change
    4. blur -> reject change            -> no 'text' value changed
    5. 'cancel' btn - > reject change
    -> replchild 'confirm' btn + xchild 'cancel' + child 'delete'
    */
    //edit button
    const editBtn = document.createElement('input');
    editBtn.type = 'button';
    editBtn.className = 'todobtn';
    editBtn.value = "✎";
    editBtn.style.marginLeft = '2%';


    editBtn.style.paddingLeft = '3.8px';
    editBtn.style.paddingRight = '3.8px';
    editBtn.style.margin = '2px';

    editBtn.addEventListener('click', function(){
        editBtn.parentNode.replaceChild(confirmBtn, this);
        textNode.parentNode.replaceChild(editText, textNode);
        deleteBtn.parentNode.replaceChild(editCancelbtn, deleteBtn);
        editText.focus();
        editText.select();
    });
    //confirm button
    const confirmBtn = document.createElement('input');
    confirmBtn.type = 'button';
    confirmBtn.className = 'todobtn';
    confirmBtn.value = lang("confirm");
    confirmBtn.id = 'confirmBtn';
    confirmBtn.addEventListener('mousedown', () => {
        ignoreBlur = true;
        document.getElementById('confirmBtn').click();
    });
    confirmBtn.addEventListener('click', () =>{
        todoObj.text = editText.value;
        textNode.textContent = ' ' + todoObj.text + " ";
        editText.parentNode.replaceChild(textNode, editText);
        confirmBtn.parentNode.replaceChild(editBtn, confirmBtn);
        editCancelbtn.parentNode.replaceChild(deleteBtn, editCancelbtn);
        saveTodo();
    })
    //edit text
    const editText = document.createElement('input');
    editText.type = 'text';
    editText.value = todoObj.text;
    let ignoreBlur = false;
    editText.addEventListener('blur', e =>{
        if (ignoreBlur) {
            ignoreBlur = false;
            return;                                                           
        } else {
        document.getElementById('editCancelbtn').click();
        }   
    })
    editText.addEventListener('keydown', e => {
        switch(e.key) {
            case "Enter":
                ignoreBlur = true;
                e.preventDefault();
                document.getElementById("confirmBtn").click();
                break;
            case 'Escape':
                e.preventDefault();
                editText.blur();
                break;
        }
    });
    //edit cancel btn
    const editCancelbtn = document.createElement('input');
    editCancelbtn.type = 'button';
    editCancelbtn.className = 'todobtn';
    editCancelbtn.value = lang('cancel');
    editCancelbtn.id = 'editCancelbtn';
    editCancelbtn.addEventListener('click', () => {
        editText.value = todoObj.text;
        editText.parentNode.replaceChild(textNode, editText);
        confirmBtn.parentNode.replaceChild(editBtn, confirmBtn);
        editCancelbtn.parentNode.replaceChild(deleteBtn, editCancelbtn);
    })

    //delete button  
    /*understanding: 이해를 해보면
    renderTodo(){}의 {}안에 체크박스,텍스트,삭제버튼이 묶음으로 있다.
    ()안에 들어오는 파라메터로는 todoObj, 즉 객체이다.
    그 객체는 name과 completed(default false)를 가지고 있다. name은 사용자가 id="todo"에 입력한 것을 받는다.
    그리고 renderTodo()로 생성된 것 체크박스,텍스트,삭제버튼은 한 묶음이다. 그래서 삭제버튼에서 container.removeChild(todoItem);를 했을 때, 3개가 다 사라진다.*/
    const deleteBtn = document.createElement('input');
    deleteBtn.type = 'button';
    deleteBtn.className = 'todobtn';
    deleteBtn.style.marginRight = '3%';
    deleteBtn.value = "✖";

    deleteBtn.style.paddingLeft = '5px';
    deleteBtn.style.paddingRight = '5px';
    deleteBtn.style.margin = '2px';

    deleteBtn.addEventListener('click', function () {
        //container.removeChild(todoItem);        //!!
        todoArray = todoArray.filter(item => item !== todoObj); //understanding: Array를 이것의 todoObj를 빼고 업데이트
        rerender();
        saveTodo();
    });               

    //seperator
    const seperator = document.createElement('hr');
    seperator.style.margin = '0.7%';
    /*
    if ( count_pri == 1 ) {
        seperator.style.marginTop = '0.2%';
    } else if ( count_pri == 2 ) {
        seperator.style.marginTop = '0.5%';
    } else if ( count_pri == 3 ) {
        seperator.style.marginTop = '1%';
    } else {
        seperator.style.marginTop = '1.4%';
    }
    */

    //packaging
    todoItemLeft.appendChild(priority);
    todoItemLeft2.appendChild(checkbox);
    todoItemCenter.appendChild(textNode);
    todoItemRight.appendChild(deleteBtn);
    todoItemRight.appendChild(editBtn);
    todoItemRight.appendChild(downbtn);
    todoItemRight.appendChild(upbtn);    

    container.appendChild(todoItem);
    todoItem.appendChild(todoItemLeft);
    todoItem.appendChild(todoItemLeft2);
    todoItem.appendChild(todoItemCenter);
    todoItem.appendChild(todoItemRight);

    //seperator
    container.appendChild(seperator);
}

function eraseAll() {
    if(confirm(lang("ask_clear"))){
        container.innerHTML = "";
        todoArray = [];
        count_pri = 0;
        saveTodo();
        document.getElementById("todo").focus();   
    }
}

function rerender() {
    container.innerHTML = "";
    count_pri = 0;
    todoArray.forEach(item => {            
            renderTodo(item);
    });
}

function drawCUser() {
    //current user
            document.getElementById('username').textContent = `${userMeta.currentUser}`;
}

function loadMeta() {
    userMeta = JSON.parse(localStorage.getItem('userMeta') || '[]');    
}

function loadTodo() {
    todoArray = JSON.parse(localStorage.getItem(`todo_${userMeta.currentUser}`) || '[]');  
}