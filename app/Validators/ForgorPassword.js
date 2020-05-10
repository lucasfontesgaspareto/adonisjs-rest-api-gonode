'use strict'

class ForgorPassword {
  get rules () {
    return {
      email: 'required|email',
      redirect_url: 'required|url'
    }
  }
}

module.exports = ForgorPassword
