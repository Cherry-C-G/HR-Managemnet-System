--Person table
SET IDENTITY_INSERT Person ON
INSERT INTO Person (ID, FirstName, LastName, MiddleName, Email, CellPhone, AlternatePhone, Gender, SSN, DOB)
VALUES (999, 'John', 'Doe', '', 'john.doe@email.com', '555-555-1212', '555-555-1213', 'Male', '123-45-6789', '1990-01-01');
SET IDENTITY_INSERT Person OFF

-- User table
SET IDENTITY_INSERT [User] ON
INSERT INTO [User] (ID, UserName, Email, Password, PersonID, CreateDate, ModificationDate)
VALUES (999, 'HRAdmin', 'johndoe@example.com', 'password123', 999, '2022-01-01 10:00:00', '2022-01-02 10:00:00');
SET IDENTITY_INSERT [User] OFF

-- Role table
SET IDENTITY_INSERT [Role] ON
INSERT INTO [Role] (ID, RoleName, Description, CreateDate, ModificationDate, LastModificationUser)
VALUES (1, 'HR', 'System administrator role', '2022-01-01 10:00:00', '2022-01-02 10:00:00', 999);

INSERT INTO [Role] (ID, RoleName, Description, CreateDate, ModificationDate, LastModificationUser)
VALUES (2, 'Employee', 'System administrator role', '2022-01-01 10:00:00', '2022-01-02 10:00:00', 999);
SET IDENTITY_INSERT [Role] OFF
-- UserRole table
INSERT INTO [UserRole] (UserID, RoleID, ActiveFlag, CreateDate, ModificationDate, LastModificationUser)
VALUES (999, 1, 1, '2022-01-01 10:00:00', '2022-01-02 10:00:00', 999);

-- Permission table
SET IDENTITY_INSERT [Permission] ON

INSERT INTO [Permission] (ID, PermissionName, PermissionDescription, CreateDate, ModificationDate, LastModificationUser)
VALUES (1, 'HR Permission', 'Permission to do HR operation', '2022-01-01 10:00:00', '2022-01-02 10:00:00', 999);

INSERT INTO [Permission] (ID, PermissionName, PermissionDescription, CreateDate, ModificationDate, LastModificationUser)
VALUES (2, 'Employee Permission', 'Permission to do Employee operation', '2022-01-01 10:00:00', '2022-01-02 10:00:00', 999);
SET IDENTITY_INSERT [Permission] OFF
-- RolePermission table
SET IDENTITY_INSERT [RolePermission] ON

INSERT INTO [RolePermission] (ID, RoleID, PermissionID, ActiveFlag, CreateDate, ModificationDate, LastModificationUser)
VALUES (1, 1, 1, 1, '2022-01-01 10:00:00', '2022-01-02 10:00:00', 999);

INSERT INTO [RolePermission] (ID, RoleID, PermissionID, ActiveFlag, CreateDate, ModificationDate, LastModificationUser)
VALUES (2, 2, 2, 1, '2022-01-01 10:00:00', '2022-01-02 10:00:00', 999);
SET IDENTITY_INSERT [RolePermission] OFF

--add for employee test
INSERT INTO [User] (UserName, Email, Password, PersonID, CreateDate, ModificationDate)
VALUES ('employee', 'johndoe@example.com', '123', 1053, '2022-01-01 10:00:00', '2022-01-02 10:00:00');


INSERT INTO [UserRole] (UserID, RoleID, ActiveFlag, CreateDate, ModificationDate, LastModificationUser)
VALUES (1014, 2, 1, '2022-01-01 10:00:00', '2022-01-02 10:00:00', 999);

-- Insert rows into table 'TableName'
INSERT INTO ApplicationWorkFlow
( -- columns to insert data into
 [EmployeeID], [CreatedDate], [STATUS],[Type],[ModificationDate]
)
VALUES
( -- first row: values for the columns in the list above
 8, GETDATE(), 'Approved','Onboarding', GETDATE()
)
-- add more rows here
GO

INSERT INTO ApplicationWorkFlow
( -- columns to insert data into
 [EmployeeID], [CreatedDate], [STATUS],[Type],[ModificationDate]
)
VALUES
( -- first row: values for the columns in the list above
 8, GETDATE(), 'OPT_Receipt','Visa', GETDATE()
)
-- add more rows here
GO


INSERT INTO DigitalDocument (Type, Required, TemplateLocation, Description)
VALUES ('Visa', 1, 'visa.jpg', 'Visa document sample');

INSERT INTO DigitalDocument (Type, Required, TemplateLocation, Description)
VALUES ('Driver License', 1, 'Driver_License.png', 'Driver License sample');

INSERT INTO DigitalDocument (Type, Required, TemplateLocation, Description)
VALUES ('Work Authorization', 1, 'Work_Authorization.jpg', 'Work Authorization sample');

INSERT INTO Employee
(PersonId, Title, ManagerID, StartDate, EndDate, Avatar, Car, VisaStatusID, VisaStartDate, VisaEndDate, DriverLisence, DriverLisence_ExpirationDate, HouseID)
VALUES
(999, 'HR', 0, '2023-02-07 00:00:00.000', null, '167619310728292161858_p0_master1200.jpg', 'Audi_Q7_Black', 7, '2022-10-01', '2023-10-01', 'A123456', NULL, 1);