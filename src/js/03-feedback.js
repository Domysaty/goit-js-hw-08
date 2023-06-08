import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');
const localStorageKey = 'feedback-form-state';

// Відстежуємо подію input і зберігаємо значення полів у локальне сховище
form.addEventListener('input', throttle(saveFormState, 500));

// Під час завантаження сторінки заповнюємо поля форми значеннями з локального сховища
window.addEventListener('DOMContentLoaded', populateFormFields);

// Очищаємо сховище та поля форми під час сабміту форми
form.addEventListener('submit', handleSubmit);

function saveFormState() {
  const formState = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem(localStorageKey, JSON.stringify(formState));
}

function populateFormFields() {
  const savedFormState = localStorage.getItem(localStorageKey);
  if (savedFormState) {
    const formState = JSON.parse(savedFormState);
    emailInput.value = formState.email;
    messageInput.value = formState.message;
  }
}

function handleSubmit(event) {
  event.preventDefault();
  const formState = {
    email: emailInput.value,
    message: messageInput.value,
  };
  console.log(formState);
  localStorage.removeItem(localStorageKey);
  form.reset();
}
