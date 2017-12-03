import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import FoodsType from '../components/FoodsType'
import FoodsTypeEditor from '../components/FoodsTypeEditor'
import Foods from '../components/Foods'
import FoodsEditor from '../components/FoodsEditor'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/foods_type',
      name: 'FoodsType',
      component:FoodsType
    },
    {
      // /foots_type_editor/123
      // /foots_type_editor/hhh
      // /foots_type_editor
      path:'/foots_type_editor/:id?',
      name:'FoodsTypeEditor',
      component:FoodsTypeEditor
    },
    {
      path:'/foods',
      name:'Foods',
      component:Foods
    },
    {
      path:'/foods_editor/:id?',
      name:'FoodsEditor',
      component:FoodsEditor
    }
  ]
})
