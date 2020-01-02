// ----
// 连接数据库
// mysql 命令格式： mysql -h 主机地址（localhost） -u 用户名（root） －p 用户密码


// 创建数据库
create database xhkdb;

// 显示数据库
show databases;


// 删除数据库
drop database：
drop database xhkdb;

// 删除数据库
DROP DATABASE test2;



// use：使用数据库 切换数据库
use xhkdb;

// select：当前连接的数据库
select version();



// create table：创建数据表
create table user
	(
		id INT(11) PRIMARY KEY AUTO_INCREMENT,
		name VARCHAR(25),
		sex INT(2),
		height INT(11)
	);

// desc：获取表结构
DESC 表名;


// drop table：删除数据表
DROP TABLE IF EXISTS tb_dept2


// insert into：向表中插入数据
INSERT INTO table_name(列 1, 列 2, ...) VALUES(值 1, 值 2, ....)
INSERT INTO tmp3 values(2010), ('2010');


// select from：查询表中数据


// delete from：删除记录