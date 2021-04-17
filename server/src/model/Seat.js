const pool = require('../../sql')

class Seat{
    constructor(seat_id, type_of_seat, seat_status, theater_id){
        this.seat_id = seat_id
        this.type_of_seat = type_of_seat
        this.seat_status = seat_status
        this.theater_id = theater_id
    }

    async addSeat(){
        const conn = await pool.getConnection()
        await conn.beginTransaction();
        try{
            let stmt = 'insert into SEAT (type_of_seat, seat_status, theater_id) values(?, ?, ?);'
            let keep = await conn.query(stmt, [this.type_of_seat, this.seat_status, this.theater_id])
            this.seat_id = keep[0].insertId
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

    async editSeat(){
        const conn = await pool.getConnection()
        await conn.beginTransaction();
        try{
            let stmt = 'update SEAT set type_of_seat=?, seat_status=?, theater_id=? where seat_id=?'
            let keep = await conn.query(stmt, [this.type_of_seat, this.seat_status, this.theater_id, this.seat_id])
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

    async delSeat(){
        const conn = await pool.getConnection()
        await conn.beginTransaction();
        try{
            let stmt = 'delete from SEAT where seat_id=?;'
            let keep = await conn.query(stmt, [this.seat_id])
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

module.exports = Seat