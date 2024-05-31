# Use a imagem oficial do MySQL como base
FROM mysql:8.0.32

COPY . /docker-entrypoint-initdb.d

ENV MYSQL_ROOT_PASSWORD=123456

EXPOSE 3306

HEALTHCHECK --timeout=10s --retries=5 CMD mysqladmin ping -h localhost

CMD ["mysqld"]