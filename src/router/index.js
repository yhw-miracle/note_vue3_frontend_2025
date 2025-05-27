import { createRouter, createWebHistory } from 'vue-router'
// import { useNoteStore } from '@/stores/noteStoreLocal'

const Home = () => import('@/views/Home.vue')
// const NewNote = () => import('@/views/NewNote.vue')
// const EditNote = () => import('@/views/EditNote.vue')
const ViewNote = () => import('@/views/ViewNote.vue')
const ViewNoteByCategory = () => import('@/views/ViewNoteByCategory.vue')
const ViewNoteByTag = () => import('@/views/ViewNoteByTag.vue')
const Friends = () => import('@/views/Friends.vue')
const Aboutme = () => import('@/views/Aboutme.vue')
// const Visitinfo = () => import('@/views/Visitinfo.vue')

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home,
			meta: { title: '笔记列表' }
		},
		// {
		// 	path: '/new',
		// 	name: 'new',
		// 	component: NewNote,
		// 	meta: { title: '新建笔记' }
		// },
		// {
		// 	path: '/edit/:id',
		// 	name: 'edit',
		// 	component: EditNote,
		// 	meta: { title: '编辑笔记' }
		// },
		{
			path: '/view/:id',
			name: 'view',
			component: ViewNote,
			meta: { title: '查看笔记' }
		},
		{
			path: '/category/:id',
			name: 'category',
			component: ViewNoteByCategory,
			meta: { title: '分类笔记' }
		},
		{
			path: '/tag/:id',
			name: 'tag',
			component: ViewNoteByTag,
			meta: { title: '标签笔记' }
		},
		{
			path: '/friends',
			name: 'friends',
			component: Friends,
			meta: { title: '友情链接' }
		},
		{
			path: '/aboutme',
			name: 'aboutme',
			component: Aboutme,
			meta: { title: '关于我' }
		},
		// {
		// 	path: '/visitinfo',
		// 	name: 'visitinfo',
		// 	component: Visitinfo,
		// 	meta: { title: '访问统计' }
		// }
	]
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
	// const noteStore = useNoteStore()

	// 加载必要数据
	// if (to.name === 'home' || to.name === 'category' || to.name === 'tag') {
	// 	noteStore.loadNotes()
	// 	noteStore.loadCategories()
	// 	noteStore.loadTags()
	// }

	// 设置页面标题
	document.title = to.meta.title ? `${to.meta.title} - 笔记平台` : '笔记平台'

	next()
})

export default router