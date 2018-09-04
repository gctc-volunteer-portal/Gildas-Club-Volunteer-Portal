CREATE TABLE person (
    id SERIAL PRIMARY KEY,
    username VARCHAR (80) UNIQUE NOT NULL,
    password VARCHAR (1000) NOT NULL
);

CREATE TABLE "Users" (
 "Id" serial NOT NULL,
 "dynamics_id" varchar(50) NOT NULL UNIQUE,
 "password" varchar(200) NOT NULL,
 "first_name" varchar(50) NOT NULL,
 "middle_name" varchar(200) NOT NULL,
 "last_name" varchar(50) NOT NULL,
 "email" varchar(50) NOT NULL,
 "primary_phone" varchar(50) NOT NULL,
 "secondary_phone" varchar(200) NOT NULL,
 "street_address1" varchar(200) NOT NULL,
 "street_address2" varchar(200) NOT NULL,
 "city" varchar(200) NOT NULL,
 "state" varchar(200) NOT NULL,
 "zip" int NOT NULL,
 "access_level" int(1) NOT NULL,
 "admin_notes" varchar(1000) NOT NULL,
 CONSTRAINT Users_pk PRIMARY KEY ("Id")
);



CREATE TABLE "Skills" (
 "Id" serial NOT NULL,
 "skill_name" varchar(50) NOT NULL UNIQUE,
 CONSTRAINT Skills_pk PRIMARY KEY ("Id")
);



CREATE TABLE "Certifications" (
 "Id" serial NOT NULL,
 "certification_name" serial(50) NOT NULL UNIQUE,
 CONSTRAINT Certifications_pk PRIMARY KEY ("Id")
);



CREATE TABLE "User_Skills" (
 "Id" serial NOT NULL,
 "user_id" int NOT NULL,
 "skill_id" int NOT NULL,
 "has_skills" BOOLEAN NOT NULL DEFAULT 'false',
 CONSTRAINT User_Skills_pk PRIMARY KEY ("Id")
) ;



CREATE TABLE "User_Certifications" (
 "Id" serial NOT NULL,
 "user_id" int NOT NULL,
 "certification_id" int NOT NULL,
 "is_certified" BOOLEAN NOT NULL DEFAULT 'false',
 CONSTRAINT User_Certifications_pk PRIMARY KEY ("Id")
) ;



CREATE TABLE "Opportunities" (
 "Id" serial NOT NULL,
 "image" varchar(200) NOT NULL,
 "title" varchar(50) NOT NULL,
 "start_time" TIME NOT NULL,
 "end_time" TIME NOT NULL,
 "address_line1" varchar(50) NOT NULL DEFAULT '10560 Wayzata blvd',
 "address_line2" varchar(50) NOT NULL,
 "city" TIME NOT NULL DEFAULT 'Minnetonka',
 "state" varchar(15) NOT NULL DEFAULT 'MN',
 "zip" int NOT NULL DEFAULT '55305',
 "description" varchar(5000) NOT NULL,
 "date" DATE NOT NULL,
 "status" int NOT NULL DEFAULT '0',
 "private_notes" varchar NOT NULL,
 CONSTRAINT Opportunities_pk PRIMARY KEY ("Id")
) ;



CREATE TABLE "shifts" (
 "id" serial NOT NULL,
 "shift_name" varchar(50) NOT NULL,
 "certifcation_needed" integer NOT NULL,
 "end_time" TIME NOT NULL,
 "start_time" TIME NOT NULL,
 "oppurtunity_id" TIME NOT NULL,
 "max_volunteers" int(10) NOT NULL,
 "description" varchar(1000) NOT NULL,
 CONSTRAINT shifts_pk PRIMARY KEY ("id")
) ;



CREATE TABLE "User_shifts" (
 "id" serial NOT NULL,
 "user_id" int NOT NULL,
 "shift_id" int NOT NULL,
 CONSTRAINT User_shifts_pk PRIMARY KEY ("id")
) ;



CREATE TABLE "announcements" (
 "Id" serial NOT NULL,
 "title" varchar(200) NOT NULL,
 "description" varchar(10000) NOT NULL,
 CONSTRAINT announcements_pk PRIMARY KEY ("Id")
) ;