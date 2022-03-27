/*
  Toggle Class
  The website is first loaded with the default theme (theme 1).
  Using Media Queries prefers-color-scheme, the theme will change
  if the system's default theme is changed (dark/light).
  The user can also switch between the default theme (theme 1) to
  light (theme 2) or dark (theme 3).
  Using client-side storage (local storage), the users prefer theme
  will be saved and loaded in the next visit.
*/
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

/*
  Calculator Class
  This is where the Mathematical Computation takes place.
  Supports only four operations namely addition, subtraction,
  multiplication and division. Further works on this could include
  modulo operation, parenthesis, negative and positive values etc.
*/

class Calculator{
  constructor(inputField, expDisplay, addBtn, subtractBtn, multiplyBtn, divideBtn, equalBtn, deleteBtn, resetBtn, dotBtn, zeroBtn, oneBtn, twoBtn, threeBtn, fourBtn, fiveBtn, sixBtn, sevenBtn, eightBtn, nineBtn){
    this.inputField = inputField;
    this.expDisplay = expDisplay;
    this.addBtn = addBtn;
    this.subtractBtn = subtractBtn;
    this.multiplyBtn = multiplyBtn;
    this.divideBtn = divideBtn;
    this.equalBtn = equalBtn;
    this.deleteBtn = deleteBtn;
    this.resetBtn = resetBtn;
    this.dotBtn = dotBtn;
    this.zeroBtn = zeroBtn;
    this.oneBtn = oneBtn;
    this.twoBtn = twoBtn;
    this.threeBtn = threeBtn;
    this.fourBtn = fourBtn;
    this.fiveBtn = fiveBtn;
    this.sixBtn = sixBtn;
    this.sevenBtn = sevenBtn;
    this.eightBtn = eightBtn;
    this.nineBtn = nineBtn;

    inputField.addEventListener('keyup', this.inputFieldKeydown);
    addBtn.addEventListener('click', this.addBtnClick);
    subtractBtn.addEventListener('click', this.subtractBtnClick);
    multiplyBtn.addEventListener('click', this.multiplyBtnClick);
    divideBtn.addEventListener('click', this.divideBtnClick);
    equalBtn.addEventListener('click', this.equalBtnClick);
    deleteBtn.addEventListener('click', this.deleteBtnClick);
    resetBtn.addEventListener('click', this.resetBtnClick);
    dotBtn.addEventListener('click', this.dotBtnClick);
    zeroBtn.addEventListener('click', this.zeroBtnClick);
    oneBtn.addEventListener('click', this.oneBtnClick);
    twoBtn.addEventListener('click', this.twoBtnClick);
    threeBtn.addEventListener('click', this.threeBtnClick);
    fourBtn.addEventListener('click', this.fourBtnClick);
    fiveBtn.addEventListener('click', this.fiveBtnClick);
    sixBtn.addEventListener('click', this.sixBtnClick);
    sevenBtn.addEventListener('click', this.sevenBtnClick);
    eightBtn.addEventListener('click', this.eightBtnClick);
    nineBtn.addEventListener('click', this.nineBtnClick);
  }

  inputFieldKeydown = () => {
    // Listen to keyboard input
  }

  addBtnClick = () => {
    this.setOperatorAndClearAnimation('+', 'add');
    this.addBtn.classList.add('btn-click');
  }

  subtractBtnClick = () => {
    this.setOperatorAndClearAnimation('-', 'subtract');
    this.subtractBtn.classList.add('btn-click');
  }

  multiplyBtnClick = () => {
    this.setOperatorAndClearAnimation('x', 'multiply');
    this.multiplyBtn.classList.add('btn-click');
  }

  divideBtnClick = () => {
    this.setOperatorAndClearAnimation('/', 'divide');
    this.divideBtn.classList.add('btn-click');
  }

  equalBtnClick = () => {
    this.clearAnimation('equal');
    this.equalBtn.classList.add('btn-click');
    if(this.flag === 0 && this.expDisplay.value !=='')
      this.solveExpression();
  }

  deleteBtnClick = () => {
    const {inputField} = this;
    let inputValue = inputField.value.toString();
    this.clearAnimation('del');
    this.deleteBtn.classList.add('btn-click');
    if(inputValue.length===1){
      this.inputField.value = 0;
      this.expDisplay.value = '';
    }
    if(inputValue.length>1) this.inputField.value = inputValue.slice(0, inputValue.length-1);
  }

  resetBtnClick = () => {
    this.clearAnimation('reset');
    this.resetBtn.classList.add('btn-click');
    this.inputField.value = 0;
    this.expDisplay.value = '';
  }

  dotBtnClick = () => {
    this.setInputAndClearAnimation('.', 'dot');
    this.dotBtn.classList.add('btn-click');
  }

  zeroBtnClick = () => {
    this.setInputAndClearAnimation(0, 'zero');
    this.zeroBtn.classList.add('btn-click');
  }

  oneBtnClick = () => {
    this.setInputAndClearAnimation(1, 'one');
    this.oneBtn.classList.add('btn-click');
  }

