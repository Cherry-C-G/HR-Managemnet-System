-- Create a new database called 'DatabaseName'
-- Connect to the 'master' database to run this snippet
USE MASTER
GO
    -- Create the new database if it does not exist already
    IF NOT EXISTS (
        SELECT
            name
        FROM
            sys.databases
        WHERE
            name = N'HR'
    ) CREATE DATABASE HR
GO
    USE HR
GO
    -- Create a new table called 'TableName' in schema 'SchemaName'
    -- Drop the table if it already exists
    IF OBJECT_ID('[User]', 'U') IS NOT NULL DROP TABLE [User]
GO
    -- Create the table in the specified schema
    CREATE TABLE [User] (
        ID INT PRIMARY KEY IDENTITY(1, 1),
        UserName NVARCHAR(50) NOT NULL,
        Email NVARCHAR(100) NOT NULL,
        PASSWORD NVARCHAR(200) NOT NULL,
        PersonID INT NOT NULL,
        CreateDate DATETIME NOT NULL,
        ModificationDate DATETIME NOT NULL,
    );

GO
    -- Create a new tabRole' in schema 'SchemaName'
    -- Drop the table if it already exists
    IF OBJECT_ID('Role', 'U') IS NOT NULL DROP TABLE Role
GO
    -- Create the table in the specified schema
    CREATE TABLE Role (
        ID INT PRIMARY KEY IDENTITY(1, 1),
        RoleName NVARCHAR(50) NOT NULL,
        Description NVARCHAR(200),
        CreateDate DATETIME NOT NULL,
        ModificationDate DATETIME NOT NULL,
        LastModificationUser INT NOT NULL,
    );

GO
    -- Create a new table called 'TableName' in schema 'SchemaName'
    -- Drop the table if it already exists
    IF OBJECT_ID('UserRole', 'U') IS NOT NULL DROP TABLE UserRole
GO
    -- Create the table in the specified schema
    CREATE TABLE UserRole (
        ID INT PRIMARY KEY IDENTITY(1, 1),
        UserID INT NOT NULL,
        RoleID INT NOT NULL,
        ActiveFlag BIT NOT NULL,
        CreateDate DATETIME NOT NULL,
        ModificationDate DATETIME NOT NULL,
        LastModificationUser INT NOT NULL,
        CONSTRAINT fk_UserID FOREIGN KEY (UserID) REFERENCES [User](ID),
        CONSTRAINT fk_UserRoleRoleID FOREIGN KEY (RoleID) REFERENCES Role(ID)
    );

GO
    -- Create a new tabPermission' in schema 'SchemaName'
    -- Drop the table if it already exists
    IF OBJECT_ID('Permission', 'U') IS NOT NULL DROP TABLE Permission
GO
    -- Create the table in the specified schema
    CREATE TABLE Permission (
        ID INT PRIMARY KEY IDENTITY(1, 1),
        PermissionName NVARCHAR(50) NOT NULL,
        PermissionDescription NVARCHAR(200),
        CreateDate DATETIME NOT NULL,
        ModificationDate DATETIME NOT NULL,
        LastModificationUser INT NOT NULL,
    );

GO
    -- Create a new tabRolePermission' in schema 'SchemaName'
    -- Drop the table if it already exists
    IF OBJECT_ID('RolePermission', 'U') IS NOT NULL DROP TABLE RolePermission
GO
    -- Create the table in the specified schema
    CREATE TABLE RolePermission (
        ID INT PRIMARY KEY IDENTITY(1, 1),
        RoleID INT NOT NULL,
        PermissionID INT NOT NULL,
        ActiveFlag BIT NOT NULL,
        CreateDate DATETIME NOT NULL,
        ModificationDate DATETIME NOT NULL,
        LastModificationUser INT NOT NULL,
        CONSTRAINT fk_RolePermissionRoleID FOREIGN KEY (RoleID) REFERENCES [Role](ID),
        CONSTRAINT fk_PermissionID FOREIGN KEY (PermissionID) REFERENCES Permission(ID)
    );

GO
    -- Create a new tabRegistrationToken' in schema 'SchemaName'
    -- Drop the table if it already exists
    IF OBJECT_ID('RegistrationToken', 'U') IS NOT NULL DROP TABLE RegistrationToken
