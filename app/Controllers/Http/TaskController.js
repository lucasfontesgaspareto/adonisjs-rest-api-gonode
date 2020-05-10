'use strict'

const Model = use('App/Models/Task')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with tasks
 */
class TaskController {
  /**
   * Show a list of all tasks.
   * GET tasks
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ params, request, response, view }) {
    try {
      const tasks = await Model.query()
        .with('porject_id', params.projects_id)
        .with('user')
        .fetch()

      return tasks
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: 'Erro ao buscar tarefas' } })
    }
  }

  /**
   * Render a form to be used for creating a new task.
   * GET tasks/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new task.
   * POST tasks
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ params, request, response }) {
    try {
      const data = request.all([
        'user_id',
        'title',
        'description',
        'due_date',
        'file_id'
      ])

      const task = await Model.create({
        ...data,
        project_id: params.projects_id
      })

      return task
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: 'Erro ao criar tarefa' } })
    }
  }

  /**
   * Display a single task.
   * GET tasks/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    try {
      const task = await Model.findOrFail(params.id)
      return task
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: 'Erro ao buscar tarefa' } })
    }
  }

  /**
   * Render a form to update an existing task.
   * GET tasks/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update task details.
   * PUT or PATCH tasks/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    try {
      const task = await Model.findOrFail(params.id)

      const data = request.all([
        'user_id',
        'title',
        'description',
        'due_date',
        'file_id'
      ])

      task.merge(data)

      await task.save()

      return task
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: 'Erro ao alterar tarefa' } })
    }
  }

  /**
   * Delete a task with id.
   * DELETE tasks/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    try {
      const task = await Model.findOrFail(params.id)
      await task.delete()
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: 'Erro ao excluir tarefa' } })
    }
  }
}

module.exports = TaskController
