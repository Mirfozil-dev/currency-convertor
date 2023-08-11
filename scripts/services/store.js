import { getCurrencies, getSymbols } from './api.js';

const outputInput = document.querySelector('#output-input');
const mainTitle = document.querySelector('#main-title');
const secondaryTitle = document.querySelector('#secondary-title');
const inputSelect = document.querySelector('#input-select');
const outputSelect = document.querySelector('#output-select');

export let currencies = {};

export const loadCurrencies = async () => {
  await getCurrencies().then((data) => {
    const { rates } = data;
    currencies = { ...rates };
  });
};
export const loadSymbols = async () => {
  await getSymbols().then(data => {
    const { symbols } = data;
    const selectLabel = document.createElement('option');
    selectLabel.value = '';
    selectLabel.text = 'Select currency';
    selectLabel.selected = true;
    inputSelect.appendChild(selectLabel);
    mainTitle.innerHTML = 'Choose currency to be converted';

    outputSelect.appendChild(selectLabel.cloneNode(true));
    Object.entries(symbols).map(symbol => {
      const option = document.createElement('option');
      option.value = symbol[0];
      option.text = symbol[1];

      inputSelect.appendChild(option);

      outputSelect.appendChild(option.cloneNode(true));
    });
  });
};
export const calculate = (base, currency, val) => {
  let result = null;
  if (base !== '' && currency !== '' && val !== '') {
    const baseRate = currencies[base];
    const newRate = currencies[currency];
    result = (((1 / baseRate) * newRate) * parseFloat(val)).toFixed(2);
  }
  outputInput.value = result;
};

export const changeTitles = (baseTitle, base, currency) => {
  let main = 'Choose currency to be converted';
  let secondary = '';
  if (base !== '' && currency !== '') {
    const baseRate = currencies[base];
    const newRate = currencies[currency];
    const rate = ((1 / baseRate) * newRate).toFixed(2);
    main = `${rate} ${currency}`;
    secondary = `1 ${baseTitle} equals`;
  }
  mainTitle.innerHTML = main;
  secondaryTitle.innerHTML = secondary;
};