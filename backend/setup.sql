DROP TABLE IF EXISTS _reservation;
DROP TABLE IF EXISTS _event;

CREATE TABLE _event (
    id            INT         NOT     NULL AUTO_INCREMENT,
    title         VARCHAR(64) NOT     NULL,
    scheduled_on  DATE        NOT     NULL,
    capacity      INT         DEFAULT NULL,

    PRIMARY KEY (id)
);

CREATE TABLE _reservation (
    id          INT          NOT     NULL AUTO_INCREMENT,
    assigned_to INT          NOT     NULL,
    author      VARCHAR(64)  NOT     NULL,
    email       VARCHAR(64)  NOT     NULL,
    phone       VARCHAR(64)  DEFAULT NULL,
    note        VARCHAR(512) DEFAULT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (assigned_to) REFERENCES _event (id) ON DELETE CASCADE
);

CREATE TABLE _token (
    id         INT         NOT NULL AUTO_INCREMENT,
    hash       VARCHAR(64) NOT NULL,
    expiration TIMESTAMP   NOT NULL,

    PRIMARY KEY (id)
);

INSERT INTO _event (title, scheduled_on, capacity) VALUES ("Colliery Made Games 2025", "2025-06-05", 150);
INSERT INTO _event (title, scheduled_on, capacity) VALUES ("Weightlifting Camp 2025", "2025-03-10", 15);
INSERT INTO _event (title, scheduled_on) VALUES ("500 Reps 2025", "2025-06-05");
INSERT INTO _event (title, scheduled_on) VALUES ("Christmas 2025", "2025-12-24");

INSERT INTO _reservation (assigned_to, author, email) VALUES(1, "Jakub Balon", "tuleja.b@seznam.cz");
INSERT INTO _reservation (assigned_to, author, email) VALUES(3, "Jan Peršín", "tuleja.b@seznam.cz");
INSERT INTO _reservation (assigned_to, author, email, phone) VALUES(1, "Bořek Tuleja", "tuleja.b@seznam.cz", "+420732601900");
INSERT INTO _reservation (assigned_to, author, email) VALUES(2, "Petr Boček", "tuleja.b@seznam.cz");
INSERT INTO _reservation (assigned_to, author, email, phone) VALUES(1, "Hynek Tuleja", "tuleja.b@seznam.cz", "+420732742351");
INSERT INTO _reservation (assigned_to, author, email, note) VALUES(2, "Pavel Tuleja", "tuleja.b@seznam.cz", "Celý tým ještě potvrdí účást.");
