const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const previewName = document.getElementById('preview-name');
const previewEmail = document.getElementById('preview-email');
const previewPhone = document.getElementById('preview-phone');

nameInput.addEventListener('input', updatePreview);
emailInput.addEventListener('input', updatePreview);
phoneInput.addEventListener('input', updatePreview);

function updatePreview() {
  previewName.textContent = nameInput.value || 'Name';
  previewEmail.textContent = emailInput.value || 'Email';
  previewPhone.textContent = phoneInput.value || 'Phone';
}