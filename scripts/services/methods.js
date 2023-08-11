export const getTime = () => {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];
  const date = new Date();

  const month = monthNames[date.getMonth()];

  const day = date.getDate();

  const time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

  return `${day} ${month}, ${time} UTC · Disclaimer`;
};

export const toggleLoading = () => {
  const app = document.querySelector('#app');
  if (app.classList.contains('loading')) {
    app.classList.remove('loading');
  } else {
    app.classList.add('loading');
  }
};
export const showNotification = (type, text) => {
  const notification = document.querySelector('#notification');
  notification.classList.add(type);
  notification.classList.add('active');
  notification.innerHTML = text;
  setTimeout(() => {
    notification.classList.remove('active');
    // notification.innerHTML = '';
  }, 3000);
  setTimeout(() => {
    notification.classList.remove(type);
    notification.innerHTML = '';
  }, 4000);
};