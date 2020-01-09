// BLOG POSTS

const blogList = document.querySelector('.blogList');
const pagination = document.querySelector('.pagination');

async function renderBlog(pg, lim, sort) {
  let blogData = await fetchData(
    `/posts?page=${pg}&limit=${lim}&sort=${sort}`,
    'get'
  );
  console.log('blogData ', blogData);
  //blogData.posts.results ? (posts = blogData.posts.results) : (posts = []);
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

  pagination.innerHTML = '';
  if (previous) {
    pagination.innerHTML += `<button id="btn-previous" class="btn-pagination">
      Show Previous
    </button>`;
    document.querySelector('#btn-previous').addEventListener('click', () => {
      console.log('prev btn clicked');
      renderBlog(previous.page, limit, sortBy);
    });
  }

  // if (next) {
  //   pagination.innerHTML += `<button id="btn-next" class="btn-pagination">
  //   Show Next
  // </button>`;
  //   document.querySelector('#btn-next').addEventListener('click', () => {
  //     console.log('next btn clicked');
  //     renderBlog(next.page, limit, sortBy);
  //   });
  // }
}

renderBlog(5, 2, '-date');