  twoBtnClick = () => {
    this.setInputAndClearAnimation(2, 'two');
    this.twoBtn.classList.add('btn-click');
  }

  threeBtnClick = () => {
    this.setInputAndClearAnimation(3, 'three');
    this.threeBtn.classList.add('btn-click');
  }

  fourBtnClick = () => {
    this.setInputAndClearAnimation(4, 'four');
    this.fourBtn.classList.add('btn-click');
  }

  fiveBtnClick = () => {
    this.setInputAndClearAnimation(5, 'five');
    this.fiveBtn.classList.add('btn-click');
  }

  sixBtnClick = () => {
    this.setInputAndClearAnimation(6, 'six');
    this.sixBtn.classList.add('btn-click');
  }

  sevenBtnClick = () => {
    this.setInputAndClearAnimation(7, 'seven');
    this.sevenBtn.classList.add('btn-click');
  }

  eightBtnClick = () => {
    this.setInputAndClearAnimation(8, 'eight');
    this.eightBtn.classList.add('btn-click');
  }

  nineBtnClick = () => {
    this.setInputAndClearAnimation(9, 'nine');
    this.nineBtn.classList.add('btn-click');
  }

  clearAnimation = (key) => {
    const buttons = document.querySelectorAll('.buttons button');
    buttons.forEach( button => {
      if(button.getAttribute('class').includes(key)){
        setTimeout( () => {
          button.classList.remove('btn-click');
        }, 100);
      }
    });
  }

  solveExpression = () => {
    const {inputField, expDisplay} = this;
    let x = parseFloat(expDisplay.value);
    let y = parseFloat(inputField.value);
    let answer = null;

    switch (this.expOperator){
      case '+':
        answer = parseFloat(x + y).toFixed(2);
        this.inputField.value = answer.toString().replace('.00', '');
        this.expDisplay.value = `${x} + ${y} =`;
        this.flag = 1;
      break;
      case '-':
        answer = parseFloat(x - y).toFixed(2);
        this.inputField.value = answer.toString().replace('.00', '');
        this.expDisplay.value = `${x} - ${y} =`;
        this.flag = 1;
      break;
      case 'x':
        answer = parseFloat(x * y).toFixed(2);
        this.inputField.value = answer.toString().replace('.00', '');
        this.expDisplay.value = `${x} x ${y} =`;
        this.flag = 1;
      break;
      case '/':
        answer = parseFloat(x / y).toFixed(2);
        this.inputField.value = answer.toString().replace('.00', '');
        this.expDisplay.value = `${x} / ${y} =`;
        this.flag = 1;
      break;
    }
  }

  setOperatorAndClearAnimation = (operator, elementOp) => {
    this.clearAnimation(elementOp);
    const {inputField, expDisplay} = this;
    let currentInput = inputField.value.toString();

    if(currentInput!=='0'){
      if(expDisplay.value && this.flag===0) this.solveExpression();
      this.expOperator = operator;
      this.expDisplay.value = `${this.inputField.value} ${this.expOperator}`;
      this.inputField.value = 0;
    }else{
      if(expDisplay.value){
        let currentOperator = expDisplay.value.toString();
        this.expOperator = operator;
        this.expDisplay.value = `${currentOperator.slice(0, currentOperator.length-2)} ${this.expOperator}`;
      }
    }
  }
  
  setInputAndClearAnimation = (number, elementNum) => {
    this.clearAnimation(elementNum);
    const {inputField, expDisplay} = this;
    let currentInput = inputField.value.toString();

    if(inputField.value==='0'){
      this.inputField.value = number;
    }
    else{
      if(expDisplay.value !== '' && this.flag === 1){
        this.expDisplay.value = '';
        this.inputField.value = number;
      }else{
        if(!(currentInput.slice(currentInput.length-1)==='.' && number === '.'))
          this.inputField.value = currentInput.concat(number);
      }
    }
    this.flag = 0;
  }
}

const inputField = document.querySelector('.display-field');
const expDisplay = document.querySelector('.exp-container');
const addBtn = document.querySelector('.add');
const subtractBtn = document.querySelector('.subtract');
const multiplyBtn = document.querySelector('.multiply');
const divideBtn = document.querySelector('.divide');
const equalBtn = document.querySelector('.equal');
const deleteBtn = document.querySelector('.del');
const resetBtn = document.querySelector('.reset');
const dotBtn = document.querySelector('.dot');
const zeroBtn = document.querySelector('.zero');
const oneBtn = document.querySelector('.one');
const twoBtn = document.querySelector('.two');
const threeBtn = document.querySelector('.three');
const fourBtn = document.querySelector('.four');
const fiveBtn = document.querySelector('.five');
const sixBtn = document.querySelector('.six');
const sevenBtn = document.querySelector('.seven');
const eightBtn = document.querySelector('.eight');
const nineBtn = document.querySelector('.nine');

new Calculator(inputField, expDisplay, addBtn, subtractBtn, multiplyBtn, divideBtn, equalBtn, deleteBtn, resetBtn, dotBtn, zeroBtn, oneBtn, twoBtn, threeBtn, fourBtn, fiveBtn, sixBtn, sevenBtn, eightBtn, nineBtn);