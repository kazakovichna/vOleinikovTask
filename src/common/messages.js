import localizeFilter from '@/filters/localize.filter'

export default {
  'logout': localizeFilter('Mes_Logout'),
  'login': localizeFilter('Mes_Login'),
  'auth/user-not-found': localizeFilter('Mes_User_Not_Found'),
  'auth/wrong-password': localizeFilter('Mes_Wrong_Password'),
  'auth/email-already-in-use': localizeFilter('Mes_Email_Already_Exist')
}
