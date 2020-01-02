const path = require("path")
let m_music = require('../models/m_music')


module.exports = {
	showIndex: async ctx => {
		let {
			id
		} = ctx.session.user
		let musics = await m_music.getMusics(id)
		ctx.render('index', {
			musics
		})
	},
	showAddMusic: async ctx => {
		ctx.render('add')
	},
	editMusic: async ctx => {
		let id = ctx.query.id
		let musicItem = await m_music.getMusicItem(id)
		ctx.render('edit', {
			music: musicItem[0],
			id: id
		})
	},
	addMusic: async ctx => {
		let {
			title,
			singer,
			time
		} = ctx.request.body
		let file = path.join('public/files/', path.parse(ctx.request.files.file.path).base)
		let filelrc = path.join('public/files/', path.parse(ctx.request.files.filelrc.path).base)
		let userid = ctx.session.user.id
		try {
			let addResult = await m_music.addMusic(title, singer, time, file, filelrc, userid)
			if (addResult.affectedRows == 1) {
				ctx.body = {
					code: 001,
					msg: '添加音乐成功'
				}
				return
			}
			ctx.body = {
				code: 002,
				msg: '参数不正确'
			}
		} catch {
			ctx.body = {
				code: 002,
				msg: '参数不正确'
			}
		}
	},
	updateMusic: async ctx => {
		let {
			title,
			singer,
			time,
			id
		} = ctx.request.body
		let file = path.join('public/files/', path.parse(ctx.request.files.file.path).base)
		let filelrc = path.join('public/files/', path.parse(ctx.request.files.filelrc.path).base)

		try {
			let Result = await m_music.updateMusic(id, title, singer, time, file, filelrc)
			console.log(Result);
			if (Result.affectedRows == 1) {
				ctx.body = {
					code: 001,
					msg: '更新音乐成功'
				}
				return false
			}
			ctx.body = {
				code: 002,
				msg: '更新音乐出错'
			}
		} catch {
			ctx.body = {
				code: 002,
				msg: '参数不正确'
			}
		}
	},
	deleteMusic: async ctx => {
		let {
			id
		} = ctx.request.body
		console.log(id);
		try {
			let delResult = await m_music.delMusic(id)
			if (delResult.affectedRows == 1) {
				ctx.body = {
					code: 001,
					msg: '删除成功'
				}
				return false
			}
			ctx.body = {
				code: 002,
				msg: '音乐不存在'
			}
		} catch {
			ctx.body = {
				code: 002,
				msg: '删除失败'
			}
		}
	},
}