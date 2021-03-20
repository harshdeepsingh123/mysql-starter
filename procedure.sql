CREATE DEFINER=`root`@`localhost` PROCEDURE `employeaddoredit`(
in _employeid varchar(10),
in _name varchar(20),
in _rollno varchar(10),
in _employeecode varchar(20)
)
BEGIN
	if _employeid = 0 then 
		insert into employee(name,rollno,employeecode)
        values(_name,_rollno,_employeecode);
        
        set _employeid=last_insert_id();
	else
		update employee
        set 
        name=_name,
        rollno=_rollno,
        employeecode=_employeecode
        where employeid=_employeid;
	end if;
    
	select _employeid as 'employeid';
END