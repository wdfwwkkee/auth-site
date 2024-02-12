const db = require('../db')


class UserController {
    async createUser(req, res) {
        const {person_name, surname} = req.body
        if ((person_name,surname) != null) {
            const newPerson = await db.query(`INSERT INTO person (person_name, surname) values ($1, $2) RETURNING *`, [person_name, surname])
            res.json(newPerson.rows)
        }
        res.send("null")
    }

    async getUser(req, res) {
        const users = await db.query(`SELECT * FROM person`)
        res.json(users.rows)
    }

    async getOneUser(req, res) {
        const id = req.params.id
        const users = await db.query(`SELECT * FROM person where id = $1`, [id])
        res.json(users.rows[0])
    }

    async updateUser(req, res) {
        const {id, person_name, surname} = req.body
        const user = await db.query(`UPDATE person set person_name = $1, surname = $2 where id = $3 RETURNING *`,
        [person_name, surname, id ])
        res.json(user.rows)
    }

    async deleteUser(req, res) {
        const id = req.params.id
        db.query(`ALTER TABLE posts DROP FOREIGN_KEY user_id `)
        const users = await db.query(`DELETE FROM person where id = $1`, [id])
        res.json(users.rows)
    }
}

module.exports = new UserController();