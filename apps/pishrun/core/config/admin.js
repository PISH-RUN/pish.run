module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'c0a79f50c3c8213e59a6114f4c845006'),
  },
});
