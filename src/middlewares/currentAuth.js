export const roles = {
  ADMIN: 'admin',
  USER: 'user'
};
export function isAdmin(req, res, next) {
    if (req.user && req.user.role === roles.ADMIN) {
      next(); // Usuario es un administrador, permitir acceso
    } else {
      res.status(403).json({ message: 'Acceso denegado. Solo los administradores pueden realizar esta acción.' });
    }
  }
  
  export function isUser(req, res, next) {
    if (req.user && req.user.role === roles.USER) {
      next(); // Usuario es un usuario normal, permitir acceso
    } else {
      res.status(403).json({ message: 'Acceso denegado. Solo los usuarios pueden realizar esta acción.' });
    }
  }