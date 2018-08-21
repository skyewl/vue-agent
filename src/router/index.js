import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/page/Login'
import ForgetPwd from '@/page/ForgetPwd'
import Home from '@/page/Home'
import Junior from '@/page/Junior'
import JuniorDetA from '@/page/JuniorDet_a'
import JuniorDetU from '@/page/JuniorDet_u'
import Personal from '@/page/Personal'
import Spread from '@/page/Spread'
import InvitedPlayers from '@/page/InvitedPlayers'
import Myteam from '@/page/Myteam'
import Myassess from '@/page/Myassess'
import Myreview from '@/page/Myreview'
import ResetPwd from '@/page/ResetPwd'
import TeamMgt from '@/page/TeamMgt'
import TeamMember from '@/page/TeamMember'
import MemberDet from '@/page/MemberDet'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  // base: '/CrmClient',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/forgetPwd',
      name: 'ForgetPwd',
      component: ForgetPwd
    },
    {
      path: '/junior',
      name: 'Junior',
      component: Junior
    },
    {
      path: '/juniorDet_a/:id',
      name: 'JuniorDetA',
      component: JuniorDetA
    },
    {
      path: '/juniorDet_u/:id',
      name: 'JuniorDetU',
      component: JuniorDetU
    },
    {
      path: '/spread',
      name: 'Spread',
      component: Spread
    },
    {
      path: '/invitedPlayers',
      name: 'InvitedPlayers',
      component: InvitedPlayers
    },
    {
      path: '/personal',
      name: 'Personal',
      component: Personal
    },
    {
      path: '/myteam',
      name: 'Myteam',
      component: Myteam
    },
    {
      path: '/myassess',
      name: 'Myassess',
      component: Myassess
    },
    {
      path: '/myreview',
      name: 'Myreview',
      component: Myreview
    },
    {
      path: '/resetPwd',
      name: 'ResetPwd',
      component: ResetPwd
    },
    {
      path: '/teamMgt',
      name: 'TeamMgt',
      component: TeamMgt
    },
    {
      path: '/teamMember/:id/:department_id',
      name: 'TeamMember',
      component: TeamMember
    },
    {
      path: '/memberDet/:id',
      name: 'MemberDet',
      component: MemberDet
    }
  ]
})
