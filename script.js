const users = [
  { id: 1, name: 'Allen' },
  { id: 2, name: 'Sean' },
];

const posts = [
  { id: 1, userId: 1, title: 'Outside in the woods' },
  { id: 2, userId: 2, title: 'Just having some fun' },
];

const comments = [
  { id: 1, postId: 1, content: 'Wow! Nice!' },
  { id: 2, postId: 1, content: 'Great Photo!' },
  { id: 3, postId: 2, content: 'Absolutely amazing!' },
];

function fetchUser() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('User data fetched');
      resolve(users);
    }, 1000);
  });
}

function fetchPosts() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Posts data fetched');
      resolve(posts);
    }, 1500);
  });
}

function fetchComments() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Comments data fetched');
      resolve(comments);
    }, 2000);
  });
}

function fetchsequentially() {
  fetchUser()
    .then((users) => {
      console.log('User:', users);
      return fetchPosts();
    })
    .then((posts) => {
      console.log('Posts:', posts);
      return fetchComments();
    })
    .then((comments) => {
      console.log('Comments:', comments);
    })
    .catch((error) => {
      console.error('Something went wrong:', error);
    });
}

function fetchinparallel() {
  Promise.all([fetchUser(), fetchPosts(), fetchComments()])
    .then(([users, posts, comments]) => {
      console.log('User:', users);
      console.log('Posts:', posts);
      console.log('Comments:', comments);
    })
    .catch((error) => {
      console.error('Something went wrong:', error);
    });
}

//fetchsequentially()
fetchinparallel();

// rewrite with async - await

//Dealy Function to reduce code
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchUserAsync() {
  await delay(1000);
  console.log('User data fetched (async)');
  return { id: 1, name: 'Mike' };
}

async function fetchPostsAsync() {
  await delay(1500);
  console.log('Posts data fetched (async)');
  return [
    { id: 1, userId: 1, title: 'Ocean in Motion' },
    { id: 2, userId: 1, title: 'Shaq Dunk' },
  ];
}

async function fetchCommentsAsync() {
  await delay(2000);

  if (Math.random() < 0.5) {
    throw new Error('Failed to fetch comments');
  }

  console.log('Comments data fetched (async)');
  return [
    { id: 1, postId: 1, content: 'Amazing Scenery' },
    { id: 2, postId: 1, content: 'Thanks for sharing.' },
    { id: 3, postId: 2, content: 'WOW!' },
  ];
}

async function fetchSequentiallyAsync() {
  console.time('Sequential Async');

  try {
    const user = await fetchUserAsync();
    console.log('User:', user);

    const posts = await fetchPostsAsync();
    console.log('Posts:', posts);

    const comments = await fetchCommentsAsync();
    console.log('Comments:', comments);
  } catch (error) {
    console.error('Error during sequential fetch:', error);
  }

  console.timeEnd('Sequential Async');
}

async function fetchInParallelAsync() {
  console.time('Parallel Async');

  try {
    const [user, posts, comments] = await Promise.all([
      fetchUserAsync(),
      fetchPostsAsync(),
      fetchCommentsAsync(),
    ]);

    console.log('User:', user);
    console.log('Posts:', posts);
    console.log('Comments:', comments);
  } catch (error) {
    console.error('Error during parallel fetch:', error);
  }

  console.timeEnd('Parallel Async');
}

//fetchSequentiallyAsync()
fetchInParallelAsync();

//getUsercontent funciton

async function getUserContent() {
  console.log('Starting to fetch user content...');
  console.time('Total Time');

  try {
    const user = await fetchUserAsync();
    console.log('User profile retrieved:', user);
  } catch (error) {
    console.error('Could not retrieve user:', error.message);
    console.timeEnd('Total Time');
    return;
  }

  let posts;
  try {
    posts = await fetchPostsAsync();
    console.log('Posts retrieved:', posts);
  } catch (error) {
    console.error('Could not retrieve posts:', error.message);
    console.timeEnd('Total Time');
    return;
  }

  try {
    const comments = await fetchCommentsAsync();
    console.log('Comments retrieved:', comments);
  } catch (error) {
    console.error('Could not retrieve comments:', error.message);
    console.timeEnd('Total Time');
    return;
  }

  console.log('All data retrieved successfully.');
  console.timeEnd('Total Time');
}

getUserContent();
