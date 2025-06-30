const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

// Mocking the script file to avoid errors
jest.mock('../script.js', () => {
  // We can add mock implementations here if needed
});

describe('Calculator UI', () => {
  beforeEach(() => {
    document.documentElement.innerHTML = html.toString();
  });

  test('should have a display element', () => {
    const display = document.querySelector('.display');
    expect(display).not.toBeNull();
  });

  test('should have number buttons', () => {
    const numberButtons = document.querySelectorAll('[data-action="number"]');
    expect(numberButtons.length).toBe(10);
  });

  test('should have operator buttons', () => {
    const operatorButtons = document.querySelectorAll('[data-action="operator"]');
    expect(operatorButtons.length).toBe(4);
  });

  test('should have a calculate button', () => {
    const calculateButton = document.querySelector('[data-action="calculate"]');
    expect(calculateButton).not.toBeNull();
  });
});
