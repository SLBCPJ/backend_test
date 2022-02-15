const Palabra = require("../models/palabra");
const msg = require("../helpers/messages");

const palabraController = {
  //AGREGAR PALABRAS NUEVAS
  add: async function (req, res) {
    try {
      const palabra = new Palabra(req.body);
      // res.send(req.body)
      await palabra.save();
      res.status(200).json({ 'Palabra': palabra });
    } catch (error) {
      res.status(500).json({ "error": error });
    }
  },
  //LISTAR TODAS LAS PALABRAS
  list: async function (req, res) {
    try {
      const palabraDb = await Palabra.find();
      res.json(palabraDb);
    } catch (error) {
      return res.status(400).json({
        mensaje: 'Ocurrio un error',
        error
      })
    }
  },
  //ENCONTRAR UNA INSERCION DE PALABRAS POR MEDIO DEL ID
  find: async function (req, res) {
    const _id=req.params.id;
    try {
        const palabraSelect= await Palabra.findOne({_id});
        res.json(palabraSelect);
        
    } catch (error) {
        return res.status(500).json({
            mensaje:'Ocurrio un error',
            error
        })
    }
  },
  //ELIMINAR PALABRAS POR MEDIO DE UN ID
  delete: async function (req,res) {
    const _id = req.params.id;
    try {
      const palabraDel = await Palabra.findByIdAndDelete({_id});
      if(!palabraDel){
        return res.status(400).json({
          mensaje: 'No se encontró el id indicado',
          error
        })
      }
      res.json({"Eliminado con exito": palabraDel});  
    } catch (error) {
      return res.status(400).json({
        mensaje: 'Ocurrio un error',
        error
      })
    }
  },
  //ACTUALIZAR PALABRAS POR MEDIO DE UN ID
  update: async function(req,res){
    const _id = req.params.id;
    const body = req.body;
    try {
      const palabraUpdate = await Palabra.findByIdAndUpdate(
        _id,
        body,
        {new: true});
        res.json({ "actualizado con exito": palabraUpdate });  
    } catch (error) {
      return res.status(400).json({
        mensaje: 'Ocurrio un error',
        error
      })
    }
  }
};

module.exports = palabraController;
