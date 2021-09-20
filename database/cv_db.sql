create table cv(
  id SERIAL primary key,
  location varchar(50),
  skill varchar(4000),
  product varchar(4000),
  link_img varchar (4000),
  view_count int default 0,
  account_id int,
  role_id int,
  created_at timestamp,
  updated_at timestamp
);
create index index_cv_id on cv(id);

create table experience (
  id SERIAL primary key,
  old_company varchar(50),
  join_date date,
  out_date date,
  cv_id int,
  created_at TIMESTAMP,
  updated_at timestamp,
  foreign key(cv_id) references cv(id) ON DELETE CASCADE
);

create table programinglanguage(
  id SERIAL primary key,
  name varchar(20),
  cv_id int,
  created_at TIMESTAMP,
  updated_at timestamp,
  foreign key(cv_id) references cv(id) ON DELETE CASCADE
);

create table tagname (
  id SERIAL primary key,
  tagname varchar(50),
  updated_at timestamp,
  created_at TIMESTAMP
);
create index index_tag_name on tagname(tagname);

create table cv_tagname (
cv_id    int REFERENCES cv (id) ON UPDATE CASCADE ON DELETE CASCADE
, tagname_id int REFERENCES tagname (id) ON UPDATE CASCADE ON DELETE CASCADE
, CONSTRAINT cv_tagname_pkey PRIMARY KEY (cv_id, tagname_id)
);

