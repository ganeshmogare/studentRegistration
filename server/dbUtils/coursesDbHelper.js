class CoursesDbHelper {
    constructor(dao) {
      this.dao = dao
    }
  
    createTable() {
      const sql = `
      CREATE TABLE IF NOT EXISTS courses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        details TEXT)`
      return this.dao.run(sql)
    }

    create(data) {
        let {name,details} = data;
        return this.dao.run(
          'INSERT INTO courses (name,details) VALUES (?,?)',
          [name,details])
    }

    update(data) {
        const { id, name, details } = data
        return this.dao.run(
          `UPDATE courses SET name = ? , details= ? WHERE id = ?`,
          [name,details, id]
        )
    }

    delete(id) {
        return this.dao.run(
          `DELETE FROM courses WHERE id = ?`,
          [id]
        )
    }

    getById(id) {
        return this.dao.get(
          `SELECT * FROM courses WHERE id = ?`,
          [id])
    }

    getAll(options) {
      let { page =1, limit =10} =options;
      let offset = (page -1)* limit;
      // OFFSET ${offset} LIMIT ${limit}
      //[offset,limit]
        return this.dao.all(`SELECT * FROM courses`);
    }
  }
  
  module.exports = CoursesDbHelper;