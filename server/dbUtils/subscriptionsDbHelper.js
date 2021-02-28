class SubscriptionsDbHelper {
  constructor(dao) {
    this.dao = dao
  }

  createTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS subscriptions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        courseName TEXT,
        studentName TEXT,
        courseId INTEGER,
        studentId INTEGER)`
    return this.dao.run(sql)
  }

  create(data) {
    let {courseName,studentName,courseId,studentId } = data;
    return this.dao.run(
      'INSERT INTO subscriptions (courseName,studentName,courseId,studentId) VALUES (?,?,?,?)',
      [courseName,studentName,courseId,studentId])
  }

  update(data) {
    const { id, courseName,studentName,courseId,studentId } = data
    return this.dao.run(
      `UPDATE subscriptions SET courseName = ? , studentName= ?, courseId = ? , studentId= ? WHERE id = ?`,
      [courseName,studentName,courseId,studentId, id]
    )
  }

  delete(id) {
    return this.dao.run(
      `DELETE FROM subscriptions WHERE id = ?`,
      [id]
    )
  }

  getById(id) {
    return this.dao.get(
      `SELECT * FROM subscriptions WHERE id = ?`,
      [id])
  }

  getAll(options) {
    let { page = 1, limit = 10 } = options;
    let offset = (page - 1) * limit;
    return this.dao.all(`SELECT * FROM subscriptions`);
  }
}

module.exports = SubscriptionsDbHelper;