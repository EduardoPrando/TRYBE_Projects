SELECT UCASE(CONCAT(FIRST_NAME, ' ', LAST_NAME)) AS `Nome completo`,
jb_hist.START_DATE AS `Data de início`,
emp.SALARY AS `Salário`
FROM hr.job_history AS jb_hist
INNER JOIN hr.employees AS emp ON jb_hist.EMPLOYEE_ID = emp.EMPLOYEE_ID
WHERE MONTH(jb_hist.start_date) IN (01, 02, 03)
ORDER BY `Nome completo`, `Data de início`;
