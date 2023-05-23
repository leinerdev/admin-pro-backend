const getMenuFrontEnd = (role='USER_ROLE') => {
 const menu = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      submenu: [
        { title: 'Principal', url: '/' },
        { title: 'Progress Bar', url: '/dashboard/progress' },
        { title: 'Gráficas', url: '/dashboard/grafica1' },
        { title: 'Promesas', url: '/dashboard/promises' },
        { title: 'RxJs', url: '/dashboard/rxjs' },
      ]
    },
    {
      title: 'Mantenimiento',
      icon: 'mdi mdi-folder-lock-open',
      submenu: [
        // { title: 'Usuarios', url: 'users' },
        { title: 'Hospitales', url: 'hospitals' },
        { title: 'Médicos', url: 'doctors' },
      ]
    }
  ];

  if (role === 'ADMIN_ROLE') {
    menu[1].submenu.unshift({ title: 'Usuarios', url: 'users' })
  }

  return menu;
}

module.exports = {
    getMenuFrontEnd
}