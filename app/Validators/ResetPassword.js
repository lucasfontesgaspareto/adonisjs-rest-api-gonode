'use strict'

class ResetPassword {
  get rules () {
    return {
      token: 'required',
      password: 'required|confirmed'
    }
  }
}

module.exports = ResetPassword
