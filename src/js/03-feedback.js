let throttle = require('lodash.throttle');
const formRef = document.querySelector('.feedback-form');

auditLocalStorage();

function auditLocalStorage() {
  const formState = JSON.parse(localStorage.getItem('feedback-form-state'));
  if (formState) {
    for (const key in formState) {
      if (formState.hasOwnProperty(key)) {
        formRef.elements[key].value = formState[key];
      }
    }
  }
}

formRef.addEventListener('input', throttle(onSaveElementValue, 500));
formRef.addEventListener('submit', onSendFeedback);

const feedbackFormState = {};
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
}
