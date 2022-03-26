class Toggle{
  constructor(toggleTheme1, toggleTheme2, toggleTheme3, callback){
    this.toggleTheme1 = toggleTheme1;
    this.toggleTheme2 = toggleTheme2;
    this.toggleTheme3 = toggleTheme3;

    toggleTheme1.addEventListener('click', this.activateTheme1);
    toggleTheme2.addEventListener('click', this.activateTheme2);
    toggleTheme3.addEventListener('click', this.activateTheme3);

    this.listenToSystemThemeChange();
    this.userPreferTheme();
  }

  activateTheme1(){
    document.body.classList = 'theme1';
    localStorage.setItem('calcAppPreferTheme', 'theme1');
  }

  activateTheme2(){
    document.body.classList = 'theme2';
    localStorage.setItem('calcAppPreferTheme', 'theme2');
  }

  activateTheme3(){
    document.body.classList = 'theme3';
    localStorage.setItem('calcAppPreferTheme', 'theme3');
  }

  userPreferTheme(){
    if(localStorage.getItem('calcAppPreferTheme')){
      let theme = localStorage.getItem('calcAppPreferTheme');
      document.body.classList = theme;
      switch (theme) {
        case 'theme1' :
          toggleBtn1.checked = true;
          break;
        case 'theme2' :
          toggleBtn2.checked = true;
          break;
        case 'theme3' :
          toggleBtn3.checked = true;
          break;
      }
    }
  }

  listenToSystemThemeChange(){
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', event => {
      if(!localStorage.getItem('calcAppPreferTheme')){
        if(event.matches){
          this.toggleTheme2.checked = true;
          document.body.classList = '';
          localStorage.setItem('calcAppPreferTheme', 'theme2');
        }
      }
    });

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
      if(!localStorage.getItem('calcAppPreferTheme')){
        if(event.matches){
          this.toggleTheme3.checked = true;
          document.body.classList = '';
          localStorage.setItem('calcAppPreferTheme', 'theme3');
        }
      }
    });
  }
}

const toggleBtn1 = document.querySelector('#theme1');
const toggleBtn2 = document.querySelector('#theme2');
const toggleBtn3 = document.querySelector('#theme3');

new Toggle(toggleBtn1, toggleBtn2, toggleBtn3);