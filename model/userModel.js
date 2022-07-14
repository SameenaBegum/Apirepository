const database = require("../utils/database")

const UserModel = {

    async CreateUser(userData){
       
        let query=`INSERT INTO  signup(signup_id,username,phonenumber,email,address,gender,bloodgroup,
            alternative_phone_no,dob,qualification,password,confirm_password) 
            values ('${userData.signin_id}','${userData.username}','${userData.phonenumber}','${userData.email}','${userData.address}','${userData.gender}',
            '${userData.bloodgroup}','${userData.alternative_phone_no}','${userData.dob}','${userData.qualification}',
            '${userData.password}','${userData.confirm_password}')`;
        return database.promise().query(query)
    },
    async loginUser(data){
        return query = await database.promise().query(`select * from signup  where email = '${data.email}' and password ='${data.password}'`);
    },

async GetAllUser(){
    return query = await database.promise().query(`select * from signup `);
},
async getUser(data){

    return query = await database.promise().query(`select * from signup where signup_id= ${data.signup} ` );

},
async updateUser(data){

    let query=(`update signup set username = '${data.username}',phonenumber='${data.phonenumber}',
     email = '${data.email}',address= '${data.address}',gender ='${data.gender}',bloodgroup = '${data.bloodgroup}', alternative_phone_no= '${data.alternative_phone_no}',
    qualification = '${data.qualification}',dob =' ${data.dob}'
     where signup_id = ${data.signup_id}`);
     return query = await database.promise().query(query)

}
}


module.exports=UserModel;