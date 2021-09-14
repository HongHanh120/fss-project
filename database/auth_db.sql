CREATE TABLE role (
  id serial Primary key,
  role_name varchar(255) UNIQUE not null
);
create index index_role on role (id);

CREATE TABLE account (
  id serial Primary key,
  user_code varchar(255),
  password varchar(255),
  email varchar(255) UNIQUE not null,
  joining_date timestamp,
  official_date timestamp,
  contact_type varchar(255),
  position varchar(255),
  id_card varchar(255),
  role_id int REFERENCES role(id)
);
create UNIQUE index index_user on account (email, password);

CREATE TABLE profile (
  id serial Primary key,
  avatar varchar,
  profile_name varchar(255),
  profile_phone varchar(255),
  profile_address varchar(255),
  sex varchar(255),
  date_of_birth timestamp,
  account_id int REFERENCES account (id) 
);
create index index_profile on profile (id);
