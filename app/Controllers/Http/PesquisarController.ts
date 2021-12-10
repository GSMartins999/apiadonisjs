import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Pesquisar from 'App/Models/Pesquisar'
import StorePesquisarValidator from 'App/Validators/StorePesquisarValidator'


export default class PesquisarController {
  public async index({}: HttpContextContract) {
    const pesquisarDB = await Pesquisar.all()
    return pesquisarDB
}


  public async store({request, auth}: HttpContextContract) {
    const data = await request.validate(StorePesquisarValidator)
    const pesquisarDB = await Pesquisar.create({...data, userId: auth.user?.id })
    return pesquisarDB
    

  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const pesquisarDB = await Pesquisar.findOrFail(params.id)
      return pesquisarDB
    } catch (error) {
      response.status(400).send("Digite algo para que possamos procurar para você!!!")
    }
  }

  public async update ({ request, params, response }: HttpContextContract) {
    const { pesquisar } = await request.validate(StorePesquisarValidator)
    try {
      const pesquisarDB = await Pesquisar.findOrFail(params.id)
      pesquisarDB.Pesquisar = pesquisar
      await pesquisarDB.save()
      return pesquisarDB

    } catch (error) {
      response.status(400).send("Digite algo para que possamos procurar para você!!!")
    }
  
  }
  
  public async destroy({ params, response }: HttpContextContract) {
    try {
      const pesquisarDB = await Pesquisar.findOrFail(params.id)
      await pesquisarDB.delete()
      return pesquisarDB
    } catch (error) {
      response.status(400).send(" Digite algo para que possamos procurar para você!!!")
    }
  }
}
