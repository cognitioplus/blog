document.addEventListener('DOMContentLoaded', () => {
  loadPosts();
  loadComments();
});

// Mock posts data (replace with API later)
const posts = [
  { title: "Building Resilience in Filipino Communities", content: "Discover culturally grounded approaches to mental health resilience." },
  { title: "Youth Mental Health Advocacy", content: "Empowering youth voices and creating safe school environments." }
];

function loadPosts() {
  const postsContainer = document.getElementById('posts');
  posts.forEach(post => {
    const div = document.createElement('div');
    div.className = 'post';
    div.innerHTML = `<h3>${post.title}</h3><p>${post.content}</p>`;
    postsContainer.appendChild(div);
  });
}

// Handle comments
const comments = JSON.parse(localStorage.getItem('comments') || '[]');

document.getElementById('commentForm').addEventListener('submit', e => {
  e.preventDefault();
  const name = e.target.name.value;
  const comment = e.target.comment.value;

  const newComment = { name, comment };
  comments.push(newComment);
  localStorage.setItem('comments', JSON.stringify(comments));

  e.target.reset();
  loadComments();
});

function loadComments() {
  const container = document.getElementById('comments');
  container.innerHTML = '';
  comments.forEach(c => {
    const div = document.createElement('div');
    div.className = 'comment';
    div.innerHTML = `<strong>${c.name}</strong><p>${c.comment}</p>`;
    container.appendChild(div);
  });
}
