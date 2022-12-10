export const saveUser = (user, usertype= 'buyer') => {
    const currentUser = {
      name: user.displayName,
      email: user.email,
      role: usertype,
    }
    //   Save user in db & get token
    fetch(`${process.env.REACT_APP_API_URL}/users/`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(currentUser),
    })
      .then(res => res.json())
      .then(data => {
      })
  }