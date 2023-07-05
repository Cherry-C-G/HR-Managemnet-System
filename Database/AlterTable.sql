-- Add isSecondary to Address table 
ALTER TABLE Address
ADD isSecondary BIT NOT NULL DEFAULT 0;

-- Add work email to Person table 
ALTER TABLE Person
ADD WorkEmail VARCHAR(255);

-- Add preferred name to Person table 
ALTER TABLE Person
ADD PreferredName VARCHAR(50);

ALTER TABLE Person
ADD Gender VARCHAR(10);

--add contact person id to contact table
ALTER TABLE Contact
ADD ContactPersonId INT;

SELECT fk.name
FROM sys.foreign_keys fk
INNER JOIN sys.tables t
ON fk.parent_object_id = t.object_id
WHERE t.name = 'PersonalDocument'

ALTER TABLE [dbo].[PersonalDocument]
DROP CONSTRAINT FK__PersonalD__Creat__09A971A2

ALTER TABLE [dbo].[PersonalDocument]
ADD CONSTRAINT FK_PersonalDocument_CreatedBy
FOREIGN KEY (CreatedBy) REFERENCES [dbo].[Person](ID);

EXEC sp_RENAME 'VisaStatus.Actice', 'Active', 'COLUMN'

EXEC sp_RENAME 'Employee.PersonID', 'PersonId', 'COLUMN'

EXEC sp_RENAME 'Employee.Avartar', 'Avatar', 'COLUMN'

ALTER TABLE
    Employee DROP CONSTRAINT FK__Employee__HouseI__7D439ABD