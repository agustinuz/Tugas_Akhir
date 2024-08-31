import Appointment from "../models/AppointmentModel.js";
import Schedule from "../models/Schedulemodel.js";

// Get all appointments
export const getAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findAll();
    res.json(appointment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
// Create a new product
export const createAppointment = async (req, res) => {
  const {
    Owner,
    patientName,
    tanggalLahir,
    jenisKelamin,
    Spesies,
    Ras,
    typePengobatan,
    Schedule,
  } = req.body;

  try {
    const newAppointment = await Appointment.create({
      Owner: Owner,
      patientName: patientName,
      tanggalLahir: tanggalLahir,
      jenisKelamin: jenisKelamin,
      Spesies: Spesies,
      Ras: Ras,
      typePengobatan: typePengobatan,
      Schedule: Schedule,
    });

    res
      .status(201)
      .json({ msg: "Appointment created successfully", newAppointment });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Delete a product by ID
export const deleteAppointment = async (req, res) => {
  const { id } = req.body;
  try {
    const deletedAppointment = await Appointment.destroy({
      where: {
        id: id,
      },
    });
    if (deletedAppointment) {
      res.json({ msg: "Appointment deleted successfully" });
    } else {
      res.status(404).json({ msg: "Appointment not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Update a Appointment by ID
export const updateAppointment = async (req, res) => {
  const {
    id,
    Owner,
    patientName,
    tanggalLahir,
    jenisKelamin,
    Spesies,
    Ras,
    typePengobatan,
    Schedule,
  } = req.body;
  try {
    // Cari kategori berdasarkan ID
    const appointment = await Appointment.findOne({ where: { id } });
    if (!appointment) {
      return res.status(404).json({ msg: "Appointment not found" });
    }

    // Update data Appointment
    const updatedAppointment = await Appointment.update(
      {
        Owner: Owner,
        patientName: patientName,
        tanggalLahir: tanggalLahir,
        jenisKelamin: jenisKelamin,
        Spesies: Spesies,
        Ras: Ras,
        typePengobatan: typePengobatan,
        Schedule: Schedule,
      },
      {
        where: {
          id: id,
        },
      }
    );

    if (updatedAppointment[0] !== 0) {
      res.json({ msg: "Appointment updated successfully" });
    } else {
      res.status(404).json({ msg: "Appointment not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// SCHEDULE

export const getSchedule = async (req, res) => {
  try {
    const scheduled = await Schedule.findAll();
    res.json(scheduled);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const createSchedule = async (req, res) => {
  const { date, time } = req.body;
  try {
    const newSchedule = await Schedule.create({
      date: date,
      time: time,
    });
    res.status(201).json({ msg: "Schedule created successfully", newSchedule });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const deleteSchedule = async (req, res) => {
  const { id } = req.body;
  try {
    const deletedSchedule = await Schedule.destroy({
      where: {
        id: id,
      },
    });
    if (deletedSchedule > 0) {
      res.json({ msg: "Shcedule deleted successfully" });
    } else {
      res.status(404).json({ msg: "Shcedule not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const updateSchedule = async (req, res) => {
  const { id, date, time } = req.body;
  try {
    // Cari schedule berdasarkan ID
    const schedule = await Schedule.findOne({ where: { id } });
    if (!schedule) {
      return res.status(404).json({ msg: "Schedule not found" });
    }

    // Update data produk
    const updatedSchedule = await Schedule.update(
      {
        date: date,
        time: time,
      },
      {
        where: {
          id: id,
        },
      }
    );

    if (updatedSchedule[0] !== 0) {
      res.json({ msg: "updated Schedule successfully" });
    } else {
      res.status(404).json({ msg: "Schedule not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
