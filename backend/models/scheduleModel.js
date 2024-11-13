const pool = require("../config/db");

const getSchedulesByRegion = async (region) => {
  const result = await pool.query(
    "SELECT * FROM schedules WHERE region = $1",
    [region]
  );
  return result.rows;
};

const addSchedule = async (schedule) => {
  const { region, start_time, end_time } = schedule;
  const result = await pool.query(
    "INSERT INTO schedules (region, start_time, end_time) VALUES ($1, $2, $3) RETURNING *",
    [region, start_time, end_time]
  );
  return result.rows[0];
};

module.exports = { getSchedulesByRegion, addSchedule };
