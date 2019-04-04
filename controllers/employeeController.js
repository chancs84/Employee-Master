var employeeModel = require('../models/employeeModel.js');
var Validation = require('./Validation');

module.exports = {

    list: function (req, res) {
        employeeModel.find(function (err, employees) {
            if (err) {
                return res.status(400).json({
                    message: 'Error when getting employee.',
                    error: err
                });
            }
            // return res.json(employees);

            res.render("../views/employees/index", { employees: employees });
        });
    },

    new: function (req, res) {
        res.render("../views/employees/new", { message: "", employee: {} });
    },

    show: function (req, res) {
        var id = req.params.id;
        employeeModel.findOne({ _id: id }, function (err, employee) {
            if (err) {
                return res.status(400).json({
                    message: 'Error when getting employee.',
                    error: err
                });
            }
            if (!employee) {
                return res.status(404).json({
                    message: 'No such employee'
                });
            }
            // return res.json(employee);

            res.render("../views/employees/show", { employee: employee });

        });
    },

    create: function (req, res) {
        var employee = new employeeModel({
            name: req.body.name,
            age: req.body.age,
            designation: req.body.designation,
            activeStatus: req.body.activeStatus,
            emailID: req.body.emailID

        });

        employee.save(function (err, employee) {
            if (err) {

                if (err.errors.age) {
                    return res.render("../views/employees/new", { message: 'Age should be greater than 20.', employee: employee });
                }
                if (err.errors.emailID) {
                    return res.render("../views/employees/new", { message: 'Email Already Used.', employee: employee });
                }

                res.render("../views/employees/new", { message: 'Error when creating employee', employee: employee });
                return
            }
            // return res.status(201).json(employee);
            console.log("Successfully created an employee.");

            res.redirect("/show/" + employee._id);
        });
    },

    edit: function (req, res) {
        var id = req.params.id;
        employeeModel.findOne({ _id: id }, function (err, employee) {
            if (err) {
                console.log("Error:", err);
            }
            else {
                res.render("../views/employees/edit", { employee: employee, message: "" });
            }
        });
    },

    update: function (req, res) {
        var id = req.params.id;
        employeeModel.findOne({ _id: id }, function (err, employee) {
            if (err) {
                res.render("../views/employees/edit", { message: 'Error when updating employee' });
            }
            employee._id = id;
            employee.name = req.body.name ? req.body.name : employee.name;
            employee.age = req.body.age ? req.body.age : employee.age;
            employee.designation = req.body.designation ? req.body.designation : employee.designation;
            employee.activeStatus = req.body.activeStatus ? req.body.activeStatus : employee.activeStatus;
            employee.emailID = req.body.emailID ? req.body.emailID : employee.emailID;

            employee.save(function (err, updatedEmployee) {
                if (err) {
                    if (err.errors.age) {
                        return res.render("../views/employees/new", { message: 'Age should be greater than 20.', employee: employee });
                    }
                    if (err.errors.emailID) {
                        return res.render("../views/employees/new", { message: 'Email Already Used.', employee: employee });
                    }

                    return res.render("../views/employees/edit", { employee: employee, message: 'Error when updating employee' });
                }

                // return res.json(employee);
                res.redirect("/show/" + updatedEmployee._id);

            });
        });
    },

    remove: function (req, res) {
        var id = req.params.id;
        employeeModel.findByIdAndRemove(id, function (err, employee) {
            if (err) {
                return res.status(400).json({
                    message: 'Error when deleting the employee.',
                    error: err
                });
            }
            // return res.status(204).json();
            res.redirect("/");

        });
    }
};
