import store from '../store'

export default (to, from, next) => {
  if (store.state.userLoggedIn) {
    next()
  } else {
    next('/login')
  }
}