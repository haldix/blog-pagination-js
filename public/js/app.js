// BLOG POSTS

const blogList = document.querySelector('.blogList');
const pagination = document.querySelector('.pagination');

async function renderBlog(pg, lim, sort) {
  let blogData = await fetchData(
    `/posts?page=${pg}&limit=${lim}&sort=${sort}`,
    'get'
  );
  console.log('blogData ', blogData);
  if (!blogData.results.posts[0]) {
    blogList.innerHTML = `<h2>No Blog Posts Found!</h2>`;
    return;
  }

  const { posts, next, previous, limit, page, sortBy } = blogData.results;

  let blogItems = '';
  posts.forEach(post => {
    return (blogItems += `<li>
      <h3>${post.title}</h3>
      <p class="blog-date">
        ${post.date}
      </p>
      <p class="blog-text clearfix">
        ${post.content}
      </p>
    </li>`);
  });
  blogList.innerHTML = blogItems;

  document.querySelectorAll('.btn-pagination').forEach(btn => {
    btn.classList.remove('show');
  });

  if (previous) {
    const btnPrev = document.querySelector('#btn-previous');
    btnPrev.classList.add('show');
    btnPrev.addEventListener('click', () => {
      renderBlog(previous.page, limit, sortBy);
    });
  }
  if (next) {
    const btnNext = document.querySelector('#btn-next');
    btnNext.classList.add('show');
    btnNext.addEventListener('click', () => {
      renderBlog(next.page, limit, sortBy);
    });
  }
}

// Settings for page, limit, sort
renderBlog(1, 2, '-date');
