const getUsers = () => JSON.parse(localStorage.getItem('users')) || [];

export const authService = {
  login: (email, password) => {
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) throw new Error("Email atau Password salah!");
    
    
    localStorage.setItem('currentUser', JSON.stringify(user));
    return user;
  },

  register: (userData) => {
    const users = getUsers();
    if (users.some(u => u.email === userData.email)) {
      throw new Error("Email sudah terdaftar!");
    }
    
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));
    return { success: true };
  },

  logout: () => {
    localStorage.removeItem('currentUser');
  }
};