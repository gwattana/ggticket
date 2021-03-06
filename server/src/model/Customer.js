const User = require('./User')
const pool = require('../../sql')

class Customer extends User{
    constructor(audience_id,user_id, username, password, user_fname, user_lname, user_tel, user_email, type){
        super(user_id, username, password, user_fname, user_lname, user_tel, user_email, type)
        this.audience_id = audience_id
    }

    async createCustomer(){
        const conn = await pool.getConnection()
        await conn.beginTransaction();
        try{
            await super.register()
            let stmt = 'insert AUDIENCE(user_id) values(?)'
            let keep = await conn.query(stmt, [this.user_id])
            this.audience_id = keep[0].insertId
            await conn.commit()
            return Promise.resolve()
        } catch (err) {
            console.log(err)
            await conn.rollback();
            return Promise.reject(err)
        } finally {
            console.log("finally");
            conn.release()
        }
    }
}

module.exports = Customer