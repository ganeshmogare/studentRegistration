class StudentsDbHelper {
    constructor(dao) {
      this.dao = dao
    }
  
    createTable() {
      const sql = `
      CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT,
        lastName TEXT,
        dob DATE,
        phone VARCHAR)`
      return this.dao.run(sql)
    }

    create(data) {
      let {firstName , lastName , dob, phone} = data;
      return this.dao.run(
        'INSERT INTO students (firstName , lastName , dob, phone) VALUES (?,?,?,?)',
        [firstName , lastName , dob, phone])
  }

  update(data) {
      const { id, firstName , lastName , dob, phone } = data
      return this.dao.run(
        `UPDATE students SET firstName = ? , lastName= ?,dob=? ,phone=? WHERE id = ?`,
        [firstName , lastName , dob, phone, id]
      )
  }

  delete(id) {
      return this.dao.run(
        `DELETE FROM students WHERE id = ?`,
        [id]
      )
  }

  getById(id) {
      return this.dao.get(
        `SELECT * FROM students WHERE id = ?`,
        [id])
  }

  getAll(options) {
    let { page =1, limit =10} =options;
    let offset = (page -1)* limit;
    // OFFSET ${offset} LIMIT ${limit}
    //[offset,limit]
      return this.dao.all(`SELECT * FROM students`);
  }
  }
  
  module.exports = StudentsDbHelper;