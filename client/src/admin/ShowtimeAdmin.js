import axios from 'axios';

const Showtime = 'http://localhost:12000/showtime/a';
const addShowtime = 'http://localhost:12000/showtime/add';
const delShowtime = 'http://localhost:12000/showtime/delete/';

class ShowtimeAdmin {
    static async getShowtime() {
        // console.log(await axios.get(Showtime))
        return await axios.get(Showtime)
    }

    static async addShowtime(form) {
        var object = {};
        form.forEach((value, key) => object[key] = value);
        var data = JSON.stringify(object);
        var json = JSON.parse(data);
        console.log(json);
        return await axios.post(addShowtime, json)

    }

    static async delShowtime(id) {
        return await axios.delete(delShowtime+id)
    }

}
export default ShowtimeAdmin