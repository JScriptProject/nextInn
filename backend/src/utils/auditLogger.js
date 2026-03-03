import { Log } from "#models/log.model.js";


export const createAuditLog = async(adminId, actionType, module, description)=>{

    try {
    await Log.create({
        admin:adminId,
        actionType, 
        module,
        description,
    })
    } catch (error) {
        console.log("Audit log creation failed", error); 
    }
};