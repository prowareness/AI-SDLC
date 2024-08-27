CREATE TABLE "Recruiters" (
                              "recruiter_id" INTEGER PRIMARY KEY AUTOINCREMENT,
                              "first_name" TEXT NOT NULL,
                              "last_name" TEXT NOT NULL,
                              "email" TEXT NOT NULL UNIQUE,
                              "phone_number" INTEGER NOT NULL,
                              "creation_date" DATETIME NOT NULL
);


CREATE TABLE "Vacancy" (
                           "vacancy_id" TEXT PRIMARY KEY,
                           "job_title" TEXT NOT NULL,
                           "description" TEXT NOT NULL,
                           "requirements" TEXT NOT NULL,
                           "location" TEXT NOT NULL,
                           "max_salary" REAL,
                           "application_deadline" DATETIME NOT NULL,
                           "created_by" TEXT NOT NULL,
                           "creation_date" DATETIME NOT NULL,
                           FOREIGN KEY("created_by") REFERENCES "Recruiters"("email")
);



-- Insert example for Recruiters
-- INSERT INTO Recruiters (first_name, last_name, email, phone_number, creation_date) VALUES ('John', 'Doe', 'john.doe@devon.nl', 1234567890, datetime('now'));


-- Insert example for Vacancy
-- Note: SQLite does not support auto-increment for alphanumeric types directly.
-- You would need to manage the VacancyID incrementation in your application logic.
--INSERT INTO Vacancy (VacancyId, JobTitle, Description, Requirements, Location, MaxSalary, ApplicationDeadline, CreatedBy, CreationDate)
--VALUES ('Job00001', 'Developer', 'Looking for a Java developer', 'Must have hands-on experience in Java', 'Bangalore', 10000000.23, '2024-12-31 23:59:59', 'john.doe@devon.nl', datetime('now'));


--Login Table
CREATE TABLE Login (
                       id INTEGER PRIMARY KEY AUTOINCREMENT,
                       email_id TEXT NOT NULL UNIQUE,
                       password TEXT NOT NULL,
                       last_login TEXT DEFAULT CURRENT_TIMESTAMP,
                       is_active INTEGER DEFAULT 1,
                       creation_date TEXT DEFAULT CURRENT_TIMESTAMP,
                       last_updated TEXT DEFAULT CURRENT_TIMESTAMP );

--INSERT INTO Login (email_id, password) VALUES ('john.doe@devon.nl', 'devon123');