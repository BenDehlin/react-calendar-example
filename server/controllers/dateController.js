module.exports = {
  getDates: (req, res) => {
    const db = req.app.get("db")
    const { user_id } = req.session.user
    db.dates.get_dates(user_id)
      .then((results) => {
        res.status(200).send(results.map(e => e.to_char))
      })
      .catch((err) => res.status(500).send(err))
  },
  updateDates: async (req, res) => {
    const db = req.app.get("db")
    const { user_id } = req.session.user
    const { selectedDays } = req.body
    await db.dates.clear_dates(user_id)
    selectedDays.forEach(async (date) => {
      await db.dates.add_dates(user_id, date)
    })
    db.dates.get_dates(user_id)
      .then((results) => {
        res.status(200).send(results.map(e => e.to_char))
      })
      .catch((err) => res.status(500).send(err))
  },
}
