let i18n = {};
//TODO : setting div 에 있는거 더블클릭해도 드래그 안되게.
//TODO : dropdown, select practicing! first!!
const langpopup = document.createElement('div');
langpopup.id = "langpopup";
langpopup.className = 'div_popups';
const langDivtop = document.createElement('div');
const langDivbot = document.createElement('div');
langDivtop.className = "divs";
langDivbot.className = "divs";

const langArr = [ {value: "en", text: "English"}, {value: "ko",text: "한국어"}];
const langSel = document.createElement('select');
langArr.forEach(e => {
  const langOp = document.createElement('option');
  langOp.value = e.value;
  langOp.text = e.text;
  langSel.appendChild(langOp);
});
langSel.addEventListener('change', () => {
  langRe.textContent = langSel.value; //     (langSel.value) return value of select
});
//TODO : (langSel.value) return value of select

const langO = document.createElement('input');
const langX = document.createElement('input');
langO.type = 'button';
langX.type = 'button';
langO.className = "btn";
langX.className = "btn";
function valueLangjs() {
  langO.value = lang("confirm");
  langX.value = lang("cancel");
}

langpopup.appendChild(langDivtop); 
langpopup.appendChild(langDivbot);
langDivtop.appendChild(langSel);
langDivbot.appendChild(langO);
langDivbot.appendChild(langX);


async function loadLang(cLang) {
  try {
    const x = await fetch(`./i18n/${cLang}.json`);
    i18n = await x.json();
    console.log('Language was read.');
  } catch (error) {
    console.log(`Languages was not readable. ${error}`);
  }
}


function lang(key) {
  return i18n[key] || key;
}


function renderLang() {
  document.getElementById("dark_mode").textContent = lang("dark_mode");
  document.getElementById("change_user").textContent = lang("change_user");
  document.getElementById("language_change").textContent = lang("language_change");
  document.getElementById("user").textContent = lang("user");
  document.getElementById("todo").placeholder = lang("write_todo");
  document.getElementById("addbutton").value = lang("enter");
  document.getElementById("clear_todos").value = lang("clear_todos");
}
//TODO : 언어를 변경 할 때 마다 모든 body.child다 없애기

var e = {
    "ask_x_user": "경고! 당신의 할 일들도 삭제됩니다.",
    "new_name": "새로운 이름",
    "edit_same_name": "이미 같은 이름의 사용자가 있습니다. 다른 이름을 적어주세요"
}



