--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1
-- Dumped by pg_dump version 15.0

-- Started on 2023-01-23 17:35:52 IST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 215 (class 1259 OID 16403)
-- Name: admin; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admin (
    id integer NOT NULL,
    username character varying(30) NOT NULL,
    phone character varying(12) NOT NULL,
    email character varying(50) NOT NULL,
    password character varying(20)
);


ALTER TABLE public.admin OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 16402)
-- Name: admin_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.admin_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.admin_id_seq OWNER TO postgres;

--
-- TOC entry 3665 (class 0 OID 0)
-- Dependencies: 214
-- Name: admin_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.admin_id_seq OWNED BY public.admin.id;


--
-- TOC entry 225 (class 1259 OID 16438)
-- Name: billproduct; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.billproduct (
    id integer NOT NULL,
    bid integer NOT NULL,
    productid character varying(5) NOT NULL,
    discount double precision NOT NULL,
    productqty integer NOT NULL,
    totalprice double precision NOT NULL,
    producttax double precision NOT NULL
);


ALTER TABLE public.billproduct OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 16437)
-- Name: billproduct_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.billproduct_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.billproduct_id_seq OWNER TO postgres;

--
-- TOC entry 3666 (class 0 OID 0)
-- Dependencies: 224
-- Name: billproduct_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.billproduct_id_seq OWNED BY public.billproduct.id;


--
-- TOC entry 223 (class 1259 OID 16431)
-- Name: billtable; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.billtable (
    bid integer NOT NULL,
    cid integer NOT NULL,
    totalamount double precision NOT NULL,
    balance double precision NOT NULL,
    bdate date NOT NULL,
    userid integer NOT NULL
);


ALTER TABLE public.billtable OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16430)
-- Name: billtable_bid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.billtable_bid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.billtable_bid_seq OWNER TO postgres;

--
-- TOC entry 3667 (class 0 OID 0)
-- Dependencies: 222
-- Name: billtable_bid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.billtable_bid_seq OWNED BY public.billtable.bid;


--
-- TOC entry 229 (class 1259 OID 16459)
-- Name: customertable; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.customertable (
    cusid integer NOT NULL,
    cusname character varying(20) NOT NULL,
    number character varying(12) NOT NULL
);


ALTER TABLE public.customertable OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 16458)
-- Name: customertable_cusid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.customertable_cusid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.customertable_cusid_seq OWNER TO postgres;

--
-- TOC entry 3668 (class 0 OID 0)
-- Dependencies: 228
-- Name: customertable_cusid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.customertable_cusid_seq OWNED BY public.customertable.cusid;


--
-- TOC entry 221 (class 1259 OID 16424)
-- Name: discounttable; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.discounttable (
    id integer NOT NULL,
    categories character varying(30) NOT NULL,
    discountrate double precision NOT NULL
);


ALTER TABLE public.discounttable OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16423)
-- Name: discounttable_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.discounttable_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.discounttable_id_seq OWNER TO postgres;

--
-- TOC entry 3669 (class 0 OID 0)
-- Dependencies: 220
-- Name: discounttable_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.discounttable_id_seq OWNED BY public.discounttable.id;


--
-- TOC entry 227 (class 1259 OID 16445)
-- Name: paymenttable; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.paymenttable (
    payid integer NOT NULL,
    bid integer NOT NULL,
    paydate date NOT NULL,
    amount double precision NOT NULL,
    userid integer NOT NULL
);


ALTER TABLE public.paymenttable OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 16444)
-- Name: paymenttable_payid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.paymenttable_payid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.paymenttable_payid_seq OWNER TO postgres;

--
-- TOC entry 3670 (class 0 OID 0)
-- Dependencies: 226
-- Name: paymenttable_payid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.paymenttable_payid_seq OWNED BY public.paymenttable.payid;


--
-- TOC entry 217 (class 1259 OID 16410)
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    pid character varying(5) NOT NULL,
    pname character varying(20) NOT NULL,
    pquantity integer NOT NULL,
    pprice double precision NOT NULL,
    ptax double precision NOT NULL,
    pcategory character varying(20) NOT NULL,
    createduser integer NOT NULL,
    modifieduser integer
);


ALTER TABLE public.products OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16409)
-- Name: products_pid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_pid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.products_pid_seq OWNER TO postgres;

--
-- TOC entry 3671 (class 0 OID 0)
-- Dependencies: 216
-- Name: products_pid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_pid_seq OWNED BY public.products.pid;


