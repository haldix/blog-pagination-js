// FETCH
const fetchData = async (url, method, body = null) => {
  try {
    let options = {
      method: method,
      mode: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(body)
    };
    if (method.toUpperCase() === 'GET') delete options.body;
    const res = await fetch(url, options);

    if (res.ok) {
      console.log('SUCCESS');
    } else {
      console.log('not successful STATUS 404');
    }
    const data = await res.json();
    console.log('DATA: ', data);
    return data;
  } catch (e) {
    console.log(e);
  }
};

// EVENT LISTENER
// const btn = document.getElementById('btn-fetch');
// btn.addEventListener('click', () => {
//   let method = document.getElementById('method').value;
//   let resource = document.getElementById('resource').value;
//   console.log('method', method, resource);

//   let url = urlRay[resource];
//   let body = bodyRay[resource];

//   fetchData(url, method, body);
// });

// console.log('Whazzup?');
