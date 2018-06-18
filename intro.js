
  if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js');
  }

  window.addEventListener('DOMContentLoaded', function() {
    const searchParams = new URL(location).searchParams;
    const inputs = Array.from(document.querySelectorAll('input[id]'));
    inputs.forEach(input => {
      if (searchParams.has(input.id)) {
        if (input.type == 'checkbox') {
          input.checked = searchParams.get(input.id);
        } else {
          input.value = searchParams.get(input.id);
          input.blur();
        }
      }
      if (input.type == 'checkbox') {
        input.addEventListener('change', function(event) {
          const newSearchParams = new URL(location).searchParams;
          if (event.target.checked) {
            newSearchParams.set(input.id, event.target.checked);
          } else {
            newSearchParams.delete(input.id);
          }
          history.replaceState({}, '', Array.from(newSearchParams).length ?
              location.pathname + '?' + newSearchParams : location.pathname);
        });
      } else {
        input.addEventListener('input', function(event) {
          const newSearchParams = new URL(location).searchParams;
          if (event.target.value) {
            newSearchParams.set(input.id, event.target.value);
          } else {
            newSearchParams.delete(input.id);
          }
          history.replaceState({}, '', Array.from(newSearchParams).length ?
              location.pathname + '?' + newSearchParams : location.pathname);
        });
      }
    });
  });