--
-- TOC entry 219 (class 1259 OID 16417)
-- Name: sessiontable; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sessiontable (
    id integer NOT NULL,
    uid integer NOT NULL,
    uname character varying(20) NOT NULL,
    sessionid bigint NOT NULL
);


ALTER TABLE public.sessiontable OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16416)
-- Name: sessiontable_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sessiontable_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sessiontable_id_seq OWNER TO postgres;

--
-- TOC entry 3672 (class 0 OID 0)
-- Dependencies: 218
-- Name: sessiontable_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sessiontable_id_seq OWNED BY public.sessiontable.id;


--
-- TOC entry 3474 (class 2604 OID 16406)
-- Name: admin id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin ALTER COLUMN id SET DEFAULT nextval('public.admin_id_seq'::regclass);


--
-- TOC entry 3479 (class 2604 OID 16441)
-- Name: billproduct id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.billproduct ALTER COLUMN id SET DEFAULT nextval('public.billproduct_id_seq'::regclass);


--
-- TOC entry 3478 (class 2604 OID 16434)
-- Name: billtable bid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.billtable ALTER COLUMN bid SET DEFAULT nextval('public.billtable_bid_seq'::regclass);


--
-- TOC entry 3481 (class 2604 OID 16462)
-- Name: customertable cusid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customertable ALTER COLUMN cusid SET DEFAULT nextval('public.customertable_cusid_seq'::regclass);


--
-- TOC entry 3477 (class 2604 OID 16427)
-- Name: discounttable id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.discounttable ALTER COLUMN id SET DEFAULT nextval('public.discounttable_id_seq'::regclass);


--
-- TOC entry 3480 (class 2604 OID 16448)
-- Name: paymenttable payid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.paymenttable ALTER COLUMN payid SET DEFAULT nextval('public.paymenttable_payid_seq'::regclass);


--
-- TOC entry 3475 (class 2604 OID 16451)
-- Name: products pid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN pid SET DEFAULT nextval('public.products_pid_seq'::regclass);


--
-- TOC entry 3476 (class 2604 OID 16420)
-- Name: sessiontable id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessiontable ALTER COLUMN id SET DEFAULT nextval('public.sessiontable_id_seq'::regclass);


--
-- TOC entry 3645 (class 0 OID 16403)
-- Dependencies: 215
-- Data for Name: admin; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.admin (id, username, phone, email, password) FROM stdin;
1	Vasanth	9360681757	vasanthvvb0710@gmail.com	tsv007
2	Robert	9361598071	robert123@gmail.com	pass007
3	Bella	8978327098	bellabe123@gmail.com	bel007
\.


--
-- TOC entry 3655 (class 0 OID 16438)
-- Dependencies: 225
-- Data for Name: billproduct; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.billproduct (id, bid, productid, discount, productqty, totalprice, producttax) FROM stdin;
65	68	P003	2.5	1	48.75	7
69	70	P003	2.5	1	48.75	7
66	68	P006	0	1	25	10
71	72	P006	0	2	50	10
67	68	P001	6	1	42.29999923706055	8
70	71	P001	6	1	42.29999923706055	8
68	69	P005	0	1	2500	12
72	74	P003	2.5	2	97.5	7
73	77	P006	0	2	50	10
74	78	P003	2.5	1	48.75	7
75	79	P003	2.5	1	48.75	7
76	79	P006	0	1	25	10
77	80	P002	2.5	2	58.5	6
78	81	P005	0	1	2500	12
79	81	P003	2.5	2	97.5	7
80	82	P008	0	2	600	10
81	83	P001	6	1	42.29999923706055	8
82	84	P007	0	1	21.399999618530273	7
83	84	P006	0	1	27.5	10
84	85	P007	0	2	42.79999923706055	7
85	85	P001	3	1	47.141998291015625	8
86	86	P002	2.5	2	62.80500030517578	6
87	87	P007	0	3	64.19999694824219	7
88	87	P002	2.5	1	31.0049991607666	6
89	88	P009	0	1	2280	14
90	89	P010	0	1	107	7
91	89	P003	2.5	1	52.162498474121094	7
92	90	P010	0	1	107	7
93	90	P003	2.5	1	52.162498474121094	7
94	90	P002	2.5	1	30.712499618530273	5
95	91	P11	0	2	21	5
96	91	P001	3	1	47.141998291015625	8
97	92	P11	0	2	21	5
98	93	P008	5	2	643.5	10
99	94	P011	0	8	84	5
100	95	P007	0	1	21	5
101	96	P012	0	2	208	4
102	97	P009	0	1	2260	13
\.


