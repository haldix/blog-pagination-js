// BLOG POSTS

const blogList = document.querySelector('.blogList');
const pagination = document.querySelector('.pagination');
const btnNext = document.querySelector('#btn-next');
const btnPrev = document.querySelector('#btn-previous');

async function renderBlog(pg, lim, sort) {
  let blogData = await fetchData(
    `/posts?page=${pg}&limit=${lim}&sort=${sort}`,
    'get'
  );
  console.log('blogData ', blogData);
  if (!blogData) {
    blogList.innerHTML = `<h2>No Blog Posts Found!</h2>`;
    return;
  }

  const { posts, next, previous, limit, page, sortBy } = blogData.results;

  let blogItems = '';
  posts.forEach(post => {
    return (blogItems += `<li>
      <h3>${post.title}</h3>
      <p class="blog-date">
        ${moment(post.date).format('MMMM Do YYYY')}
      </p>
      <p class="blog-text clearfix">
        ${post.content}
      </p>
    </li>`);
  });
  blogList.innerHTML = blogItems;

  document.querySelectorAll('.btn-pagination').forEach(btn => {
    btn.classList.remove('show');
    btn.disabled = false;
  });

  if (previous) {
    const btnPrev = document.querySelector('#btn-previous');
    btnPrev.classList.add('show');
    btnPrev.addEventListener('click', () => {
      btnPrev.disabled = true;
      console.log('PREV RUN');
      renderBlog(previous.page, limit, sortBy);
    });
  }
  if (next) {
    const btnNext = document.querySelector('#btn-next');
    btnNext.classList.add('show');
    btnNext.addEventListener('click', () => {
      btnNext.disabled = true;
      console.log('NEXT RUN');

      renderBlog(next.page, limit, sortBy);
    });
  }
}

// Settings for page, limit, sort
renderBlog(1, 2, '-date');
