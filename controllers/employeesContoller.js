const Employee = require("../model/Employee");

const getAllEmployees = async (req, res) => {
  const employees = await Employee.find().exec();
  if (!employees) res.status(204).json({ message: "No Employees Found " });
  res.json(employees);
};

const createNewEmployee = async (req, res) => {
  if (!req?.body?.name || !req?.body?.role) {
    res
      .status(400)
      .json({ message: "Name and Role are required field, fill them" });
  } else {
    await Employee.create({ name: req.body.name, role: req.body.role });
    res.sendStatus(200);
  }
};

const updateEmployee = async (req, res) => {
  const employee = await Employee.findOne({
    _id: req.body.id,
  });
  if (!employee) {
    res.status(404).json({ message: "Employee not found" });
  }

  if (req?.body?.name) employee.name = req.body.name;
  if (req?.body?.role) employee.role = req.body.role;

  const result = await employee.save();
  res.json(result);
  res.sendStatus(200);
};

const deleteEmployee = async (req, res) => {
  const employee = await Employee.findOne({
    _id: req.body.id,
  });
  await employee.deleteOne(employee);
};

const getEmployee = async (req, res) => {
  const employee = await Employee.findOne({
    _id: req.params.id,
  }).exec();

  if (!employee) {
    return res.status(400).json({ message: "employee not found" });
  } else {
    res.json(employee);
  }
};

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
