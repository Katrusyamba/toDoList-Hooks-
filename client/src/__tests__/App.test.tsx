/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';


import App from '../App';

test('корректное отображение приложения', () => {
  render(<App />);
  const titleElement = screen.getByTestId('app-title');
  expect(titleElement).toBeTruthy();
  
});

//   // Проверяем, что поле ввода и кнопка "Добавить" присутствуют
//   const inputElement = screen.getByPlaceholderText('What needs to be done?');
//   const addButtonElement = screen.getByText('Добавить');
//   expect(inputElement).toBeTruthy();
//   expect(addButtonElement).toBeTruthy();
// });

test('пометить задачу как выполненную', () => {
  render(<App />);

  // Добавляем задачу
  const inputElement = screen.getByPlaceholderText('What needs to be done?');
  const addButtonElement = screen.getByText('Добавить');
  fireEvent.change(inputElement, { target: { value: 'Новая задача' } });
  fireEvent.click(addButtonElement);

  // Находим чекбокс и помечаем задачу как выполненную
  const checkboxElement = screen.getByText('Новая задача').previousSibling; // Предполагается, что чекбокс предшествует тексту
  fireEvent.click(checkboxElement);

  // Проверяем, что задача помечена как выполненная
  expect(checkboxElement).toBeTruthy();
});

test('добавление задачи', () => {
  render(<App />);

 // Добавляем задачу
const inputElement = screen.getByPlaceholderText('What needs to be done?');
const addButtonElement = screen.getByText('Добавить');
fireEvent.change(inputElement, { target: { value: 'Новая задача' } });
fireEvent.click(addButtonElement);

// Проверяем, что задача добавлена в список
const taskElement = screen.getByText('Новая задача');
console.log("Task element:", taskElement); // Добавьте эту строку для отладки
expect(taskElement).toBeTruthy();
});

test('фильтрация всех задач', () => {
  render(<App />);

  // Добавляем задачи
  const inputElement = screen.getByPlaceholderText('What needs to be done?');
  const addButtonElement = screen.getByText('Добавить');
  fireEvent.change(inputElement, { target: { value: 'Задача 1' } });
  fireEvent.click(addButtonElement);
  fireEvent.change(inputElement, { target: { value: 'Задача 2' } });
  fireEvent.click(addButtonElement);
  fireEvent.change(inputElement, { target: { value: 'Задача 3' } });
  fireEvent.click(addButtonElement);

  // Проверяем, что все задачи отображаются
  const tasks = screen.getAllByTestId('task');
  expect(tasks).toHaveLength(3);
});

test('фильтрация активных задач', () => {
  render(<App />);

  // Добавляем задачи
  const inputElement = screen.getByPlaceholderText('What needs to be done?');
  const addButtonElement = screen.getByText('Добавить');
  fireEvent.change(inputElement, { target: { value: 'Задача 1' } });
  fireEvent.click(addButtonElement);
  fireEvent.change(inputElement, { target: { value: 'Задача 2' } });
  fireEvent.click(addButtonElement);

  // Переключаем одну из задач в выполненное состояние
  const checkboxElement = screen.getAllByRole('checkbox')[0];
  fireEvent.click(checkboxElement);

  // Выбираем активные задачи
  const activeButtonElement = screen.getByText('Active');
  fireEvent.click(activeButtonElement);

  // Проверяем, что отображаются только активные задачи
  const tasks = screen.getAllByTestId('task');
  expect(tasks).toHaveLength(1);
  expect(tasks[0].textContent).toContain('Задача 2');
});

test('фильтрация завершенных задач', () => {
  render(<App />);

  // Добавляем задачи и помечаем одну из них как выполненную
  const inputElement = screen.getByPlaceholderText('What needs to be done?');
  const addButtonElement = screen.getByText('Добавить');
  fireEvent.change(inputElement, { target: { value: 'Задача 1' } });
  fireEvent.click(addButtonElement);
  fireEvent.change(inputElement, { target: { value: 'Задача 2' } });
  fireEvent.click(addButtonElement);

  const checkboxElement = screen.getAllByRole('checkbox')[0];
  fireEvent.click(checkboxElement);

  // Выбираем завершенные задачи
  const completedButtonElement = screen.getByText('Completed');
  fireEvent.click(completedButtonElement);

  // Проверяем, что отображаются только завершенные задачи
  const tasks = screen.getAllByTestId('task');
  expect(tasks).toHaveLength(1);
  expect(tasks[0].textContent).toContain('Задача 1');
});

test('очистка завершенных задач', () => {
  render(<App />);

  // Добавляем задачи и помечаем одну из них как выполненную
  const inputElement = screen.getByPlaceholderText('What needs to be done?');
  const addButtonElement = screen.getByText('Добавить');
  fireEvent.change(inputElement, { target: { value: 'Задача 1' } });
  fireEvent.click(addButtonElement);
  fireEvent.change(inputElement, { target: { value: 'Задача 2' } });
  fireEvent.click(addButtonElement);

  const checkboxElement = screen.getAllByRole('checkbox')[0];
  fireEvent.click(checkboxElement);

  // Очищаем завершенные задачи
  const clearCompletedButtonElement = screen.getByText('Clear completed');
  fireEvent.click(clearCompletedButtonElement);

  // Проверяем, что завершенные задачи были удалены
  const tasks = screen.getAllByTestId('task');
  expect(tasks).toHaveLength(1);
  expect(tasks[0].textContent).toContain('Задача 2');
});




