const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const auth = require('../controllers/auth');
const projects = require('../controllers/projects');
const employees = require('../controllers/employees');
const clients = require('../controllers/clients');
const file = require('../controllers/file');

//AUTH
router.get('/auth/me', authenticate, auth.me);

//PROJECTS
router.get('/projects', authenticate, projects.projects);
router.get('/project-with-employees/:id', authenticate, projects.singleProjectWithEmployees);
router.put('/edit-project/:id', authenticate, projects.editProjectAndFinance);
router.post('/add-new-finance-and-project', authenticate, projects.createFinanceAndProject);
router.post('/change-project-payment/:id', authenticate, projects.changeProjectPayment);
router.delete('/delete-project/:id', authenticate, projects.deleteProject);

//EMPLOYEES
router.delete('/delete-employee-from-project/:id', authenticate, employees.deleteEmployeeFromProject);
router.delete('/delete-employee/:id', authenticate, employees.deleteEmployee);
router.get('/employees', authenticate, employees.getAllEmployees);
router.post('/add-existing-employee', authenticate, employees.addEmployeeToProject);
router.post('/add-new-employee', authenticate, employees.addNewEmployee);
router.post('/add-new-employee-and-link-to-project', authenticate, employees.addNewEmployeeAndLinkWithProject);
router.get('/employees/:id', authenticate, employees.singleEmployee);
router.put('/edit-employee/:id', authenticate, employees.editEmployee);

//CLIENTS
router.get('/clients', authenticate, clients.clients);
router.post('/add-new-client', authenticate, clients.addClient);
router.get('/client-with-projects/:id', authenticate, clients.getClientWithProjects);
router.put('/edit-client/:id', authenticate, clients.editClient);
router.get('/detach-project-from-client/:id', authenticate, clients.detachProjectFromClient);
router.post('/attach-project-to-client/:id', authenticate, clients.attachProjectToClient);
router.get('/projects-number-per-client', authenticate, clients.getNumberOfProjectsPerClient);
router.delete('/delete-client/:id', authenticate, clients.deleteClient);

//FINANCES
router.get('/add-finance', authenticate, clients.clients);

//FILES
router.post("/upload/:folder/:subfolder", file.upload);
router.get("/files/:folder/:subfolder", file.getListFiles);
router.get("/files/:folder/:subfolder/:name", file.download);
router.delete("/files/:folder/:subfolder/:name", file.deleteFiles);

module.exports = router;
