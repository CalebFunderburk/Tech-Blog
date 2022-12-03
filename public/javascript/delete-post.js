async function deleteFormHandler(event) {
  event.preventDefault()

  const post_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ]

  const getComments = await fetch(`/api/cooments/section/${post_id}`, {
    method: 'GET'
  })

  if (!getComments.ok) {
    
    const deleteComments = await fetch(`/api/comments/section/${post_id}`, {
      method: 'DELETE'
    })
  
    if (!deleteComments.ok) {

      const deletePost = await fetch(`/api/posts/${post_id}`, {
        method: 'DELETE'
      })
  
      if (deletePost.ok) {
        document.location.replace('/dashboard')
      } else {
        alert(response.statusText)
      }
    } else {

      const deletePost = await fetch(`/api/posts/${post_id}`, {
        method: 'DELETE'

      })
  
      if (deletePost.ok) {
        document.location.replace('/dashboard')
      } else {
        alert(response.statusText)
      }
    }
  } else {

    const deleteComments = await fetch(`/api/comments/section/${post_id}`, {
      method: 'DELETE'

    })
  
    if (deleteComments.ok) {

      const deletePost = await fetch(`/api/posts/${post_id}`, {
        method: 'DELETE'
      })
  
      if (deletePost.ok) {
        document.location.replace('/dashboard')
      } else {
        alert(response.statusText)
      }
    } else {
      alert(response.statusText)
    }
  }
}

document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler)