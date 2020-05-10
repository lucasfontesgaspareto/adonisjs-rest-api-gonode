'use strict'

const Model = use('App/Models/Project')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with projects
 */
class ProjectController {
  /**
   * Show a list of all projects.
   * GET projects
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    try {
      let { page } = request.get()

      // not allow negative or zero number or is not a number value
      if (page <= 0 || isNaN(page)) {
        page = 1
      }

      const projects = await Model.query()
        .with('user')
        .paginate(page)

      return projects
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: 'Erro ao buscar projetos' } })
    }
  }

  /**
   * Render a form to be used for creating a new project.
   * GET projects/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new project.
   * POST projects
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    try {
      const data = request.only(['title', 'description'])

      const project = await Model.create({ ...data, user_id: auth.user.id })

      return project
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: 'Erro ao criar projeto' } })
    }
  }

  /**
   * Display a single project.
   * GET projects/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    try {
      const project = await Model.findOrFail(params.id)

      await project.load('user')
      await project.load('tasks')

      return project
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: 'Erro ao buscar projeto' } })
    }
  }

  /**
   * Render a form to update an existing project.
   * GET projects/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update project details.
   * PUT or PATCH projects/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response, auth }) {
    try {
      const project = await Model.findOrFail(params.id)
      const data = request.only(['title', 'description'])

      project.merge(data)

      await project.save()

      return project
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: 'Erro ao alterar projeto' } })
    }
  }

  /**
   * Delete a project with id.
   * DELETE projects/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    try {
      const project = await Model.findOrFail(params.id)
      await project.delete()
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: 'Erro ao excluir projeto' } })
    }
  }
}

module.exports = ProjectController
