import { Op } from "sequelize";
import { Tools } from "./toolsModels.js";
import { try_catch } from "../../utils/try_catch.js";

export class ToolsService {
    verHerramientas = async () => {
        try{
            const resultado = await Tools.findAll({
                where: {
                    disabled: false
                },
                attributes: ['id_tool', 'name_tool', 'status_tool', 'location_tool']
            });
            if(resultado.length === 0) return try_catch.SERVICE_CATCH_RES(resultado, 'No se encontraron herramientas registradas en la base de datos', 404);

            return try_catch.SERVICE_TRY_RES(resultado, 302);

        }catch(err) {
            try_catch.SERVICE_CATCH_RES(err);
        }
    }
    crearHerramienta = async (data) => {
        try{
            const resultado = await Tools.create(data);

            return try_catch.SERVICE_TRY_RES(resultado, 201);

        }catch(err) {
            try_catch.SERVICE_CATCH_RES(err);
        }
    }
    deshabilitarHerramienta = async (id_tool) => {
        try{
            await Tools.update({
                disabled: true
            },{
                where: {
                    id_tool
                }
            });

            return try_catch.SERVICE_TRY_RES(`La herramienta ID: ${id_tool} ha sido desabilitada con éxito`, 200);

        }catch(err) {
            try_catch.SERVICE_CATCH_RES(err);
        }
    }
    borrarHerramienta = async (id_tool) => {
        try {
            const resultado = await Tools.destroy({
                where: {
                    id_tool
                }
            });

            return try_catch.SERVICE_TRY_RES(`La herramienta con ID: ${id_tool} fue eliminada con éxito`, 200);

        }catch(err) {
            try_catch.SERVICE_CATCH_RES(err);
        }
    }
    updateTool = async (id_tool, data) => {
        try {
            await Tools.update(data, {
                where: {
                    id_tool
                }
            })

            const respuesta = await this.filtrarHerramienta('id_tool', id_tool);

            return try_catch.SERVICE_TRY_RES(respuesta.msg, 200);

        }catch(err) {
            try_catch.SERVICE_CATCH_RES(err);
        }
    }
    filtrarHerramienta = async (type, value) => {
        try {
            if (type === 'id_tool' || type === 'status_tool' || type === 'nameToolValidator'){
                if(type === 'nameToolValidator') type = 'name_tool';
                const objetoWhere = {};
                objetoWhere[type] = {
                    [Op.eq]: value
                };
                
                const respuesta = await Tools.findAll({
                    where: objetoWhere,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                })
                if(respuesta.length === 0) return try_catch.SERVICE_CATCH_RES(respuesta, `No se encontro nada en la base de datos con ${type}: ${value}`, 404);

                return try_catch.SERVICE_TRY_RES(respuesta, 302);

            } else {
                const objetoWhere = {};
                objetoWhere[type] = {
                    [Op.like]: `%${value}%` 
                };
                
                const respuesta = await Tools.findAll({
                    where: objetoWhere,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                });
                if(respuesta.length === 0) return try_catch.SERVICE_CATCH_RES(respuesta, `No se encontra nada en la base de datos con ${type}: ${value}`, 404);

                return try_catch.SERVICE_TRY_RES(respuesta, 302);

            };

        }catch(err) {
            try_catch.SERVICE_CATCH_RES(err);
        }
    }
};