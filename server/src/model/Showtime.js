const pool = require('../../sql')

class Showtime{
    constructor(showtime_no, time_start, time_finish, showtime_status, movie_id, staff_id, theater_id){
        this.showtime_no = showtime_no
        this.time_start = time_start
        this.time_finish = time_finish
        this.showtime_status = showtime_status
        this.movie_id = movie_id
        this.staff_id = staff_id
        this.theater_id = theater_id
    }

    async addShowtime(){
        const conn = await pool.getConnection()
        await conn.beginTransaction();
        try{
            let stmt = 'insert into SHOWTIME (time_start, time_finish, showtime_status, movie_id, staff_id, theater_id) values(?, ?, ?, ?, ?, ?);'
            let keep = await conn.query(stmt, [this.time_start, this.time_finish, this.showtime_status, this.movie_id, this.staff_id, this.theater_id])
            this.showtime_no = keep[0].insertId
            await conn.commit()
            return Promise.resolve()
        }catch(err){
            console.log(err)
            await conn.rollback()
            return Promise.reject()
        }finally{
            conn.release()
        }
    }

    async editShowtime(){
        const conn = await pool.getConnection()
        await conn.beginTransaction();
        try{
            let stmt = 'UPDATE SHOWTIME set time_start=?, time_finish=?, movie_id=?, staff_id=? where showtime_no =?'
            let keep = await conn.query(stmt, [this.time_start, this.time_finish, this.movie_id, this.staff_id, this.showtime_no])
            await conn.commit()
            return Promise.resolve()
        }catch(err){
            console.log(err)
            await conn.rollback()
            return Promise.reject()
        }finally{
            conn.release()
        }
    }

    async delShowtime(){
        const conn = await pool.getConnection()
        await conn.beginTransaction();
        try{
            let stmt = 'delete from SHOWTIME where showtime_no=?;'
            let keep = await conn.query(stmt, [this.showtime_no])
            await conn.commit()
            return Promise.resolve()
        }catch(err){
            console.log(err)
            await conn.rollback()
            return Promise.reject()
        }finally{
            conn.release()
        }
    }
}

module.exports = Showtime