import { getTime, showNotification, toggleLoading } from './services/methods.js';
import { calculate, changeTitles, loadCurrencies, loadSymbols } from './services/store.js';

async function init() {
  try {
    //  Displaying loader
    toggleLoading();
    const inputSelect = document.querySelector('#input-select');
    const inputInput = document.querySelector('#input-input');
    const outputSelect = document.querySelector('#output-select');

    //  Initialising current time and date
    const timeComponent = document.querySelector('#current_time');
    timeComponent.innerHTML = getTime();
    setInterval(() => {
      timeComponent.innerHTML = getTime();
    }, 60000);

    //  Loading all currencies into selects
    await loadSymbols();

    await loadCurrencies();

    inputSelect.addEventListener('change', e => {
      calculate(e.target.value, outputSelect.value, inputInput.value);
      changeTitles(e.target.selectedOptions[0].text, e.target.value, outputSelect.value);
    });
    outputSelect.addEventListener('change', e => {
      calculate(inputSelect.value, e.target.value, inputInput.value);
      changeTitles(inputSelect.selectedOptions[0].text, inputSelect.value, e.target.value);
    });
    inputInput.addEventListener('input', e => {
      calculate(inputSelect.value, outputSelect.value, e.target.value);
    });
    showNotification('success', 'Data loaded successfully!');
    toggleLoading();
  } catch (e) {
    const content = document.querySelector('#content');
    showNotification('error', 'Data load error!');
    toggleLoading();
    content.innerHTML = `<p class="app__error-title">Check your internet connection or try again later</p>`;
  }
}

await init();
