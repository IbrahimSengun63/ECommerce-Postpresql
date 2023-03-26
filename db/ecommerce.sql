-- Database: ecommerce

-- DROP DATABASE IF EXISTS ecommerce;

CREATE DATABASE ecommerce
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.UTF-8'
    LC_CTYPE = 'en_US.UTF-8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;


CREATE SCHEMA IF NOT EXISTS customer
    AUTHORIZATION postgres;
	
CREATE SCHEMA IF NOT EXISTS product
    AUTHORIZATION postgres;

CREATE SCHEMA IF NOT EXISTS public
    AUTHORIZATION postgres;
	
CREATE SCHEMA IF NOT EXISTS store
    AUTHORIZATION postgres;

CREATE SCHEMA IF NOT EXISTS trade
    AUTHORIZATION postgres;


CREATE TABLE IF NOT EXISTS public.status
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    status varchar(255),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.cities
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    name varchar(255),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.districts
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    city_id integer references public.cities(id),
    name varchar(255),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.neighbourhoods
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
	district_id integer references public.districts(id),
    name varchar(255),
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS customer.customer
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    firstname varchar(255),
    lastname varchar(255),
    email varchar(255) UNIQUE,
    active boolean DEFAULT true,
    c_at timestamp NOT NULL DEFAULT current_timestamp,
    m_at timestamp DEFAULT null,
    d_at timestamp DEFAULT null,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS customer.password
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    customer_id integer references customer.customer(id),
    hash varchar(255),
    active boolean DEFAULT true,
    c_at timestamp NOT NULL DEFAULT current_timestamp,
    e_at timestamp DEFAULT null,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS customer.login
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    customer_id integer references customer.customer(id),
    password_id integer references customer.password(id),
    active boolean DEFAULT true,
    e_at timestamp DEFAULT null,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS customer.login_history
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    login_id integer references customer.login(id),
    ip_address varchar(255),
	status varchar(255),
    c_at timestamp NOT NULL DEFAULT current_timestamp,
    e_at timestamp DEFAULT null,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS customer.payment_info
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    customer_id integer references customer.customer(id),
    credit_card_no varchar(255),
	ccv_no varchar(255),
    date varchar(255),
    c_at timestamp NOT NULL DEFAULT current_timestamp,
	m_at timestamp DEFAULT null,
    d_at timestamp DEFAULT null,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS customer.address
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    customer_id integer references customer.customer(id),
    province_id integer references public.neighbourhoods(id),
	address TExt,
    phone_no varchar(255),
    c_at timestamp NOT NULL DEFAULT current_timestamp,
	m_at timestamp DEFAULT null,
    d_at timestamp DEFAULT null,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS store.store
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    name varchar(255),
    email varchar(255) UNIQUE,
    active boolean DEFAULT true,
    c_at timestamp NOT NULL DEFAULT current_timestamp,
    m_at timestamp DEFAULT null,
    d_at timestamp DEFAULT null,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS store.password
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    store_id integer references store.store(id),
    hash varchar(255),
    active boolean DEFAULT true,
    c_at timestamp NOT NULL DEFAULT current_timestamp,
    e_at timestamp DEFAULT null,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS store.login
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    store_id integer references store.store(id),
    password_id integer references store.password(id),
    active boolean DEFAULT true,
    e_at timestamp DEFAULT null,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS store.login_history
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    login_id integer references store.login(id),
    ip_address varchar(255),
	status varchar(255),
    c_at timestamp NOT NULL DEFAULT current_timestamp,
    e_at timestamp DEFAULT null,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS store.payment_info
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    store_id integer references store.store(id),
    credit_card_no varchar(255),
	ccv_no varchar(255),
    date varchar(255),
    c_at timestamp NOT NULL DEFAULT current_timestamp,
	m_at timestamp DEFAULT null,
    d_at timestamp DEFAULT null,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS store.address
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    store_id integer references store.store(id),
    province_id integer references public.neighbourhoods(id),
	address Text,
    phone_no varchar(255),
    c_at timestamp NOT NULL DEFAULT current_timestamp,
	m_at timestamp DEFAULT null,
    d_at timestamp DEFAULT null,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS trade.card
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    customer_id integer references customer.customer(id),
   	total integer,
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS product.categories
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    name varchar(255),
   	description text, 
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS product.product
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    name varchar(255),
    sku varchar(255),
	category_id integer references product.categories(id),
    active boolean DEFAULT true,
    c_at timestamp NOT NULL DEFAULT current_timestamp,
    m_at timestamp DEFAULT null,
    d_at timestamp DEFAULT null,
    PRIMARY KEY (id)
);


CREATE TABLE IF NOT EXISTS trade.card_items
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    card_id integer references trade.card(id),
	product_id integer references product.product(id),
    quantity integer,
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS trade.order
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    card_id integer references trade.card(id),
   	status_id integer references public.status(id),
    c_at timestamp NOT NULL DEFAULT current_timestamp,
    m_at timestamp DEFAULT null,
    d_at timestamp DEFAULT null,
	code varchar(255) UNIQUE,
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS trade.transaction
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    order_id integer references trade.order(id),
   	payment_id integer references customer.payment_info(id),
	status_id integer references public.status(id),
    c_at timestamp NOT NULL DEFAULT current_timestamp,
    d_at timestamp DEFAULT null,
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS store.sold
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    store_id integer references store.store(id),
    order_code varchar(255) references trade.order(code),
	product_id integer references product.product(id),
    quantity integer,
    c_at timestamp NOT NULL DEFAULT current_timestamp,
	m_at timestamp DEFAULT null,
    d_at timestamp DEFAULT null,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS store.transaction
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    sold_id integer references store.sold(id),
   	payment_id integer references store.payment_info(id),
	total integer,
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS store.shipment
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    sold_id integer references store.sold(id),
   	address_id integer references store.address(id),
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS trade.shipment
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    order_id integer references trade.order(id),
   	address_id integer references customer.address(id),
	shipment_id integer references store.shipment(id),
	status_id integer references public.status(id),
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS product.inventory
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    product_id integer references product.product(id),
   	stock integer, 
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS product.vendor
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    store_id integer references store.store(id),
   	inventory_id integer references product.inventory(id),
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS product.price
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    product_id integer references product.product(id),
   	original_price integer,
	discount_price integer,
	active boolean,
	c_at timestamp NOT NULL DEFAULT current_timestamp,
    e_at timestamp DEFAULT null,
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS product.discount
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    product_id integer references product.product(id),
   	percent integer,
	active boolean,
	c_at timestamp NOT NULL DEFAULT current_timestamp,
    e_at timestamp DEFAULT null,
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS product.price_history
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    price_id integer references product.price(id),
	c_at timestamp NOT NULL DEFAULT current_timestamp,
    e_at timestamp DEFAULT null,
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS product.options
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
	product_id integer references product.product(id),
   	description text, 
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS product.images
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
	product_options integer references product.options(id),
   	source varchar(255), 
	PRIMARY KEY (id)
);

