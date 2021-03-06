import { createSelector } from 'reselect'
import { isTokenValid } from '../../utils/jwt'
import { getLocalStorage } from '../../utils/window'
import config from '../../config'

const authSelector = state => state.session && state.session.auth

export const getAuth = createSelector(
  authSelector,
  auth => {
    if (auth) return auth
    try {
      return getLocalStorage(config.localStorage.auth)
    } catch (error) {
      console.error(error)
    }
    return null
  }
)

export const isAuthValid = createSelector(
  state => getAuth(state),
  auth => {
    return (auth && auth.token && isTokenValid(auth.token)) || false
  }
)
