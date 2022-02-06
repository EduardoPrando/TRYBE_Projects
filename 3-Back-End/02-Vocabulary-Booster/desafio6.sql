SELECT 
CONCAT(FIRST_NAME, ' ', LAST_NAME) AS `Nome completo`,
jb.JOB_TITLE AS `Cargo`,
jb_hist.START_DATE AS `Data de início do cargo`,
dep.DEPARTMENT_NAME AS `Departamento`
FROM hr.job_history AS jb_hist
INNER JOIN hr.employees AS emp ON jb_hist.EMPLOYEE_ID = emp.EMPLOYEE_ID
INNER JOIN hr.jobs AS jb ON jb.JOB_ID = jb_hist.JOB_ID
INNER JOIN hr.departments AS dep ON dep.DEPARTMENT_ID = jb_hist.DEPARTMENT_ID
ORDER BY `Nome completo` DESC, `Cargo`;