--
-- TOC entry 3653 (class 0 OID 16431)
-- Dependencies: 223
-- Data for Name: billtable; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.billtable (bid, cid, totalamount, balance, bdate, userid) FROM stdin;
88	25	2280	0	2023-01-04	2
77	22	55.0099983215332	0	2023-01-03	1
69	20	2800	0	2023-01-02	1
89	22	159.16000366210938	59	2023-01-05	3
90	26	189.8800048828125	0	2023-01-07	2
82	20	660	300	2023-01-03	1
91	24	68.13999938964844	0	2023-01-08	3
92	20	21	0	2023-01-10	1
93	19	627	627	2023-01-11	1
94	27	84	84	2023-01-11	1
95	20	21	0	2023-01-11	1
96	19	208	58	2023-01-19	1
97	20	2260	2260	2023-01-20	1
70	20	52.15999984741211	52.15999984741211	2023-01-02	1
71	20	45.68000030517578	45.68000030517578	2023-01-02	1
72	18	55	0	2023-01-02	1
74	21	104.33000183105469	0	2023-01-02	1
78	20	52.15999984741211	22.16	2023-01-03	1
79	19	79.66000366210938	0	2023-01-03	1
80	23	62.0099983215332	0	2023-01-03	1
83	19	45.68000030517578	0	2023-01-03	1
84	18	48.900001525878906	0	2023-01-03	1
85	24	89.94000244140625	0	2023-01-03	1
86	20	62.0099983215332	0	2023-01-04	1
87	20	95.19999694824219	0	2023-01-04	1
68	18	125.3499984741211	0	2023-01-02	1
81	21	2904.320068359375	0	2023-01-03	1
\.


--
-- TOC entry 3659 (class 0 OID 16459)
-- Dependencies: 229
-- Data for Name: customertable; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.customertable (cusid, cusname, number) FROM stdin;
18	Ashwini	9361598071
19	Kannan	8072848063
20	Vasanth	9360681757
21	Tharun	8198190191
22	Naveen	6383323974
23	Steve	8781298710
24	Karthi	9360141967
25	Ranjani	9879890139
26	Mallesh	9159572773
27	Rosan	8248855213
\.


--
-- TOC entry 3651 (class 0 OID 16424)
-- Dependencies: 221
-- Data for Name: discounttable; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.discounttable (id, categories, discountrate) FROM stdin;
1	Diary	3
5	Furniture	5
4	Water container	2.5
2	Stationary	4
\.


--
-- TOC entry 3657 (class 0 OID 16445)
-- Dependencies: 227
-- Data for Name: paymenttable; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.paymenttable (payid, bid, paydate, amount, userid) FROM stdin;
5	72	2023-01-02	55	1
6	74	2023-01-02	104.33000183105469	1
7	69	2023-01-02	2000	1
8	78	2023-01-03	30	1
9	79	2023-01-03	79.66000366210938	1
10	80	2023-01-03	62.0099983215332	1
11	81	2023-01-03	1500	1
12	83	2023-01-03	45.68000030517578	1
13	84	2023-01-03	48.900001525878906	1
14	82	2023-01-03	300	1
15	85	2023-01-03	89.94000244140625	1
16	86	2023-01-04	62.0099983215332	1
17	87	2023-01-04	50	1
18	87	2023-01-04	45.19999694824219	1
19	68	2023-01-04	125.3499984741211	1
20	81	2023-01-04	1404.320068359375	1
22	88	2023-01-04	1500	2
24	88	2023-01-04	780	2
25	69	2023-01-04	800	2
26	89	2023-01-05	100.16000366210938	3
27	90	2023-01-07	100.87999725341797	2
28	90	2023-01-07	89.00000762939453	2
29	82	2023-01-08	60	3
30	91	2023-01-08	68.13999938964844	3
31	92	2023-01-10	10	1
32	92	2023-01-10	11	1
33	95	2023-01-11	21	1
34	96	2023-01-19	150	1
\.


--
-- TOC entry 3647 (class 0 OID 16410)
-- Dependencies: 217
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (pid, pname, pquantity, pprice, ptax, pcategory, createduser, modifieduser) FROM stdin;
P004	Pen	0	10	6	Stationary	1	1
P010	Mobile cover	13	100	7	Mobile Accessories	1	\N
P003	Water bottle	0	50	7	Water container	1	\N
P002	Note	14	30	5	Stationary	1	3
P001	Milk	15	45	8	Diary	1	3
P006	Tooth Paste	22	25	9	Essentials	1	2
P005	Wooden Table	8	2500	13	Furniture	1	1
P008	Chair	6	300	10	Furniture	1	\N
P011	Milk Bikis	18	10	5	Cookies	3	\N
P007	Brush	9	20	5	Essentials	2	2
P012	Ear Phones	8	100	4	Gadgets	1	\N
P009	Digital Watch	13	2000	13	Gadgets	2	\N
\.


