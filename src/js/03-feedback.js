import throttle from 'lodash.throttle';
const formRef = document.querySelector('.feedback-form');
let feedbackFormState = {};

function auditLocalStorage() {
  const formState = JSON.parse(localStorage.getItem('feedback-form-state'));
  if (formState) {
    for (const key in formState) {
      if (formState.hasOwnProperty(key)) {
        feedbackFormState[key] = formRef.elements[key].value = formState[key];
      }
    }
  }
}
auditLocalStorage();

formRef.addEventListener('input', throttle(onSaveElementValue, 500));
formRef.addEventListener('submit', onSendFeedback);

function onSaveElementValue({ target: { value, name } }) {
  feedbackFormState[name] = value;
  localStorage.setItem(
    'feedback-form-state',
    JSON.stringify(feedbackFormState)
  );
}
function onSendFeedback(event) {
  event.preventDefault();
  event.target.reset();
  localStorage.removeItem('feedback-form-state');
  feedbackFormState = {};
}
