/* Build client data storage without Vuex */
import Vue from 'vue'

export default ({ app }, inject) => {
  const state = Vue.observable({
    auth: {
      isLoggedIn: false,
      token: null,
      adminId: null
    },
    navigations: [
      {
        name: 'Home',
        path: '/',
        sub: [
          {
            name: 'Home',
            path: '/'
          }
        ]
      },
      {
        name: 'Signatures',
        path: '/signatures',
        sub: [
          {
            name: 'List',
            path: '/signatures'
          },
          {
            name: 'Create New',
            path: '/signatures/create'
          }
        ]
      }
    ],
    moreNavigations: [
      {
        name: 'Profile',
        path: '/profile',
        sub: [
          {
            name: 'Profile',
            path: '/profile'
          },
          {
            name: 'Change Password',
            path: '#'
          }
        ]
      }
    ],
    page: {
      title: '',
      subtitle: ''
    },
    alertState: {
      isVisible: false,
      type: '',
      message: ''
    }
  })

  const actions = {
    setAuthState(payload) {
      state.auth.isLoggedIn = payload.isLoggedIn
      state.auth.token = payload.token
      state.auth.adminId = payload.adminId
      app.$axios.onRequest((config) => {
        config.headers.common['X-Access-Token'] = payload.token
      })
    },
    setPageState(payload) {
      state.page.title = payload.title
      state.page.subtitle = payload.subtitle
    },
    setAlertState(payload) {
      state.alertState.isVisible = payload.isVisible
      state.alertState.type = payload.type
      state.alertState.message = payload.message
    },
    checkAuthState() {
      return new Promise((resolve, reject) => {
        const token = localStorage.getItem('pa-accessToken')
        const adminId = localStorage.getItem('pa-adminId')
        if (token && adminId) {
          app.$axios
            .get(`https://api.picassorewards.com:8443/v1/admins/${adminId}`, {
              headers: { 'X-Access-Token': token }
            })
            .then(() => {
              this.setAuthState({
                isLoggedIn: true,
                token,
                adminId
              })
              resolve('User authenticated')
            })
            .catch(() => {
              reject(new Error('Failed to verify token'))
            })
        } else {
          reject(new Error('User unauthenticated'))
        }
      })
    }
  }

  inject('state', state)
  inject('actions', actions)
}