--
-- TOC entry 3649 (class 0 OID 16417)
-- Dependencies: 219
-- Data for Name: sessiontable; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sessiontable (id, uid, uname, sessionid) FROM stdin;
198	1	Vasanth	1400497432
\.


--
-- TOC entry 3673 (class 0 OID 0)
-- Dependencies: 214
-- Name: admin_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.admin_id_seq', 3, true);


--
-- TOC entry 3674 (class 0 OID 0)
-- Dependencies: 224
-- Name: billproduct_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.billproduct_id_seq', 102, true);


--
-- TOC entry 3675 (class 0 OID 0)
-- Dependencies: 222
-- Name: billtable_bid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.billtable_bid_seq', 97, true);


--
-- TOC entry 3676 (class 0 OID 0)
-- Dependencies: 228
-- Name: customertable_cusid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.customertable_cusid_seq', 27, true);


--
-- TOC entry 3677 (class 0 OID 0)
-- Dependencies: 220
-- Name: discounttable_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.discounttable_id_seq', 5, true);


--
-- TOC entry 3678 (class 0 OID 0)
-- Dependencies: 226
-- Name: paymenttable_payid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.paymenttable_payid_seq', 34, true);


--
-- TOC entry 3679 (class 0 OID 0)
-- Dependencies: 216
-- Name: products_pid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_pid_seq', 1, false);


--
-- TOC entry 3680 (class 0 OID 0)
-- Dependencies: 218
-- Name: sessiontable_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sessiontable_id_seq', 198, true);


--
-- TOC entry 3483 (class 2606 OID 16408)
-- Name: admin admin_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_pkey PRIMARY KEY (id);


--
-- TOC entry 3493 (class 2606 OID 16443)
-- Name: billproduct billproduct_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.billproduct
    ADD CONSTRAINT billproduct_pkey PRIMARY KEY (id);


--
-- TOC entry 3491 (class 2606 OID 16436)
-- Name: billtable billtable_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.billtable
    ADD CONSTRAINT billtable_pkey PRIMARY KEY (bid);


--
-- TOC entry 3497 (class 2606 OID 16464)
-- Name: customertable customertable_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customertable
    ADD CONSTRAINT customertable_pkey PRIMARY KEY (cusid);


--
-- TOC entry 3489 (class 2606 OID 16429)
-- Name: discounttable discounttable_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.discounttable
    ADD CONSTRAINT discounttable_pkey PRIMARY KEY (id);


--
-- TOC entry 3495 (class 2606 OID 16450)
-- Name: paymenttable paymenttable_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.paymenttable
    ADD CONSTRAINT paymenttable_pkey PRIMARY KEY (payid);


--
-- TOC entry 3485 (class 2606 OID 16453)
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (pid);


--
-- TOC entry 3487 (class 2606 OID 16422)
-- Name: sessiontable sessiontable_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessiontable
    ADD CONSTRAINT sessiontable_pkey PRIMARY KEY (id);


--
-- TOC entry 3500 (class 2606 OID 16474)
-- Name: billproduct fk_billproduct_billtable; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.billproduct
    ADD CONSTRAINT fk_billproduct_billtable FOREIGN KEY (bid) REFERENCES public.billtable(bid);


--
-- TOC entry 3499 (class 2606 OID 16469)
-- Name: billtable fk_billtable_customertable; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.billtable
    ADD CONSTRAINT fk_billtable_customertable FOREIGN KEY (cid) REFERENCES public.customertable(cusid);


--
-- TOC entry 3501 (class 2606 OID 16479)
-- Name: paymenttable fk_paymenttable_billtable; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.paymenttable
    ADD CONSTRAINT fk_paymenttable_billtable FOREIGN KEY (bid) REFERENCES public.billtable(bid);


--
-- TOC entry 3498 (class 2606 OID 16484)
-- Name: sessiontable fk_sessiontable_admin; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessiontable
    ADD CONSTRAINT fk_sessiontable_admin FOREIGN KEY (uid) REFERENCES public.admin(id);


-- Completed on 2023-01-23 17:35:52 IST

--
-- PostgreSQL database dump complete
--

