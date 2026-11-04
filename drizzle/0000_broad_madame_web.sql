CREATE TABLE `profile` (
	`id` integer PRIMARY KEY NOT NULL,
	`skills` text DEFAULT '[]' NOT NULL,
	`semester` integer,
	`graduation_year` integer,
	`cgpa` real,
	`cities` text DEFAULT '[]' NOT NULL,
	`remote_preference` text DEFAULT 'any' NOT NULL,
	`seeking` text DEFAULT 'internship' NOT NULL,
	`resume_file_name` text,
	`resume_uploaded_at` integer,
	`updated_at` integer NOT NULL
);