GO
    -- Create the table in the specified schema
    CREATE TABLE RegistrationToken (
        ID INT PRIMARY KEY IDENTITY(1, 1),
        Token VARCHAR(100) NOT NULL,
        ValidDuration DATETIME NOT NULL,
        Email VARCHAR(100) NOT NULL,
        CreatedBy INT NOT NULL,
        FOREIGN KEY (CreatedBy) REFERENCES [User](ID)
    );

GO
    -- Create a new tabPerson' in schema 'SchemaName'
    -- Drop the table if it already exists
    IF OBJECT_ID('Person', 'U') IS NOT NULL DROP TABLE Person
GO
    -- Create the table in the specified schema
    CREATE TABLE Person (
        ID INT PRIMARY KEY IDENTITY(1, 1),
        FirstName VARCHAR(50) NOT NULL,
        LastName VARCHAR(50) NOT NULL,
        MiddleName VARCHAR(50),
        Email VARCHAR(255) NOT NULL,
        CellPhone VARCHAR(50),
        AlternatePhone VARCHAR(50),
        SSN VARCHAR(50),
        DOB DATETIME,
    );

GO
    -- Create a new tabVisaStatus' in schema 'SchemaName'
    -- Drop the table if it already exists
    IF OBJECT_ID('VisaStatus', 'U') IS NOT NULL DROP TABLE VisaStatus
GO
    -- Create the table in the specified schema
    CREATE TABLE VisaStatus (
        ID int PRIMARY KEY IDENTITY,
        VisaType varchar(50) NOT NULL,
        Actice bit NOT NULL,
        ModificationDate datetime NOT NULL,
        CreateUser int NOT NULL,
        FOREIGN KEY (CreateUser) REFERENCES [User](ID)
    );

GO
    -- Create a new tabHouse' in schema 'SchemaName'
    -- Drop the table if it already exists
    IF OBJECT_ID('House', 'U') IS NOT NULL DROP TABLE House
GO
    -- Create the table in the specified schema
    CREATE TABLE House (
        ID INT PRIMARY KEY IDENTITY(1, 1),
        ContactID INT,
        Address VARCHAR(100),
        NumberOfPerson INT
    );

GO
    -- Create a new tabEmployee' in schema 'SchemaName'
    -- Drop the table if it already exists
    IF OBJECT_ID('Employee', 'U') IS NOT NULL DROP TABLE Employee
GO
    -- Create the table in the specified schema
    CREATE TABLE Employee (
        ID INT PRIMARY KEY IDENTITY(1, 1),
        PersonID INT NOT NULL,
        Title VARCHAR(50) NOT NULL,
        ManagerID INT,
        StartDate DATETIME NOT NULL,
        EndDate DATETIME,
        Avartar NVARCHAR(255),
        Car NVARCHAR(50),
        VisaStatusID INT,
        VisaStartDate DATE,
        VisaEndDate DATE,
        DriverLisence NVARCHAR(50),
        DriverLisence_ExpirationDate DATE,
        HouseID INT,
        FOREIGN KEY (PersonID) REFERENCES Person (ID),
        FOREIGN KEY (VisaStatusID) REFERENCES VisaStatus (ID),
        FOREIGN KEY (HouseID) REFERENCES House (ID)
    );

GO
    -- Create a new tabContact' in schema 'SchemaName'
    -- Drop the table if it already exists
    IF OBJECT_ID('Contact', 'U') IS NOT NULL DROP TABLE Contact
GO
    -- Create the table in the specified schema
    CREATE TABLE Contact (
        ID INT PRIMARY KEY IDENTITY(1, 1),
        PersonID INT NOT NULL,
        Relationship VARCHAR(50),
        Title VARCHAR(50),
        isReferrence BIT NOT NULL DEFAULT 0,
        isEmergency BIT NOT NULL DEFAULT 0,
        isLandlord BIT NOT NULL DEFAULT 0,
        FOREIGN KEY (PersonID) REFERENCES Person(ID)
    );

GO
    -- Create a new tabAddress' in schema 'SchemaName'
    -- Drop the table if it already exists
    IF OBJECT_ID('Address', 'U') IS NOT NULL DROP TABLE Address
GO
    -- Create the table in the specified schema
    CREATE TABLE Address (
        ID INT IDENTITY(1, 1) PRIMARY KEY,
        AddressLine1 VARCHAR(255) NOT NULL,
        AddressLine2 VARCHAR(255),
        City VARCHAR(255) NOT NULL,
        Zipcode VARCHAR(50) NOT NULL,
        StateName VARCHAR(255) NOT NULL,
        StateAbbr VARCHAR(10) NOT NULL,
        PersonID INT NOT NULL,
        FOREIGN KEY (PersonID) REFERENCES Person(ID)
    );

