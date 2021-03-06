const pool = require('../../sql')


class FOOD {
    constructor(food_id, food_name, food_image, food_price, food_status, staff_id, user_id) {
        this.food_id = food_id
        this.food_name = food_name
        this.food_image = food_image
        this.food_price = food_price
        this.food_status = food_status
        this.staff_id = staff_id
        this.user_id = user_id
    }

    async getFood() {
        const conn = await pool.getConnection()
        await conn.beginTransaction();
        try {
            let stmt = 'select * from FOOD where food_status <> 0'
            let keep = await conn.query(stmt)
            console.log(keep[0])
            await conn.commit()
            return Promise.resolve(keep[0])
        } catch (err) {
            console.log(err)
            await conn.rollback()
            return Promise.reject()
        } finally {
            conn.release()
        }
    }

    async createFood() {
        const conn = await pool.getConnection()
        await conn.beginTransaction();
        try {
            let stmt2 = 'select staff_id from USER \
            join THEATER_STAFF \
            using(user_id) \
            where user_id = ?'
            let staff = await conn.query(stmt2, [this.user_id])
            this.staff_id = staff[0][0].staff_id

            let stmt = 'insert into FOOD(food_name, food_image, food_price, food_status, staff_id) values(?, ?, ?, ?, ?);'
            let keep = await conn.query(stmt, [this.food_name, this.food_image, this.food_price, this.food_status, this.staff_id])
            this.food_id = keep[0].insertId
            await conn.commit()
            return Promise.resolve()
        } catch (err) {
            console.log(err)
            await conn.rollback()
            return Promise.reject()
        } finally {
            conn.release()
        }
    }

    async editFood() {
        const conn = await pool.getConnection()
        await conn.beginTransaction();
        try {
            let stmt2 = 'select staff_id from USER \
            join THEATER_STAFF \
            using(user_id) \
            where user_id = ?'
            let staff = await conn.query(stmt2, [this.user_id])
            console.log(this.user_id)
            this.staff_id = staff[0][0].staff_id

            let stmt = 'update FOOD set food_name = ?, food_image = ?, food_price = ?, staff_id = ? where food_id = ?;'
            await conn.query(stmt, [this.food_name, this.food_image, this.food_price, this.staff_id, this.food_id])
            await conn.commit()
            return Promise.resolve()
        } catch (err) {
            console.log(err)
            await conn.rollback()
            return Promise.reject()
        } finally {
            conn.release()
        }
    }

    async deleteFood() {
        const conn = await pool.getConnection()
        await conn.beginTransaction();
        try {
            try {
                let stmt = 'delete from FOOD where food_id = ?'
                await conn.query(stmt, [this.food_id])
            } catch (err) {
                let stmt2 = 'update FOOD set food_status =? where food_id = ?'
                await conn.query(stmt2, [false, this.food_id])
            }
            await conn.commit()
            return Promise.resolve()
        } catch (err) {
            console.log(err)
            await conn.rollback()
            return Promise.reject()
        } finally {
            conn.release()
        }
    }


}

module.exports = FOOD