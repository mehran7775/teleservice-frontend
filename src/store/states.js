export default {
  regularExpression: {
    regName: /^[ضصثقفغعهخحجچپشسیبلاتنمکگظطزرذدئو]{3,15}$/,
    regUsername: /^[a-zA_Zضصثقفغعهخحجچپشسیبلاتنمکگظطزرذدئو0-9]{4,15}$/gi,
    regEmail: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    regPassword: /^[a-zA-Z0-9ضصثقفغعهخحجچپشسیبلاتنمکگظطزرذدئو ]{6,16}$/g,
    reg_meliNumber: /^[0-9]{10}$/g,
    reg_fullName: /^([ضصثقفغعهخحجچپشسیبلاتنمکگظطزرذدئو]{3,15})[ ]([ضصثقفغعهخحجچپشسیبلاتنمکگظطزرذدئو]{3,15})$/
  },
  userDatas: {
    id: '',
    name: '',
    username: '',
    email: '',
    meliNumber: '',
    role: '',
    city: '',
    street: '',
    meliFile: '',
    centerFile: '',
    expertFile: '',
    madrakFile: '',
    avatar: '',
    wallet:0,
    completeRegisterClerk: {
      default: true,
    },
    completeRegisterExpert: {
      default: true,
    },
    infoClerk: false,
    infoExpert: false,
    token: null
    // token:window.localStorage.getItem('token')
  },
  cities: {},
  categories: {},
  casses: null,
  // case_details:{
  //   alert_delete:false
  // },
  response_api: {
    home: false,
    services: false,
    category: false,
    login: {
      withEmail:false,
      result: false,
      failed: '',
      success: '',
      successCallbackLogin: false
    },
    register: {
      result: false,
      failed: '',
      success: ''
    },
    logout: '',
    dashboard: {
      default: false,
      panelUser: false
    }
    // successCallbackRegister: false,
    // successCallbackLogin: false,
  },
  update_data_user: false,
  alerts: {
    register: {
      default: false,
      value: ''
    },
    login: {
      default: false,
      value: ''
    },
    update: {
      default: false,
      value: ''
    },
    delete: {
      default: false,
      value: ''
    }
  },
  validatesRegister: {
    isValidated: {
      name: false,
      username: false,
      email: false,
      password: false,
    },
    isInvalidated: {
      name: false,
      username: false,
      email: false,
      password: false
    },
    btnStatus: true,
    errorUsers: {
      name: '',
      username: '',
      email: '',
      password: ''
    },
  },
  validatesLogin: {
    isValidated: {
      username: false,
      password: false,
    },
    isInvalidated: {
      username: false,
      password: false
    },
    btnStatus: true,
    errorUsers: {
      email: '',
      password: ''
    },
  },
  validatesFullRegister: {
    isValidated: {
      meliNumber: false,
      city: false,
      street: false,
    },
    isInvalidated: {
      meliNumber: false,
      city: false,
      street: false,
    },
    btnStatus: true,
    errorUsers: {
      meliNumber: '',
      city: '',
      street: '',
    },
  },
  validatesFullRegisterExpert: {
    isValidated: {
      meliNumber: false,
      city: false,
      street: false,
    },
    isInvalidated: {
      meliNumber: false,
      city: false,
      street: false,
    },
    btnStatus: true,
    errorUsers: {
      meliNumber: '',
      city: '',
      street: '',
    },
  },
  validatesEdit: {
    isValidated: {
      name: false,
      username: false,
      meliNumber: false,
      email: false,
      street: false
    },
    isInvalidated: {
      name: false,
      username: false,
      meliNumber: false,
      email: false,
      street: false
    },
    btnStatus: true,
    errorUsers: {
      name: '',
      username: '',
      meliNumber: '',
      email: '',
      street: ''
    },
  }
}