GO

    -- Create a new table called 'TableName' in schema 'SchemaName'
    -- Drop the table if it already exists
    IF OBJECT_ID('PersonalDocument', 'U') IS NOT NULL DROP TABLE PersonalDocument
GO
    -- Create the table in the specified schema
    CREATE TABLE PersonalDocument (
        ID INT PRIMARY KEY IDENTITY(1, 1),
        EmployeeID INT,
        Path VARCHAR(255),
        Title VARCHAR(255),
        COMMENT VARCHAR(255),
        CreatedDate DATETIME,
        CreatedBy INT,
        FOREIGN KEY (EmployeeID) REFERENCES Employee (ID),
        FOREIGN KEY (CreatedBy) REFERENCES [User] (ID)
    );

GO
    -- Create a new tabDigitalDocument' in schema 'SchemaName'
    -- Drop the table if it already exists
    IF OBJECT_ID('DigitalDocument', 'U') IS NOT NULL DROP TABLE DigitalDocument
GO
    -- Create the table in the specified schema
    CREATE TABLE DigitalDocument (
        ID INT PRIMARY KEY IDENTITY(1, 1),
        TYPE VARCHAR(50) NOT NULL,
        Required VARCHAR(50) NOT NULL,
        TemplateLocation VARCHAR(100) NOT NULL,
        Description VARCHAR(100) NOT NULL
    );

GO
    -- Create a new table called 'TableName' in schema 'SchemaName'
    -- Drop the table if it already exists
    IF OBJECT_ID('ApplicationWorkFlow', 'U') IS NOT NULL DROP TABLE ApplicationWorkFlow
GO
    -- Create the table in the specified schema
    CREATE TABLE ApplicationWorkFlow (
        ID int PRIMARY KEY IDENTITY(1, 1),
        EmployeeID int NOT NULL,
        CreatedDate DATETIME2 NOT NULL,
        ModificationDate DATETIME2 NOT NULL,
        STATUS nvarchar(50) NOT NULL,
        Comments nvarchar(500) NULL,
        TYPE nvarchar(50) NOT NULL,
        FOREIGN KEY (EmployeeID) REFERENCES Employee(ID)
    );

GO
    -- Create a new tabFacility' in schema 'SchemaName'
    -- Drop the table if it already exists
    IF OBJECT_ID('Facility', 'U') IS NOT NULL DROP TABLE Facility
GO
    -- Create the table in the specified schema
    CREATE TABLE Facility (
        ID INT PRIMARY KEY IDENTITY(1, 1),
        TYPE VARCHAR(50),
        Description VARCHAR(MAX),
        Quantity INT,
        HouseID INT
    );

GO
    -- Create a new tabFacilityReport' in schema 'SchemaName'
    -- Drop the table if it already exists
    IF OBJECT_ID('FacilityReport', 'U') IS NOT NULL DROP TABLE FacilityReport
GO
    -- Create the table in the specified schema
    CREATE TABLE FacilityReport (
        ID INT PRIMARY KEY IDENTITY(1, 1),
        ContactID INT,
        TYPE VARCHAR(50),
        Title VARCHAR(100),
        Description VARCHAR(MAX),
        EmployeeID INT,
        Quantity INT,
        ReportDate DATE,
        HouseID INT,
        STATUS VARCHAR(20)
    );

GO

-- Create a new tabFacilityReportDetail' in schema 'SchemaName'
-- Drop the table if it already exists
IF OBJECT_ID('FacilityReportDetail', 'U') IS NOT NULL
DROP TABLE FacilityReportDetail
GO
-- Create the table in the specified schema
CREATE TABLE FacilityReportDetail (
    ID INT PRIMARY KEY IDENTITY(1,1),
    ReportID INT NOT NULL FOREIGN KEY REFERENCES FacilityReport(ID),
    EmployeeID INT NOT NULL FOREIGN KEY REFERENCES Employee(ID),
    Comments NVARCHAR(MAX) NULL,
    CreatedDate DATETIME NOT NULL DEFAULT GETDATE(),
    LastModificationDate DATETIME NOT NULL DEFAULT GETDATE()
);
GO