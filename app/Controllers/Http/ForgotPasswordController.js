'use strict'

const crypto = require('crypto')
const User = use('App/Models/User')
const Mail = use('Mail')

class ForgotPasswordController {
  async store ({ request, response }) {
    try {
      const email = request.input('email')
      const user = await User.findByOrFail('email', email)

      user.token = crypto.randomBytes(10).toString('hex')
      user.token_created_at = new Date()

      await user.save()

      await Mail.send(
        ['emails.forgot_password'],
        {
          email: user.email,
          token: user.token,
          link: `${request.input('redirect_url')}/new-password?token=${user.token}`,
          token_created_at: user.token_created_at.toLocaleString()
        },
        message => {
          message
            .to(user.email)
            .from('lucas@rocketseat.com.br', 'Lucas | Rocketseat')
            .subject('Recuperação de senha')
        }
      )
    } catch (err) {
      return response
        .status(err.status)
        .send({ err: { message: 'E-mail não existe' } })
    }
  }
}

module.exports = ForgotPasswordController
