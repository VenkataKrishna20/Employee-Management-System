import Department from "../models/Department.js";


const addDepartment= async (req,res)=>{
    try{
        console.log("Controller HIT");         // ✅ ADD
        console.log(req.body);                 // ✅ ADD

        const {dep_name, description} = req.body;
        const newDept = new Department({
            dep_name,
            description
        })
        await newDept.save();

        console.log("Saved:", newDept);        // ✅ ADD

        return res.status(200).json({success: true, department: newDept})
    }catch(error){
        console.error("ERROR:", error);        // ✅ ADD
        return res.status(500).json({success: false, error: "add department server error"})
    }
}
export {addDepartment}