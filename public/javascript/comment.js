async function commentFormHandler(event) {
  event.preventDefault()

  const comment = document.querySelector('textarea[name="comment-body"]').value.trim()
  const commentOwner = document.querySelector('input[name="comment-owner"]').value.trim()

  const post_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ]

  if (comment) {
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({
        comment: comment,
        user_id: commentOwner,
        post_id: post_id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.ok) {
      document.location.reload()
    } else {
      alert(response.statusText)
    }
  }
}

const invisidiv = document.getElementById('invisidiv')
invisidiv.style.display = 'none'

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler)