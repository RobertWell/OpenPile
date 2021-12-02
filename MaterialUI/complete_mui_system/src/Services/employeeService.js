const KEYS = {
  employees: "employees",
  employeeId: "employeeId",
};

export const getDepartmentCollection = () => {
  return [
    { id: "1", title: "Development" },
    { id: "2", title: "Marketing" },
    { id: "3", title: "Accounting" },
    { id: "4", title: "HR" },
  ];
};


export function insertEmployee(data) {
  let employees = getEmployees();
  data["id"] = generateEmployeeId();
  employees.push(data);
  localStorage.setItem(KEYS.employees, JSON.stringify(employees));
}
export function updatetEmployee(data) {
  let employees = getEmployees();
  let recordIndex = employees.findIndex(x=>x.id===data.id)
  employees[recordIndex]={...data}
  localStorage.setItem(KEYS.employees, JSON.stringify(employees));
}
export function deleteEmployee(data) {
  let employees = getEmployees();
  let recordIndex = employees.findIndex(x=>x.id===data.id)
  employees.splice(recordIndex, 1)
  localStorage.setItem(KEYS.employees, JSON.stringify(employees));
}

export function getEmployees() {
  if (localStorage.getItem(KEYS.employees) === null)
    localStorage.setItem(KEYS.employees, JSON.stringify([]));
  let employees = JSON.parse(localStorage.getItem(KEYS.employees));
  let departments = getDepartmentCollection();

  return employees.map((x) => ({
    ...x,
    department: departments[x.departmentId - 1]["title"],
  }));
}

export const generateEmployeeId = () => {
  if (localStorage.getItem(KEYS.employeeId) === null)
    localStorage.setItem(KEYS.employeeId, "0");
  let id = parseInt(localStorage.getItem(KEYS.employeeId));
  localStorage.setItem(KEYS.employeeId, (++id).toString());
  return id;
};
