'use strict'

const Antl = use('Antl')

class ForgorPassword {
  get rules () {
    return {
      email: 'required|email',
      redirect_url: 'required|url'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = ForgorPassword
