let m_user = require('../models/m_user')
const captchapng = require('captchapng2');

module.exports = {
	/*** 返回注册页面*/

	showRegister: async ctx => {
		ctx.render('register')
	},

	/*** 返回登陆页面*/
	showLogin: async ctx => {
		ctx.render('login')
	},

	/***注册用户*/
	doRegister: async ctx => {
		let {
			username,
			password,
			email,
			vcode
		} = ctx.request.body

		console.log(vcode, ctx.session.v_code);
		if (ctx.session.v_code != vcode) {
			console.log(1);
			ctx.body = {
				code: 002,
				msg: '验证码错误'
			}
			return false
		}

		// 插入数据
		let result = await m_user.register(username, password, email);

		if (result.affectedRows == 1) {
			ctx.body = {
				code: 001,
				msg: '注册成功'
			}
			return
		}
		ctx.body = {
			code: 002,
			msg: '注册失败'
		}
	},

	/***验证用户名是否被注册*/
	checkUsername: async ctx => {
		let {
			username
		} = ctx.request.body

		// 查询数据
		let refResult = await m_user.findUsername([username]);
		console.log(refResult);
		if (refResult.length == 0) {
			ctx.body = {
				code: 001,
				msg: '该用户名可以注册'
			}
			return
		}
		ctx.body = {
			code: 002,
			msg: '该用户名已被注册'
		}
	},

	// 登录验证
	doLogin: async ctx => {
		let {
			username,
			password
		} = ctx.request.body
		let refResult = await m_user.checkLogin(username, password);
		if (refResult.length > 0) {

			// 存在用户信息session
			ctx.session.user = refResult[0]
			ctx.body = {
				code: 001,
				msg: '登录成功'
			}
			return
		}
		ctx.body = {
			code: 002,
			msg: '登录失败'
		}
	},
	getPic: async ctx => {
		let rand = parseInt(Math.random() * 9000 + 1000);
		ctx.session.v_code = rand + '';
		let png = new captchapng(80, 30, rand);
		ctx.body = png.getBuffer()
	}
}