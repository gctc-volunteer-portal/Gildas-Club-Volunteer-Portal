CREATE DATABASE "gildasclub";

CREATE extension tablefunc;

CREATE TABLE "users" (
	"id" serial NOT NULL,
	"dynamics_id" varchar,
	"password" varchar NOT NULL,
	"first_name" varchar,
	"middle_name" varchar,
	"last_name" varchar,
	"email" varchar NOT NULL UNIQUE,
	"primary_phone" varchar,
	"secondary_phone" varchar,
	"street_address1" varchar,
	"street_address2" varchar,
	"city" varchar,
	"state" varchar,
	"zip" varchar,
	"access_level" int,
	"admin_notes" varchar,
	"active" BOOLEAN,
	"regular_basis" BOOLEAN,
	"specific_event" BOOLEAN,
	"as_needed" BOOLEAN,
	"limitations_allergies" varchar,
	"why_excited" varchar,
	"employer" varchar,
	"job_title" varchar,
	"date_of_birth" DATE,
	"token" varchar(16),
	"token_expiration" bigint,
	CONSTRAINT users_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "certifications" (
	"id" serial NOT NULL,
	"certification_name" varchar,
	CONSTRAINT certifications_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "user_certifications" (
	"id" serial NOT NULL,
	"user_id" int NOT NULL,
	"certification_id" int NOT NULL,
	"is_certified" BOOLEAN,
	CONSTRAINT user_certifications_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "opportunities" (
	"id" serial NOT NULL,
	"upload_image" varchar,
	"title" varchar,
	"start_time" TIME,
	"end_time" TIME,
	"address_line1" varchar,
	"address_line2" varchar,
	"city" varchar,
	"state" varchar,
	"zip" varchar,
	"description" varchar,
	"date" DATE,
	"status" int,
	"private_note" varchar,
	"max_volunteers" int,
	"certification_needed" int,
	CONSTRAINT opportunities_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "user_opportunities" (
	"id" serial NOT NULL,
	"user_id" int NOT NULL,
	"opportunity_id" int NOT NULL,
	CONSTRAINT user_opportunities_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "announcements" (
	"id" serial NOT NULL,
	"title" varchar,
	"description" varchar,
	"date" DATE,
	CONSTRAINT announcements_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);





ALTER TABLE "user_certifications" ADD CONSTRAINT "user_certifications_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");
ALTER TABLE "user_certifications" ADD CONSTRAINT "user_certifications_fk1" FOREIGN KEY ("certification_id") REFERENCES "certifications"("id");

ALTER TABLE "opportunities" ADD CONSTRAINT "opportunities_fk0" FOREIGN KEY ("certification_needed") REFERENCES "certifications"("id");

ALTER TABLE "user_opportunities" ADD CONSTRAINT "user_opportunities_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");
ALTER TABLE "user_opportunities" ADD CONSTRAINT "user_opportunities_fk1" FOREIGN KEY ("opportunity_id") REFERENCES "opportunities"("id");

INSERT INTO "certifications" ("certification_name")
VALUES
('A/V Support'),
('Cash Handling'),
('Clinic Ambassador'),
('Communications'),
('Data Entry'),
('Gilda Greeter'),
('Instructor'),
('Noogieland'),
('Outreach Ambassador'),
('Special 1'),
('Special 2'),
('Special 3'),
('Open To All Volunteers');