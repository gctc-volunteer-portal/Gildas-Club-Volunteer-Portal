CREATE DATABASE "gildasclub";

CREATE TABLE "users" (
  "id" serial NOT NULL,
  "dynamics_id" varchar(50) UNIQUE,
  "password" varchar(200) NOT NULL,
  "first_name" varchar(50),
  "middle_name" varchar(50),
  "last_name" varchar(100),
  "email" varchar(250) NOT NULL,
  "primary_phone" varchar(50),
  "secondary_phone" varchar(50),
  "street_address1" varchar(200),
  "street_address2" varchar(200),
  "city" varchar(200),
  "state" varchar(200),
  "zip" int,
  "access_level" int DEFAULT 1,
  "admin_notes" varchar(3000),
  "active" BOOLEAN DEFAULT TRUE,
  "regular_basis" BOOLEAN DEFAULT FALSE,
  "specific_event" BOOLEAN DEFAULT FALSE,
  "as_needed" BOOLEAN DEFAULT FALSE,
  "limitations_allergies" varchar(1500),
  "why_excited" varchar(2000),
  "employer" varchar(300),
  "job_title" varchar(300),	
  "date_of_birth" DATE,	
  CONSTRAINT users_pk PRIMARY KEY ("id")
);




CREATE TABLE "user_certifications" (
  "id" serial,
  "user_id" int,
  "certification_id" int,
  "is_certified" BOOLEAN DEFAULT FALSE,
  CONSTRAINT user_certifications_pk PRIMARY KEY ("id")
);



CREATE TABLE "certifications" (
  "id" serial,
  "certification_name" varchar(150),
  CONSTRAINT certifications_pk PRIMARY KEY ("id")
);



CREATE TABLE "opportunities" (
  "id" serial,
  "image" varchar(1000),
  "title" varchar(100),
  "start_time" TIME,
  "end_time" TIME,
  "address_line1" varchar(100),
  "address_line2" varchar(100),
  "city" varchar(100),
  "state" varchar(100),
  "zip" int,
  "description" varchar(5000),
  "date" DATE,
  "status" int,
  "private_notes" varchar(3000),
  "max_volunteers" int,
  "certification_needed" int,
  CONSTRAINT opportunities_pk PRIMARY KEY ("id")
);



CREATE TABLE "user_opportunities" (
  "id" serial,
  "user_id" int,
  "opportunity_id" int,
  CONSTRAINT user_opportunities_pk PRIMARY KEY ("id")
);



CREATE TABLE "announcements" (
  "id" serial,
  "title" varchar(200),
  "description" varchar(3000),
  "date" DATE,
  CONSTRAINT announcements_pk PRIMARY KEY ("id")
);



ALTER TABLE "user_certifications" ADD CONSTRAINT "user_certifications_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");
ALTER TABLE "user_certifications" ADD CONSTRAINT "user_certifications_fk1" FOREIGN KEY ("certification_id") REFERENCES "certifications"("id");


ALTER TABLE "opportunities" ADD CONSTRAINT "opportunities_fk0" FOREIGN KEY ("certification_needed") REFERENCES "certifications"("id");

ALTER TABLE "user_opportunities" ADD CONSTRAINT "user_opportunities_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");
ALTER TABLE "user_opportunities" ADD CONSTRAINT "user_opportunities_fk1" FOREIGN KEY ("opportunity_id") REFERENCES "opportunities"("id");