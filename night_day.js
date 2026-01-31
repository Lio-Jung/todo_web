let isDark = false;

function dayNightHandler(self){
    var target = document.querySelector('body');
    var popups = document.querySelectorAll('.popups');
    var dpopups = document.querySelectorAll('.div_popups');
    

    if (!isDark) {
    target.style.backgroundColor = 'rgba(40,40,40, 1)';
    target.style.color = 'white';
    popups.forEach(e => {
        e.classList.toggle('dark_mode');
    });
    dpopups.forEach(e => {
        e.classList.toggle('dark_mode');
    });
    //self.value = lang("light_mode");
    isDark = true;
    
    } else {    
    target.style.backgroundColor = 'white';
    target.style.color = 'black';
    popups.forEach(e => {
        e.classList.remove('dark_mode');
    });
    dpopups.forEach(e => {
        e.classList.toggle('dark_mode');
    });
    //self.value = lang("dark_mode");
    isDark = false;
    }
}