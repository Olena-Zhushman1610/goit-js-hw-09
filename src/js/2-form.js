let formData = {
  email: '',
  message: '',
};
const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

// ✅ Відстежуємо всі input-и/textarea у формі через делегування
form.addEventListener('input', event => {
  // перевіряємо, чи є у елемента name (щоб можна було зв,язати з formData)
  if (event.target.name in formData) {
    formData[event.target.name] = event.target.value.trim();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }
});
const savedData = localStorage.getItem(STORAGE_KEY);

if (savedData) {
  formData = JSON.parse(savedData);

  // Заповнюємо поля форми збереженими значеннями
  if (form.elements.email) {
    form.elements.email.value = formData.email;
  }
  if (form.elements.message) {
    form.elements.message.value = formData.message;
  }
}
//  При submit виводимо дані, очищуємо форму і localStorage
form.addEventListener('submit', event => {
  event.preventDefault();

  if (formData.email.trim() === '' || formData.message.trim() === '') {
    alert('Fill please all fields');
    return;
  }

  // Якщо заповнені — виводимо дані
  console.log('Відправлені дані:', formData);

  // Очищаємо форму, сховище і об’єкт
  form.reset();
  localStorage.removeItem(STORAGE_KEY);
  formData = { email: '', message: '' };
});
