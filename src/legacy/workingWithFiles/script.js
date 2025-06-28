const fileInput = document.getElementById('file');
const dropArea = document.querySelector('div');

dropArea.addEventListener('click', () => {
  fileInput.click();
});

fileInput.addEventListener('change', async (event) => {
  const file = event.target.files[0];

  // Показываем изображение
  const reader = new FileReader();
  reader.addEventListener('load', (e) => {
    const imgEl = document.createElement('img');
    imgEl.setAttribute('src', e.target.result);
    imgEl.setAttribute('alt', file.name);
    imgEl.style.maxWidth = '100%';
    imgEl.style.maxHeight = '100%';
    dropArea.innerHTML = '';
    dropArea.appendChild(imgEl);
  });
  reader.readAsDataURL(file);

  // Отправляем файл
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch(
      'https://if-student-api.onrender.com/api/file',
      {
        method: 'POST',
        body: formData,
      },
    );

    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error('Ошибка при отправке файла:', error);
  }
});
