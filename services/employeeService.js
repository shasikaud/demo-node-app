const { query } = require('./db');

const getEmployees  = async(page=1, limit=5) => {
    const offset = (page-1)*limit;
    const rows = await query(
        `SELECT e.id, e.full_name, e.phone_number, e.email, e.address, e.city, e.state,
        pec.name AS primary_name, pec.phone_number AS primary_phone_number, pec.relationship AS primary_relationship,
        sec.name AS secondary_name, sec.phone_number AS secondary_phone_number, sec.relationship AS secondary_relationship 
        FROM employees as e 
        LEFT JOIN emergency_contacts AS pec ON (pec.employee_id = e.id AND pec.type = 'PRIMARY')
        LEFT JOIN emergency_contacts AS sec ON (sec.employee_id = e.id AND sec.type = 'SECONDARY')
        LIMIT ${limit} OFFSET ${offset}`
    );
    return rows;
}

const getEmployeeById  = async(id) => {
    const row = await query(
        `SELECT e.id, e.full_name, e.phone_number, e.email, e.address, e.city, e.state,
                pec.name AS primary_name, pec.phone_number AS primary_phone_number, pec.relationship AS primary_relationship,
                sec.name AS secondary_name, sec.phone_number AS secondary_phone_number, sec.relationship AS secondary_relationship 
        FROM employees as e 
        LEFT JOIN emergency_contacts AS pec ON (pec.employee_id = e.id AND pec.type = 'PRIMARY')
        LEFT JOIN emergency_contacts AS sec ON (sec.employee_id = e.id AND sec.type = 'SECONDARY')
        WHERE e.id=${id}`
    );
    if (row.length == 0) return "Invalid Employee ID!";
    return row[0];
}

const createEmployee = async(employee) => {

    const employeeId = String(Date.now());
    const resultEmployee = await query(
        `INSERT INTO employees (id, full_name, phone_number, email, address, city, state) 
        VALUES ('${employeeId}', '${employee.fullName}', '${employee.phoneNumber}', '${employee.email}', '${employee.address}', '${employee.city}', '${employee.state}')`
    );

    const primaryContactId = String(Date.now());
    const resultPrimaryContact = await query(
        `INSERT INTO emergency_contacts (id, type, name, phone_number, relationship, employee_id) 
        VALUES ('${primaryContactId}', 'PRIMARY', '${employee.emergencyContacts.primaryName}', '${employee.emergencyContacts.primaryPhoneNumber}', '${employee.emergencyContacts.primaryRelationship}', '${employeeId}')`
    );

    const secondaryContactId = String(Date.now());
    const resultSecondaryContact = await query(
        `INSERT INTO emergency_contacts (id, type, name, phone_number, relationship, employee_id) 
        VALUES ('${secondaryContactId}', 'SECONDARY', '${employee.emergencyContacts.secondaryName}', '${employee.emergencyContacts.secondaryPhoneNumber}', '${employee.emergencyContacts.secondaryRelationship}', '${employeeId}')`
    );

    if (resultEmployee.affectedRows && resultPrimaryContact.affectedRows && resultSecondaryContact.affectedRows) {
        return `Employee added successfully with id ${employeeId}`;
    }
    return "Failed to add employee!";
}

const deleteEmployeeById = async(id) => {

    const row = await query(
        `DELETE FROM employees WHERE id = ${id}`
    );

    if (row.affectedRows) {
        return `Employee deleted successfully with id ${id}`;
    }
    return "Failed to delete employee!";
}

const updateEmployeeById = async(employee) => {

    const id = employee.id;
    const resultEmployee = await query(
        `UPDATE employees
        SET full_name='${employee.fullName}',
            phone_number='${employee.phoneNumber}',
            email='${employee.email}', 
            address='${employee.address}', 
            city='${employee.city}', 
            state='${employee.state}'
        WHERE id=${id}`
    );
    const resultPrimaryContact = await query(
        `UPDATE emergency_contacts
        SET name='${employee.emergencyContacts.primaryName}',
            phone_number='${employee.emergencyContacts.primaryPhoneNumber}'
        WHERE employee_id='${id}' AND type='PRIMARY'`
    );
    const resultSecondaryContact = await query(
        `UPDATE emergency_contacts
        SET name='${employee.emergencyContacts.secondaryName}',
            phone_number='${employee.emergencyContacts.secondaryPhoneNumber}'
        WHERE employee_id='${id}' AND type='SECONDARY'`
    );
    if (resultEmployee.affectedRows && resultPrimaryContact.affectedRows && resultSecondaryContact.affectedRows) {
        return `Employee updated successfully with id ${id}`;
    }
    return "Failed to update employee!";
}

module.exports = { getEmployees, getEmployeeById, createEmployee, deleteEmployeeById, updateEmployeeById };
