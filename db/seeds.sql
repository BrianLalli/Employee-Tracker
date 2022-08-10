USE employee_tracker;
INSERT INTO department(name) VALUES
    ("Finance"),
    ("Operations"),
    ("Technology");

INSERT INTO role(title, salary, department_id) VALUES
    ("Chief Financial Officer", 1000000.99, 1),
    ("Chief Operations Officer", 1000000.98, 2),
    ("Chief Technology Officer", 1000000.97, 3);

INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES
    ("Tom", "Johnson", 1, null),
    ("Rick", "Smith", 2, null),
    ("Suzy", "Richards", 3, null);

